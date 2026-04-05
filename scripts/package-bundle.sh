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

normalize_repo_slug() {
  local remote_url="$1"
  local path_part=""
  local slug=""

  case "$remote_url" in
    git@*:* )
      path_part="${remote_url#*:}"
      ;;
    ssh://* | http://* | https://* )
      path_part="${remote_url#*://}"
      path_part="${path_part#*/}"
      ;;
    */* )
      path_part="$remote_url"
      ;;
    * )
      return 1
      ;;
  esac

  path_part="${path_part%.git}"
  slug="$(printf '%s' "$path_part" | awk -F/ 'NF >= 2 { print $(NF-1) "/" $NF }')"

  if [[ -z "$slug" ]]; then
    return 1
  fi

  printf '%s' "$slug"
}

detect_source_repo() {
  local remote_url=""
  local slug=""

  if [[ -n "${BUNDLE_SOURCE_REPO:-}" ]]; then
    printf '%s' "$BUNDLE_SOURCE_REPO"
    return 0
  fi

  if [[ -n "${GITHUB_REPOSITORY:-}" ]]; then
    printf '%s' "$GITHUB_REPOSITORY"
    return 0
  fi

  if command -v git >/dev/null 2>&1; then
    remote_url="$(git -C "$ROOT_DIR" config --get remote.origin.url 2>/dev/null || true)"
    if [[ -n "$remote_url" ]] && slug="$(normalize_repo_slug "$remote_url")"; then
      printf '%s' "$slug"
      return 0
    fi
  fi

  printf '%s' "glaucia86/ai-sdlc-kit"
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
  "$PYTHON_BIN" - "$ROOT_DIR" "$BUNDLE_DIR" "$PACKAGE_NAME" "$PACKAGE_VERSION" "$SOURCE_REPO" "$DOCS_ENTRYPOINT" "$GOVERNED_DOCS_ENTRYPOINT" <<'PY'
import hashlib
import json
import os
import sys
from datetime import datetime, timezone

root_dir, bundle_dir, package_name, package_version, source_repo, docs_entrypoint, governed_docs_entrypoint = sys.argv[1:8]

files = []
for current_root, dirnames, filenames in os.walk(bundle_dir):
    dirnames.sort()
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

files.sort(key=lambda item: item["path"])

manifest = {
    "name": package_name,
    "version": package_version,
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "source_repo": source_repo,
    "docs_entrypoint": docs_entrypoint,
    "governed_docs_entrypoint": governed_docs_entrypoint,
    "files": files,
}

with open(os.path.join(bundle_dir, "manifest.json"), "w", encoding="utf-8") as handle:
    json.dump(manifest, handle, indent=2)
    handle.write("\n")
PY
}

read_bundle_metadata() {
  "$PYTHON_BIN" - "$ROOT_DIR/bundle-metadata.json" <<'PY'
import json
import sys

metadata_path = sys.argv[1]

with open(metadata_path, "r", encoding="utf-8") as handle:
    metadata = json.load(handle)

required_fields = (
    "name",
    "version",
    "docs_entrypoint",
    "governed_docs_entrypoint",
)

for field in required_fields:
    value = metadata.get(field)
    if not isinstance(value, str) or not value.strip():
        raise SystemExit(f"Missing required field '{field}' in {metadata_path}")
    print(value.strip())
PY
}

write_checksums() {
  "$PYTHON_BIN" - "$BUNDLE_DIR" "$ARCHIVE_PATH" "$CHECKSUMS_PATH" <<'PY'
import hashlib
import os
import sys

bundle_dir, archive_path, checksums_path = sys.argv[1:4]

items = []
for current_root, dirnames, filenames in os.walk(bundle_dir):
    dirnames.sort()
    for name in sorted(filenames):
        full_path = os.path.join(current_root, name)
        rel_path = os.path.relpath(full_path, os.path.dirname(bundle_dir)).replace("\\", "/")
        items.append((full_path, rel_path))

items.append((archive_path, os.path.basename(archive_path)))
items.sort(key=lambda item: item[1])

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
  local default_docs_entrypoint
  local default_governed_docs_entrypoint

  PYTHON_BIN="$(find_python)"
  meta="$(read_bundle_metadata)"

  PACKAGE_NAME="$(printf '%s' "$meta" | sed -n '1p')"
  PACKAGE_VERSION="$(printf '%s' "$meta" | sed -n '2p')"
  default_docs_entrypoint="$(printf '%s' "$meta" | sed -n '3p')"
  default_governed_docs_entrypoint="$(printf '%s' "$meta" | sed -n '4p')"
  SOURCE_REPO="$(detect_source_repo)"
  DOCS_ENTRYPOINT="${BUNDLE_DOCS_ENTRYPOINT:-$default_docs_entrypoint}"
  GOVERNED_DOCS_ENTRYPOINT="${BUNDLE_GOVERNED_DOCS_ENTRYPOINT:-$default_governed_docs_entrypoint}"
  BUNDLE_DIR="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}"
  ARCHIVE_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}.tar.gz"
  CHECKSUMS_PATH="${OUTPUT_DIR}/${PACKAGE_NAME}-${PACKAGE_VERSION}.sha256"

  rm -rf "$BUNDLE_DIR"
  mkdir -p "$OUTPUT_DIR" "$BUNDLE_DIR"

  for relative in \
    "bundle-metadata.json" \
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
