---
title: Referencia de Artefactos
description: Todos los artefactos producidos por el AI SDLC Kit, quién los crea y cuándo.
---

Los artefactos son los documentos y archivos producidos a lo largo del pipeline del AI SDLC Kit. Cada artefacto tiene un propietario (el agente que lo crea), un momento específico en el pipeline y un rol de entrada para los agentes que lo consumen.

---

## Artefactos de Discovery (Flow A)

Estos artefactos son producidos durante la fase de Discovery y definen el proyecto de alto nivel a bajo nivel.

| Artefacto | Producido por | Consumido por | HITL requerido |
|---|---|---|---|
| `idea.md` | 🧭 Discovery | 🗂️ PM | ✅ |
| `non-technical-spec.md` | 🗂️ PM | 🧑‍💼 Tech Lead | ✅ |
| `PRD.md` | 🧑‍💼 Tech Lead | 🏗️ Architect | ✅ |
| `technical-spec.md` | 🏗️ Architect | 🏗️ Architect (epics) | ✅ |
| `epics.md` | 🏗️ Architect | 🏗️ Architect (epic-init) | ✅ |

---

## Artefactos de Spec por Epic (Flow A)

Estos artefactos son producidos una vez por epic y son la puerta antes de la implementación.

| Artefacto | Producido por | Consumido por | HITL requerido |
|---|---|---|---|
| `epic-N.md` | 🏗️ Architect | Todos los agentes del epic | ✅ |
| `spec-epic-N.md` | 🏗️ Architect | 🛠️ Implementer, 🧪 QA, 🔎 Reviewer | ✅ |

---

## Artefactos de Flow B

Estos artefactos son producidos para tareas individuales en el Flow B.

| Artefacto | Producido por | Consumido por | HITL requerido |
|---|---|---|---|
| `tarefa.md` | 📥 Intake | 📐 Planner | ✅ |
| `PRD.md` | 📐 Planner | 📐 Planner (spec) | ✅ |
| `spec.md` | 📐 Planner | 🛠️ Implementer, 🧪 QA, 🔎 Reviewer | ✅ |

---

## Artefactos de Contexto y Operaciones

Estos artefactos son transversales — sobreviven entre epics y acumulan conocimiento del proyecto.

| Artefacto | Producido/actualizado por | Consumido por | Persistencia |
|---|---|---|---|
| `CONTEXT.md` | 🏗️ Architect (context-sync) | Todos los agentes | Toda la vida del proyecto |
| `decisions-log.md` | Cualquier agente o desarrollador | 🏗️ Architect (context-sync) | Toda la vida del proyecto |

---

## Flujo de artefactos

```
idea.txt
  ↓ [/discovery-refine]
idea.md  ──────────────────────────────────────────────────── HITL ✅
  ↓ [/discovery-spec]
non-technical-spec.md  ──────────────────────────────────── HITL ✅
  ↓ [/discovery-prd]
PRD.md  ──────────────────────────────────────────────────── HITL ✅
  ↓ [/discovery-tech-spec]
technical-spec.md  ──────────────────────────────────────── HITL ✅
  ↓ [/discovery-epics]
epics.md  ────────────────────────────────────────────────── HITL ✅
  ↓ [/epic-init N]
epic-N.md + spec-epic-N.md  ─────────────────────────────── HITL ✅
  ↓ [/task-implement → /task-tests → /task-review]
código implementado y aprobado
  ↓ [/epic-close N]
resumen de deploy  ───────────────────────────────────────── HITL ✅
  ↓ [/context-sync N]
CONTEXT.md actualizado
```

---

## Dónde viven los artefactos

Todos los artefactos de documentación viven en la carpeta `doc-specs/`:

```
doc-specs/
├── idea.txt              # entrada en bruto
├── idea.md               # salida de Discovery
├── non-technical-spec.md # salida de PM
├── PRD.md                # salida de Tech Lead o Planner
├── technical-spec.md     # salida de Architect
├── epics.md              # salida de Architect
├── epic-1.md             # por epic
├── spec-epic-1.md        # por epic
├── CONTEXT.md            # memoria acumulada
├── decisions-log.md      # registro de decisiones
└── tarefa.txt            # entrada en bruto (Flow B)
```

El código implementado vive en la estructura de carpetas del proyecto, según lo definido en el árbol de archivos de `spec-epic-N.md`.
