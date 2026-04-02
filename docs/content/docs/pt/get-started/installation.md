---
title: Instalação
description: Como instalar e configurar o AI SDLC Kit no seu projeto.
---

## Pré-requisitos

Antes de começar, certifique-se de ter:

- **VS Code** (versão mais recente recomendada)
- **GitHub Copilot** com assinatura e modo agente habilitado
- **GitHub Copilot Chat** extensão instalada e autenticada
- Modo agente habilitado nas configurações do VS Code (`"github.copilot.chat.agent.enabled": true`)

---

## Opção A — Copiar para o seu projeto (recomendado)

Esta é a abordagem mais simples. O kit viaja junto com o repositório.

1. Copie a pasta `.github/agents/` para `.github/agents/` do seu projeto
2. Copie a pasta `.github/prompts/` para `.github/prompts/` do seu projeto
3. Copie a pasta `.github/templates/` para `.github/templates/` do seu projeto
4. Adicione o seguinte ao `.vscode/settings.json` do seu projeto:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

5. Crie a pasta `doc-specs/` na raiz do seu projeto:

```bash
mkdir doc-specs
```

---

## Opção B — Apontar o VS Code para a pasta do kit

Se preferir manter o kit como uma pasta externa compartilhada (p. ex., usada em múltiplos projetos), adicione os caminhos ao `.vscode/settings.json`:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/prompts": true }
}
```

#### Instalação automatizada (Opção B)

Para evitar editar o `settings.json` manualmente, execute:

```bash
make install
```

O script detecta um `settings.json` existente e **mescla** as entradas necessárias sem sobrescrever nenhuma outra configuração. Se o arquivo não existir, ele é criado.

Para apontar para um caminho externo personalizado:

```bash
make install-external PATH=/caminho/para/ai-sdlc-kit
```

---

## Verificar descoberta

Após a instalação, abra o painel do GitHub Copilot Chat e digite `/` no campo de entrada. Você deverá ver os prompts do kit listados (p. ex., `/discovery-refine`, `/task-implement`, etc.).

Abra o seletor de agentes e confirme que os agentes do kit aparecem (p. ex., 🧭 Discovery, 🏗️ Architect, 🛠️ Implementer, etc.).

Se os prompts ou agentes não forem descobertos:

1. Confirme que os caminhos em `.vscode/settings.json` estão corretos e relativos à raiz do workspace.
2. Recarregue o VS Code (`Ctrl+Shift+P` → **Developer: Reload Window**).
3. Verifique que os arquivos em `.github/agents/` possuem a extensão `.agent.md` e um frontmatter YAML válido.
