---
name: "ops-triage"
description: "Conducts structured triage of a production incident based on anomaly patterns and the playbook of the affected epic."
agent: "🚀 Ops"
---

#file:doc-specs/CONTEXT.md

**Before starting, ask the user:**

> "Describe the symptom or alert observed in production. Include: what is happening, when it started (if known), and which epic or system area is potentially affected."

Wait for the answer before continuing.

---

## Step 1 — Identify the affected epic

Based on the described symptom:

1. Read `doc-specs/CONTEXT.md` to identify the completed epics and their areas of responsibility.
2. Determine which epic (or epics) is most likely responsible for the symptom.
3. If it cannot be determined, ask the user: "Does the symptom appear to be related to which epic? (e.g.: E1 — epic name)"

For the identified epic (referred to here as N, with two digits — e.g.: `01`, `02`):

Read:
- `doc-specs/<N>-epic/ops-epic-<N>.md` — to consult anomaly patterns, triage playbook, and production validation criteria
- `doc-specs/<N>-epic/spec-epic-<N>.md` — to understand the expected behavior of the affected flows

---

## Step 2 — Map symptom and hypothesis

Based on the anomaly patterns recorded in `ops-epic-<N>.md`:

1. Identify whether the symptom matches any documented anomaly pattern.
2. If it matches: use the corresponding playbook as the main guide.
3. If it does not match: formulate a hypothesis based on the expected behavior described in the spec and the logs/metrics mentioned by the user.

Format:

```
**Reported symptom:** [summary of what the user described]
**Corresponding anomaly pattern:** [pattern name in ops-epic-<N>.md, or "Not documented"]
**Probable hypothesis:** [what likely caused the incident]
**Confidence:** High | Medium | Low
**Justification:** [why this hypothesis is plausible based on the artifacts]
```

---

## Step 3 — Propose graduated actions

Propose actions at four levels, in order:

1. **Workaround** — immediate action to limit impact without fixing the cause (e.g.: disable feature flag, redirect traffic, activate fallback)
2. **Mitigate** — reduce impact wHITLe the definitive fix is prepared (e.g.: increase timeout, limit load, enable additional cache)
3. **Fix** — definitive fix of the root cause
4. **Prevent** — structural change to prevent the incident from recurring (e.g.: add test, improve alert, adjust playbook)

If the `ops-epic-<N>.md` playbook already describes actions for the symptom, use it as a base and supplement if necessary.

---

## Step 4 — Record the triage

Record the triage result in `doc-specs/<N>-epic/incident-log.md`.
If the file does not exist, create it with the following structure:

```markdown
# Incident Log — Epic <N>

> Record of production incidents related to this epic.
> Updated by the Ops Agent via /ops-triage.

---
```

Add a new entry with the following format:

```markdown
## Incident — [date: YYYY-MM-DD] — [short title]

- **Reported symptom:** [symptom description]
- **Hypothesis:** [identified hypothesis]
- **Confidence:** High | Medium | Low
- **Corresponding anomaly pattern:** [name or "Not documented"]
- **Proposed actions:**
  - Workaround: [action]
  - Mitigate: [action]
  - Fix: [action]
  - Prevent: [action]
- **Status:** Under investigation | Mitigated | Resolved | Closed
- **Notes:** [any additional relevant information]
```

---

## Step 5 — Signal next steps

At the end, inform the user:

1. Whether the playbook was sufficient to guide the triage.
2. Whether the incident revealed a gap in the playbook — and that the playbook in `ops-epic-<N>.md` should be updated with the new symptom.
3. Whether the root cause requires a new task or epic for a permanent fix — and that this should be recorded in `doc-specs/epics.md` as technical debt.

Rules:
- base all analysis on the epic artifacts — do not invent hypotheses without grounds
- do not execute actions in production; only propose and document
- write in English
- use technical, objective, and actionable language
- if there is insufficient information for a hypothesis, explicitly flag it and ask the user for more context
