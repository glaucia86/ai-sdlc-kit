---
title: Entornos Gobernados
description: Cómo operar el AI SDLC Kit en entornos restringidos con automatización bash-only y artefactos aprobados.
---

Esta guía es para entornos donde:

- el acceso a internet es restringido o está totalmente bloqueado
- no se puede usar PowerShell
- solo se aprueba bash para automatización
- las fuentes de paquetes deben venir de un punto interno aprobado

## Modelo operativo recomendado

Usa una estrategia de distribución dual-mode:

1. usa APM como fuente de verdad del empaquetado
2. publica un bundle offline aprobado para consumidores restringidos
3. permite archivos de runtime versionados directamente en el repositorio como fallback con menos piezas móviles

Esto da una experiencia fluida de paquete a los equipos normales sin obligar a los consumidores regulados a depender de internet o PowerShell.

## Runtime mínimo aprobado

El repositorio objetivo solo necesita:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

El sitio público de documentación es opcional cuando estos archivos ya están disponibles.

## Rutas aprobadas de instalación

### Ruta A — Versionar el runtime dentro del proyecto

Esta es la opción más fuerte para bancos y otras organizaciones muy controladas.

Evita descargas de paquetes en tiempo de ejecución y permite que el proyecto viaje con todo lo necesario.

### Ruta B — Descomprimir un bundle offline aprobado

Si APM está disponible en el entorno gobernado:

```bash
apm unpack ai-sdlc-kit-<version>.tar.gz --output /ruta/al/proyecto
```

Si APM no está disponible:

1. extrae el archivo con la herramienta `tar` aprobada
2. ejecuta el bootstrap bash desde la carpeta descomprimida

```bash
bash scripts/install.sh /ruta/aprobada/ai-sdlc-kit
```

### Ruta C — Reflejar el paquete APM internamente

Si la organización permite APM solo contra fuentes internas, refleja el paquete y consúmelo desde el registry o el Git mirror aprobado.

## Fallback sin instalador

Si la ejecución de scripts está bloqueada incluso para bash, el kit sigue funcionando:

1. copia `.github/agents`, `.github/prompts`, `.github/templates`, `.github/skills` y `.github/docs` en el repositorio
2. configura `.vscode/settings.json` manualmente
3. crea `doc-specs/`
4. inicia el flujo

Este fallback importa porque algunos entornos regulados permiten entrega de archivos, pero restringen la ejecución de scripts.

## Recomendación de release enterprise

Para clientes gobernados, publica tres artefactos por versión:

1. la fuente APM con `apm.yml`
2. el bundle offline `.tar.gz`
3. el archivo de checksum `sha256`

Almacénalos en un punto interno aprobado, como:

- mirror Git interno
- Artifactory o Nexus
- Azure DevOps artifacts
- recurso compartido firmado

## Regla práctica

No obligues a un cliente restringido a depender de:

- el sitio público de documentación
- PowerShell
- descargas de paquetes por internet
- instalación de herramientas en tiempo de uso

El kit debe seguir siendo utilizable solo con archivos locales aprobados.

## Lectura relacionada

- [Instalación](/es/get-started/installation)
- [Modos Operativos](/es/get-started/operational-modes)
