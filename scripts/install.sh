#!/usr/bin/env bash
set -euo pipefail

SETTINGS_PATH=".vscode/settings.json"
DOC_SPECS_PATH="doc-specs"

resolve_kit_base() {
  local raw="${1:-.github}"

  if [[ -d "${raw}/.github/agents" ]]; then
    printf '%s/.github' "$raw"
    return 0
  fi

  if [[ -d "${raw}/agents" ]]; then
    printf '%s' "$raw"
    return 0
  fi

  printf 'Error: agents directory not found.\n' >&2
  printf '  Checked: "%s/agents"\n' "$raw" >&2
  printf '  Checked: "%s/.github/agents"\n' "$raw" >&2
  printf 'Pass either the kit repo root (e.g. ../ai-sdlc-kit) or its .github folder.\n' >&2
  return 1
}

normalize_path() {
  printf '%s' "$1" | sed 's#\\#/#g'
}

find_python() {
  local candidate
  for candidate in python3 python; do
    if command -v "$candidate" >/dev/null 2>&1; then
      printf '%s' "$candidate"
      return 0
    fi
  done

  return 1
}

main() {
  local raw_path="${1:-.github}"
  local kit_base
  local agents_path
  local prompts_path
  local python_bin=""

  kit_base="$(resolve_kit_base "$raw_path")"
  agents_path="$(normalize_path "${kit_base}/agents")"
  prompts_path="$(normalize_path "${kit_base}/prompts")"

  mkdir -p "$DOC_SPECS_PATH"

  if python_bin="$(find_python)"; then
    "$python_bin" - "$SETTINGS_PATH" "$agents_path" "$prompts_path" <<'PY'
import json
import os
import sys

settings_path, agents_path, prompts_path = sys.argv[1:4]

if os.path.exists(settings_path):
    with open(settings_path, "r", encoding="utf-8") as handle:
        raw = handle.read().strip()
    if raw:
        try:
            settings = json.loads(raw)
        except json.JSONDecodeError:
            print(
                f"Error: could not parse {settings_path}. Fix the JSON syntax before running this script.",
                file=sys.stderr,
            )
            sys.exit(1)
    else:
        settings = {}
else:
    settings = {}

if not isinstance(settings, dict):
    print(f"Error: expected {settings_path} to contain a JSON object.", file=sys.stderr)
    sys.exit(1)

def merge_map(current, new_entry):
    if not isinstance(current, dict):
        current = {}
    current = dict(current)
    current.update(new_entry)
    return current

settings["chat.agentFilesLocations"] = merge_map(
    settings.get("chat.agentFilesLocations"),
    {agents_path: True},
)
settings["chat.promptFilesLocations"] = merge_map(
    settings.get("chat.promptFilesLocations"),
    {prompts_path: True},
)

os.makedirs(os.path.dirname(settings_path), exist_ok=True)
with open(settings_path, "w", encoding="utf-8") as handle:
    json.dump(settings, handle, indent=2)
    handle.write("\n")
PY

    printf 'Updated %s\n' "$SETTINGS_PATH"
  else
    cat <<EOF
Warning: no Python interpreter was found, so settings were not updated automatically.

Create or update ${SETTINGS_PATH} with:
{
  "chat.agentFilesLocations": { "${agents_path}": true },
  "chat.promptFilesLocations": { "${prompts_path}": true }
}
EOF
  fi

  printf 'Ensured %s exists.\n' "$DOC_SPECS_PATH"
  printf '  chat.agentFilesLocations  -> "%s": true\n' "$agents_path"
  printf '  chat.promptFilesLocations -> "%s": true\n' "$prompts_path"
  printf 'Docs: see the official "Get Started" pages for installation and governed environments.\n'
}

main "$@"
