---
name: "epic-close"
description: "Closes the epic cycle: prepares deploy, defines observability, and records feedback for future epics."
agent: "🚀 Ops"
---

#file:doc-specs/CONTEXT.md
#file:doc-specs/epics.md

**Before starting, ask the user:** "What is the number of the epic to be closed? (e.g.: 1, 2, 3)"

Wait for the answer before continuing.

---

For the reported epic (referred to here as N, with two digits — e.g.: `01`, `02`):

Carefully read:
- `doc-specs/<N>-epic/spec-epic-<N>.md`
- `doc-specs/<N>-epic/decisions-log.md`
- `doc-specs/<N>-epic/PRD.md`

Based on these artifacts and the project's global context, generate the file `doc-specs/<N>-epic/ops-epic-<N>.md` with the following structure:

---

## 1. Delivery summary

What was implemented in this epic, objectively and traceably to the PRD.

---

## 2. Deploy preparation

### Required environment variables
List all environment variables this epic introduces or modifies.

### Infrastructure dependencies
Database, queues, storage, external services — what this epic requires.

### Recommended deploy sequence
Safe execution order: migrations, seeds, toggles, services. Identify what cannot be easily rolled back.

### Breaking changes
List changes that affect contracts with other services, clients, or future epics.

### Rollback plan
What to do if the deploy needs to be reverted.

---

## 3. Observability

### Critical logs to monitor
Which log entries indicate the epic is working correctly (and which indicate failure).

### Proposed health metrics
What to measure to ensure the implemented flows are healthy in production.

### Recommended alerts
Conditions that should trigger operational alerts.

### Production validation criteria
How to confirm, after deploy, that the epic is working as expected.

---

## 4. Recorded technical debt

What was consciously deferred in this epic, with justification.

---

## 5. Feedback for future epics

### Learnings
What this epic taught that impacts the planning of upcoming ones.

### Identified risks
What must be addressed before moving to the next epic.

### Suggested adjustments to epics.md
If the execution of this epic revealed the need to revise scope, sequence, or criteria of future epics, record it here.

---

Rules:
- base everything on what is in the epic artifacts — do not invent problems
- write in English
- use technical, objective, and actionable language
- if any section does not apply to the epic, explicitly record "Not applicable for this epic." instead of omitting it

**Pause here and notify the user that `ops-epic-<N>.md` is ready for review (mandatory HITL).**

After user approval, signal:

> **Production gate:**
> 1. Merge the branch `feat/E<NN>-<slug>` into `main`.
> 2. Run the deploy and validate in production using the criteria defined in "Production validation criteria" above.
> 3. After confirming the epic is working in production, run `/context-sync <N>` and proceed to the next epic.
