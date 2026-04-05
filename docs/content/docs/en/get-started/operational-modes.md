---
title: Operational Modes
description: How to run the AI SDLC Kit from the repository or through an offline bundle.
---

The AI SDLC Kit supports two production-ready operational modes today. The right choice depends on how restricted the target environment is and how much central governance you need.

## Mode 1 — Runtime committed into the repository

This is the most resilient mode for day-to-day use and the best default for highly governed projects.

The target repository contains:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

In this mode:

- the workflow does not depend on the public docs site
- the workflow keeps all runtime files with the project itself
- the workflow can still run even if shell execution is heavily restricted

## Mode 2 — Use an offline bundle

For approved offline distribution, generate a portable bundle:

```bash
bash scripts/package-bundle.sh
```

This produces:

- `dist/ai-sdlc-kit-<version>/`
- `dist/ai-sdlc-kit-<version>.tar.gz`
- `dist/ai-sdlc-kit-<version>.sha256`

The bundle is intended for:

- internal mirrors
- regulated customer environments
- disconnected workstations
- approval-based software intake processes

The local `scripts/package-bundle.sh` in this repository is a repo-level distribution helper for the AI SDLC Kit itself.

## Bash-first bootstrap

When shell scripting is allowed, run the installer from the consumer project root:

```bash
bash /path/to/ai-sdlc-kit/scripts/install.sh /path/to/ai-sdlc-kit
```

For example:

```bash
cd /path/to/your-project
bash /path/to/ai-sdlc-kit/scripts/install.sh /path/to/ai-sdlc-kit
```

If you copied the kit into the consumer repository as `./ai-sdlc-kit`, you can also run:

```bash
cd /path/to/your-project
bash ./ai-sdlc-kit/scripts/install.sh ./ai-sdlc-kit
```

The script:

- creates `doc-specs/` if needed
- merges the prompt and agent discovery settings into `.vscode/settings.json`
- avoids PowerShell entirely

## When the public docs site is optional

The public documentation site remains the canonical learning experience, but it is no longer required for execution.

For the actual workflow, the minimum requirement is:

1. the runtime files are present
2. VS Code prompt and agent discovery is configured
3. `doc-specs/` exists

Then the user can begin with:

- `doc-specs/idea.txt` for Flow A
- `doc-specs/task.txt` for Flow B

## Related reading

- [Installation](/en/get-started/installation)
- [Quick Start](/en/get-started/quick-start)
- [Governed Environments](/en/get-started/governed-environments)
