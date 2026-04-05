---
name: "agents-init"
description: "Creates the initial repository AGENTS.md with Progressive Disclosure."
agent: "📐 Planner"
---

Carefully read:
- `doc-specs/PRD.md`
- the current codebase

Based EXCLUSIVELY on these inputs, generate a minimalist and stable `AGENTS.md` file for the project root.

Mandatory principles:
- the root AGENTS.md must be short, stable, and minimalist;
- this file must be created at the project root, even if the content is minimal;
- document only the global agent behavior;
- do not turn the file into a large document;
- use progressive disclosure;
- direct specialized instructions to secondary files when necessary;
- do not document deep structures, unstable paths, or unnecessary details.

The `AGENTS.md` must contain:
- a one-sentence project purpose;
- global agent behavior (do / don't);
- clear agent boundaries;
- a "Specialized files" section with links to supplementary content, if necessary.

Rules:
- do not invent patterns;
- do not introduce conventions not reflected in the project;
- document behavior, not implementation;
- write in English.
