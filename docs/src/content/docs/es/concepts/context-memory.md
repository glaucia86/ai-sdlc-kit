---
title: Memoria de Contexto
description: Cómo el AI SDLC Kit mantiene el conocimiento acumulado entre epics.
---

La memoria de contexto es el mecanismo que garantiza que los agentes actúen con el conocimiento acumulado del proyecto — no como si cada epic fuera el primero.

---

## El problema que resuelve

Los agentes de IA no tienen memoria entre conversaciones. Sin un mecanismo explícito de contexto compartido:

- El Implementer del epic 3 no sabe qué decidió el Architect en el epic 1
- El Planner del Flow B no conoce las restricciones arquitectónicas establecidas semanas atrás
- El QA no sabe cuáles pruebas ya existen y cuáles fueron intencionalmente omitidas

El resultado es código inconsistente, decisiones duplicadas y refactorizaciones innecesarias.

---

## `CONTEXT.md`

El archivo `doc-specs/CONTEXT.md` es la memoria persistente del proyecto. Es actualizado por el agente 🏗️ Architect después del cierre de cada epic, via `/context-sync <N>`.

### Qué contiene

```markdown
# CONTEXT.md

## Estado actual del proyecto
- Qué fue construido hasta ahora
- En qué estado está cada componente

## Epics completados
- Epic 1: [resumen de qué se hizo y aprendizajes]
- Epic 2: [resumen de qué se hizo y aprendizajes]

## Decisiones arquitectónicas activas
- ADR-001: [decisión y justificación]
- ADR-002: [decisión y justificación]

## Riesgos conocidos
- [riesgos identificados que afectan epics futuros]

## Restricciones activas
- [restricciones que todos los agentes deben respetar]
```

### Quién lo lee

Todos los agentes leen `CONTEXT.md` antes de actuar en cualquier epic:

- 🏗️ Architect — antes de generar `spec-epic-N.md`
- 🛠️ Implementer — antes de implementar
- 📐 Planner — antes de generar `spec.md` en el Flow B
- 🚀 Ops — antes de preparar el deploy

---

## `decisions-log.md`

El archivo `doc-specs/decisions-log.md` registra todas las decisiones arquitectónicas tomadas durante el proyecto, con su justificación y contexto.

### Cuándo se actualiza

- Cuando el Architect toma una decisión de arquitectura
- Cuando el Implementer encuentra que la spec necesita una decisión no prevista
- Cuando el Reviewer identifica un desvío que requiere una decisión documentada
- Cuando un humano cambia una dirección técnica establecida

### Formato de entrada

```markdown
## [Fecha] ADR-NNN: [Título de la decisión]

**Decisión:** [Qué se decidió]
**Justificación:** [Por qué esta opción]
**Alternativas consideradas:** [Qué más fue evaluado]
**Impacto:** [Qué cambia en el proyecto]
```

---

## El flujo de sincronización

```
todas las tareas del epic N aprobadas
           ↓
      /epic-close N
           ↓
   gate de producción (HITL)
           ↓
      merge + deploy
           ↓
   /context-sync N
           ↓
   Architect lee el informe del epic,
   lee decisions-log.md,
   actualiza CONTEXT.md
           ↓
   CONTEXT.md refleja el estado actual del proyecto
           ↓
   /epic-init N+1 comienza con contexto completo
```

---

## Qué se rompe sin memoria de contexto

| Sin contexto | Con contexto |
|---|---|
| El Implementer reimplementa algo que ya existe | El Implementer sabe qué ya está construido |
| El Architect toma decisiones que contradicen ADRs anteriores | El Architect parte de las decisiones ya documentadas |
| El Planner ignora restricciones de seguridad establecidas | El Planner aplica las restricciones activas |
| Los agentes producen código inconsistente entre epics | Los agentes producen código coherente con el sistema existente |

---

## Contexto mínimo para empezar

En el inicio del proyecto, `CONTEXT.md` puede ser mínimo o vacío. Los agentes funcionan con lo que hay. La memoria se acumula con el tiempo.

Si estás integrando el AI SDLC Kit en un proyecto existente, es recomendable crear un `CONTEXT.md` inicial que describa el estado actual del proyecto: tecnologías, decisiones de arquitectura existentes y restricciones conocidas.
