---
title: Fase de Epic
description: Implementa, prueba y revisa cada tarea dentro de un epic.
---

La fase de Epic es el núcleo del ciclo de desarrollo: donde el código se escribe, prueba y valida. Cada epic pasa por un ciclo de tres prompts para cada tarea: **implementar → pruebas → revisión**.

Esta fase comienza solo después de que la spec del epic (fase anterior) fue aprobada en el HITL checkpoint.

---

## El ciclo por tarea

```
spec aprobada
     ↓
/task-implement   ← Implementer escribe el código
     ↓
/task-tests       ← QA genera y ejecuta pruebas
     ↓
/task-review      ← Reviewer valida adherencia a la spec
     ↓
¿Aprobado? → próxima tarea o /epic-close
     ↓ No
    revisar spec o reimplementar
```

---

## `/task-implement`

**Agente:** 🛠️ Implementer

**Entradas:** `spec-epic-N.md` (o `spec.md`), `PRD.md`, `doc-specs/CONTEXT.md`

**Comportamiento:**
- Implementa estrictamente lo que está especificado, sin features extra
- No refactoriza código fuera del alcance de la tarea
- No agrega comentarios, docstrings ni abstracciones no solicitadas
- Si encuentra ambigüedad en la spec, detiene la implementación y reporta — no asume

**Salida:** Código funcional que satisface la tarea definida en la spec.

:::caution[Para proyectos frontend]
El Implementer no aplica decisiones de diseño visual arbitrariamente. Si la spec no define el diseño, el Implementer debe usar el componente o estilo más simple posible y marcar la decisión como pendiente de revisión de UX.
:::

---

## `/task-tests`

**Agente:** 🧪 QA

**Entradas:** `spec-epic-N.md`, implementación producida por Implementer

**Comportamiento:**
- Genera escenarios de prueba basados en criterios de aceptación de la spec
- Produce datos sintéticos cuando aplica
- Ejecuta las pruebas del proyecto
- Reporta el resultado antes de la revisión

**Salida:** Informe de pruebas con resultados y cobertura de los criterios de aceptación.

---

## `/task-review`

**Agente:** 🔎 Reviewer

**Entradas:** `spec-epic-N.md`, `PRD.md`, implementación, informe de pruebas de QA

**Comportamiento:**
- Valida adherencia entre spec e implementación
- Verifica que los criterios de aceptación del PRD estén cubiertos
- Valida que no se introdujeron features fuera del alcance
- Si encuentra desvíos, reporta claramente qué está mal y por qué

**Salida:** Aprobación (listo para el siguiente paso) o lista de correcciones requeridas.

---

## Secuencia para múltiples tareas

Cuando la spec tiene más de una tarea, el ciclo se repite por tarea:

```
Tarea 1: /task-implement → /task-tests → /task-review ✅
Tarea 2: /task-implement → /task-tests → /task-review ✅
Tarea 3: /task-implement → /task-tests → /task-review ✅
         ↓
      /epic-close <N>
```

No pases a la siguiente tarea si la revisión de la tarea actual no fue aprobada.

---

## Cuándo volver a la spec

Si durante la implementación o revisión se descubre que la spec es incompleta, ambigua o incorrecta:

1. **Detén** el ciclo de implementación
2. **Actualiza** `spec-epic-N.md` con la corrección necesaria
3. **Registra** la decisión en `doc-specs/decisions-log.md`
4. **Reinicia** la tarea desde `/task-implement`

No intentes implementar una spec que sabes que está mal. El costo de corregir la spec antes es mucho menor que el costo de corregir el código después.

---

## Próximo paso

Con todas las tareas del epic aprobadas, cierra el epic:

```bash
/epic-close 1
```

Consulta [Fase de Operations](/ai-sdlc-kit/es/guide/operations-phase/) para el proceso de cierre.
