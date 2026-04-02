---
title: Spec-Driven Development
description: O que é SDD, por que a spec precede o código e como a regra de ouro é aplicada no ai-sdlc-kit.
---

## O que é Spec-Driven Development?

Spec-Driven Development (SDD) é a prática de exigir que uma especificação validada e aprovada por um humano exista _antes_ de qualquer implementação começar.

A spec não é um documento que descreve o que foi construído. É um contrato que define o que será construído — específico o suficiente para que um agente de IA possa implementar a partir dele sem precisar inferir intenção.

No ai-sdlc-kit, todo epic começa com uma fase de spec. Nenhum código é gerado até que um humano aprove a spec.

---

## A regra de ouro

> **Sem uma spec validada, nenhuma implementação começa.**

Esta regra não é condicional. Ela se aplica a todo epic, toda tarefa, toda feature — independentemente do escopo.

A razão é arquitetural. Quando agentes de IA implementam a partir de um briefing ambíguo ou informal:
- Eles preenchem lacunas com premissas
- Premissas divergem da realidade
- A divergência se acumula entre os epics
- A correção posterior custa mais do que a spec teria custado

A spec é barata de escrever e cara de pular.

---

## O que uma spec contém

Os artefatos de spec do ai-sdlc-kit são:

| Artefato | Produzido por | Valida |
|---|---|---|
| `spec-epic-N.md` | 🏗️ Architect | Escopo, critérios de aceitação, estrutura de tarefas |
| `PRD.md` (edição do epic) | 🧑‍💼 Tech Lead | Requisitos funcionais e não-funcionais ativos neste epic |
| `epic-N.md` | 🏗️ Architect | Lista de tarefas específicas a implementar |

Juntos, esses três artefatos dão ao agente 🛠️ Implementer uma visão completa e inequívoca de:
- O que construir
- Como é o sucesso
- Quais restrições se aplicam
- Quais decisões já foram tomadas vs. ainda estão em aberto

---

## Como o SDD é aplicado no kit

Todo prompt na fase de Construção tem um portão:

1. `/epic-init` — Architect gera os três artefatos de spec a partir de `CONTEXT.md` + `technical-spec.md`
2. **HIL checkpoint humano** — revisa a spec antes de qualquer código ser gerado
3. `/task-init` — Planner decompõe `epic-N.md` em tarefas; humano aprova a lista de tarefas
4. `/task-implement` — Implementer gera código por tarefa; a spec está sempre no contexto
5. `/task-review` — Reviewer verifica a implementação contra a spec; sinaliza divergências
6. **HIL checkpoint humano** — revisão final antes do merge

O agente Implementer lê a spec. O agente Reviewer referencia a spec. Divergência da spec é um bloqueador, não um comentário.

---

## SDD e agentes de IA

O SDD é especialmente importante com agentes de IA porque agentes não recusam trabalho. Se recebem um prompt ambíguo, um agente produzirá _algo_. Esse algo terá aparência plausível e pode até compilar.

A única forma confiável de detectar que a saída está errada é ter uma spec para comparar.

Sem spec: "Esta implementação parece razoável?" — altamente subjetivo, fácil de perder erros.  
Com spec: "Esta implementação satisfaz todos os critérios de aceitação em `spec-epic-N.md`?" — concreto, auditável, repetível.

---

## SDD e o PRD

O PRD (`PRD.md`) é o documento de requisitos de produto. No ai-sdlc-kit, o PRD desempenha dois papéis:

1. **PRD de todo o projeto** — produzido durante a Concepção; descreve o produto desde o discovery até todos os epics
2. **PRD com escopo de epic** — uma visão filtrada do PRD completo, com escopo para o que está ativo neste epic; produzido pelo 🧑‍💼 Tech Lead no início de cada fase de Construção

Esse uso duplo significa que o Implementer sempre trabalha com um PRD atual e relevante, nunca com um documento obsoleto que cobre requisitos de seis epics atrás.

---

## O que SDD não é

SDD não é waterfall. A spec é um documento vivo dentro de um epic, não um contrato congelado para o projeto inteiro.

- Specs evoluem entre epics (conforme `decisions-log.md` registra decisões em aberto que são resolvidas)
- A memória de contexto `CONTEXT.md` é atualizada após cada epic para refletir o que realmente aconteceu
- Novos fatos técnicos descobertos durante a implementação são registrados e informam specs futuras

A restrição é: **dentro de um epic, a spec precede o código**. Entre epics, a spec cresce e se adapta.
