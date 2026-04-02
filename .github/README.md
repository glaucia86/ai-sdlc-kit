# ai-sdlc-kit

Kit reutilizável para executar um fluxo de Spec-Driven Development (SDD) com GitHub Copilot no VS Code.

A ideia central é simples: **nenhuma linha de código é escrita sem uma spec validada por humano.** O kit organiza o caminho da ideia ou tarefa bruta até a implementação, com checkpoints obrigatórios de revisão em cada etapa.

O kit tem dois fluxos independentes:

| | Fluxo A — Discovery + Delivery | Fluxo B — Delivery direto |
|---|---|---|
| **Entrada** | `idea.txt` (ideia bruta) | `tarefa.txt` (tarefa definida) |
| **Quando usar** | Projeto novo, ideia a ser estruturada | Tarefa já clara, projeto em andamento |
| **Saída** | Épicos com specs individuais | `spec.md` única |
| **Opcional?** | Sim — pode pular e ir direto ao Fluxo B | — |

Nenhum fluxo é pré-requisito do outro.

---

## Pré-requisitos

Antes de começar:

- VS Code aberto com GitHub Copilot habilitado
- Agentes e prompts descobertos pelo VS Code — adicione ao `.vscode/settings.json` do projeto:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

- Pasta `doc-specs/` criada na raiz do projeto

---

## Fluxo A — Discovery + Delivery (opcional)

Use quando você tem uma ideia bruta e precisa estruturá-la antes de implementar.

### Antes de começar

Crie o arquivo de entrada:

```
doc-specs/idea.txt
```

Escreva a ideia livremente — sem formato obrigatório.

---

### Passo 1 — Refinar a ideia

```
/discovery-refinar-ideia
```

**O que acontece:** o 🧭 Discovery Agent lê `idea.txt` e gera `doc-specs/idea.md` com a ideia estruturada, sem viés técnico.

**✅ HIL obrigatório:** revise `idea.md` antes de continuar.
- A ideia original foi preservada?
- As ambiguidades foram registradas?
- Há algo inventado que não estava em `idea.txt`?

---

### Passo 2 — Gerar especificação funcional

```
/discovery-non-technical-spec
```

**O que acontece:** o 🗂️ PM Agent lê `idea.md` e gera `doc-specs/non-technical-spec.md` com personas, jornadas de usuário, casos de uso e regras de negócio — sem linguagem técnica.

**✅ HIL obrigatório:** revise `non-technical-spec.md` antes de continuar.
- Os fluxos de usuário estão claros?
- As regras de negócio foram capturadas corretamente?
- Existem perguntas em aberto que precisam de resposta antes de avançar?

---

### Passo 3 — Gerar PRD

```
/discovery-prd
```

**O que acontece:** o 🧑‍💼 Tech Lead Agent lê `non-technical-spec.md` e gera `doc-specs/PRD.md` com requisitos funcionais, não funcionais e critérios de aceite estruturados.

**✅ HIL obrigatório:** revise `PRD.md` antes de continuar.
- O escopo está bem delimitado (incluído / não incluído)?
- Os critérios de aceite fazem sentido?
- Algo foi extrapolado além da especificação funcional?

---

### Passo 4 — Gerar especificação técnica

```
/discovery-technical-spec
```

**O que acontece:** o 🏗️ Architect Agent lê `PRD.md` e a codebase e gera `doc-specs/technical-spec.md` com decisões de arquitetura, componentes, contratos, fluxos técnicos e estratégia de testes.

**✅ HIL obrigatório:** revise `technical-spec.md` antes de continuar.
- As decisões de arquitetura estão fundamentadas?
- Os riscos e dependências estão registrados?
- Há ambiguidades que precisam ser resolvidas antes de quebrar em épicos?

---

### Passo 5 — Gerar épicos

```
/discovery-epics
```

**O que acontece:** o 🏗️ Architect Agent lê `technical-spec.md` e `PRD.md` e gera `doc-specs/epics.md` com os épicos ordenados por dependência técnica.

**✅ HIL obrigatório:** revise `epics.md` antes de continuar.
- O sequenciamento faz sentido técnico?
- Cada épico é pequeno o suficiente para ser implementado de forma independente?
- As dependências entre épicos estão corretas?

---

### Passo 6 — Preparar artefatos do épico

```
/epic-preparar
```

O agente pergunta o número do épico antes de agir.

**O que acontece:** o 🏗️ Architect Agent gera três arquivos em `doc-specs/<N>-epic/`:

| Arquivo | Conteúdo |
|---|---|
| `epic-<N>.md` | Contexto, escopo e critérios de conclusão do épico |
| `PRD.md` | Requisitos funcionais e não funcionais do épico |
| `spec-epic-<N>.md` | Especificação técnica implementável do épico |

O agente pausa após cada arquivo e aguarda confirmação antes de gerar o próximo.

**✅ HIL obrigatório para cada arquivo** — `epic-<N>.md`, `PRD.md` e `spec-epic-<N>.md`.

> **Regra de ouro:** sem `spec-epic-<N>.md` validada por humano, não se implementa o épico N.

