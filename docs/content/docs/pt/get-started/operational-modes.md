---
title: Modos Operacionais
description: Como executar o AI SDLC Kit a partir do repositório ou por meio de um bundle offline.
---

O AI SDLC Kit suporta dois modos operacionais prontos para produção hoje. A melhor escolha depende do nível de restrição do ambiente alvo e do quanto de governança central você precisa.

## Modo 1 — Runtime versionado no próprio repositório

Este é o modo mais resiliente para o uso diário e o melhor padrão para projetos altamente governados.

O repositório alvo contém:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

Neste modo:

- o fluxo não depende do site público de documentação
- os arquivos de runtime viajam junto com o próprio projeto
- o fluxo continua funcionando mesmo quando a execução de shell é bastante restrita

## Modo 2 — Uso por bundle offline

Para distribuição offline aprovada, gere um bundle portátil:

```bash
bash scripts/package-bundle.sh
```

Isso produz:

- `dist/ai-sdlc-kit-<version>/`
- `dist/ai-sdlc-kit-<version>.tar.gz`
- `dist/ai-sdlc-kit-<version>.sha256`

O bundle é voltado para:

- mirrors internos
- ambientes regulados de clientes
- workstations desconectadas
- processos de intake de software com aprovação formal

O `scripts/package-bundle.sh` deste repositório é um helper de distribuição do próprio AI SDLC Kit.

## Bootstrap bash-first

Quando a execução de shell é permitida, execute o instalador a partir da raiz do projeto consumidor:

```bash
bash /caminho/para/ai-sdlc-kit/scripts/install.sh /caminho/para/ai-sdlc-kit
```

Por exemplo:

```bash
cd /caminho/para/seu-projeto
bash /caminho/para/ai-sdlc-kit/scripts/install.sh /caminho/para/ai-sdlc-kit
```

Se você copiou o kit para dentro do repositório consumidor como `./ai-sdlc-kit`, também pode executar:

```bash
cd /caminho/para/seu-projeto
bash ./ai-sdlc-kit/scripts/install.sh ./ai-sdlc-kit
```

O script:

- cria `doc-specs/` se necessário
- mescla as configurações de descoberta em `.vscode/settings.json`
- evita PowerShell por completo

## Quando o site público é opcional

O site público continua sendo a experiência canônica de aprendizado, mas ele não é mais obrigatório para execução.

Para o fluxo em si, o mínimo necessário é:

1. os arquivos de runtime estarem presentes
2. a descoberta de prompts e agentes no VS Code estar configurada
3. `doc-specs/` existir

Depois disso, o usuário pode começar com:

- `doc-specs/idea.txt` para o Fluxo A
- `doc-specs/task.txt` para o Fluxo B

## Leitura relacionada

- [Instalação](/pt/get-started/installation)
- [Quick Start](/pt/get-started/quick-start)
- [Ambientes Governados](/pt/get-started/governed-environments)
