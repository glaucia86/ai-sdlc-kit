---
title: Existing Project
description: How to adopt ai-sdlc-kit in a project that already has code, documentation, or partial specs.
---

## When to use this scenario

Use this walkthrough when you already have a codebase and want to adopt ai-sdlc-kit for ongoing development. The project exists — you may have a README, a backlog, existing architecture decisions, or even a partial spec.

---

## Before you begin

Install the kit in your project:

```bash
npx ai-sdlc-kit@latest init
```

Do not overwrite existing documentation. The kit creates files in `doc-specs/` — a separate directory from your existing docs.

---

## Assess what you already have

The entry point depends on which artefacts already exist:

| What you have | Starting point |
|---|---|
| Raw notes / README only | Start from Step 1 — seed `idea.txt` from existing notes |
| Informal spec or PRD | Start from Step 3 — convert to structured `PRD.md` |
| Validated PRD and architecture | Start from Step 5 — generate `epics.md` from existing spec |
| Epics defined and sequenced | Go directly to Flow B — `/epic-init` |
| Active epic in progress | Go directly to `/task-init` or `/task-implement` |

---

## Step 1 — Seed the idea file (if starting from notes)

Extract the core purpose of your project from your README, onboarding docs, or institutional memory.

Write it in `doc-specs/idea.txt` as a plain-text description — no formatting required. The 🧭 Discovery agent will structure it.

Then follow steps 2–5 of the [New Project](/en/scenarios/new-project/) Flow A walkthrough.

---

## Step 2 — Create CONTEXT.md from existing knowledge

For projects with an existing codebase, the most valuable step you can take before running any agent is to populate `CONTEXT.md` manually.

Copy the template:

```bash
cp .github/templates/CONTEXT.template.md doc-specs/CONTEXT.md
```

Fill in what you already know:
- **Stack** — what is actually running (not what was planned)
- **Key decisions** — architectural choices already made and reasons
- **Constraints** — known limits (rate limits, payload caps, team agreements)
- **Glossary** — domain terms the codebase uses

The more complete this initial `CONTEXT.md` is, the better every subsequent agent output will be. Agents that read `CONTEXT.md` will not suggest replacing your stack, will not re-open closed architectural debates, and will respect your actual constraints.

---

## Step 3 — Convert existing spec to PRD.md

If you have an existing spec (Confluence page, Notion doc, Google Doc, a long README), use `/discovery-prd`:

- Copy the relevant content into `doc-specs/non-technical-spec.md`
- Run `/discovery-prd` using the 🧑‍💼 Tech Lead agent
- Output: structured `PRD.md` with testable acceptance criteria

**HITL:** Review `PRD.md` against your actual team/stakeholder understanding. The conversion may have dropped nuance or over-formalized informal agreements.

---

## Step 4 — Technical spec

If you don't have a formal technical spec but have an existing architecture:

- Use `/discovery-tech-spec` with the 🏗️ Architect agent
- Provide `PRD.md` + the current `CONTEXT.md` as context
- The agent will document the existing architecture, not invent a new one

**HITL:** Verify that the generated `technical-spec.md` reflects reality accurately. Agents that document existing code can miss nuances — especially implicit behaviors and undocumented constraints.

---

## Step 5 — Epic breakdown for remaining scope

If you are mid-project and want to apply the kit to your remaining backlog:

- Summarize completed work in `CONTEXT.md` under "Key decisions" and "Stack"
- Run `/discovery-epics` using the 🏗️ Architect agent
- Input: `technical-spec.md` + `PRD.md` (scoped to remaining scope)
- Output: `epics.md` for remaining work only

**HITL:** Ensure Epic 1 in the new `epics.md` represents work that is not already done.

---

## Step 6 — Enter the Construction phase

Once you have `CONTEXT.md`, `technical-spec.md`, and `epics.md` validated, proceed with Flow B exactly as in a new project.

See [New Project — Flow B](/en/scenarios/new-project/#flow-b-construction-phase-epic-1) for the full walkthrough.

---

## Common adoption pitfalls

**Pitfall 1 — Skipping CONTEXT.md**  
The most common mistake when adopting ai-sdlc-kit in an existing project is skipping the `CONTEXT.md` population step. Agents will make stack and architecture decisions based on what they can infer — which is less complete than what the team knows.

**Pitfall 2 — Running Flow A on an existing codebase without scoping it**  
The Discovery flow agents will generate specifications for the product as if it does not exist yet. If you have 2 years of production code, running a full Flow A without scoping to "remaining scope only" risks generating a spec that conflicts with the existing implementation.

**Pitfall 3 — Not recording past decisions in decisions-log.md**  
Decisions made before the kit was adopted are invisible to agents. Spend an hour documenting the three most important architectural decisions that were already made as ADR entries in `decisions-log.md`. This investment pays back immediately in spec quality.
