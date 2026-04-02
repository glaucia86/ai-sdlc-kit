# ai-sdlc-kit

Kit reutilizável para executar um fluxo de Spec-Driven Development (SDD) com GitHub Copilot no VS Code.

Este kit organiza o processo em etapas claras, com artefatos intermediários e checkpoints de revisão humana antes da implementação.

O objetivo é evitar que a implementação comece diretamente a partir de uma ideia ou tarefa bruta, sem que antes exista clareza funcional e técnica suficiente.

O kit suporta dois fluxos independentes:

- **Fluxo A — Discovery + Delivery**: parte de uma ideia (`idea.txt`), passa por múltiplas etapas de refinamento e quebra em épicos antes da implementação.
- **Fluxo B — Delivery direto**: parte de uma tarefa já definida (`tarefa.txt`) e segue diretamente para especificação e implementação.

Nenhum fluxo é pré-requisito do outro.

---

## Pré-requisitos

Antes de começar, verifique se:

- o projeto está aberto no VS Code
- os agentes estão habilitados no ambiente
- os prompt files e custom agents estão sendo descobertos pelo VS Code
- existe uma pasta chamada `doc-specs/` na raiz do projeto

Para garantir que o VS Code descubra os agentes e prompts desta pasta, adicione ao `.vscode/settings.json` do projeto:

```json
{
  "chat.agentFilesLocations": { ".github/agents": true },
  "chat.promptFilesLocations": { ".github/prompts": true }
}
```

---

## Estrutura esperada da pasta `doc-specs/`

O fluxo assume os seguintes arquivos:

```
doc-specs/tarefa.txt
doc-specs/tarefa.md
doc-specs/PRD.md
doc-specs/spec.md
```

Nem todos existem no início. No começo, normalmente você só terá:

```
doc-specs/tarefa.txt
```

Os demais serão gerados ao longo do fluxo.

---

## Estrutura do kit

```
.github/
  agents/
    discovery.agent.md          ← Fase de Discovery
    pm.agent.md                 ← Fase de Discovery
    tech-lead.agent.md          ← Fase de Discovery
    architect.agent.md          ← Fase de Discovery
    sdd-intake.agent.md
    sdd-planner.agent.md
    sdd-implementer.agent.md
    sdd-reviewer.agent.md
  prompts/
    discovery-refinar-ideia.prompt.md       ← Fase de Discovery
    discovery-non-technical-spec.prompt.md  ← Fase de Discovery
    discovery-prd.prompt.md                 ← Fase de Discovery
    discovery-technical-spec.prompt.md      ← Fase de Discovery
    discovery-epics.prompt.md               ← Fase de Discovery
    epic-preparar.prompt.md                 ← Fase de Discovery
    sdd-preparar-tarefa.prompt.md
    sdd-gerar-prd.prompt.md
    sdd-gerar-spec.prompt.md
    sdd-implementar.prompt.md
    sdd-implementar-frontend.prompt.md
    sdd-revisar.prompt.md
    sdd-bootstrap-agents-md.prompt.md
  templates/
    idea.template.md                ← Fase de Discovery
    non-technical-spec.template.md  ← Fase de Discovery
    technical-spec.template.md      ← Fase de Discovery
    epics.template.md               ← Fase de Discovery
    epic-N.template.md              ← Fase de Discovery
    spec-epic-N.template.md         ← Fase de Discovery
    AGENTS.base.md
    PRD.template.md
    spec.template.md
  docs/
    convencoes.md
    fluxo-sdd.md
.vscode/
  settings.json
scripts/
  install.ts
Makefile
```

---

## Papel de cada agente

### � SDD Intake

Responsável exclusivamente pela etapa de intake. Ele:

- lê `tarefa.txt`
- gera `tarefa.md` estruturado
- não acessa PRD, spec, codebase nem qualquer outro artefato
- registra dúvidas e ambiguidades explicitamente

### 📐 SDD Planner

Responsável por planejamento e especificação. Ele:

- lê a tarefa
- gera `PRD.md`
- gera `spec.md`
- não implementa código

### 🛠️ SDD Implementer

Responsável por implementação. Ele:

