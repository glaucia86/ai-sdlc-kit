# Spec — Epic <N>

## Technical context

## Technical objective

## Implementation scope

## Potentially affected files and components

## Expected technical flow

## Rules and restrictions

## Implementation strategy

## Testing strategy

### Unit tests

- **Main scenarios:** <!-- Which units of behavior should be verified in isolation? -->
- **Required input data:** <!-- Valid, invalid, and boundary values -->
- **Expected result:** <!-- What should be true after execution? -->

### Integration tests

- **Main scenarios:** <!-- Which flows between components should be verified? -->
- **Required input data:** <!-- Fixtures, database states, responses from external dependencies -->
- **Expected result:** <!-- Observable end-to-end behavior -->

### Functional tests

- **Main scenarios:** <!-- Which user journeys or API contracts should be exercised? -->
- **Required input data:** <!-- Payloads, parameters, test users -->
- **Expected result:** <!-- Externally visible output or state -->

### Required synthetic test data

<!-- Describe the data sets that need to be created or simulated to cover the scenarios above.
     Focus on: normal cases, boundary values, invalid inputs, and edge cases.
     Do not specify syntax or file format — that is the implementation's responsibility. -->

## Technical acceptance criteria

> Each criterion must be verifiable without ambiguity.
> The Implementer must check each item before triggering /task-review.
> Unchecked items block the handoff to review.

### Verification checklist

#### Functionality
- [ ] [describe expected behavior in an objective and testable way]
- [ ] [e.g.: POST /users endpoint returns 201 with body { id, email } when payload is valid]

#### Tests
- [ ] Unit tests cover the main cases described in the spec
- [ ] Integration tests cover critical flows
- [ ] No existing tests were broken by the implementation

#### Code quality
- [ ] No implicit or unsafe types introduced (per project convention)
- [ ] No dependencies not listed in technical-spec.md
- [ ] Codebase naming patterns preserved

#### Security and resilience
- [ ] Inputs validated at entry points
- [ ] Errors handled with explicit types, no silent swallowing
- [ ] No hardcoded secrets

#### Documentation
- [ ] `decisions-log.md` updated with relevant decisions from the epic
- [ ] Ambiguities found recorded in this file under the open questions section

### Blocking criteria (prevent progress even with HITL)

<!-- List here criteria whose failure must completely prevent progress -->
<!-- E.g.: "authentication cannot be bypassed in any flow" -->

## Risks and open questions
