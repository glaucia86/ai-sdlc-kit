---
title: AI SDLC
description: O que é AI SDLC, como o kit o implementa e as três fases do ciclo de vida de desenvolvimento com IA.
---

## O que é AI SDLC?

AI SDLC (AI Software Development Lifecycle) é a aplicação de agentes de IA em todo o ciclo de vida de desenvolvimento de software — da concepção às operações — com supervisão humana estruturada em pontos-chave de decisão.

É distinto de simplesmente "usar IA para escrever código". No AI SDLC, agentes de IA participam de todas as fases: discovery, especificação, implementação, testes, revisão e operações. O papel humano muda de _fazer o trabalho_ para _validar o trabalho em portões críticos_.

---

## As três fases do AI-DLC

O ciclo de vida de desenvolvimento com IA é organizado em três macro-fases:

### Fase 1 — Concepção (Inception)

Objetivo: transformar uma ideia bruta ou um problema definido em uma especificação estruturada e validada.

| Etapa | Quem | Saída |
|---|---|---|
| Refinamento da ideia | 🧭 Discovery | `idea.md` |
| Spec funcional | 🗂️ PM | `non-technical-spec.md` |
| Requisitos de produto | 🧑‍💼 Tech Lead | `PRD.md` |
| Spec técnica | 🏗️ Architect | `technical-spec.md` |
| Estrutura de epics | 🏗️ Architect | `epics.md` |

A fase de Concepção termina quando um humano aprova `epics.md` — uma estrutura sequenciada e independentemente entregável de todo o produto.

### Fase 2 — Construção (Construction)

Objetivo: implementar cada epic com rastreabilidade total à spec e portões de revisão humanos.

Para cada epic:

| Etapa | Quem | Saída |
|---|---|---|
| Preparação da spec do epic | 🏗️ Architect | `spec-epic-N.md`, `PRD.md`, `epic-N.md` |
| Implementação | 🛠️ Implementer | Código + `decisions-log.md` |
| Testes | 🧪 QA | Relatório de testes |
| Revisão | 🔎 Reviewer | Relatório de revisão |
| Aprovação humana | Humano | Decisão de merge |

A fase de Construção se repete para cada epic.

### Fase 3 — Operações (Operations)

Objetivo: fechar cada epic com segurança em produção e manter o contexto do projeto.

| Etapa | Quem | Saída |
|---|---|---|
| Preparação de deploy | 🚀 Ops | `ops-epic-N.md` |
| Validação em produção | Humano | Merge + deploy |
| Sincronização de contexto | 🏗️ Architect | `CONTEXT.md` (atualizado) |
| Triagem de incidentes | 🚀 Ops | `incident-log.md` |

---

## Como o ai-sdlc-kit implementa esses conceitos

| Conceito AI-DLC | Implementação no ai-sdlc-kit |
|---|---|
| Fase de Concepção | Flow A — fase de Discovery + prompts `/discovery-*` |
| Fase de Construção | Fase de Spec + `/epic-init` + `/task-implement` + `/task-review` |
| Fase de Operações | `/epic-close` + `/context-sync` + `/ops-triage` |
| Supervisão humana | HIL checkpoints após cada artefato gerado |
| Memória de contexto | `CONTEXT.md` — lido por todos os agentes, atualizado após cada epic |
| Trilha de auditoria | `decisions-log.md` — registro ADR append-only por epic |

---

## O princípio: a IA planeja, o humano valida

O AI SDLC Kit é construído sobre um único princípio organizador:

> **Agentes de IA são excelentes em gerar conteúdo estruturado a partir de entrada estruturada. Humanos são essenciais para validar que o conteúdo está correto no contexto.**

Os agentes de IA no kit não carregam:
- Estratégia de produto e contexto de negócio
- Tolerância ao risco e restrições organizacionais
- Capacidade da equipe e realidade de entrega
- A experiência vivida do que "concluído" significa para este projeto específico

Os HIL checkpoints existem precisamente para injetar esse contexto ausente nos momentos em que mais importa — antes que cada artefato se torne a entrada para o próximo estágio.

---

## AI SDLC vs. SDLC tradicional

| Dimensão | SDLC Tradicional | AI SDLC |
|---|---|---|
| Especificação | Escrita por humanos | Co-criada pela IA, validada por humanos |
| Implementação | Escrita por humanos | Gerada pela IA sob restrições de spec |
| Revisão | Revisão manual por pares | Verificação de aderência assistida por IA + decisão final humana |
| Documentação | Frequentemente adiada | Gerada continuamente como subproduto |
| Persistência de contexto | Conhecimento tribal | `CONTEXT.md` — estruturado, consultável, legível por agentes |
| Velocidade | Limitada pela capacidade humana | Geração mais rápida, mesma disciplina de validação |

O ganho é velocidade e estrutura. A responsabilidade humana não diminui — ela se _foca_ nas decisões que importam.
