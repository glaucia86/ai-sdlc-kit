---
name: "task-implement-frontend"
description: "Starts the implementation of frontend tasks based on PRD.md and spec.md, applying design and accessibility guidelines."
agent: "🛠️ Implementer"
---

#file:doc-specs/PRD.md
#file:doc-specs/spec.md
#file:.github/skills/frontend-design/SKILL.md
#file:.github/skills/web-design-guidelines/SKILL.md

Carefully read the specification artifacts and design guidelines above.

Before modifying any file:
1. briefly summarize what will be implemented;
2. identify the main files and components potentially impacted;
3. flag any critical ambiguities.

Then start the task implementation based on `spec.md`, applying the design and accessibility guidelines from the loaded skills.

Rules:
- preserve the existing codebase patterns;
- make minimal and intentional changes;
- do not introduce conventions not supported by the project;
- apply frontend-design and web-design-guidelines directives to all UI decisions;
- at the end, present a summary of what was implemented, how it was validated, and what remains pending.
