---
title: Entornos Gobernados
description: Cómo operar el AI SDLC Kit en entornos restringidos con automatización bash-only y artefactos aprobados.
---

Esta guía es para entornos donde:

- el acceso a internet es restringido o está totalmente bloqueado
- no se puede usar PowerShell
- solo se aprueba bash para automatización
- los artefactos de release deben venir de un punto interno aprobado

## Modelo operativo recomendado

Usa una estrategia con dos rutas soportadas:

1. versiona el runtime directamente dentro del proyecto cuando se requiera el máximo control
2. publica un bundle offline aprobado para consumidores restringidos

Esto mantiene a los consumidores regulados independientes de internet, registries de paquetes y PowerShell, sin renunciar a una distribución centralizada de artefactos aprobados.

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

1. extrae el archivo con la herramienta `tar` aprobada
2. ejecuta el bootstrap bash desde la raíz del proyecto consumidor

```bash
cd /ruta/al/proyecto
bash /ruta/aprobada/ai-sdlc-kit/scripts/install.sh /ruta/aprobada/ai-sdlc-kit
```

## Fallback sin instalador

Si la ejecución de scripts está bloqueada incluso para bash, el kit sigue funcionando:

1. copia `.github/agents`, `.github/prompts`, `.github/templates`, `.github/skills` y `.github/docs` en el repositorio
2. configura `.vscode/settings.json` manualmente
3. crea `doc-specs/`
4. inicia el flujo

Este fallback importa porque algunos entornos regulados permiten entrega de archivos, pero restringen la ejecución de scripts.

## Recomendación de release enterprise

Para clientes gobernados, publica dos artefactos por versión:

1. el bundle offline `.tar.gz`
2. el archivo de checksum `sha256`

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
