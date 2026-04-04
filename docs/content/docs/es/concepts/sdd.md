---
title: Spec-Driven Development
description: El principio central del AI SDLC Kit — sin spec aprobada, no hay implementación.
---

Spec-Driven Development (SDD) es el principio organizador del AI SDLC Kit. Establece que toda implementación debe derivarse de un documento de especificación aprobado por un humano.

---

## La regla de oro

> **Sin una spec validada por un humano, ninguna implementación comienza.**

Esta regla no es una recomendación — es el invariante que garantiza que el código producido refleja la intención real del producto y no la interpretación del agente.

---

## Qué contiene una spec

Una spec válida en el contexto del AI SDLC Kit contiene:

- **Lista de tareas** con descripción sin ambigüedad
- **Criterios de aceptación** verificables y testables para cada tarea
- **Árbol de archivos esperado** al finalizar el trabajo
- **Reglas de implementación explícitas** — qué hacer y qué no hacer
- **Restricciones heredadas** de `technical-spec.md` y `CONTEXT.md`
- **Flujo de datos o diagrama de secuencia** cuando el flujo es complejo

Una spec sin criterios de aceptación testables no es una spec — es un párrafo de intención.

---

## Cómo se aplica el SDD

El SDD se aplica a través de la separación de roles:

1. **El Architect** produce la spec — no implementa
2. **El Implementer** implementa la spec — no la modifica durante la ejecución
3. **El Reviewer** valida la adherencia a la spec — no aprueba desvíos injustificados

Si el Implementer encuentra que la spec es ambigua o incorrecta, **detiene la implementación** y reporta. No asume ni improvisa.

---

## SDD y la IA

El Spec-Driven Development es especialmente importante cuando la implementación la hace un agente de IA porque:

1. **Los agentes completan los vacíos** — si la spec es ambigua, el agente produce algo plausible pero potencialmente incorrecto
2. **Los agentes no preguntan** — a menos que se les instruya explícitamente, los agentes asumen e implementan
3. **La corrección post-implementación es costosa** — es más barato tener una spec precisa que corregir código generado

Con una spec precisa, los agentes son altamente efectivos. Sin ella, producen work convincente pero equivocado.

---

## SDD y el PRD

La spec técnica (`spec-epic-N.md` o `spec.md`) no reemplaza al PRD. Trabajan en capas:

| Documento | Responde a | Usado por |
|---|---|---|
| `PRD.md` | ¿Qué se construye y por qué? | Tech Lead, Architect, Reviewer |
| `spec-epic-N.md` | ¿Cómo exactamente se construye? | Implementer, QA, Reviewer |

El Reviewer valida contra ambos documentos: que el código sigue la spec técnica Y que cubre los criterios de aceptación del PRD.

---

## Cuándo actualizar la spec

Una spec puede actualizarse únicamente:

1. **Antes del inicio de la implementación** — en el HITL checkpoint
2. **Durante la implementación**, si se descubre un problema fundamental — pero con registro explícito en `decisions-log.md` y con reinicio del ciclo de implementación

No se acepta "implementar diferente de la spec y luego ajustar la spec". La spec es la fuente de verdad; el código es su consecuencia.
