---
title: Instalación
description: Cómo instalar y configurar el AI SDLC Kit en tu proyecto.
---

## Requisitos previos

Antes de comenzar, asegúrate de tener:

- **VS Code** (versión más reciente recomendada)
- **GitHub Copilot** con suscripción y modo agente habilitado
- **GitHub Copilot Chat** extensión instalada y autenticada
- Modo agente habilitado en la configuración de VS Code (`"github.copilot.chat.agent.enabled": true`)

---

## Opción A — Copiar en tu proyecto (recomendado)

Este es el enfoque más simple. El kit viaja junto con tu repositorio.

1. Copia la carpeta `.github/agents/` a `.github/agents/` de tu proyecto
2. Copia la carpeta `.github/prompts/` a `.github/prompts/` de tu proyecto
3. Copia la carpeta `.github/templates/` a `.github/templates/` de tu proyecto
4. Agrega lo siguiente a `.vscode/settings.json` de tu proyecto:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

5. Crea la carpeta `doc-specs/` en la raíz de tu proyecto:

```bash
mkdir doc-specs
```

---

## Opción B — Apuntar VS Code a la carpeta del kit o a un bundle offline

Si prefieres mantener el kit como una carpeta externa compartida (p. ej., usada en múltiples proyectos), agrega las rutas a `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/.github/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/.github/prompts": true }
}
```

#### Instalación bash-first (Opción B)

Para evitar editar `settings.json` manualmente, ejecuta el instalador desde la **raíz del proyecto consumidor**, para que actualice el `.vscode/settings.json` de ese proyecto:

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

El script detecta un `settings.json` existente y **fusiona** las entradas requeridas sin sobrescribir ninguna otra configuración. Si el archivo no existe, se crea.

---

## Entornos offline y gobernados

No necesitas una segunda fuente de documentación para usar el kit. La guía operativa ahora vive directamente en la documentación oficial en:

- [Modos Operativos](/es/get-started/operational-modes)
- [Entornos Gobernados](/es/get-started/governed-environments)

Para generar un artefacto offline aprobado para distribución interna:

```bash
bash scripts/package-bundle.sh
```

Esto genera un directorio versionado, un archivo `.tar.gz` y un archivo `sha256` dentro de `dist/`.

Si el repositorio ya actúa como consumidor APM con dependencias instaladas y `apm.lock.yaml`, prefiere el flujo oficial de bundle del propio APM:

```bash
apm pack --archive
```

---

## Ruta futura — distribución como paquete APM

Este repositorio ya contiene un `apm.yml`, y el flujo estándar de consumidor APM sigue siendo válido:

- versionar `apm.yml`
- versionar `apm.lock.yaml`
- ignorar `apm_modules/`

Sin embargo, el layout del paquete AI SDLC Kit todavía se está validando frente al modelo nativo de despliegue de primitivas de APM.

Hoy esto significa:

- APM es una ruta futura de distribución para este kit
- APM aún no es la ruta oficial de instalación
- las rutas soportadas siguen siendo la copia directa y `bash scripts/install.sh`

---

## Verificar el descubrimiento

Después de la instalación, abre el panel de GitHub Copilot Chat y escribe `/` en el campo de entrada. Deberías ver los prompts del kit listados (p. ej., `/discovery-refine`, `/task-implement`, etc.).

Abre el selector de agentes y confirma que los agentes del kit aparecen (p. ej., 🧭 Discovery, 🏗️ Architect, 🛠️ Implementer, etc.).

Si los prompts o agentes no se descubren:

1. Confirma que las rutas en `.vscode/settings.json` son correctas y relativas a la raíz del workspace.
2. Recarga VS Code (`Ctrl+Shift+P` → **Developer: Reload Window**).
3. Verifica que los archivos en `.github/agents/` tienen la extensión `.agent.md` y un frontmatter YAML válido.
