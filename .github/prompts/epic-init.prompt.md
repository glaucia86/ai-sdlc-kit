---
name: "epic-init"
description: "Prepares specification artifacts for a specific epic within doc-specs/<N>-epic/."
agent: "🏗️ Architect"
---

#file:doc-specs/CONTEXT.md
#file:doc-specs/epics.md
#file:doc-specs/technical-spec.md
#file:doc-specs/PRD.md

**Before starting, ask the user:** "What is the number of the epic to be prepared? (e.g.: 1, 2, 3)"

Wait for the answer before continuing.

---

For the reported epic (referred to here as N, with two digits — e.g.: `01`, `02`):

1. Create the folder `doc-specs/<N>-epic/`.

2. Generate the following files within that folder:

### `doc-specs/<N>-epic/epic-<N>.md`
Detailed description of the epic:
- context and objective
- scope (what is included and what is not)
- dependencies on previous epics
- completion criteria

**Pause here and notify the user that `epic-<N>.md` is ready for review (mandatory HIL).**

### `doc-specs/<N>-epic/PRD.md`
Epic-specific PRD:
- epic overview
- objectives
- epic functional requirements
- epic non-functional requirements
- acceptance criteria
- open questions

**Pause here and notify the user that the epic `PRD.md` is ready for review (mandatory HIL).**

### `doc-specs/<N>-epic/spec-epic-<N>.md`
Epic technical specification:
- technical context
- technical objective
- implementation scope
- potentially affected files and components
- expected technical flow
- rules and constraints
- implementation strategy
- testing strategy
- technical acceptance criteria
- risks and open questions

**Pause here and notify the user that `spec-epic-<N>.md` is ready for review (mandatory HIL).**

---

Rules:
- do not implement production code
- ground everything in epics.md and technical-spec.md
- flag ambiguities instead of assuming decisions
- write in English
- wait for user confirmation after each file before generating the next

Before generating the artifacts, check whether the branch `feat/E<NN>-<slug>` has been created for this epic. If not, notify the user:

> **Prerequisite:** Create the following branch before starting implementation:
> `git checkout -b feat/E<NN>-<slug-of-epic>`
> Where `<NN>` is the epic number with two digits and `<slug>` is a short kebab-case identifier.

---

After generating `doc-specs/<N>-epic/spec-epic-<N>.md`, also create the file `doc-specs/<N>-epic/decisions-log.md` with the structure from `.github/templates/decisions-log.template.md` (empty, just the structure ready to be filled in during implementation).

**Pause here and notify the user that `decisions-log.md` has been created and is ready for use during implementation.**

---

After all HILs are approved, inform the user that the epic artifacts are ready and that implementation can be started with `/task-implement`, pointing manually to the files `doc-specs/<N>-epic/PRD.md` and `doc-specs/<N>-epic/spec-epic-<N>.md`.
