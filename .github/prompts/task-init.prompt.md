---
name: "task-init"
description: "Reads the raw task description and generates task.md in structured format."
agent: "📥 Intake"
---

Carefully read the `doc-specs/task.txt` file.

Based EXCLUSIVELY on that content, generate a `doc-specs/task.md` file in Markdown.

Objective:
Transform the raw task description into a clearer, organized document that is faithful to the original content.

The `task.md` must contain:
- demand context;
- main objective;
- perceived requirements;
- observable constraints and assumptions;
- open questions and ambiguities.

Rules:
- do not invent requirements;
- do not rewrite in an excessively generic way;
- preserve the meaning of the original task;
- use clear headings and descriptive text;
- use bullet points only when necessary;
- write in English.
