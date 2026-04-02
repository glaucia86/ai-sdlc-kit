---
title: Quick Start
description: Run your first AI SDLC Kit discovery in under 5 minutes.
---

This guide walks you through the very first step of Flow A — taking a raw idea and turning it into a structured document using the 🧭 Discovery agent.

## Step 1 — Create your idea file

Inside the `doc-specs/` folder, create a file called `idea.txt`:

```
doc-specs/idea.txt
```

Write your idea freely — no required format, no structure. The kit exists to organize it for you. For example:

```
I want to build a task management app where developers can track
their daily work items. It should be simple, keyboard-friendly,
and integrate with GitHub Issues so tasks can be linked to real issues.

It should work as a web app and optionally sync offline.
```

---

## Step 2 — Run `/discovery-refine`

Open the GitHub Copilot Chat panel and run:

```
/discovery-refine
```

The 🧭 Discovery agent reads `idea.txt` and generates `doc-specs/idea.md`.

**What happens:**
- The agent preserves your original idea faithfully — it does not add features or technical decisions
- It structures the idea into sections: problem statement, target users, key scenarios, explicit ambiguities
- If anything is unclear, the agent registers open questions rather than assuming

---

## Step 3 — Review `idea.md` (HIL checkpoint)

Open `doc-specs/idea.md` and review:

- Was the original idea preserved accurately?
- Are ambiguities clearly flagged?
- Did the agent invent anything that wasn't in `idea.txt`?

If something is off, adjust `idea.txt` and re-run `/discovery-refine`. **Do not advance until this is good.**

---

## What to expect as output

`doc-specs/idea.md` will contain a structured version of your idea, typically organized as:

| Section | Contents |
|---|---|
| **Problem** | What problem the idea solves |
| **Target users** | Who benefits from the solution |
| **Key scenarios** | The most important user journeys |
| **Out of scope** | What is explicitly not included |
| **Open questions** | Ambiguities that must be resolved before going further |

---

## Next steps

After validating `idea.md`, continue with the full Discovery phase:

1. `/discovery-spec` — PM agent generates `non-technical-spec.md`
2. `/discovery-prd` — Tech Lead agent generates `PRD.md`
3. `/discovery-tech-spec` — Architect agent generates `technical-spec.md`
4. `/discovery-epics` — Architect agent generates `epics.md`

See the [Discovery Phase guide](/ai-sdlc-kit/en/guide/discovery-phase/) for the complete walkthrough.
