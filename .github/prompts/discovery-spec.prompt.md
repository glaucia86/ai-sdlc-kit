---
name: "discovery-spec"
description: "Reads idea.md and generates non-technical-spec.md with detailed functional specification."
agent: "🗂️ PM"
---

#file:doc-specs/idea.md

Carefully read the `doc-specs/idea.md` file.

Based EXCLUSIVELY on that content, generate a `doc-specs/non-technical-spec.md` file.

The `non-technical-spec.md` must contain:
1. Product vision
2. Personas and target audience
3. Main user journeys
4. Detailed use cases
5. Explicit business rules
6. Expected functional flows
7. Functional acceptance criteria
8. Constraints and assumptions
9. Open questions

Rules:
- do not mention technology, databases, APIs, or code
- be detailed and robust
- do not invent requirements
- write in English
- use clear headings and descriptive text

When done, notify the user that `non-technical-spec.md` is ready for review (mandatory HIL before proceeding to `/discovery-prd`).
