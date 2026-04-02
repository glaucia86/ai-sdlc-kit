---
name: "task-tests"
description: "Generates test scenarios and synthetic data from the epic spec, runs the tests, and reports the result before triggering /task-review."
agent: "🧪 QA"
---

#file:doc-specs/CONTEXT.md

Carefully read:

- `doc-specs/CONTEXT.md` — to identify the test command configured in the project (section "Test conventions") and the test data strategy
- The `spec-epic-<N>.md` of the ongoing epic in `doc-specs/<N>-epic/` — to extract expected behaviors and acceptance criteria
- The `PRD.md` of the epic in `doc-specs/<N>-epic/` — for additional requirements context

If the implementation is part of Flow B (without an epic), read:
- `doc-specs/spec.md`
- `doc-specs/PRD.md`

---

## Step 1 — Generate test scenarios

For each verifiable behavior described in the spec, generate structured scenarios in the format:

```
**Scenario:** [descriptive name]
**Given:** [initial state or precondition]
**When:** [action performed]
**Then:** [expected and observable result]
**Type:** Unit | Integration | Functional
```

Mandatory coverage:
- Normal cases (happy path)
- Boundary values
- Invalid inputs that must be rejected
- Edge cases described or implied in the spec

## Step 2 — Describe synthetic test data

For the generated scenarios, describe the required data:
- What is a typical valid input?
- What are the boundary values (minimum, maximum, empty, null)?
- Which inputs must be rejected by the system?
- Are there data dependencies (creation order, required prior state)?

Use the test data strategy recorded in `CONTEXT.md` as a convention reference.
Describe in natural language — do not generate fixtures with file- or language-specific syntax.

## Step 3 — Run the tests

1. Locate the `### Command to run tests` field in `CONTEXT.md`.
2. **If the field is not filled:** stop here and inform the user: "The test command is not configured in `CONTEXT.md`. Please provide the command so I can continue."
3. Execute the project's test command.
4. Wait for completion and collect the result.

## Step 4 — Report result

Produce a report with:

- **Generated scenarios:** total and count by type (Unit / Integration / Functional)
- **Acceptance criteria coverage:** which items from the `spec-epic-<N>.md` checklist are covered by a scenario
- **Execution result:** total tests executed, passed, failed, not executed
- **Detailed failures (if any):** one entry per failure with: which test failed, error message, and traceability to the corresponding acceptance criterion

## QA Gate (mandatory before triggering /task-review)

At the end of the report, explicitly signal:

- If all tests passed:
  > ✅ **Gate cleared** — no test failed. You may trigger `/task-review`.

- If there are failures:
  > 🔴 **Gate blocked** — [N] test(s) failed. Fix the issues pointed out above before triggering `/task-review`. Do not proceed without explicit human validation.

- If the test command is not configured:
  > ⚠️ **Gate suspended** — test command missing in `CONTEXT.md`. Provide the command so that tests can be executed.

Rules:
- ground all scenarios in behaviors traceable to the spec;
- do not mention specific languages, frameworks, or tools beyond what is recorded in `CONTEXT.md`;
- write in English;
- do not proceed to `/task-review` without a cleared gate or explicit human approval.
