---
title: Desarrollador Solo
description: Cómo adaptar el AI SDLC Kit cuando trabajas sin equipo.
---

El AI SDLC Kit fue diseñado para equipos, pero funciona bien para un desarrollador en solitario. La diferencia está en cómo manejas los HIL checkpoints y cómo adaptas el proceso sin perder sus garantías fundamentales.

---

## El desafío del desarrollador solo

El riesgo principal cuando trabajas solo es el **sesgo de confirmación**: como eres el autor del input (`idea.txt`, `tarefa.txt`), los artefactos producidos por los agentes te parecen razonables casi siempre — porque reflejan tu propia visión.

Esto lleva a aprobar artefactos que tienen suposiciones incorrectas o ambigüedades que solo se descubren durante la implementación.

---

## La regla de las 24 horas

> **Nunca apruebes un artefacto inmediatamente después de que fue generado.**

Espera al menos algunas horas — idealmente hasta el día siguiente — antes de revisar un artefacto en un HIL checkpoint. El distanciamiento temporal te ayuda a leerlo de forma más crítica, como si fuera de otra persona.

Esta es la adaptación más importante para el desarrollador solo.

---

## HIL simplificado para solo dev

No necesitas ser tan formal como en un equipo, pero los checkpoints siguen siendo obligatorios. Una versión simplificada:

| Artefacto | Qué revisar |
|---|---|
| `idea.md` | ¿Falta algo importante? ¿Hay algo que no escribiste pero que el agente asumió? |
| `non-technical-spec.md` | ¿Los recorridos de usuario cubren todos los casos que importan? |
| `PRD.md` | ¿El alcance es alcanzable para ti en el tiempo disponible? |
| `technical-spec.md` | ¿El stack es el que usarías tú con tu nivel de experiencia? |
| `spec-epic-N.md` | ¿Podrías implementar esto sin volver a mirar el artefacto a mitad del trabajo? |

---

## Roles adaptados para solo dev

Como desarrollador solo, eres el humano detrás de todos los agentes. Los agentes hacen el trabajo por ti, pero tú defines las entradas y apruebas los outputs.

| Rol de agente | Qué haces tú |
|---|---|
| 🧭 Discovery | Escribes `idea.txt` lo más claro posible |
| 🗂️ PM / 🧑‍💼 Tech Lead | Revisas los artefactos con ojo crítico de producto |
| 🏗️ Architect | Validas las decisiones técnicas con tu experiencia |
| 🛠️ Implementer | Revisas el código generado antes de dar por aprobada la tarea |
| 🧪 QA | Verificas que las pruebas generadas cubren lo que importa |
| 🔎 Reviewer | Te preguntas: ¿implementé lo que decía la spec, o lo que creía que debía hacer? |
| 🚀 Ops | Defines el proceso de deploy que funciona para tu contexto |

---

## Errores comunes del desarrollador solo

| Error | Cómo evitarlo |
|---|---|
| Aprobar la spec inmediatamente | Usa la regla de las 24 horas |
| Skipar `/task-review` porque "sé que funcionó" | El Reviewer valida adherencia a spec, no solo que funcione |
| No llenar `CONTEXT.md` porque "yo me acuerdo" | Tú del epic 5 no se acuerda de las decisiones del epic 1 |
| Escribir `idea.txt` en 2 líneas | Más contexto en el input = mejores artefactos |
| Implementar features que no están en la spec porque "son obvias" | El Implementer no debe hacerlo, y tú tampoco |

---

## Cuándo usar Flow A vs. Flow B como solo dev

| Situación | Flujo recomendado |
|---|---|
| Nuevo proyecto con idea no completamente definida | Flow A desde `/discovery-refine` |
| Feature nueva en proyecto existente | Flow B (`/task-init` → `/task-prd` → `/task-spec`) |
| Bug fix o mejora pequeña bien definida | Flow B, posiblemente usando solo `/task-spec` directamente |
| Refactorización con alcance claramente delimitado | Flow B con spec muy precisa |

---

## Ventaja del desarrollador solo

Como todos los contextos viven en tu cabeza, puedes enriquecer los artefactos de los agentes con correcciones precisas en los HIL checkpoints. Esto hace que tu ciclo sea más rápido que el de un equipo coordinando revisiones — si usas bien el distanciamiento temporal y lees los artefactos con ojo crítico.
