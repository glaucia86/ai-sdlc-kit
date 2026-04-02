---
title: Proyecto Existente
description: Cómo integrar el AI SDLC Kit en un proyecto que ya está en desarrollo.
---

Integrar el AI SDLC Kit en un proyecto existente es diferente a comenzar desde cero. El proyecto ya tiene decisiones tomadas, código en producción y contexto que los agentes necesitan conocer antes de actuar.

---

## Evaluación inicial

Antes de ejecutar cualquier prompt, evalúa el estado actual del proyecto:

| Aspecto | Preguntas a responder |
|---|---|
| **Documentación existente** | ¿Hay un PRD, spec técnica o documentación de arquitectura? |
| **Stack tecnológico** | ¿Qué tecnologías están en uso? ¿Hay restricciones de versión? |
| **Decisiones de arquitectura** | ¿Qué decisiones ya fueron tomadas y no deben cuestionarse? |
| **Trabajo en progreso** | ¿Hay features a medio implementar? ¿Hay deuda técnica relevante? |
| **Restricciones de producción** | ¿Hay SLAs, requisitos de seguridad o compliance activos? |

---

## Paso 1: Crear `CONTEXT.md` manualmente

Antes de invocar cualquier agente, crea `doc-specs/CONTEXT.md` con el estado actual del proyecto. Este es el paso más importante para la integración exitosa.

```markdown
# CONTEXT.md

## Estado actual del proyecto
[Describe qué existe hoy: componentes, APIs, base de datos, integraciones]

## Decisiones arquitectónicas activas
- ADR-001: [decisión ya tomada y su justificación]
- ADR-002: [otra decisión establecida]

## Restricciones activas
- [restricciones que los agentes deben respetar]

## Trabajo en progreso
- [features o tareas actualmente en desarrollo]
```

No necesitas un `CONTEXT.md` perfecto para empezar. Un `CONTEXT.md` básico es mejor que ninguno.

---

## Paso 2: Elegir el punto de entrada

Dependiendo del estado del proyecto, puedes entrar en diferentes puntos del pipeline:

### Si tienes una idea/feature definida pero no especificada

Usa el **Flow A desde `/discovery-spec`** — ya tienes la idea, necesitas la spec funcional y técnica.

### Si tienes la feature bien definida pero no tienes spec técnica de implementación

Usa el **Flow B completo** — crea `tarefa.txt` con la descripción y ejecuta `/task-init` → `/task-prd` → `/task-spec`.

### Si ya tienes el PRD aprobado pero no la spec de implementación

Usa **`/task-spec`** directamente, proporcionando el PRD existente como contexto.

---

## Paso 3: Ejecutar el ciclo normal

Una vez que tengas la spec aprobada en el HIL checkpoint, el ciclo es idéntico al de un proyecto nuevo:

```
/task-implement
/task-tests
/task-review
```

---

## Paso 4: Sincronizar el contexto

Después de cada entrega, sincroniza el contexto:

```
/context-sync <N>
```

Esto garantiza que `CONTEXT.md` refleje el estado actualizado del proyecto para las próximas tareas.

---

## Errores comunes al integrar en proyectos existentes

| Error | Por qué es un problema | Cómo evitarlo |
|---|---|---|
| No crear `CONTEXT.md` inicial | Los agentes actúan sin conocer el sistema existente | Crea `CONTEXT.md` antes de cualquier prompt |
| Dar inputs vagos al Intake | `tarefa.md` hereda la vaguedad | Sé específico en `tarefa.txt` — el Intake no infiere contexto que no está escrito |
| Asumir que el Implementer conoce el código existente | El Implementer solo conoce lo que está en la spec y en `CONTEXT.md` | Incluye en la spec referencias a módulos y patrones existentes |
| Saltarse los HIL checkpoints por "conocer el proyecto" | El sesgo de familiaridad hace ignorar suposiciones incorrectas | Lee los artefactos como si otro los hubiera escrito |
| No actualizar `CONTEXT.md` después de cada entrega | El contexto queda desactualizado y los agentes actúan sobre información incorrecta | Ejecuta siempre `/context-sync` después del deploy |

---

## Integrando con un equipo existente

Si el proyecto tiene más de un desarrollador:

- Define quién es responsable de ejecutar los HIL checkpoints para cada tipo de artefacto
- Usa `decisions-log.md` para registrar decisiones de arquitectura del equipo, no solo las de los agentes
- Asegúrate de que todos los miembros del equipo entiendan que `CONTEXT.md` es la fuente de verdad para el contexto del proyecto
