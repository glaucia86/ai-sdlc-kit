---
title: Novo Projeto
description: Passo a passo completo para iniciar um novo projeto com o ai-sdlc-kit, desde a ideia bruta até o final do primeiro epic.
---

## Quando usar este cenário

Use este passo a passo se você está começando um projeto do zero — nenhum codebase existe ainda e você tem uma ideia que quer levar do conceito ao código implementado.

---

## Antes de começar

Instale o kit no seu projeto:

```bash
npx ai-sdlc-kit@latest init
```

Crie seu arquivo de ideia:

```bash
echo "Sua ideia bruta aqui" > doc-specs/idea.txt
```

Abra o projeto no VS Code com o Copilot habilitado.

---

## Flow A — Fase de Discovery (novos projetos)

O Flow A é o ponto de partida recomendado para novos projetos. Ele converte uma ideia não estruturada em uma spec totalmente validada.

### Passo 1 — Refinar a ideia

Execute `/discovery-refine` usando o agente 🧭 Discovery.

Entrada: `idea.txt`  
Saída: `idea.md`

O agente Discovery remove viés, preenche lacunas estruturais e produz um documento de ideia limpo e inequívoco que não sobre-especifica nem sub-especifica o produto.

**HIL-A1:** Revise `idea.md`. Pergunte-se: isso captura o que eu realmente quero construir? Algo está faltando? Algo está declarado como fato que é, na verdade, uma premissa?

### Passo 2 — Spec funcional

Execute `/discovery-spec` usando o agente 🗂️ PM.

Entrada: `idea.md`  
Saída: `non-technical-spec.md`

O agente PM traduz a ideia em requisitos funcionais estruturados — o que o produto faz, para quem, sob quais restrições — sem fazer escolhas técnicas.

**HIL-A2:** Revise `non-technical-spec.md`. Pergunte-se: todas as histórias de usuário estão completas? Existem casos extremos que não estão cobertos?

### Passo 3 — Requisitos de produto

Execute `/discovery-prd` usando o agente 🧑‍💼 Tech Lead.

Entrada: `non-technical-spec.md`  
Saída: `PRD.md`

O agente Tech Lead estrutura a spec funcional em requisitos de produto formais: critérios de aceitação testáveis, priorização, dependências.

**HIL-A3:** Revise `PRD.md`. Pergunte-se: esses requisitos são testáveis? As prioridades estão corretas?

### Passo 4 — Especificação técnica

Execute `/discovery-tech-spec` usando o agente 🏗️ Architect.

Entrada: `PRD.md`  
Saída: `technical-spec.md`

O agente Architect seleciona a stack, define a arquitetura, identifica pontos de integração e documenta todas as restrições técnicas.

**HIL-A4:** Revise `technical-spec.md`. Pergunte-se: esta arquitetura é sólida? As escolhas de stack são apropriadas? Existem restrições que o agente não poderia saber?

### Passo 5 — Estrutura de epics

Execute `/discovery-epics` usando o agente 🏗️ Architect.

Entrada: `technical-spec.md` + `PRD.md`  
Saída: `epics.md`

O agente Architect divide o escopo completo do produto em epics independentemente entregáveis, cada um terminando com um incremento testável e entregável.

**HIL-A5:** Revise `epics.md`. Pergunte-se: esses epics são independentes? O sequenciamento está correto? O Epic 1 está bem dimensionado para uma primeira entrega?

---

## Flow B — Fase de Construção (Epic 1)

Após `epics.md` ser aprovado, você está na fase de Construção. Você repetirá o Flow B para cada epic.

### Passo 1 — Inicializar a spec do epic

Execute `/epic-init` usando o agente 🏗️ Architect.

Entrada: `CONTEXT.md` + `technical-spec.md` + `epics.md`  
Saída: `spec-epic-1.md`, `PRD.md` (com escopo do epic), `epic-1.md`

O Architect gera a spec por epic, o PRD com escopo reduzido e a lista de tarefas para o Epic 1.

**HIL-B1:** Revise os três artefatos. A spec é o contrato para este epic. Aprove apenas quando os critérios de aceitação estiverem completos.

### Passo 2 — Inicializar tarefas

Execute `/task-init` usando o agente 📐 Planner.

Entrada: `epic-1.md`  
Saída: decomposição granular de tarefas

O Planner decompõe a lista de tarefas do epic em unidades implementáveis — cada tarefa focada em uma única preocupação.

**HIL-B2:** Revise a lista de tarefas. As tarefas são granulares o suficiente? Algo está faltando?

### Passo 3 — Implementar cada tarefa

Execute `/task-implement` usando o agente 🛠️ Implementer, para cada tarefa.

Entrada: descrição da tarefa + `spec-epic-1.md` + `CONTEXT.md`  
Saída: mudanças de código + notas em `decisions-log.md` para quaisquer decisões em aberto tomadas

O Implementer gera código que satisfaz os critérios de aceitação da tarefa. Toda implementação segue a spec.

### Passo 4 — Escrever testes

Execute `/task-tests` usando o agente 🧪 QA.

Entrada: código implementado + critérios de aceitação da tarefa  
Saída: suite de testes

### Passo 5 — Revisão

Execute `/task-review` usando o agente 🔎 Reviewer.

Entrada: implementação + spec + resultados de testes  
Saída: relatório de revisão

**HIL-B3/B4:** Revise o relatório. Todos os critérios de aceitação estão satisfeitos? Algum problema sinalizado é bloqueador?

### Passo 6 — Fechar o epic

Execute `/epic-close` usando o agente 🚀 Ops.

Entrada: `CONTEXT.md` + implementação  
Saída: `ops-epic-1.md` (plano de deploy, rollback, observabilidade)

**HIL-B5:** Aprove o plano de deploy antes do merge.

### Passo 7 — Sincronizar contexto

Execute `/context-sync` usando o agente 🏗️ Architect.

Entrada: `CONTEXT.md` + todos os artefatos do epic  
Saída: `CONTEXT.md` atualizado

Esta etapa fecha o Epic 1 e prepara o contexto para o Epic 2.

---

## Após o Epic 1

Repita a fase de Construção (Flow B) para cada epic subsequente. O `CONTEXT.md` carrega todas as decisões e contexto automaticamente.

O Flow A é necessário apenas uma vez — no início do projeto. Se o escopo mudar significativamente no meio do projeto (uma mudança estratégica de direção), você pode executar um Flow A parcial para atualizar `technical-spec.md` e resequenciar `epics.md`.
