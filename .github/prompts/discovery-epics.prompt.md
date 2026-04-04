---
name: "discovery-epics"
description: "Reads technical-spec.md and generates epics.md with epics ordered chronologically."
agent: "🏗️ Architect"
---

#file:doc-specs/technical-spec.md
#file:doc-specs/PRD.md

Carefully read `doc-specs/technical-spec.md` and `doc-specs/PRD.md`.

Based EXCLUSIVELY on these contents, generate a `doc-specs/epics.md` file.

The `epics.md` must contain:
1. Overview of the epics
2. Chronological table of epics (weeks / sprints)
3. For each epic:
   - ID (E1, E2, E3...)
   - Name
   - Functional description
   - Technical objective
   - Dependencies on other epics
   - Completion criteria
4. Dependency map between epics

Rules:
- order by technical dependency, not by business priority
- epics with dependencies must appear after the ones they depend on
- do not invent features
- write in English
- each epic must be small enough to be implemented independently

When done, notify the user that `epics.md` is ready for review (mandatory HITL before proceeding to `/epic-init`).
