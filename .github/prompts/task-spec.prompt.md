---
name: "task-spec"
description: "Generates spec.md from PRD.md with a focus on implementation."
agent: "📐 Planner"
---

Carefully read the `doc-specs/PRD.md` file.

Based EXCLUSIVELY on the content of `PRD.md` and the observable context of the current codebase, generate a `doc-specs/spec.md` file.

The `spec.md` must contain:

1. Task context
2. Technical objective
3. Implementation scope
4. Impact on current architecture
5. Potentially affected components/files
6. Expected functional flow
7. Technical rules and constraints
8. Suggested implementation strategy
9. Testing and validation strategy
10. Technical acceptance criteria
11. Risks, dependencies, and points of attention
12. Open questions or ambiguities

> note: the `spec.md` should be generated in great detail and robustness, serving as a clear and actionable technical guide for the implementation of the step described in the PRD. The focus should be on clarity, precision, and practical utility for the developers who will implement the feature.

Rules:
- do not invent requirements;
- do not extrapolate beyond the PRD and the observable codebase;
- make questions and ambiguities explicit;
- write in English;
- use technical, objective, and actionable text;
- structure the output to serve as a direct base for implementation via Agent Mode.