- lê `PRD.md` e `spec.md`
- resume o que será feito antes de alterar qualquer arquivo
- implementa a tarefa
- tenta manter aderência ao escopo definido
- sinaliza ambiguidades críticas em vez de decidir sozinho

### 🔎 SDD Reviewer

Responsável por revisão final. Ele:

- compara `PRD.md`, `spec.md` e implementação
- aponta desvios, riscos, lacunas e pendências
- produz uma recomendação final acionável

---

## Fase de Discovery (opcional — Fluxo A)

A Fase de Discovery é indicada para projetos novos ou quando há uma ideia a ser estruturada antes de planejar o desenvolvimento. Ela é sempre opcional — se a tarefa já estiver clara, use o Fluxo B diretamente.

### Agentes da Fase de Discovery

| Agente | Arquivo | Responsabilidade |
|---|---|---|
| 🧭 Discovery Agent | `discovery.agent.md` | Refina `idea.txt` sem viés técnico e gera `idea.md` |
| 🗂️ PM Agent | `pm.agent.md` | Gera `non-technical-spec.md` com especificação funcional |
| 🧑‍💼 Tech Lead Agent | `tech-lead.agent.md` | Gera `PRD.md` a partir da especificação funcional |
| 🏗️ Architect Agent | `architect.agent.md` | Gera `technical-spec.md`, `epics.md` e artefatos por épico |

### Prompts da Fase de Discovery

| Prompt | O que faz |
|---|---|
| `/discovery-refinar-ideia` | Lê `idea.txt` e gera `idea.md` (sem viés técnico) |
| `/discovery-non-technical-spec` | Lê `idea.md` e gera `non-technical-spec.md` |
| `/discovery-prd` | Lê `non-technical-spec.md` e gera `PRD.md` |
| `/discovery-technical-spec` | Lê `PRD.md` e gera `technical-spec.md` |
| `/discovery-epics` | Lê `technical-spec.md` e gera `epics.md` (ordenado por dependência técnica) |
| `/epic-preparar` | Gera os 3 artefatos de um épico em `doc-specs/<N>-epic/` (o agente pergunta o número do épico) |

---

## Papel de cada prompt (Fluxo B — Delivery direto)

| Prompt | O que faz |
|---|---|
| `/sdd-preparar-tarefa` | Transforma `tarefa.txt` em `tarefa.md` (usa 📥 SDD Intake) |
| `/sdd-gerar-prd` | Transforma `tarefa.md` em `PRD.md` |
| `/sdd-gerar-spec` | Transforma `PRD.md` em `spec.md` |
| `/sdd-implementar` | Inicia a implementação com base em `PRD.md` e `spec.md` |
| `/sdd-implementar-frontend` | Implementação de tarefas de frontend com skills de design e acessibilidade injetadas |
| `/sdd-revisar` | Executa revisão de aderência entre artefatos e código |
| `/sdd-bootstrap-agents-md` | Gera um `AGENTS.md` inicial, minimalista e estável para o projeto |

---

## Execução do fluxo completo

### Etapa 0 — Criar a entrada inicial da tarefa

Crie a pasta `doc-specs/`, se ainda não existir. Depois, crie o arquivo:

```
doc-specs/tarefa.txt
```

Esse arquivo deve conter a descrição bruta da tarefa, normalmente vinda do backlog, da ferramenta de gestão ou do contexto repassado pelo time. Essa descrição ainda pode estar desorganizada. O fluxo existe justamente para organizar isso antes de implementar.

---

### Etapa 1 — Gerar `tarefa.md`

No chat do Copilot, execute:

```
/sdd-preparar-tarefa
```

Essa etapa usa o agente � SDD Intake para ler `doc-specs/tarefa.txt` e gerar `doc-specs/tarefa.md`.

O SDD Intake é um agente de escopo restrito: ele lê exclusivamente `tarefa.txt`, não acessa PRD, spec, nem a codebase. Isso garante que a entrada bruta da tarefa seja estruturada fielmente, sem contaminação técnica ou arquitetural.

**HIL obrigatório após esta etapa.**
Antes de seguir, uma pessoa deve revisar `tarefa.md`. A revisão humana deve responder:

