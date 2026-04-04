# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-04-04

### Added

- **SDD Kit initial release** — complete Spec-Driven Development workflow for GitHub Copilot in VS Code
- **Flow A — Discovery + Delivery**: end-to-end pipeline from `idea.txt` through Discovery, PM, Tech Lead, and Architect agents
- **Flow B — Direct Delivery**: streamlined pipeline from `task.txt` through Intake, Planner, Implementer, and Reviewer agents
- **10 custom agents**: `discovery`, `pm`, `tech-lead`, `architect`, `intake`, `planner`, `implementer`, `reviewer`, `qa`, `ops`
- **15+ prompt files**: covering all workflow stages from task intake to final review and operations triage
- **Templates**: `idea`, `non-technical-spec`, `technical-spec`, `epics`, `epic-N`, `spec-epic-N`, `PRD`, `spec`, `AGENTS.base`
- **Human-in-the-Loop (HITL) checkpoints**: mandatory gates at every artifact generation step
- **`/agents-init` prompt**: generates a minimal, stable `AGENTS.md` for any project
- **`/context-sync` prompt**: re-syncs agent context when sessions drift
- **`/ops-triage` prompt**: post-implementation production incident triage flow
- **Automated install script** (`make install`): merges VS Code settings without overwriting existing configuration
- **Trilingual documentation site** (EN / PT-BR / ES) built with Next.js, covering all agents, prompts, templates, artifacts, concepts, and usage scenarios
- **GitHub Pages CI/CD workflow** (`docs.yml`): build checks on PRs and auto-deploy on push to `main`
- **`Makefile`** with `install` and `install-external` targets for flexible kit adoption
- **Two adoption modes**: copy into `.github/` (Option A) or point VS Code to an external kit folder (Option B)
- **`convencoes.md`**: project conventions reference for agents
- **`fluxo-sdd.md`**: SDD workflow documentation for agent context

### Fixed

- Correct VS Code settings paths to include `.github` prefix in `README.md` and `.github/README.md`
- Standardize `children` prop naming in layout components and add global CSS module declaration
- Update HIL terminology to HITL throughout all documentation
- Resolve `.github/agents` and `.github/prompts` paths correctly in `install.ts`
- Replace stale `sdd-orquestracao` reference with `ai-sdlc-kit` in `convencoes.md`
- Make epic artifact steps conditional on Flow A vs Flow B in `task-implement` and `task-review` prompts
- Correct epic artifact preparation handoff to use Architect + `epic-init`
- Update kit structure tree in documentation to match actual filenames

---

[1.0.0]: https://github.com/glaucia86/ai-sdlc-kit/releases/tag/v1.0.0
