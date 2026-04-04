---
name: "task-review"
description: "Reviews adherence between PRD.md, spec.md, and implementation."
agent: "🔎 Reviewer"
---

#file:doc-specs/CONTEXT.md

Carefully read the files:

- `doc-specs/PRD.md`
- `doc-specs/spec.md`

If the review is part of a Flow A epic, also read:
- the `PRD.md` and `spec-epic-<N>.md` of the ongoing epic in `doc-specs/<N>-epic/`
- `doc-specs/<N>-epic/decisions-log.md`

Also consider the modified files from the current implementation.

Conduct a structured review covering:
- adherence between PRD, spec, and implementation;
- relevant deviations;
- risks and points of attention;
- gaps;
- final recommendation.

Rules:
- ground the analysis in observable evidence;
- do not invent problems;
- write in English;
- use clear headings and descriptive text;
- use bullet points only when they help organize pending items.

---

When done:

- If the review is part of a Flow A epic:
  1. Confirm the checklist in `spec-epic-<N>.md` (section `### Verification checklist`) is fully verified. All items must be marked `[x]`; flag any unverified items with justification.
  2. Assess whether the recorded decisions in `doc-specs/<N>-epic/decisions-log.md` are coherent with the implementation.
  3. Supplement `doc-specs/<N>-epic/decisions-log.md` with any decisions or technical debt identified during the review that are not yet recorded.

- If the review is **not** part of a Flow A epic (Flow B / no epic):
  1. Validate the acceptance criteria and any verification checklist defined in `doc-specs/spec.md`. Flag any unmet criteria with justification.
  2. You do not need to update an epic decisions log in this flow.
