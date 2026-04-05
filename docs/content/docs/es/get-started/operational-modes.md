---
title: Modos Operativos
description: Cómo ejecutar el AI SDLC Kit desde el repositorio o con un bundle offline.
---

El AI SDLC Kit admite dos modos operativos listos para producción hoy. La mejor elección depende del nivel de restricción del entorno objetivo y del grado de gobernanza central que necesites.

## Modo 1 — Runtime versionado dentro del repositorio

Este es el modo más resistente para el uso diario y la mejor opción por defecto para proyectos altamente gobernados.

El repositorio objetivo contiene:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

En este modo:

- el flujo no depende del sitio público de documentación
- los archivos de runtime viajan junto con el propio proyecto
- el flujo sigue funcionando incluso cuando la ejecución de shell está muy restringida

## Modo 2 — Uso mediante bundle offline

Para una distribución offline aprobada, genera un bundle portátil:

```bash
bash scripts/package-bundle.sh
```

Esto produce:

- `dist/ai-sdlc-kit-<version>/`
- `dist/ai-sdlc-kit-<version>.tar.gz`
- `dist/ai-sdlc-kit-<version>.sha256`

El bundle está pensado para:

- mirrors internos
- entornos regulados de clientes
- estaciones de trabajo desconectadas
- procesos de incorporación de software basados en aprobación

El `scripts/package-bundle.sh` de este repositorio es un helper de distribución del propio AI SDLC Kit.

## Bootstrap bash-first

Cuando se permite la ejecución de shell, ejecuta el instalador desde la raíz del proyecto consumidor:

```bash
bash /ruta/a/ai-sdlc-kit/scripts/install.sh /ruta/a/ai-sdlc-kit
```

Por ejemplo:

```bash
cd /ruta/a/tu-proyecto
bash /ruta/a/ai-sdlc-kit/scripts/install.sh /ruta/a/ai-sdlc-kit
```

Si copiaste el kit dentro del repositorio consumidor como `./ai-sdlc-kit`, también puedes ejecutar:

```bash
cd /ruta/a/tu-proyecto
bash ./ai-sdlc-kit/scripts/install.sh ./ai-sdlc-kit
```

El script:

- crea `doc-specs/` si hace falta
- fusiona la configuración de descubrimiento en `.vscode/settings.json`
- evita PowerShell por completo

## Cuándo el sitio público es opcional

El sitio público sigue siendo la experiencia canónica de aprendizaje, pero ya no es obligatorio para ejecutar el flujo.

Para el flujo real, lo mínimo necesario es:

1. que los archivos de runtime estén presentes
2. que el descubrimiento de prompts y agentes en VS Code esté configurado
3. que exista `doc-specs/`

Después de eso, el usuario puede comenzar con:

- `doc-specs/idea.txt` para el Flujo A
- `doc-specs/task.txt` para el Flujo B

## Lectura relacionada

- [Instalación](/es/get-started/installation)
- [Quick Start](/es/get-started/quick-start)
- [Entornos Gobernados](/es/get-started/governed-environments)
