---
title: Discovery Phase
description: How to use the AI SDLC Kit Discovery phase to go from raw idea to a set of implementable epics.
---

## What is the Discovery phase?

The Discovery phase is the first stage of Flow A. It takes a raw, unstructured idea and transforms it — through a sequence of four agents and five prompts — into a fully structured project: a technical spec, a set of ordered epics, and a context memory that all future agents will use.

The Discovery phase is **always optional**. If you already have a clear, defined task, go directly to Flow B (starting with `/task-init`).

---

## The four Discovery agents

| Agent | File | Persona | Produces |
|---|---|---|---|
| 🧭 Discovery | `discovery.agent.md` | Product thinker, no technical bias | `idea.md` |
| 🗂️ PM | `pm.agent.md` | Product Manager focused on user journeys and business rules | `non-technical-spec.md` |
| 🧑‍💼 Tech Lead | `tech-lead.agent.md` | Engineering lead bridging PM and architecture | `PRD.md` |
| 🏗️ Architect | `architect.agent.md` | Senior systems architect, TypeScript specialist | `technical-spec.md`, `epics.md`, per-epic artefacts |

---

## The five Discovery prompts

| Prompt | Agent | Reads | Produces | HITL? |
|---|---|---|---|---|
| `/discovery-refine` | 🧭 Discovery | `idea.txt` | `idea.md` | ✅ Required |
| `/discovery-spec` | 🗂️ PM | `idea.md` | `non-technical-spec.md` | ✅ Required |
| `/discovery-prd` | 🧑‍💼 Tech Lead | `non-technical-spec.md` | `PRD.md` | ✅ Required |
| `/discovery-tech-spec` | 🏗️ Architect | `PRD.md` + codebase | `technical-spec.md` + `CONTEXT.md` (initial) | ✅ Required |
| `/discovery-epics` | 🏗️ Architect | `technical-spec.md` | `epics.md` | ✅ Required |

---

## Step-by-step walkthrough

### Step 1 — Refine the idea

```
/discovery-refine
```

The 🧭 Discovery agent reads `doc-specs/idea.txt` and produces `doc-specs/idea.md`. It operates without technical bias — no frameworks, no architecture, no implementation details. It preserves the original intent, structures it, and flags ambiguities.

**✅ HITL:** review `idea.md` before continuing.
- Was the original idea preserved accurately?
- Are there assumptions that should not have been made?
- Are open questions clearly flagged?

---

### Step 2 — Generate the functional spec

```
/discovery-spec
```

The 🗂️ PM agent reads `idea.md` and produces `doc-specs/non-technical-spec.md` with:
- Personas and target users
- User journeys and key scenarios
- Business rules and constraints
- Functional acceptance criteria
- Open questions

**✅ HITL:** review `non-technical-spec.md`.
- Are user flows clear and complete?
- Are business rules captured correctly?
- Is anything missing before moving to PRD?

---

### Step 3 — Generate the PRD

```
/discovery-prd
```

The 🧑‍💼 Tech Lead agent reads `non-technical-spec.md` and produces `doc-specs/PRD.md` with:
- Executive overview
- Objectives and success criteria
- Scope (included / excluded)
- Assumptions and dependencies
- Functional requirements (FRs)
- Non-functional requirements (NFRs)
- Acceptance criteria
- Open questions

**✅ HITL:** review `PRD.md`.
- Is the scope correctly bounded?
- Do the NFRs make sense?
- Are acceptance criteria testable?

---

### Step 4 — Generate the technical spec

```
/discovery-tech-spec
```

The 🏗️ Architect agent reads `PRD.md` and inspects the codebase (via `search/codebase`) to produce `doc-specs/technical-spec.md` with:
- Architecture decisions and rationale
- Components and module boundaries
- Contracts and interfaces
- Data flows and persistence strategy
- Auth and security boundaries
- Testing strategy
- Risks and open technical questions

It also creates the initial `doc-specs/CONTEXT.md`.

**✅ HITL:** review `technical-spec.md`.
- Are architecture decisions justified?
- Are risks and dependencies registered?
- Are there ambiguities that must be resolved before epics?

---

### Step 5 — Generate the epics

```
/discovery-epics
```

The 🏗️ Architect agent reads `technical-spec.md` and `PRD.md` and produces `doc-specs/epics.md`. Epics are ordered by **technical dependency** (not business priority) — each epic must be deliverable independently without depending on a later epic being done first.

**✅ HITL:** review `epics.md`.
- Does the sequencing make technical sense?
- Is each epic small enough to be implemented independently?
- Are dependencies between epics accurate?

---

## Generated artefacts

| Artefact | Location | Description |
|---|---|---|
| `idea.md` | `doc-specs/idea.md` | Structured version of the raw idea |
| `non-technical-spec.md` | `doc-specs/non-technical-spec.md` | Functional spec: personas, journeys, rules |
| `PRD.md` | `doc-specs/PRD.md` | Product Requirements Document |
| `technical-spec.md` | `doc-specs/technical-spec.md` | Architecture decisions, components, flows |
| `epics.md` | `doc-specs/epics.md` | Ordered list of deliverable epics |
| `CONTEXT.md` | `doc-specs/CONTEXT.md` | Initial context memory — updated after each epic |

---

## After Discovery

Once `epics.md` is approved, move to the [Spec phase](/ai-sdlc-kit/en/guide/spec-phase/) — one epic at a time.
