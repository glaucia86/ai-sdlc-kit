---
title: Cómo Funciona
description: El flujo completo del AI SDLC Kit — de la idea a producción.
---

## El flujo completo

El AI SDLC Kit organiza el desarrollo en dos flujos independientes que comparten el mismo pipeline de implementación y revisión.

```
┌─────────────────────────────────────────────────────────────────┐
│  FLOW A — Discovery + Entrega (para nuevos proyectos / ideas)   │
│                                                                 │
│  idea.txt                                                       │
│     ↓                                                           │
│  /discovery-refine   → HIL ✅ revisar idea.md                  │
│     ↓                                                           │
│  /discovery-spec     → HIL ✅ revisar non-technical-spec.md     │
│     ↓                                                           │
│  /discovery-prd      → HIL ✅ revisar PRD.md                    │
│     ↓                                                           │
│  /discovery-tech-spec → HIL ✅ revisar technical-spec.md        │
│     ↓                                                           │
│  /discovery-epics    → HIL ✅ revisar epics.md                  │
│     ↓  (por epic)                                               │
│  /epic-init <N>      → HIL ✅ epic-N.md, PRD.md, spec-epic-N.md │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
│     ↓                                                           │
│  /epic-close <N> → merge → deploy → /context-sync <N>          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLOW B — Entrega Directa (para tareas definidas)               │
│                                                                 │
│  tarefa.txt                                                     │
│     ↓                                                           │
│  /task-init   → HIL ✅ revisar tarefa.md                        │
│     ↓                                                           │
│  /task-prd    → HIL ✅ revisar PRD.md                           │
│     ↓                                                           │
│  /task-spec   → HIL ✅ revisar spec.md                          │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
└─────────────────────────────────────────────────────────────────┘
```

Ningún flujo es prerrequisito del otro.

---

## La regla de oro

> **Sin una spec validada por un humano, ninguna implementación comienza.**

Este es el principio central. Toda implementación en el kit — ya sea para una sola tarea (Flow B) o un epic (Flow A) — requiere un documento de spec aprobado por un humano antes de que se invoque el agente Implementer.

Esta regla existe porque los agentes de IA son excelentes produciendo especificaciones y código con apariencia convincente, pero no cargan el contexto de producto, la tolerancia al riesgo ni el conocimiento de dominio que tiene un humano. La spec es el contrato entre la intención humana y la ejecución de la IA.

---

## El papel del Human in the Loop

Los HIL checkpoints son **obligatorios**, no opcionales. Aparecen después de cada artefacto generado que moldea materialmente lo que se construirá.

| Artefacto | Por qué el HIL importa aquí |
|---|---|
| `idea.md` | Garantiza que la idea no fue distorsionada durante la estructuración |
| `non-technical-spec.md` | Valida recorridos de usuario y reglas de negocio |
| `PRD.md` | Confirma límites de alcance y criterios de aceptación |
| `technical-spec.md` | Valida decisiones de arquitectura y evaluación de riesgos |
| `epics.md` | Confirma secuenciación y límites de los epics |
| `spec-epic-N.md` | **Puerta antes de la implementación** — el HIL más crítico |

En cada checkpoint, un humano responde: _¿Este documento es lo suficientemente preciso para guiar el siguiente paso?_ Si la respuesta es no, el documento se revisa antes de continuar.

---

## Fase de Discovery vs. fase de Spec

| | Discovery | Spec (por epic) |
|---|---|---|
| **Punto de partida** | `idea.txt` — en bruto, no estructurado | `epics.md` — ya estructurado |
| **Salida** | `technical-spec.md` + `epics.md` | `spec-epic-N.md` por epic |
| **Escala** | Visión del proyecto completo | Una entrega aislada |
| **Quién lo conduce** | Agentes Discovery, PM, Tech Lead, Architect | Agente Architect solo |
| **Frecuencia** | Una vez por proyecto (o fase principal) | Una vez por epic |

El Discovery responde: _¿Qué estamos construyendo y por qué?_
La fase de Spec responde: _¿Cómo construimos exactamente el epic N?_

---

## Responsabilidades de los agentes en resumen

| Agente | Función |
|---|---|
| 🧭 Discovery | Estructura ideas en bruto sin sesgo técnico |
| 🗂️ PM | Traduce la idea en spec funcional (recorridos de usuario, reglas de negocio) |
| 🧑‍💼 Tech Lead | Produce el PRD a partir de la spec funcional |
| 🏗️ Architect | Genera `technical-spec.md`, `epics.md` y artefactos por epic |
| 📥 Intake | Estructura una descripción en bruto de tarea (`tarefa.txt`) en `tarefa.md` |
| 📐 Planner | Genera `PRD.md` y `spec.md` para tareas del Flow B |
| 🛠️ Implementer | Implementa estrictamente basándose en la spec y el PRD aprobados |
| 🧪 QA | Genera escenarios de prueba y ejecuta las pruebas antes de la revisión |
| 🔎 Reviewer | Valida la adherencia entre spec e implementación |
| 🚀 Ops | Cierra el epic: preparación de deploy, observabilidad, sincronización de contexto |

---

## Memoria de contexto

El kit mantiene un archivo `doc-specs/CONTEXT.md` que acumula conocimiento entre los epics. Después del cierre de cada epic, el agente 🏗️ Architect actualiza este archivo via `/context-sync <N>` con:

- resumen del epic completado
- registros de decisiones arquitectónicas (ADRs) de `decisions-log.md`
- riesgos y aprendizajes que afectan epics futuros

Todos los agentes leen `CONTEXT.md` antes de actuar en cualquier epic, garantizando continuidad a lo largo del ciclo de vida.
