# Prompt — Agent Mode: Criar Documentação e Renomear Comandos do ai-sdlc-kit

> Cole este prompt inteiro no GitHub Copilot Chat com Agent Mode ativo.
> O agente deve seguir as instruções na ordem descrita. Não avance para a próxima parte sem concluir a anterior.

---

## Contexto geral

Você irá executar duas tarefas em sequência neste projeto:

**Tarefa 1 — Renomear e traduzir os artefatos do kit**
Renomear todos os arquivos de agentes e prompts para inglês, com nomes mais curtos e concisos.

**Tarefa 2 — Criar um site de documentação estático**
Criar um site de documentação com Astro + Starlight, trilíngue (PT-BR, EN, ES), estruturado como o projeto Squad (https://bradygaster.github.io/squad/), publicável via GitHub Pages.

---

## TAREFA 1 — Renomear e traduzir artefatos

### 1.1 Renomear o projeto

O projeto se chamava `sdd-kit`. O novo nome é: **`ai-sdlc-kit`**.

Atualize todas as referências ao nome antigo nos seguintes arquivos:
- `.github/README.md`
- `README.md`
- `.github/docs/convencoes.md`
- `.github/docs/fluxo-sdd.md`
- `.vscode/settings.json`

---

### 1.2 Renomear os arquivos de agentes

Renomeie os arquivos em `.github/agents/` conforme a tabela abaixo.
Atualize também o campo `name:` no frontmatter de cada arquivo renomeado.
Atualize todas as referências a esses nomes em prompts, handoffs e documentação.

| Nome atual (arquivo) | Novo nome (arquivo) | Novo `name:` no frontmatter |
|---|---|---|
| `discovery.agent.md` | `discovery.agent.md` | `"🧭 Discovery"` |
| `pm.agent.md` | `pm.agent.md` | `"🗂️ PM"` |
| `tech-lead.agent.md` | `tech-lead.agent.md` | `"🧑‍💼 Tech Lead"` |
| `architect.agent.md` | `architect.agent.md` | `"🏗️ Architect"` |
| `operations.agent.md` | `ops.agent.md` | `"🚀 Ops"` |
| `sdd-planner.agent.md` | `planner.agent.md` | `"📐 Planner"` |
| `sdd-implementer.agent.md` | `implementer.agent.md` | `"🛠️ Implementer"` |
| `sdd-reviewer.agent.md` | `reviewer.agent.md` | `"🔎 Reviewer"` |

---

### 1.3 Renomear os arquivos de prompts

Renomeie os arquivos em `.github/prompts/` conforme a tabela abaixo.
Atualize também o campo `name:` no frontmatter de cada arquivo renomeado.
Atualize todas as referências a esses nomes em documentação e em outros prompts.

| Nome atual | Novo nome | Novo `name:` |
|---|---|---|
| `discovery-refinar-ideia.prompt.md` | `discovery-refine.prompt.md` | `"discovery-refine"` |
| `discovery-non-technical-spec.prompt.md` | `discovery-spec.prompt.md` | `"discovery-spec"` |
| `discovery-prd.prompt.md` | `discovery-prd.prompt.md` | `"discovery-prd"` |
| `discovery-technical-spec.prompt.md` | `discovery-tech-spec.prompt.md` | `"discovery-tech-spec"` |
| `discovery-epics.prompt.md` | `discovery-epics.prompt.md` | `"discovery-epics"` |
| `epic-preparar.prompt.md` | `epic-init.prompt.md` | `"epic-init"` |
| `ops-fechar-epico.prompt.md` | `epic-close.prompt.md` | `"epic-close"` |
| `ops-atualizar-context.prompt.md` | `context-sync.prompt.md` | `"context-sync"` |
| `sdd-preparar-tarefa.prompt.md` | `task-init.prompt.md` | `"task-init"` |
| `sdd-gerar-prd.prompt.md` | `task-prd.prompt.md` | `"task-prd"` |
| `sdd-gerar-spec.prompt.md` | `task-spec.prompt.md` | `"task-spec"` |
| `sdd-implementar.prompt.md` | `task-implement.prompt.md` | `"task-implement"` |
| `sdd-revisar.prompt.md` | `task-review.prompt.md` | `"task-review"` |
| `sdd-bootstrap-agents-md.prompt.md` | `agents-init.prompt.md` | `"agents-init"` |

---

### 1.4 Atualizar os corpos dos prompts e handoffs

Após renomear, varredura global em todos os arquivos `.md` de `.github/`:
- Substituir todas as referências aos nomes antigos de prompts (ex: `/sdd-implementar` → `/task-implement`)
- Substituir todas as referências aos nomes antigos de agentes nos handoffs (ex: `"🛠️ SDD Implementer"` → `"🛠️ Implementer"`)
- Substituir referências ao nome `sdd-kit` por `ai-sdlc-kit`

---

## TAREFA 2 — Criar o site de documentação

### 2.1 Stack escolhida

Usar **Astro** com o tema **Starlight** (mesmo usado pelo Squad).
O site será publicado via **GitHub Pages** com GitHub Actions.

### 2.2 Criar a estrutura do site

Crie a seguinte estrutura de pastas e arquivos na raiz do repositório:

```
docs/
  src/
    content/
      docs/
        en/
          get-started/
            installation.md
            quick-start.md
            how-it-works.md
          guide/
            discovery-phase.md
            spec-phase.md
            epic-phase.md
            operations-phase.md
            hil-checkpoints.md
          reference/
            agents.md
            prompts.md
            templates.md
            artifacts.md
          concepts/
            ai-sdlc.md
            sdd.md
            hil.md
            context-memory.md
          scenarios/
            new-project.md
            existing-project.md
            solo-dev.md
          index.mdx
        pt/
          (mesma estrutura de en/)
        es/
          (mesma estrutura de en/)
    assets/
      logo.svg
    styles/
      custom.css
  astro.config.mjs
  package.json
  tsconfig.json
  .gitignore
```

---

### 2.3 Configurar o `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://<seu-usuario>.github.io',
  base: '/ai-sdlc-kit',
  integrations: [
    starlight({
      title: 'AI SDLC Kit',
      description: 'A spec-driven, human-in-the-loop AI development lifecycle kit for GitHub Copilot.',
      logo: {
        src: './src/assets/logo.svg',
      },
      defaultLocale: 'en',
      locales: {
        en: { label: 'English', lang: 'en' },
        pt: { label: 'Português', lang: 'pt-BR' },
        es: { label: 'Español', lang: 'es' },
      },
      social: {
        github: 'https://github.com/<seu-usuario>/ai-sdlc-kit',
      },
      sidebar: [
        {
          label: 'Get Started',
          translations: {
            pt: 'Primeiros Passos',
            es: 'Primeros Pasos',
          },
          items: [
            { slug: 'get-started/installation' },
            { slug: 'get-started/quick-start' },
            { slug: 'get-started/how-it-works' },
          ],
        },
        {
          label: 'Guide',
          translations: {
            pt: 'Guia',
            es: 'Guía',
          },
          items: [
            { slug: 'guide/discovery-phase' },
            { slug: 'guide/spec-phase' },
            { slug: 'guide/epic-phase' },
            { slug: 'guide/operations-phase' },
            { slug: 'guide/hil-checkpoints' },
          ],
        },
        {
          label: 'Reference',
          translations: {
            pt: 'Referência',
            es: 'Referencia',
          },
          items: [
            { slug: 'reference/agents' },
            { slug: 'reference/prompts' },
            { slug: 'reference/templates' },
            { slug: 'reference/artifacts' },
          ],
        },
        {
          label: 'Concepts',
          translations: {
            pt: 'Conceitos',
            es: 'Conceptos',
          },
          items: [
            { slug: 'concepts/ai-sdlc' },
            { slug: 'concepts/sdd' },
            { slug: 'concepts/hil' },
            { slug: 'concepts/context-memory' },
          ],
        },
        {
          label: 'Scenarios',
          translations: {
            pt: 'Cenários',
            es: 'Escenarios',
          },
          items: [
            { slug: 'scenarios/new-project' },
            { slug: 'scenarios/existing-project' },
            { slug: 'scenarios/solo-dev' },
          ],
        },
      ],
    }),
  ],
});
```

---

### 2.4 Conteúdo das páginas — versão em inglês (`en/`)

Crie as seguintes páginas com conteúdo real, não placeholders. Use os artefatos existentes do kit como fonte de verdade.

#### `en/index.mdx` — Homepage

```mdx
---
title: AI SDLC Kit
description: A spec-driven, human-in-the-loop AI development lifecycle kit for GitHub Copilot.
template: splash
hero:
  title: Your AI Development Lifecycle
  tagline: From idea to production with spec-driven development, structured human oversight, and a full team of AI agents.
  actions:
    - text: Get Started
      link: /ai-sdlc-kit/en/get-started/installation/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/<seu-usuario>/ai-sdlc-kit
      icon: external
