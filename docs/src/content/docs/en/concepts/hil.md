---
title: Human-in-the-Loop (HIL)
description: Why HIL checkpoints exist, what they protect, and how to use them without turning them into rubber stamps.
---

## What is a HIL checkpoint?

A Human-in-the-Loop (HIL) checkpoint is a deliberate pause in the agent workflow where a human must review, validate, and explicitly approve an artefact before the workflow continues.

HIL checkpoints in ai-sdlc-kit are not suggestions. They are hard stops. No subsequent step begins until the human at the checkpoint has either:

- **Approved** — the artefact is correct and complete; continue
- **Requested changes** — specific items to fix; agent revises and resubmits
- **Rejected** — the direction is wrong; earlier assumptions must be revisited

---

## Why HIL is not optional

The common objection to HIL checkpoints is that they slow things down. The kit's position is the opposite: **skipping HIL checkpoints is what creates slowdowns**.

When an artefact is wrong and no human review catches it:

1. The wrong artefact becomes input to the next stage
2. The next stage produces output that is internally consistent but externally wrong
3. By the time the error surfaces, it has propagated across multiple artefacts
4. Correction requires revisiting every downstream artefact — which takes far longer than the original review would have

The HIL checkpoint at each gate is the mechanism that keeps errors _local_.

---

## The difference between a real HIL and a rubber stamp

A HIL checkpoint only works if the human actually reads the artefact.

Signs that a HIL checkpoint has become a rubber stamp:
- The review takes under 30 seconds for a multi-page document
- No change requests have been made in the last five checkpoints
- The human is approving content they do not fully understand

Signs of a real HIL checkpoint:
- The reviewer can articulate what would have happened if a specific item were wrong
- Change requests are specific and actionable ("update the acceptance criteria for task 3 to include error handling for 404 responses")
- Occasional rejects occur when the direction has drifted

**Process atrophy** — the gradual erosion of review quality — is the primary risk in long-running ai-sdlc-kit workflows. The kit flags warnings in agent outputs when artefacts have been approved without recorded changes across multiple consecutive epics.

---

## HIL in the Discovery flow (Flow A)

| Checkpoint | After artefact | What to verify |
|---|---|---|
| **HIL-A1** | `idea.md` | Idea captured without strategic bias; hallucinated constraints removed |
| **HIL-A2** | `non-technical-spec.md` | Functional requirements are complete; nothing critical was dropped |
| **HIL-A3** | `PRD.md` | Requirements are testable; priorities are correct |
| **HIL-A4** | `technical-spec.md` | Architecture is sound; constraints are realistic |
| **HIL-A5** | `epics.md` | Epics are independently deliverable; sequencing is correct |

---

## HIL in the Construction flow (Flow B)

| Checkpoint | After artefact | What to verify |
|---|---|---|
| **HIL-B1** | `spec-epic-N.md` + `epic-N.md` | Scope is correct; acceptance criteria are complete and testable |
| **HIL-B2** | Task list from `/task-init` | Tasks are granular; no task spans more than one concern |
| **HIL-B3** | Implementation from `/task-implement` | Spec acceptance criteria are satisfied; no divergence |
| **HIL-B4** | Review report from `/task-review` | All flagged issues addressed or explicitly accepted |
| **HIL-B5** | `ops-epic-N.md` | Deploy plan is safe; rollback is defined |

---

## What to do when you disagree with an artefact

1. Do not approve with a mental note to fix it later
2. Use "Request changes" and write the specific correction needed
3. If the issue is fundamental (the spec direction is wrong), use "Reject" and go back to the earlier artefact that led to the wrong direction

Agents in the kit are designed to handle rejection gracefully. Providing a clear reason — "the architecture assumes a monorepo but this project uses polyrepo" — gives the agent the context it needs to revise correctly.

---

## HIL and solo developers

When using ai-sdlc-kit as a solo developer, the same person who requested the artefact is also the reviewer. This creates a bias risk — it is tempting to approve your own framing.

Mitigation: **review the artefact the day after it was generated**. A 24-hour gap breaks the fluency illusion and makes it easier to see what is actually wrong.

See also: [Solo Developer Scenario](/en/scenarios/solo-dev/) for adapted HIL practices.
