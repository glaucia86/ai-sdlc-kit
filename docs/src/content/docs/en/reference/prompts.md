---
title: Prompts Reference
description: Complete reference for all prompts in the AI SDLC Kit.
---

## Discovery prompts (Flow A)

| Command | File | Agent | Reads | Produces | HITL after? |
|---|---|---|---|---|---|
| `/discovery-refine` | `discovery-refine.prompt.md` | 🧭 Discovery | `idea.txt` | `idea.md` | ✅ Required |
| `/discovery-spec` | `discovery-spec.prompt.md` | 🗂️ PM | `idea.md` | `non-technical-spec.md` | ✅ Required |
| `/discovery-prd` | `discovery-prd.prompt.md` | 🧑‍💼 Tech Lead | `non-technical-spec.md` | `PRD.md` | ✅ Required |
| `/discovery-tech-spec` | `discovery-tech-spec.prompt.md` | 🏗️ Architect | `PRD.md` + codebase | `technical-spec.md`, `CONTEXT.md` | ✅ Required |
| `/discovery-epics` | `discovery-epics.prompt.md` | 🏗️ Architect | `technical-spec.md` | `epics.md` | ✅ Required |

---

## Epic prompts (Flow A)

| Command | File | Agent | Reads | Produces | HITL after? |
|---|---|---|---|---|---|
| `/epic-init` | `epic-init.prompt.md` | 🏗️ Architect | `epics.md`, `technical-spec.md`, `CONTEXT.md` | `epic-N.md`, `PRD.md`, `spec-epic-N.md`, `decisions-log.md` | ✅ Required (3×) |
| `/epic-close` | `epic-close.prompt.md` | 🚀 Ops | `spec-epic-N.md`, `PRD.md`, `decisions-log.md`, `CONTEXT.md` | `ops-epic-N.md` | ✅ Required |
| `/context-sync` | `context-sync.prompt.md` | 🏗️ Architect | `ops-epic-N.md`, `decisions-log.md` | `CONTEXT.md` (updated) | — |

---

## Task prompts (Flow B — Direct Delivery)

| Command | File | Agent | Reads | Produces | HITL after? |
|---|---|---|---|---|---|
| `/task-init` | `task-init.prompt.md` | 📥 Intake | `tarefa.txt` | `tarefa.md` | ✅ Required |
| `/task-prd` | `task-prd.prompt.md` | 📐 Planner | `tarefa.md` | `PRD.md` | ✅ Required |
| `/task-spec` | `task-spec.prompt.md` | 📐 Planner | `PRD.md` + codebase | `spec.md` | ✅ Required |

---

## Implementation prompts (Flow A and B)

| Command | File | Agent | Reads | Produces | HITL after? |
|---|---|---|---|---|---|
| `/task-implement` | `task-implement.prompt.md` | 🛠️ Implementer | `spec.md` / `spec-epic-N.md`, `PRD.md`, `CONTEXT.md` | Implementation + checklist + `decisions-log.md` | ⚠️ Recommended (plan) |
| `/task-implement-frontend` | `task-implement-frontend.prompt.md` | 🛠️ Implementer | Same as above | Same as above + design/accessibility compliance | ⚠️ Recommended (plan) |
| `/task-tests` | `task-tests.prompt.md` | 🧪 QA | `spec-epic-N.md`, `CONTEXT.md` | Test report | ⛔ HITL if gate fails |
| `/task-review` | `task-review.prompt.md` | 🔎 Reviewer | `PRD.md`, `spec.md`, implementation, `decisions-log.md` | Review report | ✅ Required |

---

## Utility prompts

| Command | File | Agent | Reads | Produces | When to use |
|---|---|---|---|---|---|
| `/agents-init` | `agents-init.prompt.md` | 📐 Planner | Codebase | `AGENTS.md` | Once per project to establish Copilot guidance |
| `/ops-triage` | `ops-triage.prompt.md` | 🚀 Ops | `ops-epic-N.md`, `CONTEXT.md` | `incident-log.md` entry | When a production incident is observed |

---

## Prompt input/output summary

```
Flow A
──────
idea.txt
   → /discovery-refine    → idea.md
   → /discovery-spec      → non-technical-spec.md
   → /discovery-prd       → PRD.md
   → /discovery-tech-spec → technical-spec.md + CONTEXT.md
   → /discovery-epics     → epics.md
   → /epic-init <N>       → doc-specs/<N>-epic/{epic-N.md, PRD.md, spec-epic-N.md, decisions-log.md}
   → /task-implement      → code + checklist + decisions-log.md
   → /task-tests          → test report
   → /task-review         → review report
   → /epic-close <N>      → ops-epic-N.md
   → /context-sync <N>    → CONTEXT.md (updated)
   → repeat from /epic-init for next epic

Flow B
──────
tarefa.txt
   → /task-init      → tarefa.md
   → /task-prd       → PRD.md
   → /task-spec      → spec.md
   → /task-implement → code + decisions-log.md
   → /task-tests     → test report
   → /task-review    → review report
```
