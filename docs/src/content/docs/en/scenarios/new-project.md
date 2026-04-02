---
title: New Project
description: Complete walkthrough for starting a new project with ai-sdlc-kit, from raw idea through the end of the first epic.
---

## When to use this scenario

Use this walkthrough if you are starting a project from scratch — no codebase exists yet, and you have an idea you want to take from concept to implemented code.

---

## Before you begin

Install the kit in your project:

```bash
npx ai-sdlc-kit@latest init
```

Create your idea file:

```bash
echo "Your raw idea here" > doc-specs/idea.txt
```

Open the project in VS Code with Copilot enabled.

---

## Flow A — Discovery phase (new projects)

Flow A is the recommended starting point for new projects. It converts an unstructured idea into a fully validated spec.

### Step 1 — Refine the idea

Run `/discovery-refine` using the 🧭 Discovery agent.

Input: `idea.txt`  
Output: `idea.md`

The Discovery agent removes bias, fills structural gaps, and produces a clean, unambiguous idea document that neither over-specifies nor under-specifies the product.

**HIL-A1:** Review `idea.md`. Ask: does this capture what I actually want to build? Is anything missing? Is anything stated as a fact that is actually an assumption?

### Step 2 — Functional spec

Run `/discovery-spec` using the 🗂️ PM agent.

Input: `idea.md`  
Output: `non-technical-spec.md`

The PM agent translates the idea into structured functional requirements — what the product does, for whom, under what constraints — without making technical choices.

**HIL-A2:** Review `non-technical-spec.md`. Ask: are all the user stories complete? Are there edge cases that aren't covered?

### Step 3 — Product requirements

Run `/discovery-prd` using the 🧑‍💼 Tech Lead agent.

Input: `non-technical-spec.md`  
Output: `PRD.md`

The Tech Lead agent structures the functional spec into formal product requirements: testable acceptance criteria, prioritization, dependencies.

**HIL-A3:** Review `PRD.md`. Ask: are these requirements testable? Are the priorities correct?

### Step 4 — Technical specification

Run `/discovery-tech-spec` using the 🏗️ Architect agent.

Input: `PRD.md`  
Output: `technical-spec.md`

The Architect agent selects the stack, defines the architecture, identifies integration points, and documents all technical constraints.

**HIL-A4:** Review `technical-spec.md`. Ask: is this architecture sound? Are the stack choices appropriate? Are there constraints the agent couldn't know about?

### Step 5 — Epic breakdown

Run `/discovery-epics` using the 🏗️ Architect agent.

Input: `technical-spec.md` + `PRD.md`  
Output: `epics.md`

The Architect agent breaks the full product scope into independently deliverable epics, each ending with a testable, shippable increment.

**HIL-A5:** Review `epics.md`. Ask: are these epics independent? Is the sequencing correct? Is Epic 1 right-sized for a first delivery?

---

## Flow B — Construction phase (Epic 1)

After `epics.md` is approved, you are in the Construction phase. You will repeat Flow B for each epic.

### Step 1 — Initialize the epic spec

Run `/epic-init` using the 🏗️ Architect agent.

Input: `CONTEXT.md` + `technical-spec.md` + `epics.md`  
Output: `spec-epic-1.md`, `PRD.md` (epic-scoped), `epic-1.md`

The Architect generates the per-epic spec, the scoped PRD, and the task list for Epic 1.

**HIL-B1:** Review all three artefacts. The spec is the contract for this epic. Approve only when acceptance criteria are complete.

### Step 2 — Initialize tasks

Run `/task-init` using the 📐 Planner agent.

Input: `epic-1.md`  
Output: granular task breakdown

The Planner decomposes the epic task list into implementable units — each task focused on a single concern.

**HIL-B2:** Review the task list. Are tasks granular enough? Is anything missing?

### Step 3 — Implement each task

Run `/task-implement` using the 🛠️ Implementer agent, for each task.

Input: task description + `spec-epic-1.md` + `CONTEXT.md`  
Output: code changes + notes in `decisions-log.md` for any open decisions made

The Implementer generates code that satisfies the task's acceptance criteria. All implementation follows the spec.

### Step 4 — Write tests

Run `/task-tests` using the 🧪 QA agent.

Input: implemented code + task acceptance criteria  
Output: test suite

### Step 5 — Review

Run `/task-review` using the 🔎 Reviewer agent.

Input: implementation + spec + test results  
Output: review report

**HIL-B3/B4:** Review the report. Are all acceptance criteria satisfied? Are any flagged issues blockers?

### Step 6 — Close the epic

Run `/epic-close` using the 🚀 Ops agent.

Input: `CONTEXT.md` + implementation  
Output: `ops-epic-1.md` (deploy plan, rollback, observability)

**HIL-B5:** Approve deploy plan before merging.

### Step 7 — Sync context

Run `/context-sync` using the 🏗️ Architect agent.

Input: `CONTEXT.md` + all epic artefacts  
Output: updated `CONTEXT.md`

This step closes Epic 1 and prepares the context for Epic 2.

---

## After Epic 1

Repeat the Construction phase (Flow B) for each subsequent epic. The `CONTEXT.md` carries all decisions and context forward automatically.

Flow A is only needed once — at project start. If scope changes significantly mid-project (a strategic pivot), you may run a partial Flow A to update `technical-spec.md` and re-sequence `epics.md`.
