---
title: Fase de Operations
description: Cierra el epic, hace el deploy y sincroniza el contexto para el próximo ciclo.
---

La fase de Operations es el cierre estructurado del epic: empaqueta el trabajo completo, ejecuta el deploy y actualiza la memoria compartida del proyecto para que los epics futuros se beneficien del conocimiento acumulado.

---

## El flujo de cierre

```
todas las tareas aprobadas por Reviewer
         ↓
     /epic-close <N>
         ↓
   gate de producción  ← HITL ✅ validación final
         ↓
      merge + deploy
         ↓
   /context-sync <N>
         ↓
    próximo epic o fin
```

---

## `/epic-close <N>`

**Agente:** 🚀 Ops

**Entradas:** `spec-epic-N.md`, `PRD.md`, informe de QA, código revisado

**Acciones:**
- Verifica que todos los criterios de aceptación están cubiertos
- Prepara el resumen de deploy (qué cambió, dependencias de entorno, variables nuevas)
- Define las señales de observabilidad (métricas, logs, alertas) para el epic
- Define los patrones de anomalía esperados en producción

**Salida:** Epic listo para merge y deploy, con documentación de observabilidad.

---

## Gate de producción

Antes del merge, el agente 🚀 Ops presenta un resumen del epic para validación humana:

> **HITL checkpoint:** ¿El epic N está completo, con todas las pruebas pasando y sin desvíos de spec?

Este es el último checkpoint antes de que el código llegue a la rama principal. Su propósito es garantizar que el responsable técnico o el dueño del producto confirme conscientemente que el epic está listo.

---

## Deploy

El proceso de deploy es específico del proyecto. El agente Ops genera las instrucciones de deploy pero no ejecuta comandos destructivos automáticamente.

Ejemplos de lo que Ops puede preparar:
- comandos de build y deploy para el entorno de staging
- variables de entorno nuevas que deben ser configuradas
- migraciones de base de datos que deben ejecutarse antes del deploy
- rollback plan en caso de fallo

---

## `/context-sync <N>`

**Agente:** 🏗️ Architect

**Propósito:** Actualizar `doc-specs/CONTEXT.md` con el conocimiento acumulado en este epic.

**Qué se registra:**
- Resumen del epic completado (qué se construyó, por qué)
- ADRs (Architecture Decision Records) de `decisions-log.md`
- Aprendizajes que afectan los próximos epics
- Riesgos identificados durante la implementación
- Estado del sistema después del epic

**Por qué importa:** `CONTEXT.md` es la memoria persistente del proyecto. Todos los agentes la leen al inicio de cada epic. Sin una sincronización de contexto, los agentes del próximo epic pueden tomar decisiones que contradigan o dupliquen trabajo ya hecho.

---

## Triaje de incidentes

Si surge un problema en producción después del deploy, el agente 🚀 Ops conduce el triaje:

1. Clasifica la severidad del incidente
2. Identifica el componente afectado
3. Propone hipótesis basadas en los cambios del último epic
4. Sugiere acciones de mitigación (rollback, hotfix, configuración)
5. Documenta el incidente para el `decisions-log.md`

---

## El ciclo continúa

Después de `/context-sync`, el proyecto está listo para el siguiente epic:

```bash
# Inicializa el próximo epic
/epic-init 2
```

El ciclo de Discovery → Spec → Epic → Operations se repite por cada epic hasta completar todos los epics definidos en `epics.md`.
