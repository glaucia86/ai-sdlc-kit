---
title: Ambientes Governados
description: Como operar o AI SDLC Kit em ambientes restritos com automação bash-only e artefatos aprovados.
---

Este guia é para ambientes em que:

- o acesso à internet é restrito ou totalmente bloqueado
- PowerShell não pode ser usado
- apenas bash é aprovado para automação
- as fontes de pacote precisam vir de um ponto interno aprovado

## Modelo operacional recomendado

Use uma estratégia de distribuição dual-mode:

1. use o APM como fonte de verdade do empacotamento
2. publique um bundle offline aprovado para consumidores restritos
3. permita arquivos de runtime commitados diretamente no repositório como fallback com menos partes móveis

Isso dá uma experiência suave de pacote para times normais, sem forçar consumidores regulados a depender de internet ou PowerShell.

## Runtime mínimo aprovado

O repositório alvo precisa apenas de:

- `.github/agents/`
- `.github/prompts/`
- `.github/templates/`
- `.github/skills/`
- `.github/docs/`

O site público de documentação é opcional quando esses arquivos já estão disponíveis.

## Caminhos aprovados de instalação

### Caminho A — Versionar o runtime no próprio projeto

Esta é a opção mais forte para bancos e outras organizações altamente controladas.

Ela evita downloads de pacote em runtime e faz o projeto viajar com tudo de que precisa.

### Caminho B — Descompactar um bundle offline aprovado

Se o APM estiver disponível no ambiente governado:

```bash
apm unpack ai-sdlc-kit-<version>.tar.gz --output /caminho/do/projeto
```

Se o APM não estiver disponível:

1. extraia o arquivo com `tar` aprovado
2. rode o bootstrap bash a partir da pasta descompactada

```bash
bash scripts/install.sh /caminho/aprovado/ai-sdlc-kit
```

### Caminho C — Espelhar o pacote APM internamente

Se a organização permitir APM apenas contra fontes internas, espelhe o pacote e consuma-o a partir do registry ou Git mirror aprovado.

## Fallback sem instalador

Se a execução de script for bloqueada até mesmo para bash, o kit ainda funciona:

1. copie `.github/agents`, `.github/prompts`, `.github/templates`, `.github/skills` e `.github/docs` para o repositório
2. configure `.vscode/settings.json` manualmente
3. crie `doc-specs/`
4. inicie o fluxo

Esse fallback importa porque alguns ambientes regulados permitem entrega de arquivos, mas restringem execução de scripts.

## Recomendação de release enterprise

Para clientes governados, publique três artefatos por versão:

1. a origem APM com `apm.yml`
2. o bundle offline `.tar.gz`
3. o arquivo de checksum `sha256`

Armazene-os em um ponto interno aprovado, como:

- mirror Git interno
- Artifactory ou Nexus
- Azure DevOps artifacts
- compartilhamento de arquivos assinado

## Regra prática

Não force um cliente restrito a depender de:

- site público de documentação
- PowerShell
- download de pacote pela internet
- instalação de ferramenta em tempo de uso

O kit deve continuar utilizável apenas com arquivos locais aprovados.

## Leitura relacionada

- [Instalação](/pt/get-started/installation)
- [Modos Operacionais](/pt/get-started/operational-modes)
