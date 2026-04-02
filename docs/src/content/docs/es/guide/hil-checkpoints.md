---
title: HIL Checkpoints
description: Referencia de todos los puntos de validación humana en el AI SDLC Kit.
---

Los HIL (Human-in-the-Loop) checkpoints son los puntos de pausa obligatorios donde un humano valida el trabajo producido antes de que el pipeline avance. Son la garantía de que la IA ejecuta la intención humana, no la suya propia.

---

## Por qué los HIL checkpoints no son opcionales

Un agente de IA puede producir artefactos con apariencia convincente — bien estructurados, internamente consistentes — pero equivocados desde el punto de vista del producto. Los checkpoints existen porque:

1. **La IA no puede inferir contexto implícito** — lo que no está en el prompt no está en el output
2. **Los errores se amplifican** — una spec equivocada produce código equivocado a escala
3. **El contrato de calidad** — quien aprueba en el HIL asume responsabilidad sobre lo que se construirá

Omitir un HIL checkpoint no ahorra tiempo. Garantiza retrabajo.

---

## Flow A — Checkpoints

| Paso | Artefacto a revisar | Qué verificar |
|---|---|---|
| `/discovery-refine` | `idea.md` | ¿La idea fue capturada sin distorsión? ¿Falta contexto importante? |
| `/discovery-spec` | `non-technical-spec.md` | ¿Los recorridos de usuario son correctos? ¿Las reglas de negocio son completas? |
| `/discovery-prd` | `PRD.md` | ¿El alcance está bien delimitado? ¿Los criterios de aceptación son verificables? |
| `/discovery-tech-spec` | `technical-spec.md` | ¿Las decisiones de arquitectura son razonables? ¿Hay riesgos no considerados? |
| `/discovery-epics` | `epics.md` | ¿La secuenciación tiene sentido? ¿Hay epics faltantes o redundantes? |
| `/epic-init <N>` | `spec-epic-N.md` | ¿Las tareas son claras? ¿Los criterios de aceptación son testables? |
| `/epic-close <N>` | Resumen del epic | ¿Todo el alcance fue implementado y probado correctamente? |

---

## Flow B — Checkpoints

| Paso | Artefacto a revisar | Qué verificar |
|---|---|---|
| `/task-init` | `tarefa.md` | ¿La tarea fue capturada correctamente? ¿El contexto es suficiente? |
| `/task-prd` | `PRD.md` | ¿El alcance y los criterios de aceptación son correctos? |
| `/task-spec` | `spec.md` | ¿La spec es suficientemente precisa? ¿No hay ambigüedades sin resolver? |

---

## Qué buscar en cada checkpoint

### En documentos de discovery (`idea.md`, `non-technical-spec.md`)

- [ ] ¿La idea/spec refleja lo que realmente quieres construir?
- [ ] ¿Hay suposiciones implícitas que el agente hizo sin preguntar?
- [ ] ¿Falta contexto de dominio que solo tú conoces?

### En el PRD

- [ ] ¿El alcance está claramente delimitado (incluye y excluye)?
- [ ] ¿Los criterios de aceptación son verificables y no ambiguos?
- [ ] ¿Los riesgos identificados son reales y las mitigaciones son razonables?

### En `technical-spec.md`

- [ ] ¿El stack tecnológico es adecuado para el contexto del proyecto?
- [ ] ¿Las decisiones de arquitectura tienen justificación válida?
- [ ] ¿Hay restricciones de seguridad, performance o compliance que faltan?

### En `epics.md`

- [ ] ¿El primer epic entrega valor de forma independiente?
- [ ] ¿Las dependencias entre epics están capturadas?
- [ ] ¿El tamaño de cada epic es manejable (no demasiado grande)?

### En `spec-epic-N.md` (el más crítico)

- [ ] ¿Cada tarea tiene una descripción sin ambigüedad?
- [ ] ¿Los criterios de aceptación son testables?
- [ ] ¿Las restricciones de implementación son explícitas?
- [ ] ¿El árbol de archivos esperado está correcto?
- [ ] ¿Hay alguna tarea que podría interpretarse de dos formas?

---

## Cuándo devolver para revisión

Si en cualquier checkpoint encuentras problemas, **no avances**. En su lugar:

1. Identifica específicamente qué está mal
2. Proporciona feedback concreto al agente (no solo "esto está mal")
3. Ejecuta el prompt nuevamente con el contexto corregido
4. Revisa el nuevo artefacto antes de avanzar

**Ejemplo de feedback de calidad:**

> "La spec asume que el usuario tiene sesión activa, pero no hay un paso de autenticación definido. Agrega una tarea para validar el token antes de procesar la solicitud."

**Ejemplo de feedback de baja calidad:**

> "Esto no es lo que quiero."

El segundo tipo de feedback producirá un artefacto igualmente incorrecto en la próxima iteración.

---

## Cuándo reformular la spec completa

Si durante la implementación o revisión descubres que la spec tiene un problema fundamental (no un detalle faltante, sino una suposición incorrecta de base), el camino correcto es:

1. Detén la implementación
2. Vuelve al artefacto raíz del problema (puede ser `PRD.md` o `technical-spec.md`)
3. Corrige desde ahí y regenera los artefactos descendentes
4. Registra la decisión en `decisions-log.md`

Esto parece costoso, pero es más barato que descubrir el problema después de implementar sobre una base incorrecta.
