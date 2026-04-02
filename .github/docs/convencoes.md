# Convenções do Fluxo SDD

## Objetivo deste documento

Este documento define as convenções de uso do fluxo de Spec-Driven Development (SDD) adotado neste repositório.

O objetivo é garantir que tarefa, PRD, spec e implementação permaneçam coerentes entre si, com checkpoints explícitos de revisão humana antes da execução automática.

## Princípios do fluxo

### 1. A implementação nunca começa direto pela tarefa bruta

Toda demanda deve partir de uma entrada inicial em `doc-specs/tarefa.txt`.

Essa entrada deve ser transformada em `doc-specs/tarefa.md`, depois em `doc-specs/PRD.md`, depois em `doc-specs/spec.md`.

Somente após revisão humana da spec a implementação pode começar.

### 2. Human in the Loop é obrigatório

O fluxo não é totalmente automático.

Há checkpoints obrigatórios de validação humana após:
- geração de `tarefa.md`
- geração de `PRD.md`
- geração de `spec.md`

Se houver ambiguidade, inconsistência ou falta de clareza, o fluxo deve voltar uma etapa antes da implementação.

### 3. O agente não deve inventar requisitos

Toda geração de artefato deve estar sustentada por:
- `tarefa.txt`
- `tarefa.md`
- `PRD.md`
- `spec.md`
- codebase observável

Se houver lacunas, o agente deve registrar perguntas em aberto, e não assumir decisões implícitas.

### 4. PRD e spec têm papéis diferentes

#### PRD.md
O `PRD.md` representa o recorte funcional e de negócio da tarefa.

Ele deve ser:
- curto
- objetivo
- fiel à tarefa
- útil para alinhar escopo e critérios de aceite

#### spec.md
O `spec.md` representa a tradução técnica do PRD para uma especificação implementável.

Ele deve:
- detalhar impacto técnico
- orientar implementação
- registrar riscos, dependências e ambiguidades
- servir como base de trabalho do agente implementador

### 5. O agente implementador não decide escopo

O agente implementador deve seguir `PRD.md` e `spec.md`.

Se perceber ambiguidade crítica, ele deve parar e sinalizar, em vez de decidir sozinho.

### 6. O agente revisor valida aderência

O agente revisor não substitui revisão humana, mas ajuda a identificar:
- desvios entre PRD e spec
- desvios entre spec e código
- riscos
- pendências
- pontos pouco claros

## Estrutura esperada dos artefatos

### tarefa.txt
Entrada bruta da tarefa.

### tarefa.md
Versão estruturada da tarefa para leitura humana e para geração do PRD.

### PRD.md
Documento funcional e de escopo.

### spec.md
Documento técnico e implementável.

## Convenções de escrita

### Linguagem
Todos os artefatos devem ser escritos em português do Brasil.

### Clareza
Dar preferência a subtítulos claros e texto descritivo.

### Bullets
Usar bullets apenas quando ajudarem a organizar itens concretos, como:
- tarefas
- critérios
- perguntas abertas
- pendências

### Ambiguidade
Toda ambiguidade deve ser registrada explicitamente.

### Fidelidade
Nenhum artefato deve extrapolar o anterior sem base observável.

## Convenções de pasta

O fluxo assume a existência da pasta:

`doc-specs/`

Com os seguintes arquivos:

- `doc-specs/tarefa.txt`
- `doc-specs/tarefa.md`
- `doc-specs/PRD.md`
- `doc-specs/spec.md`

## Quando reiniciar uma etapa

O time deve voltar para a etapa anterior quando:

- o artefato gerado não representar corretamente a tarefa
- houver inconsistência entre PRD e spec
- houver falta de clareza que comprometa a implementação
- a revisão humana identificar interpretação errada do escopo

## O que significa `send: false` nos handoffs

Os handoffs definidos nos arquivos `.agent.md` usam a propriedade `send: false`. Isso significa que o handoff é preparado pelo agente, mas **não é executado automaticamente**.

O Copilot exibe o handoff como uma opção de continuação, mas aguarda confirmação humana antes de invocar o próximo agente. Esse comportamento é intencional e faz parte do Human in the Loop do fluxo SDD.

