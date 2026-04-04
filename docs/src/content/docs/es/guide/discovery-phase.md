---
title: Fase de Discovery
description: Transforma una idea en bruto en un conjunto de artefactos listos para implementación.
---

La fase de Discovery convierte una idea no estructurada — escrita en lenguaje natural en `doc-specs/idea.txt` — en un conjunto de artefactos revisados por humanos que definen completamente qué se construirá y cómo.

Esta fase solo existe en el **Flow A**. El Flow B (tareas ya definidas) comienza directamente en `/task-init`.

---

## Agentes involucrados

| Agente | Responsabilidad |
|---|---|
| 🧭 Discovery | Lee `idea.txt` y produce `idea.md` — la idea estructurada sin sesgo técnico |
| 🗂️ PM | Lee `idea.md` y produce `non-technical-spec.md` — recorridos de usuario, reglas de negocio, criterios de aceptación |
| 🧑‍💼 Tech Lead | Lee `non-technical-spec.md` y produce `PRD.md` — alcance técnico, riesgos, dependencias |
| 🏗️ Architect | Lee `PRD.md` y produce `technical-spec.md` + `epics.md` — arquitectura y secuenciación del trabajo |

---

## Prompts de la fase

| Prompt | Entrada | Salida |
|---|---|---|
| `/discovery-refine` | `idea.txt` | `idea.md` — HITL checkpoint |
| `/discovery-spec` | `idea.md` | `non-technical-spec.md` — HITL checkpoint |
| `/discovery-prd` | `non-technical-spec.md` | `PRD.md` — HITL checkpoint |
| `/discovery-tech-spec` | `PRD.md` | `technical-spec.md` — HITL checkpoint |
| `/discovery-epics` | `technical-spec.md` | `epics.md` — HITL checkpoint |

---

## Paso a paso

### 1. Escribe tu idea

Crea `doc-specs/idea.txt` con cualquier nivel de detalle. No hay un formato requerido — puede ser una o dos oraciones, o varias páginas.

```
AI SDLC Kit — Un kit de agentes de VS Code Copilot que implementa
un ciclo de vida de desarrollo completo a partir de especificaciones.
```

### 2. Ejecuta `/discovery-refine`

El agente 🧭 Discovery lee `idea.txt` y produce `idea.md`.

> **HITL checkpoint:** Lee `idea.md`. ¿Tu idea está correctamente representada sin distorsión técnica?

### 3. Ejecuta `/discovery-spec`

El agente 🗂️ PM lee `idea.md` y produce `non-technical-spec.md` con:
- Problema que se resuelve
- Recorridos clave de usuario
- Reglas de negocio relevantes
- Criterios de aceptación por escenario

> **HITL checkpoint:** ¿Los recorridos de usuario y las reglas de negocio reflejan lo que realmente quieres construir?

### 4. Ejecuta `/discovery-prd`

El agente 🧑‍💼 Tech Lead lee `non-technical-spec.md` y produce `PRD.md` con:
- Alcance (qué está incluido y qué no)
- Criterios de aceptación técnicos
- Riesgos e incertidumbres
- Dependencias externas

> **HITL checkpoint:** ¿El alcance y los criterios de aceptación están bien delimitados?

### 5. Ejecuta `/discovery-tech-spec`

El agente 🏗️ Architect lee `PRD.md` y produce `technical-spec.md` con:
- Decisiones arquitectónicas (ADRs)
- Stack tecnológico definido con justificación
- Estructura de componentes y datos
- Puntos de integración externa

> **HITL checkpoint:** ¿Las decisiones arquitectónicas son razonables para el contexto?

### 6. Ejecuta `/discovery-epics`

El agente 🏗️ Architect lee `technical-spec.md` y produce `epics.md` con:
- Lista de epics en orden de implementación
- Alcance por epic, con sus dependencias
- Criterios de completitud por epic

> **HITL checkpoint:** ¿La secuenciación de los epics tiene sentido? ¿Faltan o sobran epics?

---

## Artefactos generados

| Archivo | Descripción |
|---|---|
| `doc-specs/idea.md` | Idea estructurada, sin sesgo técnico |
| `doc-specs/non-technical-spec.md` | Spec funcional — recorridos de usuario, reglas de negocio |
| `doc-specs/PRD.md` | Documento de Requisitos del Producto |
| `doc-specs/technical-spec.md` | Arquitectura, stack, ADRs |
| `doc-specs/epics.md` | Secuenciación y límites de los epics |

---

## Próximo paso

Con `epics.md` aprobado, estás listo para comenzar el primer epic:

```bash
# Inicializa el epic 1
/epic-init 1
```

Consulta [Fase de Spec](/ai-sdlc-kit/es/guide/spec-phase/) para el siguiente paso.
