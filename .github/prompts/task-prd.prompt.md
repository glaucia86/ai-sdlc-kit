---
name: "task-prd"
description: "Generates PRD.md from tarefa.md using the SDD planning agent."
agent: "📐 Planner"
---

Carefully read the `doc-specs/tarefa.md` file.

Based EXCLUSIVELY on that content and the observable codebase context, generate a `doc-specs/PRD.md` file.

The `PRD.md` must contain exactly:

1. Overview
2. Objectives
3. Scope (included / not included)
4. Assumptions
5. Functional requirements
6. Non-functional requirements
7. Acceptance criteria
8. Open questions

> note: the `PRD.md` should be generated in great detail and robustness, serving as a clear and actionable guide for the entire development team. The focus should be on clarity, precision, and practical utility to guide the implementation of the step described in the task.

Rules:
- do not invent requirements;
- do not extrapolate beyond what is in `tarefa.md`;
- when there is ambiguity, record it in "Open questions";
- write in English;
- be concise, objective, and faithful to the task;
- use clear headings;
- avoid excessive bullet points.
