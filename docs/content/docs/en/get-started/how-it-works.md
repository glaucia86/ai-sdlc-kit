---
title: How It Works
description: The full flow of the AI SDLC Kit — from idea to production.
---

## The full flow

The AI SDLC Kit organizes development into two independent flows that share the same implementation and review pipeline.

```
┌─────────────────────────────────────────────────────────────────┐
│  FLOW A — Discovery + Delivery (for new projects / raw ideas)   │
│                                                                 │
│  idea.txt                                                       │
│     ↓                                                           │
│  /discovery-refine   → HITL ✅ review idea.md                   │
│     ↓                                                           │
│  /discovery-spec     → HITL ✅ review non-technical-spec.md      │
│     ↓                                                           │
│  /discovery-prd      → HITL ✅ review PRD.md                     │
│     ↓                                                           │
│  /discovery-tech-spec → HITL ✅ review technical-spec.md         │
│     ↓                                                           │
│  /discovery-epics    → HITL ✅ review epics.md                   │
│     ↓  (per epic)                                               │
│  /epic-init <N>      → HITL ✅ epic-N.md, PRD.md, spec-epic-N.md │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
│     ↓                                                           │
│  /epic-close <N> → merge → deploy → /context-sync <N>          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLOW B — Direct Delivery (for defined tasks)                   │
│                                                                 │
│  tarefa.txt                                                     │
│     ↓                                                           │
│  /task-init   → HITL ✅ review tarefa.md                         │
│     ↓                                                           │
│  /task-prd    → HITL ✅ review PRD.md                            │
│     ↓                                                           │
│  /task-spec   → HITL ✅ review spec.md                           │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
└─────────────────────────────────────────────────────────────────┘
```

Neither flow is a prerequisite of the other.

---

## The golden rule

> **Without a human-validated spec, no implementation starts.**

This is the central principle. Every implementation in the kit — whether for a single task (Flow B) or an epic (Flow A) — requires a human-approved spec document before the Implementer agent is invoked.

This rule exists because AI agents are excellent at producing plausible-sounding specifications and code, but they do not carry the product context, risk tolerance, or domain knowledge that a human has. The spec is the contract between human intent and AI execution.

---

## The role of Human in the Loop

HITL (Human in the Loop) checkpoints are **mandatory**, not optional. They appear after every generated artefact that materially shapes what will be built.

| Artefact | Why HITL matters here |
|---|---|
| `idea.md` | Ensures the idea was not distorted during structuring |
| `non-technical-spec.md` | Validates user journeys and business rules |
| `PRD.md` | Confirms scope boundaries and acceptance criteria |
| `technical-spec.md` | Validates architecture decisions and risk assessment |
| `epics.md` | Confirms sequencing and epic boundaries |
| `spec-epic-N.md` | **Gate before implementation** — the most critical HITL |

At each checkpoint, a human answers: _Is this document accurate enough to drive the next step?_ If the answer is no, the document is revised before proceeding.

---

## Discovery phase vs. Spec phase

| | Discovery | Spec (per epic) |
|---|---|---|
| **Starting point** | `idea.txt` — raw, unstructured | `epics.md` — already structured |
| **Output** | `technical-spec.md` + `epics.md` | `spec-epic-N.md` per epic |
| **Scale** | Project-wide thinking | Single deliverable |
| **Who drives it** | Discovery, PM, Tech Lead, Architect agents | Architect agent alone |
| **Frequency** | Once per project (or major phase) | Once per epic |

Discovery answers: _What are we building and why?_
The Spec phase answers: _How exactly do we build epic N?_

---

## Agent responsibilities at a glance

| Agent | Role |
|---|---|
| 🧭 Discovery | Structures raw ideas without technical bias |
| 🗂️ PM | Translates idea into functional spec (user journeys, business rules) |
| 🧑‍💼 Tech Lead | Produces the PRD from the functional spec |
| 🏗️ Architect | Generates `technical-spec.md`, `epics.md`, and per-epic artefacts |
| 📥 Intake | Structures a raw task description (`tarefa.txt`) into `tarefa.md` |
| 📐 Planner | Generates `PRD.md` and `spec.md` for Flow B tasks |
| 🛠️ Implementer | Implements strictly based on approved spec and PRD |
| 🧪 QA | Generates test scenarios and executes tests before review |
| 🔎 Reviewer | Validates adherence between spec and implementation |
| 🚀 Ops | Closes the epic: deploy prep, observability, context sync |

---

## Context memory

The kit maintains a `doc-specs/CONTEXT.md` file that accumulates knowledge across epics. After each epic closes, the 🏗️ Architect agent updates this file via `/context-sync <N>` with:

- completed epic summary
- architectural decision records (ADRs) from `decisions-log.md`
- risks and lessons that affect future epics

All agents read `CONTEXT.md` before acting on any epic, ensuring continuity across the lifecycle.