- o objetivo da tarefa ficou claro?
- houve perda de informação?
- algo foi interpretado errado?
- existem ambiguidades que precisam ser corrigidas agora?

Se a resposta for "não está bom o suficiente", ajuste a entrada e execute novamente a etapa. Não avance para o PRD sem essa validação.

---

### Etapa 2 — Gerar `PRD.md`

No chat do Copilot, execute:

```
/sdd-gerar-prd
```

Essa etapa usa o agente 📐 SDD Planner para ler `doc-specs/tarefa.md` e gerar `doc-specs/PRD.md`.

O PRD é gerado com a seguinte estrutura: visão geral, objetivos, escopo (incluído / não incluído), premissas, requisitos funcionais, requisitos não funcionais, critérios de aceite e perguntas abertas.

**HIL obrigatório após esta etapa.**
Antes de seguir, uma pessoa deve revisar `PRD.md`. A revisão humana deve responder:

- o PRD representa corretamente a tarefa?
- os objetivos estão coerentes?
- o escopo está claro?
- os critérios de aceite fazem sentido?
- existem perguntas abertas que precisam ser respondidas antes da spec?

Se houver desalinhamento, ajuste e regenere o PRD. Não avance para a spec sem essa validação.

---

### Etapa 3 — Gerar `spec.md`

No chat do Copilot, execute:

```
/sdd-gerar-spec
```

Essa etapa usa o agente 📐 SDD Planner para ler `doc-specs/PRD.md` e gerar `doc-specs/spec.md`.

A spec é gerada com a seguinte estrutura: contexto, objetivo técnico, escopo de implementação, impacto na arquitetura, componentes afetados, fluxo funcional esperado, regras técnicas, estratégia de implementação, estratégia de testes, critérios de aceite técnicos, riscos e dúvidas em aberto.

**HIL obrigatório após esta etapa.**
Antes de seguir, uma pessoa deve revisar `spec.md`. A revisão humana deve responder:

- a spec está coerente com o PRD?
- ela está técnica o suficiente para implementação?
- há decisões técnicas importantes implícitas demais?
- faltam riscos, dependências ou dúvidas em aberto?
- a implementação conseguirá seguir esse documento sem suposições perigosas?

Se a spec estiver superficial ou desalinhada, refine e regenere. A implementação não deve começar sem aprovação humana da spec.

---

### Etapa 4 — Implementar

Somente depois da aprovação humana de `spec.md`, execute:

```
/sdd-implementar
```

Essa etapa usa o agente 🛠️ SDD Implementer para:

- ler `doc-specs/PRD.md` e `doc-specs/spec.md`
- resumir o que será implementado
- identificar os principais arquivos e componentes afetados
- sinalizar ambiguidades críticas antes de alterar qualquer arquivo
- iniciar a implementação

Se o agente encontrar uma ambiguidade crítica, ele deve sinalizar e parar, em vez de decidir sozinho. Se isso acontecer, o correto é voltar para a etapa da spec e ajustar o documento.

**HIL recomendado durante a implementação.**
Dependendo do tamanho da mudança, vale acompanhar o plano proposto pelo agente, os arquivos que ele pretende alterar e as mudanças mais sensíveis. Em tarefas pequenas isso pode ser mais leve. Em tarefas maiores, esse acompanhamento é importante.

> **Handoffs e `send: false`:** ao final da implementação, o agente pode propor um handoff para o SDD Reviewer. Esse handoff só é executado se você o confirmar manualmente. O Copilot exibe a opção de continuação, mas não invoca o próximo agente sem sua confirmação. Isso é parte do Human in the Loop do fluxo.

---

### Etapa 5 — Revisar a entrega

Depois da implementação, execute:

```
/sdd-revisar
```

Essa etapa usa o agente 🔎 SDD Reviewer para revisar `doc-specs/PRD.md`, `doc-specs/spec.md` e a implementação atual.

A saída deve apontar: síntese da aderência, desvios encontrados, riscos e pontos de atenção, lacunas e recomendação final.

**HIL obrigatório no fechamento.**
Uma pessoa deve revisar a saída do revisor e decidir:

