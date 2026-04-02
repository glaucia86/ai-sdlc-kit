---
title: Epic Phase
description: How to implement an epic — from /task-implement through review and decisions log.
---

## What is the Epic phase?

The Epic phase covers the implementation and review of a single epic, using the three artefacts produced in the [Spec phase](/ai-sdlc-kit/en/guide/spec-phase/). No implementation begins without a human-validated `spec-epic-N.md`.

---

## Full sequence for one epic

```
spec-epic-N.md approved by human
   ↓
/task-implement  (🛠️ Implementer reads spec-epic-N.md + PRD.md)
   ↓
  ⚠️ Implementer signals ambiguities → human resolves → spec updated if needed
   ↓
  Implementation runs
   ↓
  Implementer fills checklist in spec-epic-N.md
  Implementer updates decisions-log.md
   ↓
/task-tests  (🧪 QA generates + runs tests)
   ↓
  QA gate: if failing → back to Implementer → human decides
   ↓
/task-review  (🔎 Reviewer evaluates adherence)
   ↓
  HIL ✅  Human reviews Reviewer output
   ↓
  If approved → move to Operations phase
  If rejected  → update spec or implementation → re-run
```

---

## `/task-implement`

```
/task-implement
```

The 🛠️ Implementer agent:

1. Reads `spec-epic-N.md` and `PRD.md`
2. Reads `CONTEXT.md` to understand architectural constraints
3. Summarizes what will be implemented and which files will be affected
4. **Pauses** — the human confirms the plan before any files are changed
5. Executes the implementation
6. Marks the checklist items in `spec-epic-N.md`
7. Records decisions in `decisions-log.md`

**If the agent encounters a critical ambiguity**, it stops and signals rather than deciding on its own. The correct response is to update `spec-epic-N.md` and re-run.

:::caution
For frontend tasks, use `/task-implement-frontend` instead. It injects the `frontend-design` and `web-design-guidelines` skills, which enforce accessibility standards, component patterns, and visual quality guidelines.
:::

### Decisions log

During implementation, every non-trivial decision that is not fully specified in `spec-epic-N.md` must be recorded in `doc-specs/<N>-epic/decisions-log.md`:

| Field | Description |
|---|---|
| Decision | What was decided |
| Context | What situation made this decision necessary |
| Alternatives | What other options were considered |
| Consequences | What this decision implies for future epics |

Entries in `decisions-log.md` are never deleted — only added or amended.

---

## `/task-tests`

```
/task-tests
```

The 🧪 QA agent:

1. Reads `spec-epic-N.md` and `CONTEXT.md`
2. Generates test scenarios based on the technical acceptance criteria
3. Describes any synthetic data required
4. Executes the project test suite
5. Reports results — pass/fail summary with detail on failures

If the QA gate fails, the agent signals the issue and defers to the human. The human decides whether to return to the Implementer for fixes or accept the failure as a known limitation.

---

## `/task-review`

```
/task-review
```

The 🔎 Reviewer agent:

1. Reads `PRD.md`, `spec-epic-N.md`, and the implementation
2. Reads `decisions-log.md` to understand deviations that were deliberately made
3. Produces a structured review output:

| Section | Contents |
|---|---|
| Adherence summary | Overall assessment — compliant / partially compliant / non-compliant |
| Deviations found | Specific places where implementation diverges from spec |
| Risks | Technical or product risks introduced by this implementation |
| Gaps | Things that were specified but not implemented |
| Final recommendation | Approved / Approved with conditions / Rejected |

**✅ HIL (mandatory):** The human reviews the Reviewer output and decides:
- Is the delivery approved?
- Are there mandatory corrections before closing?
- Does the spec need to be adjusted?

---

## After the Epic phase

Once the human approves the review, move to the [Operations phase](/ai-sdlc-kit/en/guide/operations-phase/).