---

### Passo 7 — Implementar o épico

```
/sdd-implementar
```

Aponte manualmente para os arquivos do épico quando solicitado:
- `doc-specs/<N>-epic/PRD.md`
- `doc-specs/<N>-epic/spec-epic-<N>.md`

**O que acontece:** o 🛠️ SDD Implementer lê os artefatos do épico, resume o plano de implementação e executa. Ao final, preenche o checklist de `spec-epic-<N>.md` e atualiza `decisions-log.md` com decisões tomadas.

**⚠️ HIL recomendado:** acompanhe o plano proposto pelo agente antes de confirmar as alterações, especialmente em épicos maiores.

---

### Passo 8 — Revisar a entrega

```
/sdd-revisar
```

**O que acontece:** o 🔎 SDD Reviewer compara os artefatos do épico com a implementação e produz uma síntese de aderência, desvios, riscos e recomendação final.

**✅ HIL obrigatório:** decida se a entrega está aprovada, se há correções obrigatórias ou se o épico precisa de ajuste antes de avançar para o próximo.

---

### Passo 9 — Fechar o épico

```
/ops-fechar-epico
```

O agente pergunta o número do épico antes de agir.

**O que acontece:** o 🚀 Operations Agent lê os artefatos do épico e gera `doc-specs/<N>-epic/ops-epic-<N>.md` com preparação para deploy, observabilidade e feedback para épicos futuros.

**✅ HIL obrigatório:** revise `ops-epic-<N>.md` antes de continuar.

---

### Passo 10 — Gate de produção

Etapa manual — sem prompt de agente.

1. Faça o merge da branch `feat/E<NN>-<slug>` para `main`.
2. Execute o deploy.
3. Valide em produção usando os critérios definidos em `ops-epic-<N>.md`.

Somente após essa validação o próximo épico pode começar.

---

### Passo 11 — Atualizar memória global

```
/ops-atualizar-context
```

**O que acontece:** o 🏗️ Architect Agent lê `ops-epic-<N>.md` e `decisions-log.md` e atualiza `doc-specs/CONTEXT.md` com o épico concluído, ADRs e aprendizados.

Após isso, repita a partir do **Passo 0** para o próximo épico.

---

## Fluxo B — Delivery direto

Use quando a tarefa já está clara e definida. Este é o fluxo original do ai-sdlc-kit.

### Antes de começar

Crie o arquivo de entrada:

```
doc-specs/tarefa.txt
```

Escreva a descrição bruta da tarefa — pode estar desorganizada. O fluxo existe para organizar antes de implementar.

---

### Passo 1 — Estruturar a tarefa

```
/sdd-preparar-tarefa
```

**O que acontece:** o 📥 SDD Intake lê `tarefa.txt` e gera `doc-specs/tarefa.md` estruturado. Ele não acessa PRD, spec nem a codebase — apenas transforma a entrada bruta fielmente.

**✅ HIL obrigatório:** revise `tarefa.md` antes de continuar.
- O objetivo ficou claro?
- Houve perda ou distorção de informação?
- Existem ambiguidades que precisam ser resolvidas agora?

---

### Passo 2 — Gerar PRD

```
/sdd-gerar-prd
```

**O que acontece:** o 📐 SDD Planner lê `tarefa.md` e gera `doc-specs/PRD.md` com visão geral, objetivos, escopo, requisitos funcionais e não funcionais, critérios de aceite e perguntas abertas.

**✅ HIL obrigatório:** revise `PRD.md` antes de continuar.
- O PRD representa corretamente a tarefa?
- O escopo está delimitado (incluído / não incluído)?
- Existem perguntas abertas que precisam de resposta antes da spec?

---

### Passo 3 — Gerar spec

```
/sdd-gerar-spec
```

**O que acontece:** o 📐 SDD Planner lê `PRD.md` e a codebase e gera `doc-specs/spec.md` com contexto técnico, componentes afetados, fluxo de implementação, estratégia de testes, riscos e dúvidas em aberto.

**✅ HIL obrigatório:** revise `spec.md` antes de continuar.
- A spec está coerente com o PRD?
- As decisões técnicas estão explícitas o suficiente?
- A implementação conseguirá seguir esse documento sem suposições perigosas?

> **Regra de ouro:** sem `spec.md` validada por humano, não se implementa.

---

### Passo 4 — Implementar

```
/sdd-implementar
```

Para tarefas com componentes de frontend, use:

```
/sdd-implementar-frontend
```

**O que acontece:** o 🛠️ SDD Implementer lê `PRD.md` e `spec.md`, resume o plano, identifica arquivos afetados e executa a implementação. Se encontrar uma ambiguidade crítica, para e sinaliza.

**⚠️ HIL recomendado:** acompanhe o plano proposto antes de confirmar, especialmente em mudanças maiores.

---

### Passo 5 — Revisar a entrega

```
/sdd-revisar
```

**O que acontece:** o 🔎 SDD Reviewer compara `PRD.md`, `spec.md` e a implementação. Produz: síntese de aderência, desvios encontrados, riscos, lacunas e recomendação final.