---
```

#### `en/get-started/installation.md`

Conteúdo deve cobrir:
- Pré-requisitos (VS Code, GitHub Copilot, Agent Mode habilitado)
- Opção A: copiar `.github/` para o projeto
- Opção B: apontar via `.vscode/settings.json`
- Criar a pasta `doc-specs/`
- Verificar que agentes e prompts estão sendo descobertos

#### `en/get-started/quick-start.md`

Conteúdo deve cobrir:
- Criar `doc-specs/idea.txt` com uma ideia de exemplo
- Executar `/discovery-refine`
- O que esperar como saída
- Próximos passos

#### `en/get-started/how-it-works.md`

Conteúdo deve cobrir:
- O fluxo completo em diagrama ASCII (Discovery → Spec → Epic → Ops)
- A regra de ouro: sem `spec-epic-<N>.md` validada, não se implementa
- O papel do Human in the Loop
- A diferença entre Discovery e Spec phases

#### `en/guide/discovery-phase.md`

Conteúdo deve cobrir:
- O que é a fase de Discovery
- Os 4 agentes da fase (Discovery, PM, Tech Lead, Architect)
- Os 5 prompts da fase (`/discovery-refine`, `/discovery-spec`, `/discovery-prd`, `/discovery-tech-spec`, `/discovery-epics`)
- Os HILs obrigatórios
- Os artefatos gerados (`idea.md`, `non-technical-spec.md`, `PRD.md`, `technical-spec.md`, `epics.md`, `CONTEXT.md`)

#### `en/guide/spec-phase.md`

Conteúdo deve cobrir:
- O que é a fase de Spec por épico
- O prompt `/epic-init <N>`
- Os 3 artefatos por épico (`epic-<N>.md`, `PRD.md`, `spec-epic-<N>.md`)
- O checklist de verificação no `spec-epic-<N>.md`
- Os HILs obrigatórios por arquivo

#### `en/guide/epic-phase.md`

Conteúdo deve cobrir:
- O que é a fase de implementação por épico
- Os prompts `/task-implement` e `/task-review`
- O papel do Implementer e do Reviewer
- Como preencher o `decisions-log.md` durante a implementação
- A sequência completa de um épico

#### `en/guide/operations-phase.md`

Conteúdo deve cobrir:
- O que é a fase de Operations
- O prompt `/epic-close <N>`
- O artefato `ops-epic-<N>.md`
- O prompt `/context-sync <N>`
- Como o `CONTEXT.md` é atualizado
- O loop para o próximo épico

#### `en/guide/hil-checkpoints.md`

Conteúdo deve cobrir:
- O que é Human in the Loop neste contexto
- A tabela completa de HILs (obrigatórios e recomendados)
- O que revisar em cada checkpoint
- Quando e como voltar uma etapa

#### `en/reference/agents.md`

Para cada agente do kit, documentar:
- Nome e emoji
- Arquivo
- Papel e persona
- Ferramentas declaradas
- Handoffs disponíveis
- Regras principais

Agentes: Discovery, PM, Tech Lead, Architect, Ops, Planner, Implementer, Reviewer

#### `en/reference/prompts.md`

Para cada prompt do kit, documentar em tabela:
- Comando (ex: `/discovery-refine`)
- Arquivo
- Agente que usa
- Entrada (arquivo que lê)
- Saída (arquivo que gera)
- HIL após execução?

#### `en/reference/templates.md`

Para cada template em `.github/templates/`, documentar:
- Nome do arquivo
- Quando é usado
- Estrutura de seções

#### `en/reference/artifacts.md`

Documentar cada artefato gerado pelo kit:
- Nome do arquivo
- Pasta onde fica
- Quem gera
- Quem consome
- Quando é criado no fluxo

#### `en/concepts/ai-sdlc.md`

Conteúdo deve cobrir:
- O que é AI SDLC / AI-DLC
- As três fases do AI-DLC (Inception, Construction, Operations)
- Como o ai-sdlc-kit implementa esses conceitos
- O princípio de AI como planejadora + Humano como validador

#### `en/concepts/sdd.md`

Conteúdo deve cobrir:
- O que é Spec-Driven Development
- Por que spec antes de código
- Como SDD se aplica neste kit
- A regra de ouro

#### `en/concepts/hil.md`

Conteúdo deve cobrir:
- O que é Human in the Loop
- Por que HIL é obrigatório e não opcional
- A diferença entre HIL como checkbox e HIL como princípio
- O risco do "process atrophy"

#### `en/concepts/context-memory.md`

Conteúdo deve cobrir:
- O que é o `CONTEXT.md`
- Como a memória persiste entre épicos
- O papel dos ADRs (`decisions-log.md`)
- Por que context memory é crítica no AI-DLC

#### `en/scenarios/new-project.md`

Walkthrough completo de um projeto novo, do `idea.txt` até o fim do primeiro épico.

#### `en/scenarios/existing-project.md`

Como usar o kit em um projeto que já existe — começando pelo `technical-spec.md` se o PRD já existe, ou pelo `/epic-init` se já há épicos definidos.

#### `en/scenarios/solo-dev.md`

Como um desenvolvedor solo usa o kit — simplificando os HILs e os papéis quando não há equipe.

---

### 2.5 Traduzir para português (`pt/`) e espanhol (`es/`)

Após criar todas as páginas em inglês, crie as versões em português (pt-BR) e espanhol (es) com o mesmo conteúdo traduzido.

Regras de tradução:
- Nomes de arquivos, comandos e frontmatter técnico permanecem em inglês
- O conteúdo em prosa é traduzido
- Termos técnicos como "spec", "epic", "HIL", "prompt" permanecem em inglês nas três versões

---

### 2.6 GitHub Actions — publicar no GitHub Pages

Crie `.github/workflows/docs.yml`:

```yaml
name: Deploy Docs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: docs/package-lock.json
      - working-directory: docs
        run: npm ci
      - working-directory: docs
        run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: docs/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

