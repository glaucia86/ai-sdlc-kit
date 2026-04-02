---
name: "discovery-prd"
description: "Reads non-technical-spec.md and generates a detailed PRD.md."
agent: "🧑‍💼 Tech Lead"
---

#file:doc-specs/non-technical-spec.md

Carefully read the `doc-specs/non-technical-spec.md` file.

Based EXCLUSIVELY on that content, generate a `doc-specs/PRD.md` file.

The `PRD.md` must contain:
1. Overview
2. Objectives
3. Scope (included / not included)
4. Assumptions
5. Functional requirements
6. Non-functional requirements
7. Acceptance criteria
8. Open questions

Rules:
- do not invent requirements
- do not extrapolate beyond non-technical-spec.md
- be detailed and robust
- write in English
- use clear headings and avoid excessive bullet points

When done, notify the user that `PRD.md` is ready for review (mandatory HIL before proceeding to `/discovery-tech-spec`).
