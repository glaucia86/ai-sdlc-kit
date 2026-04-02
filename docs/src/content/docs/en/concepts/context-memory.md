---
title: Context Memory
description: How CONTEXT.md and decisions-log.md maintain coherent project memory across epics, agents, and conversations.
---

## The context problem in AI workflows

Every conversation with an AI agent starts fresh. The agent has no memory of the previous epic, no knowledge of decisions made three weeks ago, and no awareness of the constraints discovered during implementation.

Without a solution to this problem, each epic is effectively a new project. The agent has to be re-briefed every time, and the risk of inconsistency compounds with each epic.

ai-sdlc-kit solves this with two structured context documents that every agent reads at the start of every session.

---

## CONTEXT.md — the live project memory

`CONTEXT.md` is the single source of truth for the project's current state. It is generated from the template in `.github/templates/CONTEXT.template.md` and updated by the 🏗️ Architect and `/context-sync` prompt after each epic closes.

### What CONTEXT.md contains

| Section | Contents |
|---|---|
| **Project summary** | One-paragraph description; scope, goals, non-goals |
| **Current epic** | Which epic is active; what phase (spec / build / ops) |
| **Stack** | Languages, frameworks, services, infrastructure |
| **Key decisions** | Architectural choices made and why (from `decisions-log.md`) |
| **Constraints** | Hard limits: performance budgets, dependency restrictions, team agreements |
| **Glossary** | Domain terms that appear in spec and code |
| **Open questions** | Unresolved items flagged for the next HIL checkpoint |

### Why all agents read CONTEXT.md first

The `CONTEXT.md` is referenced by every agent and every prompt as the first `include:` in their frontmatter. This means that:

- The Implementer knows what framework is in use without being told
- The Reviewer knows what decisions are already closed
- The Ops agent knows the deploy target and rollback strategy
- The Planner knows the scope boundary of the current epic

Without this shared context, each agent would have to infer these facts from the code — and inferences can be wrong.

---

## decisions-log.md — the append-only ADR record

`decisions-log.md` is an Architecture Decision Record (ADR) log. Unlike `CONTEXT.md`, which is a current-state snapshot, `decisions-log.md` is append-only: entries are never deleted, only superseded.

### When an entry is added

- An architectural decision is made (e.g., "We will use Postgres, not SQLite")
- A constraint is discovered (e.g., "The API endpoint has a 5 MB payload limit")
- A previous decision is reversed (e.g., "We are switching from Postgres to PlanetScale; see ADR-007")
- A trade-off is accepted (e.g., "We are not adding caching in Epic 3 because scope is fixed")

### Entry format (from the template)

```markdown
### ADR-001 — [Short title]

**Date:** YYYY-MM-DD  
**Status:** Accepted | Superseded by ADR-XXX  
**Context:** Why was this decision needed?  
**Decision:** What was decided?  
**Consequences:** What changes as a result?  
```

---

## How context memory is maintained across epics

```
Epic N closes
    │
    ▼
/epic-close prompt
    │
    ▼
Ops agent generates ops-epic-N.md
    │
    ▼
Human approves → merge
    │
    ▼
/context-sync prompt
    │
    ▼
Architect reads:
  - CONTEXT.md (current)
  - decisions-log.md
  - spec-epic-N.md
  - ops-epic-N.md
    │
    ▼
Architect updates CONTEXT.md:
  - Current epic → Epic N+1
  - Key decisions → appended
  - Open questions → resolved or carried forward
    │
    ▼
Updated CONTEXT.md committed
    │
    ▼
Epic N+1 begins
    └── All agents read updated CONTEXT.md
```

---

## What breaks without context memory

| Missing context | What goes wrong |
|---|---|
| Stack not recorded | Agent suggests a new dependency that conflicts with existing choices |
| Key decision not recorded | Agent re-opens a closed decision and generates divergent code |
| Constraints not recorded | Agent produces an implementation that violates a known limit |
| Glossary not recorded | Agent uses a different term for the same concept; specs become inconsistent |
| Open questions not carried | Critical unresolved items are silently dropped |

The `CONTEXT.md` is cheap to maintain — the `/context-sync` prompt automates most of the update. The cost of not maintaining it grows exponentially with project length.

---

## Context memory and multiple agents

In a typical ai-sdlc-kit session, the same `CONTEXT.md` is implicitly shared across all agents via the VS Code include system. When any agent runs a prompt that includes `CONTEXT.md`, the agent has the same project knowledge as every other agent that ran the same include.

This is the closest approximation to a shared memory system within constraints of stateless AI conversations.

For long projects (more than 5 epics), it is worth reviewing `CONTEXT.md` at the start of each Inception sub-cycle to ensure the project summary and stack sections are still accurate. The Architect agent can perform this review as part of `/epic-init`.
