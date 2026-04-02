---
name: "epic-preparar"
description: "Prepara os artefatos de especificação para um épico específico dentro de doc-specs/<N>-epic/."
agent: "🏗️ Architect Agent"
---

#file:doc-specs/CONTEXT.md
#file:doc-specs/epics.md
#file:doc-specs/technical-spec.md
#file:doc-specs/PRD.md

**Antes de iniciar, pergunte ao usuário:** "Qual o número do épico a ser preparado? (ex: 1, 2, 3)"

Aguarde a resposta antes de continuar.

---

Para o épico informado (chamado aqui de N, com dois dígitos — ex: `01`, `02`):

1. Crie a pasta `doc-specs/<N>-epic/`.

2. Gere os seguintes arquivos dentro dessa pasta:

### `doc-specs/<N>-epic/epic-<N>.md`
Descrição detalhada do épico:
- contexto e objetivo
- escopo (o que está incluído e o que não está)
- dependências de épicos anteriores
- critérios de conclusão

**Pause aqui e avise o usuário que `epic-<N>.md` está pronto para revisão (HIL obrigatório).**

### `doc-specs/<N>-epic/PRD.md`
PRD específico para este épico:
- visão geral do épico
- objetivos
- requisitos funcionais do épico
- requisitos não funcionais do épico
- critérios de aceite
- perguntas abertas

**Pause aqui e avise o usuário que `PRD.md` do épico está pronto para revisão (HIL obrigatório).**

### `doc-specs/<N>-epic/spec-epic-<N>.md`
Especificação técnica do épico:
- contexto técnico
- objetivo técnico
- escopo de implementação
- arquivos e componentes potencialmente afetados
- fluxo técnico esperado
- regras e restrições
- estratégia de implementação
- estratégia de testes
- critérios de aceite técnicos
- riscos e dúvidas em aberto

**Pause aqui e avise o usuário que `spec-epic-<N>.md` está pronto para revisão (HIL obrigatório).**

---

Regras:
- não implemente código de produção
- fundamente tudo em epics.md e technical-spec.md
- sinalize ambiguidades em vez de assumir decisões
- escreva em português do Brasil
- aguarde confirmação do usuário após cada arquivo antes de gerar o próximo

Antes de gerar os artefatos, verifique se a branch `feat/E<NN>-<slug>` foi criada para este épico. Se não foi, sinalize ao usuário:

> **Pré-requisito:** Crie a branch a seguir antes de iniciar a implementação:
> `git checkout -b feat/E<NN>-<slug-do-epico>`
> Onde `<NN>` é o número do épico com dois dígitos e `<slug>` é um identificador curto em kebab-case.

---

Após gerar `doc-specs/<N>-epic/spec-epic-<N>.md`, crie também o arquivo `doc-specs/<N>-epic/decisions-log.md` com a estrutura do template `.github/templates/decisions-log.template.md` (vazio, apenas com a estrutura pronta para ser preenchida durante a implementação).

**Pause aqui e avise o usuário que `decisions-log.md` foi criado e está pronto para uso durante a implementação.**

---

Após todos os HILs aprovados, informe ao usuário que os artefatos do épico estão prontos e que a implementação pode ser iniciada com `/sdd-implementar`, apontando manualmente para os arquivos `doc-specs/<N>-epic/PRD.md` e `doc-specs/<N>-epic/spec-epic-<N>.md`.
