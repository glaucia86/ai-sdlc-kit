---
title: Modos Operativos
description: Cómo ejecutar el AI SDLC Kit desde el repositorio, mediante APM o con un bundle offline.
---

El AI SDLC Kit admite dos modos operativos listos para producción hoy, además de una ruta futura de distribución todavía en validación. La mejor elección depende del nivel de restricción del entorno objetivo y del grado de gobernanza central que necesites.

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
- el flujo no depende de APM en tiempo de ejecución
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

Para los repositorios que ya consumen paquetes APM y tienen `apm.lock.yaml`, el comando oficial para un bundle portátil es:

```bash
apm pack --archive
```

El `scripts/package-bundle.sh` de este repositorio es un helper de distribución del propio AI SDLC Kit.

## Bootstrap bash-first

Cuando se permite la ejecución de shell, el bootstrap preferido es:

```bash
bash scripts/install.sh
```

Para apuntar a un bundle descomprimido o a una ruta compartida del kit:

```bash
bash scripts/install.sh /ruta/a/ai-sdlc-kit
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

## Ruta futura — distribución mediante APM

Este repositorio ya contiene un `apm.yml`, y el flujo normal de consumidor APM sigue siendo válido:

- versionar `apm.yml`
- versionar `apm.lock.yaml`
- ignorar `apm_modules/`

Sin embargo, la validación real con el CLI mostró que el layout actual del paquete todavía no es reconocido por APM como prompts, agents, instructions o skills desplegables automáticamente en el árbol `.github/` del consumidor.

Por ahora, esto significa:

- APM es una ruta futura de distribución
- APM no es la ruta recomendada de instalación para este kit
- las rutas listas para producción son la copia directa y `bash scripts/install.sh`

## Lectura relacionada

- [Instalación](/es/get-started/installation)
- [Quick Start](/es/get-started/quick-start)
- [Entornos Gobernados](/es/get-started/governed-environments)
