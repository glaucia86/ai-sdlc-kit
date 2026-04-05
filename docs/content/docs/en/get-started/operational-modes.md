---
title: Operational Modes
description: How to run the AI SDLC Kit from the repository, via APM, or through an offline bundle.
---

The AI SDLC Kit supports two production-ready operational modes today, plus one future distribution path under validation. The right choice depends on how restricted the target environment is and how much central governance you need.

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
- the workflow does not depend on APM at runtime
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

For repositories that already consume APM packages and have an `apm.lock.yaml`, the official portable bundle command is:

```bash
apm pack --archive
```

The local `scripts/package-bundle.sh` in this repository is a repo-level distribution helper for the AI SDLC Kit itself.

## Bash-first bootstrap

When shell scripting is allowed, the preferred bootstrap is:

```bash
bash scripts/install.sh
```

To point to an unpacked bundle or shared kit path:

```bash
bash scripts/install.sh /path/to/ai-sdlc-kit
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

## Future path — APM distribution

This repository already contains an `apm.yml`, and the normal APM consumer workflow still applies:

- commit `apm.yml`
- commit `apm.lock.yaml`
- ignore `apm_modules/`

However, real CLI validation showed that the current package layout is not yet recognized by APM as deployable prompts, agents, instructions, or skills for automatic integration into the consumer `.github/` tree.

So for now:

- APM is a future distribution path
- APM is not the recommended installation path for this kit
- the production-ready paths are direct copy and `bash scripts/install.sh`

## Related reading

- [Installation](/en/get-started/installation)
- [Quick Start](/en/get-started/quick-start)
- [Governed Environments](/en/get-started/governed-environments)
