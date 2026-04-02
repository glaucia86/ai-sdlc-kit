---
title: Quick Start
description: Ejecuta tu primer descubrimiento con el AI SDLC Kit en menos de 5 minutos.
---

Esta guía te presenta el primer paso del Flow A — tomar una idea en bruto y convertirla en un documento estructurado usando el agente 🧭 Discovery.

## Paso 1 — Crea el archivo de idea

Dentro de la carpeta `doc-specs/`, crea un archivo llamado `idea.txt`:

```
doc-specs/idea.txt
```

Escribe tu idea libremente — sin formato obligatorio, sin estructura. El kit existe para organizarla por ti. Por ejemplo:

```
Quiero crear una app de gestión de tareas donde los desarrolladores
puedan hacer seguimiento de sus elementos de trabajo diarios. Debe ser
sencilla, orientada al teclado e integrada con GitHub Issues para que
las tareas puedan vincularse a issues reales.

Debe funcionar como una aplicación web y opcionalmente sincronizar offline.
```

---

## Paso 2 — Ejecuta `/discovery-refine`

Abre el panel de GitHub Copilot Chat y ejecuta:

```
/discovery-refine
```

El agente 🧭 Discovery lee `idea.txt` y genera `doc-specs/idea.md`.

**Qué ocurre:**
- El agente preserva tu idea original fielmente — no añade funcionalidades ni decisiones técnicas
- Estructura la idea en secciones: enunciado del problema, usuarios objetivo, escenarios clave, ambigüedades explícitas
- Si algo no está claro, el agente registra preguntas abiertas en lugar de asumir

---

## Paso 3 — Revisa `idea.md` (HIL checkpoint)

Abre `doc-specs/idea.md` y revisa:

- ¿Se preservó la idea original con precisión?
- ¿Las ambigüedades están claramente señaladas?
- ¿Inventó el agente algo que no estaba en `idea.txt`?

Si algo está mal, ajusta `idea.txt` y vuelve a ejecutar `/discovery-refine`. **No avances hasta que esté bien.**

---

## Qué esperar como salida

`doc-specs/idea.md` contendrá una versión estructurada de tu idea, normalmente organizada así:

| Sección | Contenido |
|---|---|
| **Problema** | Qué problema resuelve la idea |
| **Usuarios objetivo** | Quién se beneficia de la solución |
| **Escenarios clave** | Los recorridos de usuario más importantes |
| **Fuera del alcance** | Lo que explícitamente no está incluido |
| **Preguntas abiertas** | Ambigüedades que deben resolverse antes de avanzar |

---

## Próximos pasos

Después de validar `idea.md`, continúa con la fase de Discovery completa:

1. `/discovery-spec` — agente PM genera `non-technical-spec.md`
2. `/discovery-prd` — agente Tech Lead genera `PRD.md`
3. `/discovery-tech-spec` — agente Architect genera `technical-spec.md`
4. `/discovery-epics` — agente Architect genera `epics.md`

Consulta la [guía de la fase de Discovery](/ai-sdlc-kit/es/guide/discovery-phase/) para el recorrido completo.