### 2.7 `docs/package.json`

```json
{
  "name": "ai-sdlc-kit-docs",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/starlight": "^0.32.0",
    "astro": "^5.0.0"
  }
}
```

---

### 2.8 Criar um logo SVG minimalista

Crie `docs/src/assets/logo.svg` com um logo simples para o ai-sdlc-kit.
O logo deve ser um ícone vetorial minimalista que remeta a fluxo/ciclo + especificação.
Use as cores: `#6366f1` (indigo) como cor primária e `#f8fafc` como fundo quando em tema claro.

---

### 2.9 Atualizar o `README.md` raiz

Adicione ao `README.md` raiz:
- Badge com link para a documentação: `[![Docs](https://img.shields.io/badge/docs-ai--sdlc--kit-6366f1)](https://<seu-usuario>.github.io/ai-sdlc-kit)`
- Seção "Documentation" com link para o site
- Instrução de como rodar a docs localmente: `cd docs && npm install && npm run dev`

---

## Ordem de execução

Execute nesta ordem e aguarde confirmação após cada bloco:

1. Tarefa 1.1 — Renomear o projeto
2. Tarefa 1.2 — Renomear agentes
3. Tarefa 1.3 — Renomear prompts
4. Tarefa 1.4 — Atualizar referências globais
5. **HIL — confirme que os agentes e prompts estão com os novos nomes antes de continuar**
6. Tarefa 2.1 a 2.3 — Scaffolding do site Astro
7. Tarefa 2.4 — Conteúdo em inglês (todas as páginas)
8. **HIL — confirme o conteúdo em inglês antes de continuar**
9. Tarefa 2.5 — Tradução PT e ES
10. Tarefa 2.6 a 2.8 — GitHub Actions, package.json, logo
11. Tarefa 2.9 — README atualizado
12. **HIL final — revisão completa**

---

## Regras para o agente

- Não pule etapas.
- Não crie placeholders — todo conteúdo deve ser real, baseado nos artefatos existentes do kit.
- Preserve todos os arquivos existentes em `.github/`. As mudanças na Tarefa 1 são renomeações e atualizações de referências, não exclusões de conteúdo.
- Se encontrar uma ambiguidade, sinalize e aguarde instrução antes de decidir.
- Ao final de cada HIL, apresente um resumo do que foi feito antes de pedir confirmação.