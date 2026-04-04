---
title: Templates Reference
description: All templates in the AI SDLC Kit — what they are, when they are used, and their structure.
---

Templates live in `.github/templates/`. They are used by agents as structural guides when generating artefacts. Agents do not copy templates verbatim — they use them as section schemas and fill them with content derived from upstream artefacts.

---

## `idea.template.md`

**Used by:** 🧭 Discovery (via `/discovery-refine`)  
**Produces:** `doc-specs/idea.md`

| Section | Purpose |
|---|---|
| Problem | The core problem the idea addresses |
| Target users | Who needs this |
| Key scenarios | The most important things users need to do |
| Success criteria | How we know this works |
| Out of scope | What is explicitly not included |
| Constraints | Known limitations or fixed decisions |
| Context | Background, origin, or related context |
| Open questions | Ambiguities that must be resolved before moving forward |

---

## `non-technical-spec.template.md`

**Used by:** 🗂️ PM (via `/discovery-spec`)  
**Produces:** `doc-specs/non-technical-spec.md`

| Section | Purpose |
|---|---|
| Personas | Who uses this and what they need |
| User journeys | Step-by-step flows for each persona |
| Functional scenarios | Concrete use cases with happy paths and edge cases |
| Business rules | Constraints and policies that govern behavior |
| Acceptance criteria | Testable conditions for each scenario |
| Open questions | Items requiring business validation before PRD |

---

## `PRD.template.md`

**Used by:** 🧑‍💼 Tech Lead (via `/discovery-prd`) and 📐 Planner (via `/task-prd`)  
**Produces:** `doc-specs/PRD.md`

| Section | Purpose |
|---|---|
| Overview | Executive summary of what is being built |
| Objectives | What success looks like |
| Scope — included | What is in this delivery |
| Scope — excluded | What is explicitly not in this delivery |
| Assumptions | Things treated as true without verification |
| Functional requirements | Numbered list of required behaviors |
| Non-functional requirements | Performance, security, accessibility, etc. |
| Acceptance criteria | Conditions that must be true for sign-off |
| Open questions | Items that must be resolved before implementation |

---

## `technical-spec.template.md`

**Used by:** 🏗️ Architect (via `/discovery-tech-spec`)  
**Produces:** `doc-specs/technical-spec.md`

| Section | Purpose |
|---|---|
| Architecture overview | How the system is structured |
| Architecture decisions | Key decisions with rationale (ADR format) |
| Components | Modules, services, and their responsibilities |
| Contracts and interfaces | APIs, data schemas, events |
| Data flows | How data moves through the system |
| Persistence strategy | Storage choices and migrations |
| Auth and security | Authentication, authorization, data protection |
| Testing strategy | Unit, integration, end-to-end approach |
| Risks | Technical risks with mitigation notes |
| Open questions | Unresolved technical decisions |

---

## `epics.template.md`

**Used by:** 🏗️ Architect (via `/discovery-epics`)  
**Produces:** `doc-specs/epics.md`

| Section | Purpose |
|---|---|
| Epic list | Ordered table: N, title, description, dependencies |
| Sequencing rationale | Why this order — what drives the dependency graph |
| Branch naming | Convention: `feat/E<NN>-<slug>` |

---

## `epic-N.template.md`

**Used by:** 🏗️ Architect (via `/epic-init`)  
**Produces:** `doc-specs/<N>-epic/epic-N.md`

| Section | Purpose |
|---|---|
| Epic overview | What this epic achieves in the larger project |
| Scope — included | What this epic delivers |
| Scope — excluded | What is deferred to future epics |
| Technical dependencies | Prior epics or infrastructure that must exist |
| Completion criteria | Observable signals the epic is done |

---

## `spec-epic-N.template.md`

**Used by:** 🏗️ Architect (via `/epic-init`)  
**Produces:** `doc-specs/<N>-epic/spec-epic-N.md`

The most critical template in the kit — this document gates implementation.

| Section | Purpose |
|---|---|
| Technical context | Architecture decisions from `CONTEXT.md` relevant to this epic |
| Implementation scope | What is in and out |
| Affected files | Explicit list: create / modify / delete |
| Data model changes | Schema changes, migrations |
| Implementation strategy | Step-by-step plan with no ambiguous decisions |
| Test strategy | Scenarios to cover and how to test them |
| Technical acceptance criteria | ✅ Checklist the Implementer must complete |
| Risks and open questions | Blockers to flag before starting |

---

## `decisions-log.template.md`

**Used by:** 🏗️ Architect (created empty via `/epic-init`); updated by 🛠️ Implementer  
**Produces:** `doc-specs/<N>-epic/decisions-log.md`

Each entry follows the ADR (Architectural Decision Record) format:

| Field | Description |
|---|---|
| Date | When the decision was taken |
| Decision | What was decided |
| Context | What situation made this decision necessary |
| Alternatives | Other options that were considered |
| Consequences | What this decision implies for future epics |

Entries are **never deleted** — only appended or amended.

---

## `ops-epic-N.template.md`

**Used by:** 🚀 Ops (via `/epic-close`)  
**Produces:** `doc-specs/<N>-epic/ops-epic-N.md`

| Section | Purpose |
|---|---|
| Deploy preparation | Env vars, infra deps, migration sequence, feature flags, rollback plan |
| Breaking changes | Impact on other services or future epics |
| Observability | Logs, metrics, and alerts to configure |
| Production validation | How to confirm the epic works in production |
| Anomaly patterns | What distinguishes normal from abnormal for these features |
| Technical debt | Debt registered for future epics |
| Feedback for future epics | Learnings, risks, and suggested adjustments to `epics.md` |

---

## `CONTEXT.template.md`

**Used by:** 🏗️ Architect (initial creation via `/discovery-tech-spec`; updated via `/context-sync`)  
**Produces:** `doc-specs/CONTEXT.md`

| Section | Purpose |
|---|---|
| Project overview | What this project is, at a glance |
| Architecture decisions | Cumulative ADRs from all epics |
| Completed epics | Summary of each merged and deployed epic |
| Technical debt | Registered debt across all epics |
| Active risks | Risks surfaced by Ops that haven't been resolved |
| Test strategy | Project-wide testing conventions |
| Development conventions | Patterns and constraints all agents must follow |

---

## `AGENTS.base.md`

**Used by:** 📐 Planner (via `/agents-init`)  
**Produces:** `AGENTS.md` at the project root

A skeleton for the project-level `AGENTS.md` file. Contains:

| Section | Purpose |
|---|---|
| Purpose | What this project does |
| Global behavior | Conventions all agents must follow in this codebase |
| Limits | What agents must never do |
| Specialized files | Links to additional agent guidance |

Used only once per project to establish baseline Copilot guidance for the codebase.

---

## `spec.template.md`

**Used by:** 📐 Planner (via `/task-spec`) — Flow B only  
**Produces:** `doc-specs/spec.md`

| Section | Purpose |
|---|---|
| Context | Why this task is needed |
| Technical objective | What the implementation must achieve |
| Implementation scope | Files and components to change |
| Architecture impact | Effect on existing systems |
| Component list | Affected modules and services |
| Functional flow | Step-by-step expected behavior |
| Technical rules | Implementation constraints |
| Implementation strategy | Approach and sequencing |
| Test strategy | How to validate correctness |
| Technical acceptance criteria | Testable conditions |
| Risks and open questions | Blockers and uncertainties |
