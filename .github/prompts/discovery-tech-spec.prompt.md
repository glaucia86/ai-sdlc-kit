---
name: "discovery-tech-spec"
description: "Reads PRD.md and generates technical-spec.md with detailed technical specification."
agent: "🏗️ Architect"
---

#file:doc-specs/PRD.md
#file:doc-specs/non-technical-spec.md

Carefully read `doc-specs/PRD.md` and `doc-specs/non-technical-spec.md`.

Based EXCLUSIVELY on these contents and the observable codebase context, generate a `doc-specs/technical-spec.md` file.

The `technical-spec.md` must contain:
1. Technical context and objective
2. Architecture decisions
3. Main components and modules
4. Contracts and interfaces (types, entities, APIs)
5. Detailed technical flows
6. Database and persistence strategy
7. Authentication and authorization strategy (if applicable)
8. Testing strategy
9. Technical acceptance criteria
10. Risks, dependencies, and points of attention
11. Open questions and ambiguities

Rules:
- do not implement production code
- ground technical decisions in the PRD and the observable codebase
- be detailed and robust
- write in English
- use TypeScript as a language reference for types and contracts

When done, notify the user that `technical-spec.md` is ready for review (mandatory HITL before proceeding to `/discovery-epics`).

---

After user approval, also create the `doc-specs/CONTEXT.md` file with the following initial content:

- Section `## Project purpose`: 2-3 sentence summary extracted from `doc-specs/idea.md`
- Section `## Stack and technical conventions`: extracted from `doc-specs/technical-spec.md` (languages, frameworks, patterns, folder structure)
- Section `## Global constraints`: extracted from `doc-specs/technical-spec.md`
- Remaining sections (`## Architecture decisions (ADRs)`, `## Completed epics`, `## Learnings and course adjustments`, `## Global-level open questions`): leave empty with the comment `<!-- to be filled during development -->`

Use the template `.github/templates/CONTEXT.template.md` as the reference structure.

Do not fill in the ADRs, completed epics, or learnings sections — they will be filled by the Ops Agent throughout the epics.
