---
title: AI SDLC
description: Qué es el AI Software Development Lifecycle y por qué importa.
---

El AI SDLC (AI Software Development Lifecycle) es un ciclo de vida de desarrollo que incorpora agentes de IA como participantes activos en cada fase — desde la idea hasta producción — sin eliminar la supervisión humana.

---

## Qué es y qué no es

**Es:** Un conjunto de prácticas, artefactos y agentes que acelera el desarrollo de software manteniendo al humano como responsable de las decisiones importantes.

**No es:** Automatización total del desarrollo. Los agentes producen artefactos y código; los humanos aprueban cada paso relevante antes de que el pipeline avance.

---

## Las tres fases

| Fase | Qué sucede | Agentes involucrados |
|---|---|---|
| **Discovery** | De la idea a artefactos de especificación | 🧭 Discovery, 🗂️ PM, 🧑‍💼 Tech Lead, 🏗️ Architect |
| **Spec** | De los epics a specs detalladas por tarea | 🏗️ Architect, 📥 Intake, 📐 Planner |
| **Entrega** | De la spec a código en producción | 🛠️ Implementer, 🧪 QA, 🔎 Reviewer, 🚀 Ops |

---

## Cómo difiere del desarrollo tradicional

| Aspecto | Desarrollo tradicional | AI SDLC |
|---|---|---|
| Especificación | Escrita manualmente, infrecuente | Generada por agentes, revision humana obligatoria |
| Implementación | Desarrollador escribe todo el código | Agente implementa según spec aprobada |
| Pruebas | Frecuentemente al final del ciclo | Integradas después de cada tarea |
| Documentación | Frecuentemente omitida o desactualizada | Producida como parte del pipeline |
| Decisiones de arquitectura | En la cabeza del arquitecto o en wikis | En `technical-spec.md` y `CONTEXT.md`, accesibles a los agentes |

---

## La tabla de implementación

El AI SDLC solo funciona bien cuando los agentes tienen contexto suficiente. Los artefactos del pipeline son ese contexto:

| Lo que proveen los humanos | Lo que proveen los agentes |
|---|---|
| `idea.txt` o `tarefa.txt` | `idea.md`, `non-technical-spec.md`, `PRD.md` |
| Aprobación en HIL checkpoints | `technical-spec.md`, `epics.md`, `spec-N.md` |
| Decisiones de producto y negocio | Código, pruebas, informe de revisión |
| Contexto de dominio implícito | `CONTEXT.md`, `decisions-log.md` |

---

## El principio fundamental

> **La IA es buena ejecutando instrucciones precisas. Los humanos son buenos definiendo qué instrucciones tienen sentido.**

El AI SDLC respeta esta división. Los agentes producen artefactos y código con velocidad y consistencia. Los humanos validan que lo producido refleja la intención real del producto.

---

## AI SDLC y las metodologías existentes

El AI SDLC no reemplaza Scrum, Kanban ni SAFe. Es una capa de prácticas que puede operar dentro de cualquier metodología:

- Los **epics** y **tareas** mapean naturalmente a sprints o releases
- Los **HIL checkpoints** mapean a ceremonias de refinamiento o revisión
- Los **artefactos** (`PRD.md`, `spec.md`) son la documentación de decisiones

Lo que el AI SDLC agrega es la disciplina de hacer que los agentes de IA actúen sobre artefactos aprobados en lugar de interpretaciones informales del trabajo.
