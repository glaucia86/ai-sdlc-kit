---
title: Referencia de Templates
description: Todos los templates de artefactos del AI SDLC Kit con sus secciones y propósito.
---

El AI SDLC Kit incluye templates estructurados para cada artefacto del pipeline. Los templates garantizan que los artefactos generados por los agentes sean consistentes, revisables y útiles en los HIL checkpoints.

---

## `idea.md`

**Generado por:** 🧭 Discovery via `/discovery-refine`

| Sección | Descripción |
|---|---|
| Título | Nombre conciso de la idea |
| Problema | Qué problema se resuelve y para quién |
| Solución propuesta | Descripción de la solución sin detalle técnico |
| Usuarios objetivo | Quién usa el producto |
| Diferencial | Por qué esta solución y no otra |
| Restricciones conocidas | Límites explícitos ya identificados |
| Métricas de éxito | Cómo sabemos que funcionó |

---

## `non-technical-spec.md`

**Generado por:** 🗂️ PM via `/discovery-spec`

| Sección | Descripción |
|---|---|
| Contexto | Resumen del problema y la solución |
| Recorridos de usuario | Flujos de uso en lenguaje de usuario (no técnico) |
| Reglas de negocio | Restricciones y políticas del dominio |
| Escenarios alternativos | Errores, casos de borde, flujos de excepción |
| Criterios de aceptación | Condiciones observables que confirman que funciona |
| Fuera de alcance | Qué no será construido en esta fase |

---

## `PRD.md`

**Generado por:** 🧑‍💼 Tech Lead via `/discovery-prd` o 📐 Planner via `/task-prd`

| Sección | Descripción |
|---|---|
| Objetivo | Qué se construye y por qué |
| Alcance | Lista explícita de qué está incluido y excluido |
| Criterios de aceptación técnicos | Criterios verificables para cada feature |
| Riesgos | Riesgos técnicos y de producto con mitigación |
| Dependencias | Sistemas externos, librerías, equipos |
| Suposiciones | Qué se asume como verdadero para que el PRD sea válido |

---

## `technical-spec.md`

**Generado por:** 🏗️ Architect via `/discovery-tech-spec`

| Sección | Descripción |
|---|---|
| Visión arquitectónica | Diagrama o descripción de la arquitectura del sistema |
| Stack tecnológico | Tecnologías elegidas con justificación (ADRs) |
| Estructura de componentes | Módulos principales y sus responsabilidades |
| Modelo de datos | Entidades, relaciones, contratos de API |
| Flujos de integración | Cómo los componentes se comunican |
| Restricciones de seguridad y performance | SLAs, límites de seguridad, requerimientos de escala |
| Apéndice de ADRs | Registro de decisiones arquitectónicas |

---

## `epics.md`

**Generado por:** 🏗️ Architect via `/discovery-epics`

| Sección | Descripción |
|---|---|
| Visión general | Resumen de la estrategia de entrega |
| Lista de epics | Numerados en orden de implementación |
| Por epic: alcance | Qué se construye en este epic |
| Por epic: dependencias | De qué epics anteriores depende |
| Por epic: criterios de completitud | Cómo saber que el epic terminó |

---

## `epic-N.md`

**Generado por:** 🏗️ Architect via `/epic-init <N>`

| Sección | Descripción |
|---|---|
| Contexto | Por qué este epic existe y qué problema resuelve |
| Objetivo | Qué estado del sistema debe existir al finalizar |
| Límites | Qué está dentro y fuera del alcance de este epic |
| Criterios de completitud | Condiciones verificables de cierre |
| Dependencias | Artefactos y epics que este epic requiere |

---

## `spec-epic-N.md`

**Generado por:** 🏗️ Architect via `/epic-init <N>`

| Sección | Descripción |
|---|---|
| Lista de tareas | Tareas numeradas con descripción sin ambigüedad |
| Por tarea: criterios de aceptación | Condiciones testables para cada tarea |
| Árbol de archivos esperado | Estructura de archivos al completar el epic |
| Reglas de implementación | Qué hacer y qué NO hacer |
| Flujo de datos / diagrama de secuencia | Cuando el flujo de datos es complejo |
| Restricciones heredadas | De `technical-spec.md` y `CONTEXT.md` |

---

## `tarefa.md`

**Generado por:** 📥 Intake via `/task-init`

| Sección | Descripción |
|---|---|
| Título | Nombre conciso de la tarea |
| Contexto | Por qué la tarea existe |
| Descripción | Qué debe hacerse |
| Restricciones | Límites explícitos (tecnología, alcance, tiempo) |
| Criterios de aceptación | Condiciones que indican que la tarea está completa |
| Archivos afectados | Lista de archivos o módulos involucrados (si se conoce) |

---

## `spec.md` (Flow B)

**Generado por:** 📐 Planner via `/task-spec`

Mismo formato que `spec-epic-N.md`, adaptado para una sola tarea del Flow B.

---

## `CONTEXT.md`

**Actualizado por:** 🏗️ Architect via `/context-sync <N>`

| Sección | Descripción |
|---|---|
| Estado actual del proyecto | Qué fue construido, en qué estado está |
| Epics completados | Resumen por epic: qué se hizo y aprendizajes |
| Decisiones arquitectónicas activas | ADRs vigentes de `decisions-log.md` |
| Riesgos conocidos | Riesgos identificados que afectan epics futuros |
| Restricciones activas | Restricciones que todos los agentes deben respetar |

---

## `decisions-log.md`

**Actualizado por:** cualquier agente o el desarrollador

| Sección | Descripción |
|---|---|
| Fecha | Cuándo se tomó la decisión |
| Decisión | Qué se decidió |
| Justificación | Por qué esta opción y no otra |
| Alternativas consideradas | Qué más fue evaluado |
| Impacto | Qué cambia en el proyecto a partir de esta decisión |
