---
name: "context-sync"
description: "Updates CONTEXT.md with ADRs, learnings, and closed epic after closure and production validation."
agent: "🏗️ Architect"
---

#file:doc-specs/CONTEXT.md

**Before starting, ask the user:** "What is the number of the epic that was closed and validated in production? (e.g.: 1, 2, 3)"

Wait for the answer before continuing.

---

For the reported epic (referred to here as N, with two digits — e.g.: `01`, `02`):

Carefully read:
- `doc-specs/<N>-epic/ops-epic-<N>.md`
- `doc-specs/<N>-epic/decisions-log.md`

Based on these artifacts, update `doc-specs/CONTEXT.md` following the steps below:

---

### Step 1 — Record the completed epic

In the `## Completed epics` section, add a new entry:

```
- E<N> — [Epic name] | Completed on: YYYY-MM-DD | Notes: [one-sentence summary]
```

---

### Step 2 — Record ADRs

In the `## Architecture decisions (ADRs)` section, extract and record all relevant decisions found in `decisions-log.md` that are not yet in `CONTEXT.md`. Use the format:

```
### ADR-<sequential> — [Title] | Date: YYYY-MM-DD | Status: Accepted
[Decision summary in 2-3 sentences]
```

---

### Step 3 — Record learnings

In the `## Learnings and course adjustments` section, add the learnings identified in `ops-epic-<N>.md` that impact future epics.

---

### Step 4 — Update open questions

In the `## Global-level open questions` section, add or resolve questions based on what was discovered during this epic.

---

### Step 5 — Update global constraints

In the `## Global constraints` section, add any new constraint identified during the implementation or operation of this epic.

---

Rules:
- **NEVER remove existing content from `CONTEXT.md`** — only append or update
- Keep the file format and structure intact
- Write in the same language the user is using.
- If a section already contains the relevant information, do not duplicate — only update if there is a change

**When done, notify the user that `CONTEXT.md` has been updated and that the kit is ready to start the next epic with `/epic-init <N+1>`.**
