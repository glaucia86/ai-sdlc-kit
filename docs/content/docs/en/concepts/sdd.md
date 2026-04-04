---
title: Spec-Driven Development
description: What SDD is, why spec precedes code, and how the golden rule is enforced in ai-sdlc-kit.
---

## What is Spec-Driven Development?

Spec-Driven Development (SDD) is the practice of requiring a validated, human-approved specification to exist _before_ any implementation begins.

The specification is not a document that describes what was built. It is a contract that defines what will be built — precise enough that an AI agent can implement from it without needing to infer intent.

In ai-sdlc-kit, every epic starts with a spec phase. No code is generated until a human approves the spec.

---

## The golden rule

> **Without a validated spec, no implementation starts.**

This rule is not conditional. It applies to every epic, every task, every feature — regardless of scope.

The reason is architectural. When AI agents implement from an ambiguous or informal brief:
- They fill gaps with assumptions
- Assumptions diverge from reality
- Divergence compounds across epics
- Later correction costs more than the spec would have

The spec is cheap to write and expensive to skip.

---

## What a spec contains

The ai-sdlc-kit spec artefacts are:

| Artefact | Produced by | Validates |
|---|---|---|
| `spec-epic-N.md` | 🏗️ Architect | Scope, acceptance criteria, breakdown of tasks |
| `PRD.md` (epic edition) | 🧑‍💼 Tech Lead | Functional and non-functional requirements active this epic |
| `epic-N.md` | 🏗️ Architect | List of specific tasks to implement |

Together, these three artefacts give the 🛠️ Implementer agent a complete, unambiguous picture of:
- What to build
- What success looks like
- What constraints apply
- What decisions are already made vs. open

---

## How SDD is enforced in the kit

Every prompt in the Construction phase is gated:

1. `/epic-init` — Architect generates the three spec artefacts from `CONTEXT.md` + `technical-spec.md`
2. **Human HITL checkpoint** — reviews spec before any code is generated
3. `/task-init` — Planner decomposes `epic-N.md` into tasks; human approves task list
4. `/task-implement` — Implementer generates code per task; spec is always in context
5. `/task-review` — Reviewer checks implementation against spec; flags divergence
6. **Human HITL checkpoint** — final review before merge

The Implementer agent reads the spec. The Reviewer agent references the spec. Divergence from spec is a blocker, not a comment.

---

## SDD and AI agents

SDD is especially important with AI agents because agents do not refuse work. If given an ambiguous prompt, an agent will produce _something_. That something will look plausible and may even compile.

The only reliable way to detect that the output is wrong is to have a spec to compare against.

Without spec: "Does this implementation look reasonable?" — highly subjective, easy to miss errors.  
With spec: "Does this implementation satisfy all the acceptance criteria in `spec-epic-N.md`?" — concrete, auditable, repeatable.

---

## SDD and the PRD

The PRD (`PRD.md`) is the product requirements document. In ai-sdlc-kit, the PRD plays two roles:

1. **Project-wide PRD** — produced during Inception; describes the product from discovery through to all epics
2. **Epic-scoped PRD** — a filtered view of the full PRD, scoped to what is active in this epic; produced by 🧑‍💼 Tech Lead at the start of each Construction phase

This dual usage means the Implementer always works with a PRD that is current and relevant, never with a stale document that covers requirements from six epics ago.

---

## What SDD is not

SDD is not waterfall. The spec is a living document within an epic, not a frozen contract for the whole project.

- Specs evolve between epics (as `decisions-log.md` records open decisions that get resolved)
- The `CONTEXT.md` context memory updates after each epic to reflect what actually happened
- New technical facts discovered during implementation are recorded and inform future specs

The constraint is: **within an epic, spec precedes code**. Across epics, the spec grows and adapts.
