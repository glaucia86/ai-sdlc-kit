---
title: Solo Developer
description: How a solo developer uses ai-sdlc-kit effectively, adapting HIL practices and agent roles for a team of one.
---

## When to use this scenario

Use this walkthrough if you are the only person working on the project. All agent roles are executed by the same individual, which changes the HIL dynamics but not the fundamental process.

---

## The solo developer's advantage

Solo developers benefit from ai-sdlc-kit more than large teams in some ways:

- **No coordination overhead** — you do not need to share artefacts across people; the kit's structure replaces the need for meetings about scope
- **Faster spec cycles** — you can approve artefacts as soon as you finish them (with appropriate review delay)
- **Full context** — you already know the constraints; `CONTEXT.md` captures them for the agents

The disadvantage is that the same person who frames the problem is also the person who validates the framing. This creates confirmation bias risks at HIL checkpoints.

---

## Adapting HIL checkpoints

### The 24-hour rule

Review generated artefacts 24 hours after they were created, not immediately. The fluency of AI-generated prose makes it easy to approve content you do not actually agree with. A day of distance breaks the fluency illusion.

This applies especially to:
- `idea.md` after Discovery
- `spec-epic-N.md` before Construction starts
- Review reports before merge

### Simplified HIL process for solo developers

| Checkpoint | Standard process | Solo adaptation |
|---|---|---|
| **HIL-A1** to **HIL-A5** | Team review meeting | Async self-review; use the 24-hour rule |
| **HIL-B1** (spec) | Spec review with stakeholders | Read aloud test: if you need to explain a criterion, it is not specific enough |
| **HIL-B3** (implementation) | Peer code review | Diff review against spec acceptance criteria only; not style |
| **HIL-B4** (reviewer report) | Review discussion | Fix blockers; explicitly accept or document tech debt |
| **HIL-B5** (ops) | Deploy approval by team lead | Write the rollback steps before approving — if you can't write them, the plan is incomplete |

### When to compress checkpoints

For small epics (under 5 tasks), it is acceptable to combine:
- HIL-B1 and HIL-B2 into a single review (spec + task list together)
- HIL-B3 and HIL-B4 into a single review (implementation + reviewer report together)

Do not combine HIL-A4 (technical spec) and HIL-A5 (epics). These are separate reviews of different abstraction levels.

---

## Adapting agent roles

In a team context, different humans invoke different agents. As a solo developer, you invoke all agents. The role distinction is still useful:

| Agent | What its perspective forces you to consider |
|---|---|
| 🧭 Discovery | "Am I solving the real problem, or just the first formulation of the problem?" |
| 🗂️ PM | "Am I describing what the product does for users, or how it works technically?" |
| 🧑‍💼 Tech Lead | "Are these requirements testable? Are the priorities correct?" |
| 🏗️ Architect | "Is this architecture appropriate, or is it the architecture I happen to know best?" |
| 📐 Planner | "Are these tasks independent enough to be implemented and tested separately?" |
| 🛠️ Implementer | "Am I implementing the spec, or what I wish the spec said?" |
| 🧪 QA | "Does this test prove the behavior, or just that the code runs?" |
| 🔎 Reviewer | "Does this implementation satisfy the acceptance criteria, or does it just look correct?" |
| 🚀 Ops | "Can this be safely deployed? Can it be safely rolled back?" |

Running an agent means adopting its critical perspective, not just generating its output.

---

## Recommended workflow for a solo developer

### For a new project

Follow the full [New Project](/en/scenarios/new-project/) walkthrough, with these time-boxing guidelines:

| Phase | Time budget per epoch |
|---|---|
| Flow A (Discovery → Epics) | 1–2 hours for small projects; 1–2 days for large ones |
| HIL review per checkpoint | Minimum 15 minutes; apply 24-hour rule for spec and epics |
| Flow B per epic | Varies by scope; spec review is always same-day minimum |

### For an existing project

Follow the [Existing Project](/en/scenarios/existing-project/) walkthrough. The `CONTEXT.md` population step is the highest-value investment for solo developers — it takes 1–2 hours and pays back across every subsequent agent interaction.

---

## Common solo developer mistakes

**Mistake 1 — Skipping the Discovery phase**  
Solo developers often skip Flow A because they "already know what they want to build." The Discovery phase is not for when you don't know what to build. It is for making your idea explicit enough to function as input to a spec. The spec cannot be more precise than the idea document.

**Mistake 2 — Over-compressing epics to go faster**  
The temptation to put everything in Epic 1 is real when you are the only developer and the deadline is yours. Epics that are too large cannot be reviewed coherently, and HIL checkpoints become rubber stamps by necessity. Right-size epics at 3–7 tasks.

**Mistake 3 — Using agent outputs without reading them**  
This is the fastest route to a codebase that is internally consistent but externally wrong. Every agent output requires genuine review. An AI-generated spec that you approved without reading is not a validated spec — it is a liability.
