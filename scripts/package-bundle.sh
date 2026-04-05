#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${OUTPUT_DIR:-${ROOT_DIR}/dist}"

find_python() {
  local candidate
  for candidate in python3 python; do
    if command -v "$candidate" >/dev/null 2>&1; then
      printf '%s' "$candidate"
      return 0
    fi
  done

  printf 'Error: python3 or python is required to build the bundle.\n' >&2
  return 1
}

copy_path() {
  local relative_path="$1"
  local source_path="${ROOT_DIR}/${relative_path}"
  local target_path="${BUNDLE_DIR}/${relative_path}"

  if [[ ! -e "$source_path" ]]; then
    return 0
  fi

  mkdir -p "$(dirname "$target_path")"
  cp -R "$source_path" "$target_path"
}

write_manifest() {
  "$PYTHON_BIN" - "$ROOT_DIR" "$BUNDLE_DIR" "$PACKAGE_NAME" "$PACKAGE_VERSION" <<'PY'
import hashlib
import json
import os
import sys
from datetime import datetime, timezone

root_dir, bundle_dir, package_name, package_version = sys.argv[1:5]

files = []
for current_root, _, filenames in os.walk(bundle_dir):
    for name in sorted(filenames):
        full_path = os.path.join(current_root, name)
        rel_path = os.path.relpath(full_path, bundle_dir).replace("\\", "/")
        if rel_path == "manifest.json":
            continue

        digest = hashlib.sha256()
        with open(full_path, "rb") as handle:
            for chunk in iter(lambda: handle.read(65536), b""):
                digest.update(chunk)

        files.append(
            {
                "path": rel_path,
                "sha256": digest.hexdigest(),
                "size": os.path.getsize(full_path),
            }
        )

manifest = {
    "name": package_name,
    "version": package_version,
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "source_repo": "glaucia86/ai-sdlc-kit",
    "docs_entrypoint": "/en/get-started/operational-modes",
    "governed_docs_entrypoint": "/en/get-started/governed-environments",
    "files": files,
}

with open(os.path.join(bundle_dir, "manifest.json"), "w", encoding="utf-8") as handle:
    json.dump(manifest, handle, indent=2)
    handle.write("\n")
PY
}

write_checksums() {
  "$PYTHON_BIN" - "$BUNDLE_DIR" "$ARCHIVE_PATH" "$CHECKSUMS_PATH" <<'PY'
import hashlib
import os
import sys

bundle_dir, archive_path, checksums_path = sys.argv[1:4]

items = []
for current_root, _, filenames in os.walk(bundle_dir):
    for name in sorted(filenames):
        full_path = os.path.join(current_root, name)
        rel_path = os.path.relpath(full_path, os.path.dirname(bundle_dir)).replace("\\", "/")
        items.append((full_path, rel_path))

items.append((archive_path, os.path.basename(archive_path)))

def digest_for(path):
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for chunk in iter(lambda: handle.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()

with open(checksums_path, "w", encoding="utf-8") as handle:
    for full_path, rel_path in items:
        handle.write(f"{digest_for(full_path)}  {rel_path}\n")
PY
}

main() {
  local meta
  local relative

  PYTHON_BIN="$(find_python)"

  meta="$("$PYTHON_BIN" - "$ROOT_DIR/apm.yml" <<'PY'
import re
import sys

text = open(sys.argv[1], "r", encoding="utf-8").read()

def match(field):
    result = re.search(rf"^{field}:\s*(.+)$", text, re.MULTILINE)
    if not result:
        raise SystemExit(f"Missing required field '{field}' in apm.yml")
    return result.group(1).strip()

print(match("name"))
print(match("version"))
PY
)"

  PACKAGE_NAME="$(printf '%s' "$meta" | sed -n '1p')"
  PACKAGE_VERSION="$(printf '%s' "$meta" | sed -n '2p')"
  BUNDLE_DIR="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}"
  ARCHIVE_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}.tar.gz"
  CHECKSUMS_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}.sha256"

  rm -rf "$BUNDLE_DIR"
  mkdir -p "$OUTPUT_DIR" "$BUNDLE_DIR"

  for relative in \
    "apm.yml" \
    "README.md" \
    "CHANGELOG.md" \
    "scripts/install.sh" \
    ".github/agents" \
    ".github/prompts" \
    ".github/templates" \
    ".github/skills" \
    ".github/docs"
  do
    copy_path "$relative"
  done

  mkdir -p "${BUNDLE_DIR}/doc-specs"
  : > "${BUNDLE_DIR}/doc-specs/.gitkeep"

  write_manifest

  rm -f "$ARCHIVE_PATH"
  tar -C "$OUTPUT_DIR" -czf "$ARCHIVE_PATH" "$(basename "$BUNDLE_DIR")"

  write_checksums

  printf 'Created bundle directory: %s\n' "$BUNDLE_DIR"
  printf 'Created archive: %s\n' "$ARCHIVE_PATH"
  printf 'Created checksums: %s\n' "$CHECKSUMS_PATH"
}

main "$@"
