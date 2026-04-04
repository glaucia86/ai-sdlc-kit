---
title: Fase de Spec
description: Como preparar os três artefatos que servem de portão para a implementação de cada epic.
---

## O que é a fase de Spec?

A fase de Spec acontece uma vez por epic. Ela é o portão entre planejamento e implementação. Antes que qualquer epic possa ser implementado, três artefatos devem existir e ser validados por um humano:

1. `epic-N.md` — contexto, escopo e critérios de conclusão do epic
2. `PRD.md` — requisitos funcionais e não-funcionais específicos do epic
3. `spec-epic-N.md` — a especificação técnica implementável do epic

> **Regra de ouro:** Sem um `spec-epic-N.md` validado por um humano, a implementação do epic N não começa.

---

## O prompt: `/epic-init <N>`

```
/epic-init
```

O agente 🏗️ Architect solicita o número do epic e lê `doc-specs/epics.md`, `doc-specs/technical-spec.md` e `doc-specs/CONTEXT.md` para gerar os três artefatos em `doc-specs/<N>-epic/`.

O agente **faz uma pausa após cada artefato** e aguarda sua confirmação antes de gerar o próximo. Isso cria três HITL checkpoints discretos.

---

## Os três artefatos

### `epic-N.md`

Fornece contexto e limites para o epic:

| Seção | Conteúdo |
|---|---|
| Visão geral do epic | O que este epic realiza no projeto mais amplo |
| Escopo | O que está incluído e o que está explicitamente excluído |
| Dependências técnicas | Epics que devem estar completos antes deste |
| Critérios de conclusão | Sinais observáveis de que o epic está concluído |

**✅ HITL:** Os limites deste epic fazem sentido? As dependências estão corretas?

---

### `PRD.md` (por epic)

Um PRD com escopo reduzido para o epic — mais restrito que o PRD do projeto:

| Seção | Conteúdo |
|---|---|
| Requisitos funcionais | O que deve funcionar |
| Requisitos não-funcionais | Restrições de desempenho, segurança e acessibilidade |
| Critérios de aceitação | Condições testáveis que definem "concluído" |
| Perguntas em aberto | Itens não resolvidos que poderiam bloquear a implementação |

**✅ HITL:** Todos os RFs e RNFs são mensuráveis? Os critérios de aceitação são testáveis?

---

### `spec-epic-N.md`

A especificação implementável central:

| Seção | Conteúdo |
|---|---|
| Contexto técnico | Decisões de arquitetura aplicáveis a este epic |
| Escopo de implementação | Arquivos, componentes e módulos afetados |
| Arquivos afetados | Lista explícita de arquivos a criar/modificar/excluir |
| Estratégia de implementação | Plano passo a passo sem decisões ambíguas |
| Estratégia de testes | O que testar e como |
| Critérios técnicos de aceitação | Checklist que o Implementer deve completar |
| Riscos e perguntas em aberto | Qualquer coisa que possa bloquear a implementação |

A spec também inclui uma **seção de checklist** que o agente 🛠️ Implementer deve marcar como completo antes de passar para o 🔎 Reviewer. Itens não marcados bloqueiam a transferência para revisão.

**✅ HITL:** A spec é específica o suficiente para implementar sem premissas perigosas? Os riscos estão documentados?

---

## Checklist de verificação

Antes de autorizar a implementação, o revisor humano deve confirmar:

- [ ] `epic-N.md` delimita claramente o escopo — nada ambíguo sobre o que está dentro e fora
- [ ] `PRD.md` tem critérios de aceitação testáveis sem contradições em aberto
- [ ] `spec-epic-N.md` nomeia arquivos, funções e interfaces específicos a criar ou modificar
- [ ] Todas as perguntas em aberto estão resolvidas ou explicitamente aceitas como decisões diferidas
- [ ] Nenhuma decisão de arquitetura na spec contradiz `CONTEXT.md`

---

## Após a fase de Spec

Com os três artefatos aprovados, avance para a [fase de Epic](/ai-sdlc-kit/pt/guide/epic-phase/) para implementar o epic.
