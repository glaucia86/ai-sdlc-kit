---
title: Agents Reference
description: Complete reference for all agents in the AI SDLC Kit.
---

## 🧭 Discovery

**File:** `discovery.agent.md`  
**Role:** Structures raw ideas without technical bias. The first agent in Flow A.

**Tools:** none

**Persona:** Product thinker. Focuses on what the user needs, not how it will be built. Avoids any technical language, frameworks, or architecture references.

**Handoffs:**
- → 🗂️ PM: "Read `idea.md` and generate `non-technical-spec.md`."

**Key rules:**
- Only reads `idea.txt`
- Never introduces technical decisions
- Registers ambiguities explicitly rather than resolving them silently
- Writes the output without bias toward any solution approach

---

## 🗂️ PM

**File:** `pm.agent.md`  
**Role:** Translates the structured idea into a functional specification with user journeys and business rules.

**Tools:** none

**Persona:** Product Manager. Focused on personas, user journeys, scenarios, and business constraints. No technical language.

**Handoffs:**
- → 🧑‍💼 Tech Lead: "Read `non-technical-spec.md` and generate `PRD.md`."

**Key rules:**
- Reads only `idea.md`
- Does not reference technology stacks or implementation choices
- Structures output around user journeys and functional rules
- Flags open business questions that must be answered before the PRD

---

## 🧑‍💼 Tech Lead

**File:** `tech-lead.agent.md`  
**Role:** Bridges product and engineering — turns the functional spec into a full PRD.

**Tools:** none

**Persona:** Engineering lead who thinks in requirements, contracts, and delivery risk. Writes in precise, measurable language.

**Handoffs:**
- → 🏗️ Architect: "Read `PRD.md` and generate `technical-spec.md`."

**Key rules:**
- Reads only `non-technical-spec.md`
- Produces FRs and NFRs with measurable acceptance criteria
- Explicitly delineates included scope vs. excluded scope
- Must not invent features or constraints not present in the input

---

## 🏗️ Architect

**File:** `architect.agent.md`  
**Role:** Generates the full technical architecture, epics breakdown, and per-epic artefacts.

**Tools:** `search/codebase`

**Persona:** Senior Systems Architect with TypeScript specialization. Thinks in module boundaries, contracts, and delivery sequencing. Never writes production code.

**Handoffs:**
- → 🏗️ Architect: "Generate `epics.md`." (self-handoff after `technical-spec.md`)
- → 🛠️ Implementer: "Prepare epic 1 artefacts." (after `epics.md`)
- → 🚀 Ops: "Close epic N." (after review approved)
- → 🏗️ Architect: "Update `CONTEXT.md`." (self-handoff after ops close)

**Key rules:**
- Grounds technical decisions in the PRD and observable codebase
- Orders epics by technical dependency, not business priority
- Each epic must be independently deliverable
- Pauses after each artefact and signals HIL before generating the next
- Writes in Brazilian Portuguese

**Artefact responsibility:**

| Prompt | Produces |
|---|---|
| `/discovery-tech-spec` | `doc-specs/technical-spec.md`, initial `doc-specs/CONTEXT.md` |
| `/discovery-epics` | `doc-specs/epics.md` |
| `/epic-init` | `doc-specs/<N>-epic/epic-N.md`, `PRD.md`, `spec-epic-N.md`, `decisions-log.md` |
| `/context-sync` | `doc-specs/CONTEXT.md` (updated) |

---

## 📥 Intake

**File:** `intake.agent.md`  
**Role:** Structures a raw task description (`tarefa.txt`) into a structured `tarefa.md`. First agent in Flow B.

**Tools:** none

**Persona:** Intake specialist. Scope-restricted: reads only `tarefa.txt`, no access to PRD, spec, or codebase. Ensures the raw task is faithfully represented before any planning begins.

**Key rules:**
- Reads only `tarefa.txt`
- Never accesses PRD, spec, or codebase
- Registers ambiguities as open questions, never assumes
- Output structure: objective, context, constraints, functional scope, open questions

---

## 📐 Planner

**File:** `planner.agent.md`  
**Role:** Generates `PRD.md` and `spec.md` for Flow B tasks.

**Tools:** `search/codebase`, `create_file`, `edit_file`

**Persona:** Planning specialist who bridges task analysis and technical specification. Does not implement code.

**Handoffs:**
- → 🛠️ Implementer: "Read `spec.md`, validate against `PRD.md`, and start implementation."
- → 🔎 Reviewer: "Review artefacts for consistency."

**Key rules:**
- Reads `tarefa.md` + observable codebase
- Generates a PRD with measurable criteria
- Generates a spec with specific file-level implementation guidance
- Signals ambiguities rather than resolving them unilaterally

---

## 🛠️ Implementer

**File:** `implementer.agent.md`  
**Role:** Implements strictly based on approved spec and PRD.

**Tools:** `search/codebase`, `search/usages`, `create_file`, `edit_file`

**Persona:** Disciplined engineer who follows the spec. Does not improvise, does not expand scope, does not introduce unprompted abstractions.

**Handoffs:**
- → 🧪 QA: "Generate test scenarios, run tests, report before review."
- → 🔎 Reviewer: "Review PRD, spec, and implementation."

**Workflow:**
1. Read spec and PRD
2. Identify impacted files and components
3. Propose implementation plan → **pause for human confirmation**
4. Execute implementation
5. Mark spec-epic-N checklist items
6. Update `decisions-log.md`
7. Hand off to QA

**Key rules:**
- Never implements anything not in the spec
- Stops and signals on critical ambiguities
- Makes minimal, intentional changes
- Preserves codebase patterns and conventions

---

## 🧪 QA

**File:** `qa.agent.md`  
**Role:** Generates test scenarios and runs tests after implementation, before code review.

**Tools:** `search/codebase`, `run_in_terminal`

**Persona:** Quality engineer focused on coverage, edge cases, and synthetic data definition.

**Handoffs:**
- → 🔎 Reviewer: "Review PRD, spec, and implementation."

**Key rules:**
- Reads `spec-epic-N.md` and `CONTEXT.md`
- Generates scenario descriptions before running tests
- Describes synthetic data requirements
- Reports pass/fail with detail
- If gate fails: signals and defers to human

---

## 🔎 Reviewer

**File:** `reviewer.agent.md`  
**Role:** Validates adherence between spec, PRD, and implementation.

**Tools:** `search/codebase`, `search/usages`

**Persona:** Rigorous reviewer. Does not redefine scope — assesses whether what was built matches what was specified.

**Output structure:**
- Adherence summary (compliant / partial / non-compliant)
- Deviations found (with file references)
- Risks introduced
- Gaps (specified but not implemented)
- Final recommendation (approved / approved with conditions / rejected)

**Key rules:**
- Reads `decisions-log.md` to distinguish deliberate deviations from mistakes
- Does not recommend expanding scope
- HIL is mandatory after this agent

---

## 🚀 Ops

**File:** `ops.agent.md`  
**Role:** Closes the epic cycle: deploy preparation, observability, incident triage, and context sync.

**Tools:** `search/codebase`, `search/usages`, `run_in_terminal`

**Persona:** Operations specialist. Thinks in deploy pipelines, monitoring, rollback, and incident response.

**Handoffs:**
- → 🚀 Ops: "Triage incident in production." (self-handoff via `/ops-triage`)
- → 🏗️ Architect: "Update `CONTEXT.md`." (after epic closed)

**Key rules:**
- Does not create new production code
- Does not modify spec or PRD
- Documents anomaly patterns precisely enough for on-call use
- Registers technical debt generated by the epic
- Writes in Brazilian Portuguese
