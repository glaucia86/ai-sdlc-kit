---
title: HIL Checkpoints
description: Every Human in the Loop checkpoint in the AI SDLC Kit — when, what to review, and when to go back.
---

## What is HIL in this context?

Human in the Loop (HIL) is the practice of inserting **mandatory human review gates** at specific points in the AI-driven workflow. In the AI SDLC Kit, HIL is not a checkbox — it is the structural principle that prevents AI-generated artefacts from flowing directly into implementation without human validation.

The kit treats each HIL checkpoint as a decision point: _Is this artefact accurate and complete enough to drive the next step?_

If the answer is **no**, the workflow returns to the previous step. There is no moving forward with a "close enough" spec.

---

## Complete HIL reference

### Flow A — Discovery + Delivery

| Checkpoint | Artefact to review | Required? | What to verify |
|---|---|---|---|
| After `/discovery-refine` | `idea.md` | ✅ Required | Original idea preserved? Ambiguities flagged? Nothing invented? |
| After `/discovery-spec` | `non-technical-spec.md` | ✅ Required | User flows complete? Business rules captured? Open questions listed? |
| After `/discovery-prd` | `PRD.md` | ✅ Required | Scope bounded? Acceptance criteria testable? NFRs realistic? |
| After `/discovery-tech-spec` | `technical-spec.md` | ✅ Required | Architecture decisions justified? Risks documented? No contradictions with `CONTEXT.md`? |
| After `/discovery-epics` | `epics.md` | ✅ Required | Sequencing technically sound? Epics independently deliverable? Dependencies accurate? |
| After `/epic-init` → `epic-N.md` | `doc-specs/<N>-epic/epic-N.md` | ✅ Required | Bounds clear? Dependencies complete? Completion criteria observable? |
| After `/epic-init` → `PRD.md` | `doc-specs/<N>-epic/PRD.md` | ✅ Required | FRs testable? NFRs realistic? Acceptance criteria unambiguous? |
| After `/epic-init` → `spec-epic-N.md` | `doc-specs/<N>-epic/spec-epic-N.md` | ✅ Required | **This is the gate.** Spec specific enough? Files named? No dangerous assumptions? |
| During `/task-implement` (plan) | Implementer's proposed plan | ⚠️ Recommended | Plan reasonable? Scope stays bounded? No unexpected changes? |
| After `/task-review` | Reviewer's output | ✅ Required | Adherence sufficient? Deviations acceptable? Delivery approved? |
| After `/epic-close` | `ops-epic-N.md` | ✅ Required | Deploy safe? Anomaly patterns defined? Debt registered? |

### Flow B — Direct Delivery

| Checkpoint | Artefact to review | Required? | What to verify |
|---|---|---|---|
| After `/task-init` | `tarefa.md` | ✅ Required | Task objective clear? No distortion from original? Ambiguities flagged? |
| After `/task-prd` | `PRD.md` | ✅ Required | Scope correct? Criteria testable? Open questions answered? |
| After `/task-spec` | `spec.md` | ✅ Required | **This is the gate.** Spec specific enough? Risks documented? |
| During `/task-implement` (plan) | Implementer's proposed plan | ⚠️ Recommended | Plan reasonable? No unexpected scope? |
| After `/task-review` | Reviewer's output | ✅ Required | Delivery approved? Deviations acceptable? |

---

## What to look for at each type of checkpoint

### Idea / Functional spec checkpoints

- Was the intent preserved without distortion?
- Were any features or decisions added that were not in the input?
- Are open questions explicitly documented rather than assumed away?

### PRD checkpoints

- Is the scope bounded — what is included AND what is explicitly excluded?
- Are acceptance criteria testable (not subjective)?
- Do NFRs have concrete, measurable values?

### Technical spec checkpoints

- Are architecture decisions traceable to requirements in the PRD?
- Are the named files and components consistent with the existing codebase?
- Are risks documented with enough detail to be actionable?

### `spec-epic-N.md` checkpoint (the most critical)

- Does the spec name specific files, functions, or interfaces to create/modify?
- Could an engineer implement this without having to make unspecified decisions?
- Is there anything that says "decide at implementation time" that should be resolved now?

### Review checkpoint

- Does the Reviewer's adherence summary match your understanding of the work?
- Are deviations explained by entries in `decisions-log.md` (i.e., deliberate, documented)?
- Are risks introduced by the implementation acceptable?

---

## When and how to go back

| Situation | Go back to |
|---|---|
| `idea.md` distorts the original idea | Revise `idea.txt` → re-run `/discovery-refine` |
| `PRD.md` has wrong scope | Re-run `/discovery-prd` (or `/task-prd` for Flow B) |
| `spec-epic-N.md` has dangerous assumptions | Edit spec directly → re-run `/epic-init` for that file only |
| Implementer signals critical ambiguity | Update `spec-epic-N.md` → resume `/task-implement` |
| QA gate fails | Return to Implementer → human decides whether to fix or defer |
| Reviewer finds spec deviation | Update spec or implementation → re-run `/task-review` |

Going back is not a failure — it is the mechanism that keeps the workflow accurate. The cost of a bad spec that flows into implementation is always higher than the cost of one extra HIL iteration.
