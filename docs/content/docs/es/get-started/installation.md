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

## Opción B — Apuntar VS Code a la carpeta del kit

Si prefieres mantener el kit como una carpeta externa compartida (p. ej., usada en múltiples proyectos), agrega las rutas a `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/prompts": true }
}
```

#### Instalación automatizada (Opción B)

Para evitar editar `settings.json` manualmente, ejecuta:

```bash
make install
```

El script detecta un `settings.json` existente y **fusiona** las entradas requeridas sin sobrescribir ninguna otra configuración. Si el archivo no existe, se crea.

Para apuntar a una ruta externa personalizada:

```bash
make install-external PATH=/ruta/a/ai-sdlc-kit
```

---

## Verificar el descubrimiento

Después de la instalación, abre el panel de GitHub Copilot Chat y escribe `/` en el campo de entrada. Deberías ver los prompts del kit listados (p. ej., `/discovery-refine`, `/task-implement`, etc.).

Abre el selector de agentes y confirma que los agentes del kit aparecen (p. ej., 🧭 Discovery, 🏗️ Architect, 🛠️ Implementer, etc.).

Si los prompts o agentes no se descubren:

1. Confirma que las rutas en `.vscode/settings.json` son correctas y relativas a la raíz del workspace.
2. Recarga VS Code (`Ctrl+Shift+P` → **Developer: Reload Window**).
3. Verifica que los archivos en `.github/agents/` tienen la extensión `.agent.md` y un frontmatter YAML válido.
