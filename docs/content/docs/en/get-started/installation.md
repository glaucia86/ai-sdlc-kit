---
title: Installation
description: How to install and configure the AI SDLC Kit in your project.
---

## Prerequisites

Before you begin, make sure you have:

- **VS Code** (latest version recommended)
- **GitHub Copilot** subscription with agent mode enabled
- **GitHub Copilot Chat** extension installed and signed in
- Agent mode enabled in VS Code settings (`"github.copilot.chat.agent.enabled": true`)

---

## Option A — Copy into your project (recommended)

This is the simplest approach. The kit travels with your repository.

1. Copy the `.github/agents/` folder to your project's `.github/agents/`
2. Copy the `.github/prompts/` folder to your project's `.github/prompts/`
3. Copy the `.github/templates/` folder to your project's `.github/templates/`
4. Add the following to your project's `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

5. Create the `doc-specs/` folder at the root of your project:

```bash
mkdir doc-specs
```

---

## Option B — Point VS Code to the kit folder or an unpacked bundle

If you prefer to keep the kit as a shared external folder (e.g., used across multiple projects), add the paths to your `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/.github/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/.github/prompts": true }
}
```

#### Bash-first installation (Option B)

To avoid editing `settings.json` manually, run the installer from the **consumer project root** so it updates that project's `.vscode/settings.json`:

```bash
bash /path/to/ai-sdlc-kit/scripts/install.sh /path/to/ai-sdlc-kit
```

For example:

```bash
cd /path/to/your-project
bash /path/to/ai-sdlc-kit/scripts/install.sh /path/to/ai-sdlc-kit
```

If you copied the kit into the consumer repo as `./ai-sdlc-kit`, you can still run:

```bash
cd /path/to/your-project
bash ./ai-sdlc-kit/scripts/install.sh ./ai-sdlc-kit
```

The script detects an existing `settings.json` and **merges** the required entries without overwriting any other configuration. If the file does not exist, it is created.

---

## Offline and governed environments

You do not need a second documentation source to run the kit. The operational guidance now lives directly in the official docs under:

- [Operational Modes](/en/get-started/operational-modes)
- [Governed Environments](/en/get-started/governed-environments)

To generate an approved offline artifact for internal distribution:

```bash
bash scripts/package-bundle.sh
```

This produces a versioned bundle directory, a `.tar.gz` archive, and a `sha256` file under `dist/`.

If the repository is already acting as an APM consumer with installed dependencies and an `apm.lock.yaml`, prefer the official APM bundle flow instead:

```bash
apm pack --archive
```

---

## Future path — APM package distribution

This repository already contains an `apm.yml`, and the standard APM consumer workflow is valid:

- commit `apm.yml`
- commit `apm.lock.yaml`
- ignore `apm_modules/`

However, the AI SDLC Kit package layout is still being validated against APM's native primitive deployment model.

Today, this means:

- APM is a future distribution path for this kit
- APM is not the official installation path yet
- the supported installation paths remain direct copy and `bash scripts/install.sh`

---

## Verify discovery

After installation, open the GitHub Copilot Chat panel and type `/` in the input field. You should see the kit prompts listed (e.g., `/discovery-refine`, `/task-implement`, etc.).

Open the agent selector and confirm that the kit agents appear (e.g., 🧭 Discovery, 🏗️ Architect, 🛠️ Implementer, etc.).

If prompts or agents are not discovered:

1. Confirm the paths in `.vscode/settings.json` are correct and relative to the workspace root.
2. Reload VS Code (`Ctrl+Shift+P` → **Developer: Reload Window**).
3. Check that the files in `.github/agents/` have the `.agent.md` extension and valid YAML frontmatter.

---

## Project folder structure after installation

```
your-project/
├── .github/
│   ├── agents/          ← AI SDLC Kit agents
│   ├── prompts/         ← AI SDLC Kit prompts
│   └── templates/       ← AI SDLC Kit templates
├── .vscode/
│   └── settings.json    ← agent/prompt discovery config
├── doc-specs/           ← all spec artefacts go here
│   └── idea.txt         ← (Flow A) or
│   └── tarefa.txt       ← (Flow B)
└── ...
```

The `doc-specs/` folder is the working directory for all generated artefacts — specs, PRDs, epics, decisions logs, and context memory. It should be committed to version control.
