<div align="center">

# 🤖 AI SDLC Kit

### Spec-Driven Development with GitHub Copilot in VS Code

[![Docs](https://img.shields.io/badge/docs-ai--sdlc--kit-6366f1?style=for-the-badge&logo=readthedocs&logoColor=white)](https://glaucia86.github.io/ai-sdlc-kit)
[![GitHub Stars](https://img.shields.io/github/stars/glaucia86/ai-sdlc-kit?style=for-the-badge&logo=github&color=f59e0b)](https://github.com/glaucia86/ai-sdlc-kit/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/glaucia86/ai-sdlc-kit?style=for-the-badge&logo=github&color=10b981)](https://github.com/glaucia86/ai-sdlc-kit/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/glaucia86/ai-sdlc-kit?style=for-the-badge&logo=github&color=ef4444)](https://github.com/glaucia86/ai-sdlc-kit/issues)
[![License](https://img.shields.io/github/license/glaucia86/ai-sdlc-kit?style=for-the-badge&color=8b5cf6)](./LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-Compatible-007ACC?style=for-the-badge&logo=visualstudiocode)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-Powered-000000?style=for-the-badge&logo=github)](https://github.com/features/copilot)

<br/>

[![Docs CI/CD](https://github.com/glaucia86/ai-sdlc-kit/actions/workflows/docs.yml/badge.svg)](https://github.com/glaucia86/ai-sdlc-kit/actions/workflows/docs.yml)
[![Last Commit](https://img.shields.io/github/last-commit/glaucia86/ai-sdlc-kit?style=flat-square&color=6366f1)](https://github.com/glaucia86/ai-sdlc-kit/commits/main)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/glaucia86/ai-sdlc-kit/pulls)
[![Release](https://img.shields.io/github/v/release/glaucia86/ai-sdlc-kit?style=flat-square&color=f59e0b)](https://github.com/glaucia86/ai-sdlc-kit/releases)

<br/>

> **A reusable kit to run a Spec-Driven Development (SDD) workflow with GitHub Copilot in VS Code.**
> It organizes the process into clear stages, with intermediate artifacts and human-in-the-loop checkpoints before implementation begins.

<br/>

[📖 Official Docs](https://glaucia86.github.io/ai-sdlc-kit) · [🚀 Quick Start](#-running-the-full-workflow) · [🧩 Agents](#-agents) · [📦 Installation](#-installation) · [📝 Changelog](./CHANGELOG.md)

</div>

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Official Documentation](#-official-documentation)
- [Prerequisites](#-prerequisites)
- [Expected doc-specs/ structure](#-expected-doc-specs-structure)
- [Kit structure](#️-kit-structure)
- [Agents](#-agents)
- [Discovery Phase (optional — Flow A)](#-discovery-phase-optional--flow-a)
- [Prompts reference (Flow B — Direct Delivery)](#-prompts-reference-flow-b--direct-delivery)
- [Running the full workflow](#-running-the-full-workflow)
- [HITL checkpoints summary](#-HITL-checkpoints-summary)
- [Core rule](#️-core-rule)
- [When to step back](#️-when-to-step-back)
- [When to use /agents-init](#-when-to-use-agents-init)
- [Workflow at a glance](#-workflow-at-a-glance)
- [Best practices](#-best-practices)
- [Expected outcome](#-expected-outcome)
- [Installation](#-installation)
- [Contributing](#-contributing)
- [Author](#-author)

---

## ✨ Overview

The goal of this kit is to prevent implementation from starting directly from a raw idea or task, before there is sufficient functional and technical clarity.

It supports **two independent flows**:

| Flow | Entry point | Best for |
|------|-------------|----------|
| **🔭 Flow A — Discovery + Delivery** | `idea.txt` | New projects, unstructured ideas |
| **⚡ Flow B — Direct Delivery** | `task.txt` | Well-defined tasks, existing backlogs |

> Neither flow is a prerequisite for the other.

---

## 📖 Official Documentation

The AI SDLC Kit has a full **trilingual documentation site** (EN / PT-BR / ES) built with Astro + Starlight, covering all agents, prompts, templates, artifacts, concepts, and usage scenarios.

**👉 [https://glaucia86.github.io/ai-sdlc-kit](https://glaucia86.github.io/ai-sdlc-kit)**

The public docs site now includes the operational guidance for runtime usage, including package-based setup, offline bundles, and governed environments.

To run the docs locally:

```bash
cd docs
npm install
npm run dev
```

### Docs CI/CD (GitHub Pages)

The repository includes a workflow at [.github/workflows/docs.yml](.github/workflows/docs.yml) that:

- runs docs build checks on pull requests targeting `main`
- builds and deploys docs to GitHub Pages on pushes to `main`
- allows manual deployment with `workflow_dispatch`

To enable deployment in your repository:

1. Open GitHub repository settings.
2. Go to **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.

Optional for forks: set the repository variable `PAGES_ENVIRONMENT` to `github-pages` (or your desired environment name).

---

## ✅ Prerequisites

Before you begin, make sure:

- the project is open in **VS Code**
- **agents** are enabled in the environment
- **prompt files** and **custom agents** are being discovered by VS Code
- a `doc-specs/` folder exists at the root of the project

To ensure VS Code discovers the agents and prompts from this kit, add the following to your project's `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

---

## 📁 Expected `doc-specs/` structure

The workflow assumes the following files:

```
doc-specs/task.txt
doc-specs/task.md
doc-specs/PRD.md
doc-specs/spec.md
```

Not all of them exist at the start. You will usually begin with only:

```
doc-specs/task.txt
```

The remaining files are generated progressively throughout the workflow.

---

## 🗂️ Kit structure

```
.github/
  agents/
    discovery.agent.md          ← Discovery Phase
    pm.agent.md                 ← Discovery Phase
    tech-lead.agent.md          ← Discovery Phase
    architect.agent.md          ← Discovery Phase
    intake.agent.md
    planner.agent.md
    implementer.agent.md
    reviewer.agent.md
    qa.agent.md
    ops.agent.md
  prompts/
    discovery-refine.prompt.md       ← Discovery Phase
    discovery-spec.prompt.md         ← Discovery Phase
    discovery-prd.prompt.md          ← Discovery Phase
    discovery-tech-spec.prompt.md    ← Discovery Phase
    discovery-epics.prompt.md        ← Discovery Phase
    epic-init.prompt.md              ← Discovery Phase
    epic-close.prompt.md
    task-init.prompt.md
    task-prd.prompt.md
    task-spec.prompt.md
    task-implement.prompt.md
    task-implement-frontend.prompt.md
    task-review.prompt.md
    task-tests.prompt.md
    agents-init.prompt.md
    context-sync.prompt.md
    ops-triage.prompt.md
  templates/
    idea.template.md                ← Discovery Phase
    non-technical-spec.template.md  ← Discovery Phase
    technical-spec.template.md      ← Discovery Phase
    epics.template.md               ← Discovery Phase
    epic-N.template.md              ← Discovery Phase
    spec-epic-N.template.md         ← Discovery Phase
    AGENTS.base.md
    PRD.template.md
    spec.template.md
  docs/
    convencoes.md
    fluxo-sdd.md
.vscode/
  settings.json
scripts/
  install.sh
  package-bundle.sh
apm.yml
```

---

## 🧩 Agents

### 📥 Intake

Responsible exclusively for the intake step. It:

- reads `task.txt`
- generates a structured `task.md`
- does not access PRD, spec, codebase, or any other artifact
- explicitly records doubts and ambiguities

### 📐 Planner

Responsible for planning and specification. It:

- reads the task
- generates `PRD.md`
- generates `spec.md`
- does not implement code

### 🛠️ Implementer

Responsible for implementation. It:

- reads `PRD.md` and `spec.md`
- summarizes what will be done before modifying any file
- implements the task
- tries to stay within the defined scope
- flags critical ambiguities instead of deciding on its own

### 🔎 Reviewer

Responsible for the final review. It:

- compares `PRD.md`, `spec.md`, and the implementation
- identifies deviations, risks, gaps, and pending issues
- produces an actionable final recommendation

---

## 🔭 Discovery Phase (optional — Flow A)

The Discovery Phase is intended for new projects or when there is an idea that needs to be structured before planning development. It is always optional — if the task is already clear, use Flow B directly.

### Discovery Phase Agents

| Agent | File | Responsibility |
|-------|------|----------------|
| 🧭 Discovery | `discovery.agent.md` | Refines `idea.txt` without technical bias and generates `idea.md` |
| 🗂️ PM | `pm.agent.md` | Generates `non-technical-spec.md` with functional specification |
| 🧑‍💼 Tech Lead | `tech-lead.agent.md` | Generates `PRD.md` from the functional specification |
| 🏗️ Architect | `architect.agent.md` | Generates `technical-spec.md`, `epics.md`, and per-epic artifacts |

### Discovery Phase Prompts

| Prompt | What it does |
|--------|--------------|
| `/discovery-refine` | Reads `idea.txt` and generates `idea.md` (without technical bias) |
| `/discovery-spec` | Reads `idea.md` and generates `non-technical-spec.md` |
| `/discovery-prd` | Reads `non-technical-spec.md` and generates `PRD.md` |
| `/discovery-tech-spec` | Reads `PRD.md` and generates `technical-spec.md` |
| `/discovery-epics` | Reads `technical-spec.md` and generates `epics.md` (ordered by technical dependency) |
| `/epic-init` | Generates the 3 artifacts for an epic in `doc-specs/<N>-epic/` (the agent asks for the epic number) |

---

## 📋 Prompts reference (Flow B — Direct Delivery)

| Prompt | What it does |
|--------|--------------|
| `/task-init` | Converts `task.txt` into `task.md` (uses 📥 Intake) |
| `/task-prd` | Converts `task.md` into `PRD.md` |
| `/task-spec` | Converts `PRD.md` into `spec.md` |
| `/task-implement` | Starts implementation based on `PRD.md` and `spec.md` |
| `/task-implement-frontend` | Frontend implementation with design and accessibility skills injected |
| `/task-review` | Performs adherence review between artifacts and code |
| `/agents-init` | Generates a minimal, stable initial `AGENTS.md` for the project |

---

## 🚀 Running the full workflow

### Step 0 — Create the initial task entry

Create the `doc-specs/` folder if it does not exist yet. Then create:

```
doc-specs/task.txt
```

This file should contain the raw task description, typically coming from the backlog, a project management tool, or context passed by the team. It may still be disorganized. The workflow exists precisely to structure this before implementation begins.

---

### Step 1 — Generate `task.md`

In the Copilot chat, run:

```
/task-init
```

This step uses the 📥 Intake agent to read `doc-specs/task.txt` and generate `doc-specs/task.md`.

Intake is a restricted-scope agent: it reads only `task.txt`, and does not access PRD, spec, or the codebase. This ensures the raw task entry is faithfully structured, without technical or architectural contamination.

> 🔵 **Mandatory HITL after this step.**
> A person must review `task.md` and answer:
> - Is the task objective clear?
> - Was any information lost?
> - Was anything misinterpreted?
> - Are there ambiguities that need to be corrected now?
>
> If the answer is "not good enough", adjust the input and run this step again. Do not advance to the PRD without this validation.

---

### Step 2 — Generate `PRD.md`

In the Copilot chat, run:

```
/task-prd
```

This step uses the 📐 Planner agent to read `doc-specs/task.md` and generate `doc-specs/PRD.md`.

The PRD is generated with the following structure: overview, objectives, scope (in/out), assumptions, functional requirements, non-functional requirements, acceptance criteria, and open questions.

> 🔵 **Mandatory HITL after this step.**
> A person must review `PRD.md` and answer:
> - Does the PRD correctly represent the task?
> - Are the objectives coherent?
> - Is the scope clear?
> - Do the acceptance criteria make sense?
> - Are there open questions that need to be resolved before the spec?
>
> If there is misalignment, adjust and regenerate the PRD. Do not advance to the spec without this validation.

---

### Step 3 — Generate `spec.md`

In the Copilot chat, run:

```
/task-spec
```

This step uses the 📐 Planner agent to read `doc-specs/PRD.md` and generate `doc-specs/spec.md`.

The spec is generated with the following structure: context, technical objective, implementation scope, architectural impact, affected components, expected functional flow, technical rules, implementation strategy, testing strategy, technical acceptance criteria, risks, and open questions.

> 🔵 **Mandatory HITL after this step.**
> A person must review `spec.md` and answer:
> - Is the spec consistent with the PRD?
> - Is it technical enough to support implementation?
> - Are there important technical decisions that are too implicit?
> - Are there missing risks, dependencies, or open questions?
> - Can implementation follow this document without dangerous assumptions?
>
> If the spec is shallow or misaligned, refine and regenerate. Implementation must not begin without human approval of the spec.

---

### Step 4 — Implement

Only after human approval of `spec.md`, run:

```
/task-implement
```

This step uses the 🛠️ Implementer agent to:

- read `doc-specs/PRD.md` and `doc-specs/spec.md`
- summarize what will be implemented
- identify the main affected files and components
- flag critical ambiguities before modifying any file
- begin implementation

If the agent finds a critical ambiguity, it must flag it and stop, rather than decide on its own. If this happens, go back to the spec step and update the document.

> 🟡 **Recommended HITL during implementation.**
> Depending on the size of the change, monitor the agent's proposed plan, the files it intends to modify, and the most sensitive changes. For small tasks this can be lighter; for larger tasks, oversight is important.

> **Handoffs and `send: false`:** at the end of implementation, the agent may propose a handoff to the Reviewer. That handoff is only executed if you confirm it manually. Copilot displays the continuation option but never invokes the next agent without your confirmation — this is part of the Human-in-the-Loop design.

---

### Step 5 — Review

After implementation, run:

```
/task-review
```

This step uses the 🔎 Reviewer agent to review `doc-specs/PRD.md`, `doc-specs/spec.md`, and the current implementation.

Output should cover: adherence summary, deviations found, risks and points of attention, gaps, and a final recommendation.

> 🔵 **Mandatory HITL at closing.**
> A person must review the reviewer's output and decide:
> - Is the delivery within scope?
> - Are there mandatory corrections?
> - Does the spec need to be updated?
> - Can implementation proceed to the next stage?
>
> The reviewer agent helps find inconsistencies, but the final decision remains human.

---

## 🔵 HITL checkpoints summary

| Checkpoint | Type |
|------------|------|
| After `task.md` | **Mandatory** |
| After `PRD.md` | **Mandatory** |
| After `spec.md` | **Mandatory** |
| After the final reviewer output | **Mandatory** |
| During implementation (larger changes) | Recommended |

---

## ⚠️ Core rule

> **Without a human-validated `spec.md`, implementation does not start.**

This is the central rule of this orchestration.

---

## ↩️ When to step back

Step back to the previous stage when:

- the task is poorly represented
- the PRD does not correctly reflect the scope
- the spec is shallow or ambiguous
- implementation depends on undocumented decisions
- the reviewer flags deviations that indicate a specification error

---

## 🛟 When to use `/agents-init`

Use this prompt only when you want to create or revise the project's `AGENTS.md`. It is not part of the mandatory per-task flow.

It generates an initial `AGENTS.md`: minimal, stable, coherent with the project, and aligned with progressive disclosure.

---

## 🔄 Workflow at a glance

### Flow A — Discovery + Delivery (optional)

```
idea.txt
   ↓
/discovery-refine        → HITL — review idea.md
   ↓
/discovery-spec          → HITL — review non-technical-spec.md
   ↓
/discovery-prd           → HITL — review PRD.md
   ↓
/discovery-tech-spec     → HITL — review technical-spec.md
   ↓
/discovery-epics         → HITL — review epics.md
   ↓ (per epic)
/epic-init               → HITL — review epic-N.md
                         → HITL — review PRD.md for the epic
                         → HITL — review spec-epic-N.md
   ↓
/task-implement  (point to doc-specs/<N>-epic/)
   ↓
/task-review
   ↓
Final HITL
```

### Flow B — Direct Delivery

```
task.txt
   ↓
/task-init      → HITL — review task.md
   ↓
/task-prd       → HITL — review PRD.md
   ↓
/task-spec      → HITL — review spec.md
   ↓
/task-implement
   ↓
/task-review
   ↓
Final HITL
```

---

## 💡 Best practices

- never skip the spec review
- do not treat the PRD as a technical document
- do not leave ambiguities unrecorded
- do not use the implementer to discover scope
- use the reviewer to validate adherence, not to redefine the task

---

## ✅ Expected outcome

At the end of the process, there should be coherence between:

- the original task description
- the structured task
- the PRD
- the spec
- the implementation
- the final review

This is the signal that the SDD workflow functioned correctly.

---

## 📦 Installation

There are two supported ways to use this kit today, plus one future distribution path under validation.

### Option A — Commit the runtime into the project

Copy:
- `agents/*` into `.github/agents/`
- `prompts/*` into `.github/prompts/`
- `templates/*` into `.github/templates/`
- `skills/*` into `.github/skills/`
- `docs/*` into `.github/docs/`

This is the simplest and most governed-friendly option. It does not depend on PowerShell, APM, or the public docs site.

### Option B — Keep the kit folder reusable or unpack an offline bundle

If you prefer to keep `ai-sdlc-kit` outside of `.github`, or if you unpacked the offline bundle into an approved shared path, add the following to your project's `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/.github/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/.github/prompts": true }
}
```

#### Automated setup (Option B)

To avoid editing `settings.json` manually, run the installer from the **consumer project root** so it updates that project's `.vscode/settings.json` and creates that project's `doc-specs/` folder:

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

The installer detects whether a `settings.json` already exists and **merges** the necessary entries without overwriting the rest of the file. If the file does not exist, it is created. It also ensures `doc-specs/` exists.

### Future path — APM package distribution

The repository now includes an `apm.yml`, but the package layout is still being validated against APM's native package primitive model.

What is already true:

- `apm.yml` is valid as a minimal APM manifest
- consumer repositories can use the standard APM workflow with `apm.yml`, `apm.lock.yaml`, and `apm_modules/`

What is not ready yet:

- treating `glaucia86/ai-sdlc-kit` as a production-ready APM package that auto-deploys prompts, agents, and skills into the consumer `.github/` tree

Until that package layout is corrected, do not treat APM as the official installation path for this kit.

### Offline bundle for governed environments

To generate a portable bundle for internal distribution of this kit repository, make sure `python3` or `python` is available in your shell environment first. The bundler uses Python to read package metadata and generate the manifest and SHA-256 checksums.

Then run:

```bash
bash scripts/package-bundle.sh
```

This creates:

- `dist/ai-sdlc-kit-<version>/`
- `dist/ai-sdlc-kit-<version>.tar.gz`
- `dist/ai-sdlc-kit-<version>.sha256`

Use the bundle when the customer environment allows only approved artifacts, mirrored repositories, or bash-based automation.

If you are in a consumer repository that already uses APM and has an `apm.lock.yaml`, the official APM portable bundle flow is:

```bash
apm pack --archive
```

See `scripts/install.sh`, `scripts/package-bundle.sh`, and the official docs pages under `Get Started` for details.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new agents, prompts, templates, or improvements to the workflow, feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a Pull Request

Please ensure your changes are consistent with the SDD workflow philosophy: **clarity, human oversight, and structured artifacts before implementation**.

---

## 👩‍💻 Author

<div align="center">

<img src="https://github.com/glaucia86.png" width="120" style="border-radius: 50%" alt="Glaucia Lemos"/>

**Glaucia Lemos**

*A.I Developer at Zup Innovation/Itaú Unibanco · AI & JavaScript Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-glaucia86-181717?style=flat-square&logo=github)](https://github.com/glaucia86)
[![X (Twitter)](https://img.shields.io/badge/X-@glaucia__lemos86-000000?style=flat-square&logo=x)](https://twitter.com/glaucia_lemos86)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-glaucialemos-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/glaucialemos/)

</div>

---

<div align="center">

Made with ❤️ to bring structure, clarity, and human oversight to AI-assisted development.

[![Docs](https://img.shields.io/badge/Official%20Docs-glaucia86.github.io%2Fai--sdlc--kit-6366f1?style=flat-square&logo=readthedocs&logoColor=white)](https://glaucia86.github.io/ai-sdlc-kit)
[![GitHub](https://img.shields.io/badge/GitHub-glaucia86%2Fai--sdlc--kit-181717?style=flat-square&logo=github)](https://github.com/glaucia86/ai-sdlc-kit)
[![Changelog](https://img.shields.io/badge/Changelog-CHANGELOG.md-10b981?style=flat-square)](./CHANGELOG.md)

</div>