- a entrega está aderente ao escopo?
- existem correções obrigatórias?
- a spec precisa ser ajustada?
- a implementação pode seguir para o próximo estágio?

O agente revisor ajuda a encontrar inconsistências, mas a decisão final continua humana.

---

## Resumo dos checkpoints HIL

**Obrigatórios:**
- após `tarefa.md`
- após `PRD.md`
- após `spec.md`
- após revisão final do reviewer

**Recomendados:**
- durante a implementação, especialmente em mudanças maiores

---

## Regra principal do fluxo

**Sem `spec.md` validada por humano, não se implementa.**

Essa é a regra central desta orquestração.

---

## Quando voltar uma etapa

Volte para a etapa anterior quando:

- a tarefa estiver mal representada
- o PRD não refletir corretamente o escopo
- a spec estiver superficial ou ambígua
- a implementação depender de decisões não documentadas
- o reviewer apontar desvios que indicam erro de especificação

---

## Quando usar `/sdd-bootstrap-agents-md`

Use esse prompt apenas quando quiser criar ou revisar o `AGENTS.md` do projeto. Ele não faz parte do fluxo obrigatório por tarefa.

Ele existe para gerar um `AGENTS.md` inicial: minimalista, estável, coerente com o projeto e alinhado com progressive disclosure.

---

## Fluxo resumido

### Fluxo A — Discovery + Delivery (opcional)

```
idea.txt
   ↓
/discovery-refinar-ideia      → HIL — revisar idea.md
   ↓
/discovery-non-technical-spec → HIL — revisar non-technical-spec.md
   ↓
/discovery-prd                → HIL — revisar PRD.md
   ↓
/discovery-technical-spec     → HIL — revisar technical-spec.md
   ↓
/discovery-epics              → HIL — revisar epics.md
   ↓ (por épico)
/epic-preparar                → HIL — revisar epic-N.md
                              → HIL — revisar PRD.md do épico
                              → HIL — revisar spec-epic-N.md
   ↓
/sdd-implementar  (apontar para doc-specs/<N>-epic/)
   ↓
/sdd-revisar
   ↓
HIL final
```

### Fluxo B — Delivery direto

```
tarefa.txt
   ↓
/sdd-preparar-tarefa → HIL — revisar tarefa.md
   ↓
/sdd-gerar-prd       → HIL — revisar PRD.md
   ↓
/sdd-gerar-spec      → HIL — revisar spec.md
   ↓
/sdd-implementar
   ↓
/sdd-revisar
   ↓
HIL final
```

---

## Boas práticas

- não pule a revisão da spec
- não trate o PRD como documento técnico
- não deixe ambiguidades sem registro
- não use o implementador para descobrir escopo
- use o reviewer para validar aderência, não para redefinir a tarefa

---

## Resultado esperado

Ao final do processo, deve existir coerência entre:

- a descrição original da tarefa
- a tarefa estruturada
- o PRD
- a spec
- a implementação
- a revisão final

Esse é o sinal de que o fluxo SDD funcionou corretamente.

---

## Como instalar em um projeto

Há duas formas de usar esta orquestração.

### Opção A — copiar para o projeto

Copie:
- `agents/*` para `.github/agents/`
- `prompts/*` para `.github/prompts/`

Essa opção é a mais simples quando você quer que o fluxo viaje junto com o repositório.

### Opção B — manter a pasta reutilizável e apontar o VS Code para ela

Se você preferir manter `ai-sdlc-kit` fora da `.github`, adicione no arquivo `.vscode/settings.json` do projeto:

```json
{
  "chat.agentFilesLocations": { "./ai-sdlc-kit/agents": true },
  "chat.promptFilesLocations": { "./ai-sdlc-kit/prompts": true }
}
```

#### Instalação automatizada (Opção B)

Para não editar o `settings.json` manualmente, execute:

```bash
make install
```

O script detecta se já existe um `settings.json` e faz **merge** das entradas necessárias sem sobrescrever o restante do arquivo. Se o arquivo não existir, ele é criado.

Para apontar para um caminho externo personalizado:

```bash
make install-external PATH=/caminho/para/ai-sdlc-kit
```

Consulte `Makefile` e `scripts/install.ts` para detalhes.
