---
title: Nuevo Proyecto
description: Cómo usar el AI SDLC Kit para construir un proyecto desde cero.
---

Este escenario cubre el uso del AI SDLC Kit para un proyecto nuevo — desde una idea en bruto hasta el código en producción, usando el Flow A completo.

---

## Punto de partida

Tienes una idea. Puede ser una oración o varios párrafos. No importa el formato; importa que captura la esencia de lo que quieres construir.

Crea `doc-specs/idea.txt`:

```
Quiero construir una herramienta de CLI que automatice la generación
de changelogs a partir de commits de Git, con soporte para
Conventional Commits y exportación a Markdown y HTML.
```

---

## Fase 1 — Discovery

La fase de Discovery transforma tu idea en artefactos estructurados listos para la planificación técnica.

### Paso 1: Estructurar la idea

```
/discovery-refine
```

El agente 🧭 Discovery produce `idea.md`. Revisa que tu idea fue capturada sin distorsión.

> **HIL checkpoint:** ¿`idea.md` representa correctamente lo que quieres construir?

### Paso 2: Spec funcional

```
/discovery-spec
```

El agente 🗂️ PM produce `non-technical-spec.md` con los recorridos de usuario y las reglas de negocio.

> **HIL checkpoint:** ¿Los recorridos de usuario y las reglas de negocio son correctos y completos?

### Paso 3: PRD

```
/discovery-prd
```

El agente 🧑‍💼 Tech Lead produce `PRD.md` con el alcance, los criterios de aceptación y los riesgos.

> **HIL checkpoint:** ¿El alcance está bien delimitado? ¿Los criterios de aceptación son verificables?

### Paso 4: Arquitectura

```
/discovery-tech-spec
```

El agente 🏗️ Architect produce `technical-spec.md` con el stack, la arquitectura y los ADRs.

> **HIL checkpoint:** ¿Las decisiones de arquitectura son adecuadas para el contexto?

### Paso 5: Epics

```
/discovery-epics
```

El agente 🏗️ Architect produce `epics.md` con la secuenciación del trabajo.

> **HIL checkpoint:** ¿La secuenciación y los límites de los epics tienen sentido?

---

## Fase 2 — Spec y entrega por epic

Para cada epic en `epics.md`, repite el siguiente ciclo:

### Inicio del epic

```
/epic-init 1
```

El agente 🏗️ Architect produce `epic-1.md` y `spec-epic-1.md`. Esta es la puerta más importante.

> **HIL checkpoint:** ¿La spec es suficientemente precisa? ¿Las tareas son claras y sin ambigüedad? ¿Los criterios de aceptación son testables?

### Implementación por tarea

Para cada tarea en `spec-epic-1.md`:

```
/task-implement
/task-tests
/task-review
```

Si la revisión aprueba, avanza a la siguiente tarea. Si no, corrige y reinicia desde `/task-implement`.

### Cierre del epic

```
/epic-close 1
```

El agente 🚀 Ops prepara el deploy y la documentación de observabilidad.

> **HIL checkpoint:** ¿El epic está completo y listo para producción?

```
/context-sync 1
```

El agente 🏗️ Architect actualiza `CONTEXT.md` con el conocimiento acumulado.

---

## Repite para cada epic

```
/epic-init 2
# implementación del epic 2
/epic-close 2
/context-sync 2

/epic-init 3
# implementación del epic 3
/epic-close 3
/context-sync 3
```

---

## Artefactos producidos al final

```
doc-specs/
├── idea.txt
├── idea.md
├── non-technical-spec.md
├── PRD.md
├── technical-spec.md
├── epics.md
├── epic-1.md
├── spec-epic-1.md
├── epic-2.md
├── spec-epic-2.md
├── CONTEXT.md
└── decisions-log.md
```

---

## Duración estimada de las fases

El tiempo varía mucho según la complejidad del proyecto, pero en general:

- **Discovery completo** (pasos 1-5): puede hacerse en una sola sesión de trabajo si la idea es clara
- **Spec de un epic** (epic-init): 15-30 minutos incluyendo el HIL checkpoint
- **Implementación de un epic**: depende de la complejidad de las tareas

La mayor inversión de tiempo es en los HIL checkpoints — y es intencional. El tiempo invertido en revisar artefactos evita retrabajo en la implementación.
