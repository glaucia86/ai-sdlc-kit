# Kit SDD Orquestração

Kit reutilizável para executar um fluxo de Spec-Driven Development (SDD) com GitHub Copilot no VS Code.

Este kit organiza o processo em etapas claras, com artefatos intermediários e checkpoints de revisão humana antes da implementação.

O objetivo é evitar que a implementação comece diretamente a partir de uma tarefa bruta, sem que antes exista clareza funcional e técnica suficiente.

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
    sdd-planner.agent.md
    sdd-implementer.agent.md
    sdd-reviewer.agent.md
  prompts/
    sdd-preparar-tarefa.prompt.md
    sdd-gerar-prd.prompt.md
    sdd-gerar-spec.prompt.md
    sdd-implementar.prompt.md
    sdd-revisar.prompt.md
    sdd-bootstrap-agents-md.prompt.md
  templates/
    AGENTS.base.md
    PRD.template.md
    spec.template.md
  docs/
    convencoes.md
    fluxo-sdd.md
.vscode/
  settings.json
```

---

## Papel de cada agente

### 📐 SDD Planner

Responsável por planejamento e especificação. Ele:

- lê a tarefa
- gera `tarefa.md`
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

## Papel de cada prompt

| Prompt | O que faz |
|---|---|
| `/sdd-preparar-tarefa` | Transforma `tarefa.txt` em `tarefa.md` |
| `/sdd-gerar-prd` | Transforma `tarefa.md` em `PRD.md` |
| `/sdd-gerar-spec` | Transforma `PRD.md` em `spec.md` |
| `/sdd-implementar` | Inicia a implementação com base em `PRD.md` e `spec.md` |
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

Essa etapa usa o agente 📐 SDD Planner para ler `doc-specs/tarefa.txt` e gerar `doc-specs/tarefa.md`.

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

```
tarefa.txt
   ↓
/sdd-preparar-tarefa
   ↓
HIL — revisar tarefa.md
   ↓
/sdd-gerar-prd
   ↓
HIL — revisar PRD.md
   ↓
/sdd-gerar-spec
   ↓
HIL — revisar spec.md
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

Se você preferir manter `sdd-orquestracao` fora da `.github`, adicione no arquivo `.vscode/settings.json` do projeto:

```json
{
  "chat.agentFilesLocations": { "./sdd-orquestracao/agents": true },
  "chat.promptFilesLocations": { "./sdd-orquestracao/prompts": true }
}
```
