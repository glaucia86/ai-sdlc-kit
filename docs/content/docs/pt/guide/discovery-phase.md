---
title: Fase de Discovery
description: Como usar a fase de Discovery do AI SDLC Kit para ir de uma ideia bruta a um conjunto de epics implementáveis.
---

## O que é a fase de Discovery?

A fase de Discovery é o primeiro estágio do Flow A. Ela pega uma ideia bruta e não estruturada e a transforma — por meio de uma sequência de quatro agentes e cinco prompts — em um projeto totalmente estruturado: uma spec técnica, um conjunto de epics ordenados e uma memória de contexto que todos os agentes futuros utilizarão.

A fase de Discovery é **sempre opcional**. Se você já tem uma tarefa clara e definida, vá diretamente para o Flow B (começando com `/task-init`).

---

## Os quatro agentes de Discovery

| Agente | Arquivo | Persona | Produz |
|---|---|---|---|
| 🧭 Discovery | `discovery.agent.md` | Pensador de produto, sem viés técnico | `idea.md` |
| 🗂️ PM | `pm.agent.md` | Product Manager focado em jornadas de usuário e regras de negócio | `non-technical-spec.md` |
| 🧑‍💼 Tech Lead | `tech-lead.agent.md` | Líder de engenharia conectando PM e arquitetura | `PRD.md` |
| 🏗️ Architect | `architect.agent.md` | Arquiteto sênior de sistemas, especialista em TypeScript | `technical-spec.md`, `epics.md`, artefatos por epic |

---

## Os cinco prompts de Discovery

| Prompt | Agente | Lê | Produz | HITL? |
|---|---|---|---|---|
| `/discovery-refine` | 🧭 Discovery | `idea.txt` | `idea.md` | ✅ Obrigatório |
| `/discovery-spec` | 🗂️ PM | `idea.md` | `non-technical-spec.md` | ✅ Obrigatório |
| `/discovery-prd` | 🧑‍💼 Tech Lead | `non-technical-spec.md` | `PRD.md` | ✅ Obrigatório |
| `/discovery-tech-spec` | 🏗️ Architect | `PRD.md` + codebase | `technical-spec.md` + `CONTEXT.md` (inicial) | ✅ Obrigatório |
| `/discovery-epics` | 🏗️ Architect | `technical-spec.md` | `epics.md` | ✅ Obrigatório |

---

## Passo a passo

### Passo 1 — Refinar a ideia

```
/discovery-refine
```

O agente 🧭 Discovery lê `doc-specs/idea.txt` e produz `doc-specs/idea.md`. Ele opera sem viés técnico — sem frameworks, sem arquitetura, sem detalhes de implementação. Preserva a intenção original, estrutura-a e sinaliza ambiguidades.

**✅ HITL:** revise `idea.md` antes de continuar.
- A ideia original foi preservada com precisão?
- Existem premissas que não deveriam ter sido assumidas?
- As perguntas em aberto estão claramente sinalizadas?

---

### Passo 2 — Gerar a spec funcional

```
/discovery-spec
```

O agente 🗂️ PM lê `idea.md` e produz `doc-specs/non-technical-spec.md` com:
- Personas e usuários-alvo
- Jornadas de usuário e cenários principais
- Regras de negócio e restrições
- Critérios de aceitação funcionais
- Perguntas em aberto

**✅ HITL:** revise `non-technical-spec.md`.
- Os fluxos de usuário estão claros e completos?
- As regras de negócio foram capturadas corretamente?
- Algo está faltando antes de avançar para o PRD?

---

### Passo 3 — Gerar o PRD

```
/discovery-prd
```

O agente 🧑‍💼 Tech Lead lê `non-technical-spec.md` e produz `doc-specs/PRD.md` com:
- Visão executiva
- Objetivos e critérios de sucesso
- Escopo (incluído / excluído)
- Premissas e dependências
- Requisitos funcionais (RFs)
- Requisitos não-funcionais (RNFs)
- Critérios de aceitação
- Perguntas em aberto

**✅ HITL:** revise `PRD.md`.
- O escopo está corretamente delimitado?
- Os RNFs fazem sentido?
- Os critérios de aceitação são testáveis?

---

### Passo 4 — Gerar a spec técnica

```
/discovery-tech-spec
```

O agente 🏗️ Architect lê `PRD.md` e inspeciona o codebase (via `search/codebase`) para produzir `doc-specs/technical-spec.md` com:
- Decisões de arquitetura e justificativas
- Componentes e limites de módulos
- Contratos e interfaces
- Fluxos de dados e estratégia de persistência
- Limites de autenticação e segurança
- Estratégia de testes
- Riscos e perguntas técnicas em aberto

Também cria o `doc-specs/CONTEXT.md` inicial.

**✅ HITL:** revise `technical-spec.md`.
- As decisões de arquitetura estão justificadas?
- Os riscos e dependências estão registrados?
- Existem ambiguidades que precisam ser resolvidas antes dos epics?

---

### Passo 5 — Gerar os epics

```
/discovery-epics
```

O agente 🏗️ Architect lê `technical-spec.md` e `PRD.md` e produz `doc-specs/epics.md`. Os epics são ordenados por **dependência técnica** (não por prioridade de negócio) — cada epic deve ser entregável independentemente, sem depender de um epic posterior.

**✅ HITL:** revise `epics.md`.
- O sequenciamento faz sentido técnico?
- Cada epic é pequeno o suficiente para ser implementado independentemente?
- As dependências entre epics estão corretas?

---

## Artefatos gerados

| Artefato | Localização | Descrição |
|---|---|---|
| `idea.md` | `doc-specs/idea.md` | Versão estruturada da ideia bruta |
| `non-technical-spec.md` | `doc-specs/non-technical-spec.md` | Spec funcional: personas, jornadas, regras |
| `PRD.md` | `doc-specs/PRD.md` | Documento de Requisitos de Produto |
| `technical-spec.md` | `doc-specs/technical-spec.md` | Decisões de arquitetura, componentes, fluxos |
| `epics.md` | `doc-specs/epics.md` | Lista ordenada de epics entregáveis |
| `CONTEXT.md` | `doc-specs/CONTEXT.md` | Memória de contexto inicial — atualizada após cada epic |

---

## Após o Discovery

Com `epics.md` aprovado, avance para a [fase de Spec](/ai-sdlc-kit/pt/guide/spec-phase/) para inicializar o primeiro epic.
