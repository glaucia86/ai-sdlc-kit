---
title: Fase de Spec
description: Genera la spec detallada de un epic antes de su implementación.
---

La fase de Spec transforma un epic aprobado — definido en `epics.md` — en un conjunto de artefactos detallados que guían la implementación. Esta fase **es la puerta antes del código**: nada se implementa sin una spec aprobada por un humano.

Esta fase ocurre una vez por epic, tanto en el Flow A como en el Flow B.

---

## La regla de oro

> **Sin una spec validada por un humano, ninguna implementación comienza.**

La spec es el contrato entre la intención humana y la ejecución de la IA. Un implementador sin spec puede producir código correcto desde el punto de vista técnico pero incorrecto desde el punto de vista del producto.

---

## Prompts de la fase

| Prompt | Flujo | Entrada | Salida |
|---|---|---|---|
| `/epic-init <N>` | Flow A | `epics.md`, `technical-spec.md`, `PRD.md` | `epic-N.md`, `spec-epic-N.md` |
| `/task-init` | Flow B | `tarefa.txt` | `tarefa.md` |
| `/task-prd` | Flow B | `tarefa.md` | `PRD.md` |
| `/task-spec` | Flow B | `PRD.md`, `tarefa.md` | `spec.md` |

---

## Flow A — Spec de epic

### `/epic-init <N>`

El agente 🏗️ Architect lee `epics.md`, `technical-spec.md` y el `PRD.md` relevante para el epic N, y produce:

- **`doc-specs/epic-N.md`** — descripción narrativa del epic: contexto, objetivo, límites y criterios de completitud
- **`doc-specs/spec-epic-N.md`** — spec técnica detallada: lista de tareas, reglas de implementación, restricciones y flujo de datos

> **HIL checkpoint:** ¿La spec del epic N es suficientemente precisa para guiar la implementación sin ambigüedades?

### Qué debe contener `spec-epic-N.md`

Una spec de calidad incluye:

- [ ] Lista de tareas con descripción clara (sin ambigüedad)
- [ ] Árbol de archivos esperado al final del epic
- [ ] Reglas de implementación explícitas (qué hacer y qué NO hacer)
- [ ] Flujo de datos o diagrama de secuencia cuando aplica
- [ ] Criterios de aceptación verificables (testables)
- [ ] Restricciones de arquitectura heredadas de `technical-spec.md`

---

## Flow B — Spec de tarea

### `/task-init`

El agente 📥 Intake lee `tarefa.txt` y produce `tarefa.md` — la tarea estructurada en formato estandarizado.

> **HIL checkpoint:** ¿La tarea está correctamente capturada?

### `/task-prd`

El agente 📐 Planner lee `tarefa.md` y produce `PRD.md` con criterios de aceptación y límites de alcance.

> **HIL checkpoint:** ¿El alcance y los criterios de aceptación son correctos?

### `/task-spec`

El agente 📐 Planner lee `PRD.md` y `tarefa.md` y produce `spec.md` con la spec técnica detallada de la tarea.

> **HIL checkpoint:** ¿La spec es suficientemente precisa para guiar la implementación?

---

## Verificación antes de implementar

Antes de invocar `/task-implement`, verifica:

- [ ] La spec (`.spec-epic-N.md` o `spec.md`) fue aprobada en el HIL checkpoint
- [ ] El `PRD.md` relevante está actualizado y aprobado
- [ ] No hay ambigüedades de implementación sin responder en la spec
- [ ] `doc-specs/CONTEXT.md` está actualizado con aprendizajes del epic anterior (si aplica)

---

## Próximo paso

Con la spec aprobada, continúa al epic:

```bash
# Implementa las tareas del epic 1
/task-implement
```

Consulta [Fase de Epic](/ai-sdlc-kit/es/guide/epic-phase/) para el proceso completo de implementación.
