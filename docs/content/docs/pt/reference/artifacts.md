---
title: Referência de Artefatos
description: Todos os artefatos gerados pelo AI SDLC Kit — quem os cria, quem os lê e quando.
---

## Artefatos de Discovery (Flow A)

| Artefato | Localização | Criado por | Lido por | Quando |
|---|---|---|---|---|
| `idea.md` | `doc-specs/idea.md` | 🧭 Discovery (`/discovery-refine`) | 🗂️ PM | Após `idea.txt` estar pronto |
| `non-technical-spec.md` | `doc-specs/non-technical-spec.md` | 🗂️ PM (`/discovery-spec`) | 🧑‍💼 Tech Lead | Após `idea.md` aprovado |
| `PRD.md` (projeto) | `doc-specs/PRD.md` | 🧑‍💼 Tech Lead (`/discovery-prd`) | 🏗️ Architect | Após spec funcional aprovada |
| `technical-spec.md` | `doc-specs/technical-spec.md` | 🏗️ Architect (`/discovery-tech-spec`) | 🏗️ Architect (epic init) | Após PRD aprovado |
| `epics.md` | `doc-specs/epics.md` | 🏗️ Architect (`/discovery-epics`) | 🏗️ Architect (epic init) | Após spec técnica aprovada |
| `CONTEXT.md` (inicial) | `doc-specs/CONTEXT.md` | 🏗️ Architect (`/discovery-tech-spec`) | Todos os agentes | Criado uma vez, atualizado após cada epic |

---

## Artefatos por epic (Flow A)

Criados em `doc-specs/<N>-epic/` para cada epic N.

| Artefato | Localização | Criado por | Lido por | Quando |
|---|---|---|---|---|
| `epic-N.md` | `doc-specs/<N>-epic/epic-N.md` | 🏗️ Architect (`/epic-init`) | 🏗️ Architect, humano | Início da fase de Spec do epic |
| `PRD.md` (por epic) | `doc-specs/<N>-epic/PRD.md` | 🏗️ Architect (`/epic-init`) | 🛠️ Implementer, 🔎 Reviewer | Após `epic-N.md` aprovado |
| `spec-epic-N.md` | `doc-specs/<N>-epic/spec-epic-N.md` | 🏗️ Architect (`/epic-init`) | 🛠️ Implementer, 🧪 QA, 🔎 Reviewer | **Portão antes da fase de Epic** |
| `decisions-log.md` | `doc-specs/<N>-epic/decisions-log.md` | 🏗️ Architect (vazio, via `/epic-init`) | 🔎 Reviewer, 🏗️ Architect, 🚀 Ops | Criado vazio; preenchido pelo 🛠️ Implementer |
| `ops-epic-N.md` | `doc-specs/<N>-epic/ops-epic-N.md` | 🚀 Ops (`/epic-close`) | Humano, 🏗️ Architect | Após revisão aprovada; antes do deploy |
| `incident-log.md` | `doc-specs/<N>-epic/incident-log.md` | 🚀 Ops (`/ops-triage`) | 🚀 Ops | Criado no primeiro incidente; adicionado a cada triagem |

---

## Artefatos do Flow B

| Artefato | Localização | Criado por | Lido por | Quando |
|---|---|---|---|---|
| `tarefa.md` | `doc-specs/tarefa.md` | 📥 Intake (`/task-init`) | 📐 Planner | Após `tarefa.txt` estar pronto |
| `PRD.md` | `doc-specs/PRD.md` | 📐 Planner (`/task-prd`) | 📐 Planner, 🛠️ Implementer | Após `tarefa.md` aprovado |
| `spec.md` | `doc-specs/spec.md` | 📐 Planner (`/task-spec`) | 🛠️ Implementer, 🧪 QA, 🔎 Reviewer | **Portão antes da implementação** |

---

## Artefatos de nível de projeto

| Artefato | Localização | Criado por | Lido por | Quando |
|---|---|---|---|---|
| `CONTEXT.md` | `doc-specs/CONTEXT.md` | 🏗️ Architect | Todos os agentes (antes de cada epic) | Criado uma vez; atualizado após cada epic via `/context-sync` |
| `AGENTS.md` | Raiz do projeto | 📐 Planner (`/agents-init`) | GitHub Copilot (todas as interações) | Uma vez por projeto |

---

## Diagrama de fluxo de artefatos

```
idea.txt
   ↓ /discovery-refine
idea.md
   ↓ /discovery-spec
non-technical-spec.md
   ↓ /discovery-prd
PRD.md
   ↓ /discovery-tech-spec
technical-spec.md + CONTEXT.md
   ↓ /discovery-epics
epics.md
   ↓ /epic-init <N>  (repete por epic)
doc-specs/<N>-epic/
   ├── epic-N.md
   ├── PRD.md
   ├── spec-epic-N.md    ← portão de implementação
   └── decisions-log.md
   ↓ /task-implement
   (código + checklist preenchido + entradas em decisions-log.md)
   ↓ /task-tests
   (relatório de testes)
   ↓ /task-review
   (relatório de revisão)
   ↓ /epic-close <N>
doc-specs/<N>-epic/ops-epic-N.md
   ↓ /context-sync <N>
CONTEXT.md (atualizado)
```

---

## Retenção e versionamento

Todos os artefatos devem ser commitados no controle de versão. Eles servem como trilha de auditoria de cada decisão tomada durante o ciclo de vida do projeto.

- Nunca exclua entradas de `decisions-log.md`
- `CONTEXT.md` é somente adição para epics concluídos e seções ADR
- Specs substituídas devem ser versionadas ou mantidas junto à pasta do epic, não excluídas
