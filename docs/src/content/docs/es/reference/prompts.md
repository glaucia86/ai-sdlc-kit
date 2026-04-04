---
title: Referencia de Prompts
description: Todos los prompts del AI SDLC Kit con entradas, salidas y cuándo usarlos.
---

El AI SDLC Kit incluye prompts organizados en cuatro grupos: Discovery (Flow A), Spec por epic (Flow A), Entrega por tarea y Operaciones.

---

## Prompts de Discovery (Flow A)

Estos prompts transforman una idea no estructurada en artefactos listos para la implementación.

| Prompt | Agente | Entrada | Salida | HITL |
|---|---|---|---|---|
| `/discovery-refine` | 🧭 Discovery | `idea.txt` | `idea.md` | ✅ |
| `/discovery-spec` | 🗂️ PM | `idea.md` | `non-technical-spec.md` | ✅ |
| `/discovery-prd` | 🧑‍💼 Tech Lead | `non-technical-spec.md` | `PRD.md` | ✅ |
| `/discovery-tech-spec` | 🏗️ Architect | `PRD.md` | `technical-spec.md` | ✅ |
| `/discovery-epics` | 🏗️ Architect | `technical-spec.md` | `epics.md` | ✅ |

---

## Prompts de Spec por Epic (Flow A)

Estos prompts preparan cada epic para la implementación.

| Prompt | Agente | Entrada | Salida | HITL |
|---|---|---|---|---|
| `/epic-init <N>` | 🏗️ Architect | `epics.md`, `technical-spec.md`, `PRD.md` | `epic-N.md`, `spec-epic-N.md` | ✅ |

---

## Prompts de Entrega por Tarea (ambos flujos)

Estos prompts ejecutan el ciclo de implementación para cada tarea.

### Flow B — Planificación previa

| Prompt | Agente | Entrada | Salida | HITL |
|---|---|---|---|---|
| `/task-init` | 📥 Intake | `tarefa.txt` | `tarefa.md` | ✅ |
| `/task-prd` | 📐 Planner | `tarefa.md` | `PRD.md` | ✅ |
| `/task-spec` | 📐 Planner | `PRD.md`, `tarefa.md` | `spec.md` | ✅ |

### Implementación (Flow A y B)

| Prompt | Agente | Entrada | Salida | HITL |
|---|---|---|---|---|
| `/task-implement` | 🛠️ Implementer | `spec-epic-N.md` o `spec.md`, `PRD.md`, `CONTEXT.md` | Código funcional | — |
| `/task-tests` | 🧪 QA | spec, implementación | Informe de pruebas | — |
| `/task-review` | 🔎 Reviewer | spec, `PRD.md`, implementación, informe QA | Aprobación o correcciones | — |

---

## Prompts de Operaciones (Flow A)

Estos prompts cierran el ciclo del epic y sincronizan el contexto.

| Prompt | Agente | Entrada | Salida | HITL |
|---|---|---|---|---|
| `/epic-close <N>` | 🚀 Ops | epic completo, spec, informe QA | Resumen de deploy, documentación de observabilidad | ✅ |
| `/context-sync <N>` | 🏗️ Architect | epic cerrado, `decisions-log.md` | `CONTEXT.md` actualizado | — |

---

## Flujo de entrada/salida

```
idea.txt
   → /discovery-refine → idea.md
   → /discovery-spec → non-technical-spec.md
   → /discovery-prd → PRD.md
   → /discovery-tech-spec → technical-spec.md
   → /discovery-epics → epics.md
   → /epic-init <N> → epic-N.md + spec-epic-N.md
   → /task-implement → código
   → /task-tests → informe de pruebas
   → /task-review → aprobación
   → /epic-close <N> → resumen de deploy
   → /context-sync <N> → CONTEXT.md actualizado
```

---

## Uso de los prompts en VS Code

Los prompts están disponibles como archivos `.prompt.md` en la carpeta `.github/prompts/`. Para invocarlos en VS Code Copilot Chat:

```
@workspace /discovery-refine
@workspace /epic-init 1
@workspace /task-implement
```

También puedes invocarlos desde el selector de prompts del panel de Copilot Chat con `#`.
