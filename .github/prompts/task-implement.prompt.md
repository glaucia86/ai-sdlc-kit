---
name: "task-implement"
description: "Starts the task implementation based on PRD.md and spec.md."
agent: "🛠️ Implementer"
---

#file:doc-specs/CONTEXT.md

Carefully read the files:

- `doc-specs/PRD.md`
- `doc-specs/spec.md`

If the implementation is part of a Flow A epic, also read:
- the `PRD.md` and `spec-epic-<N>.md` of the ongoing epic in `doc-specs/<N>-epic/`
- `doc-specs/<N>-epic/decisions-log.md`

Before modifying any file:
1. briefly summarize what will be implemented;
2. identify the main files and components potentially impacted;
3. flag any critical ambiguities.

Then start the task implementation based on `spec.md` (or `spec-epic-<N>.md`).

Rules:
- preserve the existing codebase patterns;
- make minimal and intentional changes;
- do not introduce conventions not supported by the project;
- at the end, present a summary of what was implemented, how it was validated, and what remains pending.

---

Before finishing and triggering `/task-review`:

1. Check the checklist in `spec-epic-<N>.md` (section `### Verification checklist`). Mark each verified item with `[x]`. Unverified items must be flagged with justification before proceeding.
2. Record in `doc-specs/<N>-epic/decisions-log.md` any relevant technical decision made during the implementation.
3. Only trigger `/task-review` after the checklist is fully completed.
