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
- verification checklist from `spec-epic-<N>.md` — confirm all items are checked;
- assessment of `decisions-log.md` — are the recorded decisions coherent with the implementation?
- final recommendation.

Rules:
- ground the analysis in observable evidence;
- do not invent problems;
- write in English;
- use clear headings and descriptive text;
- use bullet points only when they help organize pending items.

When done, supplement `doc-specs/<N>-epic/decisions-log.md` with any decisions or technical debt identified during the review that are not yet recorded.