**✅ HIL obrigatório:** decida se a entrega está aprovada ou se há correções antes de fechar a tarefa.

---

## Quando voltar uma etapa

| Situação | Volte para |
|---|---|
| A tarefa foi mal interpretada | Etapa de intake / `idea.txt` |
| O PRD não reflete o escopo correto | Geração do PRD |
| A spec está superficial ou ambígua | Geração da spec |
| O implementador encontrou ambiguidade crítica | Spec (ajustar e regenerar) |
| O reviewer apontou desvio de especificação | Spec ou PRD |

---

## Referência — Agentes

| Agente | Fluxo | Responsabilidade |
|---|---|---|
| 🧭 Discovery Agent | A | Refina `idea.txt` e gera `idea.md` sem viés técnico |
| 🗂️ PM Agent | A | Gera `non-technical-spec.md` com especificação funcional |
| 🧑‍💼 Tech Lead Agent | A | Gera `PRD.md` a partir da especificação funcional |
| 🏗️ Architect Agent | A | Gera `technical-spec.md`, `epics.md`, artefatos por épico e atualiza `CONTEXT.md` |
| 🚀 Operations Agent | A | Fecha o ciclo do épico: deploy, observabilidade, feedback |
| 📥 SDD Intake | B | Estrutura `tarefa.txt` em `tarefa.md` |
| 📐 SDD Planner | B | Gera `PRD.md` e `spec.md` |
| 🛠️ SDD Implementer | A e B | Implementa com base nos artefatos aprovados |
| 🔎 SDD Reviewer | A e B | Revisa aderência entre spec e implementação |

---

## Referência — Prompts

| Prompt | Fluxo | O que faz |
|---|---|---|
| `/discovery-refinar-ideia` | A | `idea.txt` → `idea.md` |
| `/discovery-non-technical-spec` | A | `idea.md` → `non-technical-spec.md` |
| `/discovery-prd` | A | `non-technical-spec.md` → `PRD.md` |
| `/discovery-technical-spec` | A | `PRD.md` → `technical-spec.md` + `CONTEXT.md` |
| `/discovery-epics` | A | `technical-spec.md` → `epics.md` |
| `/epic-preparar` | A | Gera os 4 artefatos de `doc-specs/<N>-epic/` (incluindo `decisions-log.md`) |
| `/ops-fechar-epico` | A | Gera `ops-epic-<N>.md` com deploy, observabilidade e feedback |
| `/ops-atualizar-context` | A | Atualiza `CONTEXT.md` com ADRs e aprendizados do épico |
| `/sdd-preparar-tarefa` | B | `tarefa.txt` → `tarefa.md` |
| `/sdd-gerar-prd` | B | `tarefa.md` → `PRD.md` |
| `/sdd-gerar-spec` | B | `PRD.md` → `spec.md` |
| `/sdd-implementar` | A e B | Implementa com base nos artefatos aprovados |
| `/sdd-implementar-frontend` | A e B | Implementa frontend com skills de design injetadas |
| `/sdd-revisar` | A e B | Revisa aderência entre artefatos e implementação |
| `/sdd-bootstrap-agents-md` | — | Gera `AGENTS.md` inicial para o projeto |

---

## Estrutura do kit

```
.github/
  agents/
    discovery.agent.md
    pm.agent.md
    tech-lead.agent.md
    architect.agent.md
    operations.agent.md
    sdd-intake.agent.md
    sdd-planner.agent.md
    sdd-implementer.agent.md
    sdd-reviewer.agent.md
  prompts/
    discovery-refinar-ideia.prompt.md
    discovery-non-technical-spec.prompt.md
    discovery-prd.prompt.md
    discovery-technical-spec.prompt.md
    discovery-epics.prompt.md
    epic-preparar.prompt.md
    ops-fechar-epico.prompt.md
    ops-atualizar-context.prompt.md
    sdd-preparar-tarefa.prompt.md
    sdd-gerar-prd.prompt.md
    sdd-gerar-spec.prompt.md
    sdd-implementar.prompt.md
    sdd-implementar-frontend.prompt.md
    sdd-revisar.prompt.md
    sdd-bootstrap-agents-md.prompt.md
  templates/
    idea.template.md
    non-technical-spec.template.md
    technical-spec.template.md
    epics.template.md
    epic-N.template.md
    spec-epic-N.template.md
    ops-epic-N.template.md
    decisions-log.template.md
    CONTEXT.template.md
    AGENTS.base.md
    PRD.template.md
    spec.template.md
  docs/
    convencoes.md
    fluxo-sdd.md
```

---

## Como instalar em um projeto

### Opção A — copiar para o projeto

Copie `agents/*` e `prompts/*` para `.github/agents/` e `.github/prompts/` do seu projeto.

### Opção B — apontar o VS Code para a pasta do kit

Adicione ao `.vscode/settings.json` do projeto:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/prompts": true }
}
```

Para instalar automaticamente (detecta e faz merge do `settings.json` existente):

```bash
make install
```

Para apontar para um caminho externo personalizado:

```bash
make install-external PATH=/caminho/para/ai-sdlc-kit
```
