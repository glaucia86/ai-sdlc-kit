---
title: Referência de Prompts
description: Referência completa de todos os prompts do AI SDLC Kit.
---

## Prompts de Discovery (Flow A)

| Comando | Arquivo | Agente | Lê | Produz | HITL após? |
|---|---|---|---|---|---|
| `/discovery-refine` | `discovery-refine.prompt.md` | 🧭 Discovery | `idea.txt` | `idea.md` | ✅ Obrigatório |
| `/discovery-spec` | `discovery-spec.prompt.md` | 🗂️ PM | `idea.md` | `non-technical-spec.md` | ✅ Obrigatório |
| `/discovery-prd` | `discovery-prd.prompt.md` | 🧑‍💼 Tech Lead | `non-technical-spec.md` | `PRD.md` | ✅ Obrigatório |
| `/discovery-tech-spec` | `discovery-tech-spec.prompt.md` | 🏗️ Architect | `PRD.md` + codebase | `technical-spec.md`, `CONTEXT.md` | ✅ Obrigatório |
| `/discovery-epics` | `discovery-epics.prompt.md` | 🏗️ Architect | `technical-spec.md` | `epics.md` | ✅ Obrigatório |

---

## Prompts de Epic (Flow A)

| Comando | Arquivo | Agente | Lê | Produz | HITL após? |
|---|---|---|---|---|---|
| `/epic-init` | `epic-init.prompt.md` | 🏗️ Architect | `epics.md`, `technical-spec.md`, `CONTEXT.md` | `epic-N.md`, `PRD.md`, `spec-epic-N.md`, `decisions-log.md` | ✅ Obrigatório (3×) |
| `/epic-close` | `epic-close.prompt.md` | 🚀 Ops | `spec-epic-N.md`, `PRD.md`, `decisions-log.md`, `CONTEXT.md` | `ops-epic-N.md` | ✅ Obrigatório |
| `/context-sync` | `context-sync.prompt.md` | 🏗️ Architect | `ops-epic-N.md`, `decisions-log.md` | `CONTEXT.md` (atualizado) | — |

---

## Prompts de Tarefa (Flow B — Entrega Direta)

| Comando | Arquivo | Agente | Lê | Produz | HITL após? |
|---|---|---|---|---|---|
| `/task-init` | `task-init.prompt.md` | 📥 Intake | `tarefa.txt` | `tarefa.md` | ✅ Obrigatório |
| `/task-prd` | `task-prd.prompt.md` | 📐 Planner | `tarefa.md` | `PRD.md` | ✅ Obrigatório |
| `/task-spec` | `task-spec.prompt.md` | 📐 Planner | `PRD.md` + codebase | `spec.md` | ✅ Obrigatório |

---

## Prompts de Implementação (Flow A e B)

| Comando | Arquivo | Agente | Lê | Produz | HITL após? |
|---|---|---|---|---|---|
| `/task-implement` | `task-implement.prompt.md` | 🛠️ Implementer | `spec.md` / `spec-epic-N.md`, `PRD.md`, `CONTEXT.md` | Implementação + checklist + `decisions-log.md` | ⚠️ Recomendado (plano) |
| `/task-implement-frontend` | `task-implement-frontend.prompt.md` | 🛠️ Implementer | Igual ao acima | Igual ao acima + conformidade de design/acessibilidade | ⚠️ Recomendado (plano) |
| `/task-tests` | `task-tests.prompt.md` | 🧪 QA | `spec-epic-N.md`, `CONTEXT.md` | Relatório de testes | ⛔ HITL se portão falhar |
| `/task-review` | `task-review.prompt.md` | 🔎 Reviewer | `PRD.md`, `spec.md`, implementação, `decisions-log.md` | Relatório de revisão | ✅ Obrigatório |

---

## Prompts utilitários

| Comando | Arquivo | Agente | Lê | Produz | Quando usar |
|---|---|---|---|---|---|
| `/agents-init` | `agents-init.prompt.md` | 📐 Planner | Codebase | `AGENTS.md` | Uma vez por projeto para estabelecer orientações do Copilot |
| `/ops-triage` | `ops-triage.prompt.md` | 🚀 Ops | `ops-epic-N.md`, `CONTEXT.md` | Entrada em `incident-log.md` | Quando um incidente de produção é observado |

---

## Resumo de entradas/saídas dos prompts

```
Flow A
──────
idea.txt
   → /discovery-refine    → idea.md
   → /discovery-spec      → non-technical-spec.md
   → /discovery-prd       → PRD.md
   → /discovery-tech-spec → technical-spec.md + CONTEXT.md
   → /discovery-epics     → epics.md
   → /epic-init <N>       → doc-specs/<N>-epic/{epic-N.md, PRD.md, spec-epic-N.md, decisions-log.md}
   → /task-implement      → código + checklist + decisions-log.md
   → /task-tests          → relatório de testes
   → /task-review         → relatório de revisão
   → /epic-close <N>      → ops-epic-N.md
   → /context-sync <N>    → CONTEXT.md (atualizado)
   → repetir a partir de /epic-init para o próximo epic

Flow B
──────
tarefa.txt
   → /task-init      → tarefa.md
   → /task-prd       → PRD.md
   → /task-spec      → spec.md
   → /task-implement → código + decisions-log.md
   → /task-tests     → relatório de testes
   → /task-review    → relatório de revisão
```
