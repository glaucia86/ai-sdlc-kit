---
title: Governed Environments
description: How to operate the AI SDLC Kit in restricted environments with bash-only automation and approved artifacts.
---

This guide is for environments where:

- internet access is restricted or fully blocked
- PowerShell cannot be used
- only bash is approved for automation
- package sources must come from an approved internal distribution point

## Recommended operating model

Use a dual-mode distribution strategy:

1. use APM as the packaging source of truth
2. publish an approved offline bundle for restricted consumers
3. allow direct repository-committed runtime files as the fallback with the fewest moving parts

This gives normal teams a smooth package experience while keeping regulated consumers independent from internet access and PowerShell.

## Minimum approved runtime

The target repository needs only:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

The public docs site is optional once these files are available.

## Approved installation paths

### Path A — Commit the runtime into the project

This is the strongest option for banks and other heavily controlled organizations.

It avoids runtime package fetches and lets the project travel with everything it needs.

### Path B — Unpack an approved offline bundle

If APM is available in the governed environment:

```bash
apm unpack ai-sdlc-kit-<version>.tar.gz --output /path/to/project
```

If APM is not available:

1. extract the archive with approved `tar` tooling
2. run the bash bootstrap from the unpacked folder

```bash
bash scripts/install.sh /approved/path/ai-sdlc-kit
```

### Path C — Mirror the APM package internally

If the organization allows APM only against internal sources, mirror the package and consume it from the approved registry or Git mirror.

## Zero-installer fallback

If script execution is blocked even for bash, the kit still works:

1. copy `.github/agents`, `.github/prompts`, `.github/templates`, `.github/skills`, and `.github/docs` into the repository
2. manually set `.vscode/settings.json`
3. create `doc-specs/`
4. start the workflow

This fallback matters because some regulated environments allow file delivery but restrict script execution.

## Enterprise release recommendation

For governed clients, publish three artifacts per version:

1. the APM package source with `apm.yml`
2. the offline bundle `.tar.gz`
3. the `sha256` checksum file

Store them in an approved internal distribution point such as:

- internal Git mirror
- Artifactory or Nexus
- Azure DevOps artifacts
- signed file share

## Practical rule

Do not force a restricted customer to depend on:

- the public docs site
- PowerShell
- internet package fetches
- runtime-time tool installation

The kit should remain usable from approved local files alone.

## Related reading

- [Installation](/en/get-started/installation)
- [Operational Modes](/en/get-started/operational-modes)
