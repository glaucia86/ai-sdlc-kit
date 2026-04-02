---
title: Human-in-the-Loop (HIL)
description: Por qué la supervisión humana no es opcional en el AI SDLC Kit.
---

El Human-in-the-Loop (HIL) es el principio de que los humanos deben estar presentes en los puntos de decisión críticos del pipeline — no solo como observadores, sino como validadores conscientes y responsables.

---

## Qué es un HIL checkpoint

Un HIL checkpoint es una pausa obligatoria en el pipeline donde un humano lee el artefacto producido por un agente y decide conscientemente:

> **¿Este artefacto es suficientemente correcto y preciso para guiar el siguiente paso?**

Si la respuesta es sí, el pipeline avanza. Si es no, el artefacto se corrige antes de continuar.

---

## Por qué no es opcional

Los checkpoints HIL existen porque:

1. **La IA no tiene acceso a tu contexto implícito** — el conocimiento de dominio, la política de la empresa, las restricciones no escritas que tú cargas en tu cabeza
2. **Los errores se amplifican** — una suposición incorrecta en `idea.md` se propaga a `non-technical-spec.md`, luego a `PRD.md`, luego a `technical-spec.md`, y finalmente al código
3. **La responsabilidad no puede delegarse a la IA** — quien aprueba en el checkpoint asume responsabilidad sobre lo que se construirá

Un checkpoint omitido no es una optimización. Es una transferencia de riesgo invisible.

---

## Rubber stamp vs. revisión real

Un HIL checkpoint de calidad no es firmar sin leer. Es:

| Revisión real | Rubber stamp |
|---|---|
| Leer el artefacto completo | Hacer scroll y aprobar |
| Verificar contra la lista de comprobación | No tener lista de comprobación |
| Identificar suposiciones incorrectas | Asumir que el agente tuvo razón |
| Dar feedback específico cuando hay problemas | Aprobar con "parece bien" |
| Sentirse responsable del output | Tratar el output como del agente |

---

## HIL checkpoints en Flow A

| Checkpoint | Artefacto | Pregunta clave |
|---|---|---|
| Post `/discovery-refine` | `idea.md` | ¿Tu idea fue capturada sin distorsión? |
| Post `/discovery-spec` | `non-technical-spec.md` | ¿Los recorridos de usuario y reglas de negocio son correctos? |
| Post `/discovery-prd` | `PRD.md` | ¿El alcance y los criterios de aceptación son correctos? |
| Post `/discovery-tech-spec` | `technical-spec.md` | ¿Las decisiones de arquitectura son razonables? |
| Post `/discovery-epics` | `epics.md` | ¿La secuenciación y los límites de los epics tienen sentido? |
| Post `/epic-init N` | `spec-epic-N.md` | ¿La spec es suficientemente precisa para implementar sin ambigüedad? |
| Post `/epic-close N` | Resumen de epic | ¿El epic está completo y listo para producción? |

---

## HIL checkpoints en Flow B

| Checkpoint | Artefacto | Pregunta clave |
|---|---|---|
| Post `/task-init` | `tarefa.md` | ¿La tarea fue capturada correctamente? |
| Post `/task-prd` | `PRD.md` | ¿El alcance y los criterios de aceptación son correctos? |
| Post `/task-spec` | `spec.md` | ¿La spec es suficientemente precisa? |

---

## Consejo para desarrolladores en solitario

Cuando trabajas solo, el riesgo de los checkpoints es el sesgo de confirmación: aprobas porque tú mismo escribiste el input y te parece razonable.

Estrategia recomendada: **lee el artefacto como si alguien más lo hubiera escrito**. Pregúntate:
- ¿Habría entendido esto si no hubiera escrito `idea.txt` yo mismo?
- ¿Hay suposiciones aquí que solo yo entiendo?
- ¿Un desarrollador diferente implementaría algo diferente a partir de esta spec?

Si la respuesta a cualquiera de esas preguntas es sí, la spec necesita más precisión antes de avanzar.
