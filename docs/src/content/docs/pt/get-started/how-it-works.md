---
title: Como Funciona
description: O fluxo completo do AI SDLC Kit — da ideia à produção.
---

## O fluxo completo

O AI SDLC Kit organiza o desenvolvimento em dois fluxos independentes que compartilham o mesmo pipeline de implementação e revisão.

```
┌─────────────────────────────────────────────────────────────────┐
│  FLOW A — Discovery + Entrega (para novos projetos / ideias)    │
│                                                                 │
│  idea.txt                                                       │
│     ↓                                                           │
│  /discovery-refine   → HITL ✅ revisar idea.md                  │
│     ↓                                                           │
│  /discovery-spec     → HITL ✅ revisar non-technical-spec.md     │
│     ↓                                                           │
│  /discovery-prd      → HITL ✅ revisar PRD.md                    │
│     ↓                                                           │
│  /discovery-tech-spec → HITL ✅ revisar technical-spec.md        │
│     ↓                                                           │
│  /discovery-epics    → HITL ✅ revisar epics.md                  │
│     ↓  (por epic)                                               │
│  /epic-init <N>      → HITL ✅ epic-N.md, PRD.md, spec-epic-N.md │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
│     ↓                                                           │
│  /epic-close <N> → merge → deploy → /context-sync <N>          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLOW B — Entrega Direta (para tarefas definidas)               │
│                                                                 │
│  tarefa.txt                                                     │
│     ↓                                                           │
│  /task-init   → HITL ✅ revisar tarefa.md                        │
│     ↓                                                           │
│  /task-prd    → HITL ✅ revisar PRD.md                           │
│     ↓                                                           │
│  /task-spec   → HITL ✅ revisar spec.md                          │
│     ↓                                                           │
│  /task-implement → /task-tests → /task-review                   │
└─────────────────────────────────────────────────────────────────┘
```

Nenhum fluxo é pré-requisito do outro.

---

## A regra de ouro

> **Sem uma spec validada por um humano, nenhuma implementação começa.**

Este é o princípio central. Toda implementação no kit — seja para uma única tarefa (Flow B) ou um epic (Flow A) — exige um documento de spec aprovado por um humano antes de o agente Implementer ser invocado.

Essa regra existe porque agentes de IA são excelentes em produzir especificações e código com aparência convincente, mas não carregam o contexto de produto, a tolerância ao risco ou o conhecimento de domínio que um humano possui. A spec é o contrato entre a intenção humana e a execução da IA.

---

## O papel do Human in the Loop

Os HITL checkpoints são **obrigatórios**, não opcionais. Eles aparecem após cada artefato gerado que molda materialmente o que será construído.

| Artefato | Por que o HITL importa aqui |
|---|---|
| `idea.md` | Garante que a ideia não foi distorcida durante a estruturação |
| `non-technical-spec.md` | Valida jornadas de usuário e regras de negócio |
| `PRD.md` | Confirma limites de escopo e critérios de aceitação |
| `technical-spec.md` | Valida decisões de arquitetura e avaliação de riscos |
| `epics.md` | Confirma sequenciamento e limites dos epics |
| `spec-epic-N.md` | **Portão antes da implementação** — o HITL mais crítico |

Em cada checkpoint, um humano responde: _Este documento é preciso o suficiente para guiar o próximo passo?_ Se a resposta for não, o documento é revisado antes de avançar.

---

## Fase de Discovery vs. fase de Spec

| | Discovery | Spec (por epic) |
|---|---|---|
| **Ponto de partida** | `idea.txt` — bruto, não estruturado | `epics.md` — já estruturado |
| **Saída** | `technical-spec.md` + `epics.md` | `spec-epic-N.md` por epic |
| **Escala** | Visão do projeto completo | Uma entrega isolada |
| **Quem conduz** | Agentes Discovery, PM, Tech Lead, Architect | Agente Architect sozinho |
| **Frequência** | Uma vez por projeto (ou fase principal) | Uma vez por epic |

O Discovery responde: _O que estamos construindo e por quê?_
A fase de Spec responde: _Como exatamente construímos o epic N?_

---

## Responsabilidades dos agentes em resumo

| Agente | Função |
|---|---|
| 🧭 Discovery | Estrutura ideias brutas sem viés técnico |
| 🗂️ PM | Traduz a ideia em spec funcional (jornadas de usuário, regras de negócio) |
| 🧑‍💼 Tech Lead | Produz o PRD a partir da spec funcional |
| 🏗️ Architect | Gera `technical-spec.md`, `epics.md` e artefatos por epic |
| 📥 Intake | Estrutura uma descrição bruta de tarefa (`tarefa.txt`) em `tarefa.md` |
| 📐 Planner | Gera `PRD.md` e `spec.md` para tarefas do Flow B |
| 🛠️ Implementer | Implementa estritamente com base na spec e no PRD aprovados |
| 🧪 QA | Gera cenários de teste e executa os testes antes da revisão |
| 🔎 Reviewer | Valida a aderência entre spec e implementação |
| 🚀 Ops | Fecha o epic: preparação de deploy, observabilidade, sincronização de contexto |

---

## Memória de contexto

O kit mantém um arquivo `doc-specs/CONTEXT.md` que acumula conhecimento entre os epics. Após o fechamento de cada epic, o agente 🏗️ Architect atualiza esse arquivo via `/context-sync <N>` com:

- resumo do epic concluído
- registros de decisões arquiteturais (ADRs) de `decisions-log.md`
- riscos e aprendizados que afetam epics futuros

Todos os agentes leem `CONTEXT.md` antes de agir em qualquer epic, garantindo continuidade ao longo do ciclo de vida.
