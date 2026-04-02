---
title: Spec Phase
description: How to prepare the three artefacts that gate the implementation of each epic.
---

## What is the Spec phase?

The Spec phase happens once per epic. It is the gate between planning and implementation. Before any epic can be implemented, three artefacts must exist and be human-validated:

1. `epic-N.md` — context, scope, and completion criteria for the epic
2. `PRD.md` — functional and non-functional requirements specific to the epic
3. `spec-epic-N.md` — the implementable technical specification for the epic

> **Golden rule:** Without a human-validated `spec-epic-N.md`, implementation of epic N does not start.

---

## The prompt: `/epic-init <N>`

```
/epic-init
```

The 🏗️ Architect agent asks for the epic number, then reads `doc-specs/epics.md`, `doc-specs/technical-spec.md`, and `doc-specs/CONTEXT.md` to generate the three artefacts under `doc-specs/<N>-epic/`.

The agent **pauses after each artefact** and waits for your confirmation before generating the next one. This creates three discrete HIL checkpoints.

---

## The three artefacts

### `epic-N.md`

Provides context and boundaries for the epic:

| Section | Contents |
|---|---|
| Epic overview | What this epic achieves in the broader project |
| Scope | What is included and explicitly excluded |
| Technical dependencies | Epics that must be complete before this one starts |
| Completion criteria | Observable signals that the epic is done |

**✅ HIL:** Does this epic boundary make sense? Are dependencies accurate?

---

### `PRD.md` (per-epic)

A scoped PRD for the epic — narrower than the project PRD:

| Section | Contents |
|---|---|
| Functional requirements | What must work |
| Non-functional requirements | Performance, security, accessibility constraints |
| Acceptance criteria | Testable conditions that define "done" |
| Open questions | Unresolved items that could block implementation |

**✅ HIL:** Are all FRs and NFRs measurable? Are acceptance criteria testable?

---

### `spec-epic-N.md`

The core implementable specification:

| Section | Contents |
|---|---|
| Technical context | Architecture decisions that apply to this epic |
| Implementation scope | Files, components, and modules affected |
| Affected files | Explicit list of files to create/modify/delete |
| Implementation strategy | Step-by-step plan with no ambiguous decisions |
| Test strategy | What to test and how |
| Technical acceptance criteria | Checklist the Implementer must complete |
| Risks and open questions | Anything that could block implementation |

The spec also includes a **checklist section** that the 🛠️ Implementer agent must mark complete before handing off to the 🔎 Reviewer. Unchecked items block the review handoff.

**✅ HIL:** Is the spec specific enough to implement without dangerous assumptions? Are risks documented?

---

## Verification checklist

Before authorizing implementation, the human reviewer should confirm:

- [ ] `epic-N.md` clearly bounds the scope — nothing ambiguous about what is in and out
- [ ] `PRD.md` has testable acceptance criteria with no open contradictions
- [ ] `spec-epic-N.md` names specific files, functions, and interfaces to create or modify
- [ ] All open questions are either resolved or explicitly acceptable as deferred decisions
- [ ] No architecture decision in the spec contradicts `CONTEXT.md`

---

## After the Spec phase

With all three artefacts approved, move to the [Epic phase](/ai-sdlc-kit/en/guide/epic-phase/) to implement the epic.