Sem confirmação manual, o fluxo não avança. Isso garante que nenhuma etapa seja pulada inadvertidamente.

## Convenção de histórico de revisões nos artefatos

Todo artefato gerado pelo fluxo (`PRD.md` e `spec.md`) deve incluir uma seção `## Histórico de revisões` ao final do documento.

Essa seção deve ser preenchida manualmente após cada roda de revisão humana que resultar em ajuste no artefato:

| Versão | Data | Autor | Alteração |
|---|---|---|---|
| 1.0 | AAAA-MM-DD | nome | versão inicial |
| 1.1 | AAAA-MM-DD | nome | descrição breve da alteração |

O objetivo é manter rastreabilidade sem introduzir tooling externo. Em tarefas grandes, o PRD pode ser editado várias vezes antes da spec ser aprovada; o histórico torna essas iterações visíveis.

## Papel do AGENTS.md do projeto

O `AGENTS.md` da raiz do projeto, quando existir, deve ser estável e minimalista.

Ele não substitui o fluxo SDD por tarefa.

O fluxo SDD fica concentrado nesta orquestração (`sdd-orquestracao`) e nos artefatos criados em `doc-specs/`.

## Resultado esperado

Ao final do processo, deve existir coerência entre:

- a intenção inicial da tarefa
- o recorte funcional no PRD
- a tradução técnica na spec
- a implementação realizada
- a revisão final

---

## Fase de Discovery

### O que é a Fase de Discovery

A Fase de Discovery é uma fase **opcional** que precede o fluxo SDD por tarefa.

Ela é indicada para projetos novos ou quando há necessidade de estruturar uma ideia antes de quebrá-la em tarefas implementáveis. Quando a equipe já tem tarefas definidas e claras, o Fluxo B (Delivery direto) pode ser usado sem passar pela Discovery.

### Entrada do fluxo

A entrada da Fase de Discovery é o arquivo `doc-specs/idea.txt`, equivalente ao `tarefa.txt` no Fluxo B. Deve conter a ideia bruta, sem formatação obrigatória.

### Dois fluxos independentes

O kit suporta dois fluxos de trabalho independentes:

**Fluxo A — Discovery + Delivery** (quando existe uma ideia a ser estruturada):
`idea.txt → idea.md → non-technical-spec.md → PRD.md → technical-spec.md → epics.md → spec-epic-N.md → implementação`

**Fluxo B — Delivery direto** (quando a tarefa já está clara):
`tarefa.txt → tarefa.md → PRD.md → spec.md → implementação`

Nenhum fluxo é pré-requisito do outro. A escolha é feita pelo time com base no contexto do projeto.

### Papéis dos novos agentes

| Agente | Arquivo | Responsabilidade |
|---|---|---|
| 🧭 Discovery | `discovery.agent.md` | Lê `idea.txt` e gera `idea.md` sem viés técnico |
| 🗂️ PM | `pm.agent.md` | Lê `idea.md` e gera `non-technical-spec.md` |
| 🧑‍💼 Tech Lead | `tech-lead.agent.md` | Lê `non-technical-spec.md` e gera `PRD.md` |
| 🏗️ Architect | `architect.agent.md` | Gera `technical-spec.md` e `epics.md`; prepara artefatos de épicos |

### HILs obrigatórios na Fase de Discovery

Todos os artefatos da fase de Discovery exigem revisão humana antes de avançar:

| Artefato | Prompt que o gera | HIL |
|---|---|---|
| `idea.md` | `/discovery-refine` | ✅ obrigatório |
| `non-technical-spec.md` | `/discovery-spec` | ✅ obrigatório |
| `PRD.md` | `/discovery-prd` | ✅ obrigatório |
| `technical-spec.md` | `/discovery-tech-spec` | ✅ obrigatório |
| `epics.md` | `/discovery-epics` | ✅ obrigatório |
| `epic-<N>.md` | `/epic-init` | ✅ obrigatório |
| `doc-specs/<N>-epic/PRD.md` | `/epic-init` | ✅ obrigatório |
| `spec-epic-<N>.md` | `/epic-init` | ✅ obrigatório |

### Regra de ouro do fluxo expandido

> **Sem `spec-epic-<N>.md` validada por humano, não se implementa o épico N.**

