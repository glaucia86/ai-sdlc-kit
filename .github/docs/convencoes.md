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
