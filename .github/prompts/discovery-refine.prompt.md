---
name: "discovery-refine"
description: "Reads idea.txt, refines the original idea, and generates idea.md."
agent: "🧭 Discovery"
---

Carefully read the `doc-specs/idea.txt` file.

Based EXCLUSIVELY on that content, generate a `doc-specs/idea.md` file.

The `idea.md` must contain:
1. Summary of the original idea (faithful to what was written)
2. Problem the idea solves
3. Perceived target audience
4. Main expected value
5. Perceived features (without technical bias)
6. Identified business rules
7. Suggested improvements and refinements (justified)
8. Open questions

Rules:
- do not mention technology, stack, or architecture
- do not invent features
- preserve the original intent
- write in English
- use clear headings and descriptive text

When done, notify the user that `idea.md` is ready for review (mandatory HIL before proceeding to `/discovery-spec`).
