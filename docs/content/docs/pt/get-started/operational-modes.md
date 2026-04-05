---
title: Modos Operacionais
description: Como executar o AI SDLC Kit a partir do repositório, via APM ou por meio de um bundle offline.
---

O AI SDLC Kit suporta dois modos operacionais prontos para produção hoje, além de um caminho futuro de distribuição ainda em validação. A melhor escolha depende do nível de restrição do ambiente alvo e do quanto de governança central você precisa.

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
- o fluxo não depende do APM em runtime
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

Para repositórios que já consomem pacotes APM e possuem `apm.lock.yaml`, o comando oficial de bundle portátil é:

```bash
apm pack --archive
```

O `scripts/package-bundle.sh` deste repositório é um helper de distribuição do próprio AI SDLC Kit.

## Bootstrap bash-first

Quando a execução de shell é permitida, o bootstrap preferencial é:

```bash
bash scripts/install.sh
```

Para apontar para um bundle descompactado ou para um caminho compartilhado do kit:

```bash
bash scripts/install.sh /caminho/para/ai-sdlc-kit
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

## Caminho futuro — distribuição via APM

Este repositório já contém um `apm.yml`, e o fluxo normal de consumidor APM continua válido:

- versionar `apm.yml`
- versionar `apm.lock.yaml`
- ignorar `apm_modules/`

Porém, a validação real com o CLI mostrou que o layout atual do pacote ainda não é reconhecido pelo APM como prompts, agents, instructions ou skills implantáveis automaticamente na árvore `.github/` do consumidor.

Então, por enquanto:

- APM é um caminho futuro de distribuição
- APM não é o caminho recomendado de instalação para este kit
- os caminhos prontos para produção são cópia direta e `bash scripts/install.sh`

## Leitura relacionada

- [Instalação](/pt/get-started/installation)
- [Quick Start](/pt/get-started/quick-start)
- [Ambientes Governados](/pt/get-started/governed-environments)
