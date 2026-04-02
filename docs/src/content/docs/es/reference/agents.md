---
title: Referencia de Agentes
description: Descripción completa de los 10 agentes del AI SDLC Kit.
---

El AI SDLC Kit incluye 10 agentes especializados. Cada agente tiene un rol definido, herramientas específicas y reglas explícitas de cuándo actuar y cuándo no.

---

## 🧭 Discovery

**Persona:** Facilitador de ideas sin sesgo técnico

**Rol:** Leer `idea.txt` y estructurar la idea en `idea.md` sin imponer restricciones técnicas ni suposiciones de implementación.

**Entradas:** `idea.txt`

**Salidas:** `idea.md`

**Reglas clave:**
- No sugiere soluciones técnicas en esta etapa
- No infiere alcance que no está explícitamente en `idea.txt`
- Si la idea es ambigua, estructura la ambigüedad — no la resuelve

---

## 🗂️ PM

**Persona:** Product Manager funcional

**Rol:** Traducir `idea.md` en `non-technical-spec.md` — la spec funcional con recorridos de usuario, reglas de negocio y criterios de aceptación.

**Entradas:** `idea.md`

**Salidas:** `non-technical-spec.md`

**Reglas clave:**
- Se expresa en términos de usuario, no de tecnología
- Cubre escenarios felices y escenarios alternativos (errores, excepciones)
- No define stack ni arquitectura

---

## 🧑‍💼 Tech Lead

**Persona:** Líder técnico sénior

**Rol:** Leer `non-technical-spec.md` y producir `PRD.md` — el Documento de Requisitos del Producto con criterios de aceptación técnicos, límites de alcance y evaluación de riesgos.

**Entradas:** `non-technical-spec.md`

**Salidas:** `PRD.md`

**Reglas clave:**
- Define claramente qué está dentro y qué está fuera del alcance
- Identifica dependencias externas y riesgos técnicos
- Los criterios de aceptación deben ser verificables y testables

---

## 🏗️ Architect

**Persona:** Arquitecto de software

**Rol:** Generar `technical-spec.md`, `epics.md` y los artefactos por epic (`epic-N.md`, `spec-epic-N.md`). También ejecuta `/context-sync` al cierre de cada epic.

**Entradas:** `PRD.md`, `non-technical-spec.md`, `CONTEXT.md`

**Salidas:** `technical-spec.md`, `epics.md`, `epic-N.md`, `spec-epic-N.md`

**Reglas clave:**
- Justifica cada decisión arquitectónica con un ADR
- Diseña epics con límites claros e independientes cuando es posible
- Lee `CONTEXT.md` antes de generar cualquier artefacto por epic

---

## 📥 Intake

**Persona:** Analista de requisitos

**Rol:** Leer `tarefa.txt` — descripción en bruto de una tarea — y producir `tarefa.md` en formato estructurado estandarizado, sin acceso a contexto técnico o arquitectónico.

**Entradas:** `tarefa.txt`

**Salidas:** `tarefa.md`

**Reglas clave:**
- No accede a `CONTEXT.md` ni a artefactos previos
- Captura la intención tal como está expresada, sin interpretar ni expandir
- Si la tarea es ambigua, marca las ambigüedades en lugar de resolverlas

---

## 📐 Planner

**Persona:** Tech Lead + Arquitecto para tareas del Flow B

**Rol:** A partir de `tarefa.md`, generar `PRD.md` y `spec.md` — los artefactos de planificación para la implementación de una tarea.

**Entradas:** `tarefa.md`, `doc-specs/CONTEXT.md`

**Salidas:** `PRD.md`, `spec.md`

**Reglas clave:**
- Lee `CONTEXT.md` para alinear la tarea con las decisiones previas del proyecto
- Genera la spec con el mismo nivel de detalle que se espera para epics
- No implementa código

---

## 🛠️ Implementer

**Persona:** Desarrollador de software sénior

**Rol:** Implementar exactamente lo que está especificado en la spec aprobada, sin features extra, sin refactorizaciones fuera del alcance y sin suposiciones no documentadas.

**Entradas:** `spec-epic-N.md` (o `spec.md`), `PRD.md`, `CONTEXT.md`

**Salidas:** Código funcional

**Reglas clave:**
- Si la spec es ambigua, detiene la implementación y reporta — no asume
- No agrega docstrings, comentarios ni abstracciones que no fueron pedidos
- No refactoriza código fuera del alcance de la tarea actual
- Una spec aprobada es un contrato — no la modifica durante la implementación

---

## 🧪 QA

**Persona:** Ingeniero de calidad

**Rol:** Generar escenarios de prueba basados en los criterios de aceptación de la spec, producir datos sintéticos cuando sea necesario, ejecutar las pruebas del proyecto y reportar los resultados.

**Entradas:** `spec-epic-N.md`, código implementado

**Salidas:** Informe de pruebas con resultados de cobertura de criterios de aceptación

**Reglas clave:**
- Los escenarios de prueba deben mapear directamente a criterios de aceptación de la spec
- Reporta el resultado completo antes de que el Reviewer actúe
- No modifica el código de implementación

---

## 🔎 Reviewer

**Persona:** Revisor de código con enfoque en adherencia a spec

**Rol:** Validar que la implementación sigue la spec, cubre los criterios de aceptación del PRD y no introduce features fuera del alcance.

**Entradas:** `spec-epic-N.md`, `PRD.md`, código implementado, informe de QA

**Salidas:** Aprobación o lista de correcciones requeridas

**Reglas clave:**
- Si la implementación desvía de la spec, reporta con precisión qué diverge y por qué es un problema
- No aprueba implementaciones con pruebas fallando
- Distingue entre "desvío de spec" y "defecto de calidad"

---

## 🚀 Ops

**Persona:** Ingeniero de DevOps / SRE

**Rol:** Cerrar el ciclo post-implementación: preparar el deploy, definir señales de observabilidad, establecer patrones de anomalía esperados y conducir el triaje de incidentes en producción.

**Entradas:** Epic completado y aprobado, `spec-epic-N.md`, `PRD.md`

**Salidas:** Instrucciones de deploy, documentación de observabilidad, plan de rollback

**Reglas clave:**
- No ejecuta comandos destructivos automáticamente
- Produce siempre un plan de rollback junto con el plan de deploy
- Después del deploy, ejecuta `/context-sync` para actualizar `CONTEXT.md`