Essa regra é a extensão direta da regra original do ai-sdlc-kit e deve constar no `AGENTS.md` de todo projeto que usar este kit com a Fase de Discovery.

### Convenção de nomeação de pastas de épicos

As pastas de épicos seguem o padrão `doc-specs/<NN>-epic/` com dois dígitos:

- `doc-specs/01-epic/`
- `doc-specs/02-epic/`
- `doc-specs/10-epic/`

Cada pasta contém três artefatos: `epic-<N>.md`, `PRD.md` e `spec-epic-<N>.md`.

### Implementação por épico

Após os HILs dos três artefatos do épico, a implementação segue com `/task-implement`, apontando manualmente para os arquivos do épico:
- `doc-specs/<N>-epic/PRD.md`
- `doc-specs/<N>-epic/spec-epic-<N>.md`

O agente implementador utilizado é o mesmo do Fluxo B (`🛠️ Implementer`). Não há um implementador separado para épicos.
---

## Fase de Operations

### O que é a Fase de Operations

A Fase de Operations fecha o ciclo de cada épico após a revisão final aprovada pelo humano. Ela cobre três responsabilidades: preparação para deploy, observabilidade em produção e feedback para épicos futuros.

Nenhum épico está concluído até que `ops-epic-<N>.md` seja gerado e o deploy seja validado em produção.

### Branch por épico

Cada épico é desenvolvido em sua própria branch, criada antes de `/epic-init`. A convenção de nome é:

```
feat/E<NN>-<slug-do-epico>
```

Onde `<NN>` é o número do épico com dois dígitos e `<slug>` é um identificador curto em kebab-case extraído do nome do épico. Exemplos:

- `feat/E01-autenticacao`
- `feat/E02-onboarding-usuario`
- `feat/E03-painel-admin`

A branch do épico N deve ser mergeada para `main` somente após:
1. `ops-epic-<N>.md` gerado e aprovado (HIL)
2. Deploy executado e validado em produção

O próximo épico só pode começar após a branch anterior estar mergeada e o deploy validado.

### CONTEXT.md — memória global do projeto

`doc-specs/CONTEXT.md` é a memória global do projeto. É criado pelo Architect ao final de `/discovery-tech-spec` e atualizado pelo mesmo agente via `/context-sync` após cada épico fechado.

Todos os agentes devem ler `doc-specs/CONTEXT.md` antes de agir. Regra inviolable: **nunca remova conteúdo de `CONTEXT.md`** — apenas acrescente ou atualize.

### decisions-log.md — registro de ADRs por épico

`doc-specs/<N>-epic/decisions-log.md` registra as decisões técnicas tomadas durante cada épico. É criado vazio pelo Architect via `/epic-init` e preenchido pelo Implementer durante a implementação. O Reviewer o complementa durante a revisão. O Ops Agent o lê ao gerar `ops-epic-<N>.md`.

### Checklist de verificação em `spec-epic-<N>.md`

A seção `## Critérios de aceite técnicos` de cada `spec-epic-<N>.md` contém um checklist estruturado. O Implementer deve marcar todos os itens antes de acionar `/task-review`. Itens não marcados bloqueiam o handoff para revisão.

### Sequência completa por épico

```
0.  Criar branch feat/E<NN>-<slug>          [pré-requisito manual]
1.  /epic-init <N>                       [HIL: epic-<N>.md]
                                             [HIL: PRD.md do épico]
                                             [HIL: spec-epic-<N>.md]
2.  /task-implement
3.  Preencher checklist + decisions-log.md
4.  /task-review                             [HIL obrigatório]
5.  /epic-close <N>                    [HIL obrigatório]
6.  Mergear branch feat/E<NN>-<slug>         [gate manual]
7.  Validar em produção                      [gate manual]
8.  /context-sync <N>
9.  Avançar para o próximo épico
```

### HILs obrigatórios na Fase de Operations

| Artefato | Prompt que o gera | HIL |
|---|---|---|
| `ops-epic-<N>.md` | `/epic-close` | ✅ obrigatório |
| Merge da branch + validação em produção | — gate manual | ✅ obrigatório |
| `CONTEXT.md` atualizado | `/context-sync` | ⚠️ recomendado revisar |