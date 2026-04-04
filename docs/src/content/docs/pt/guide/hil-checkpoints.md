---
title: HITL Checkpoints
description: Todos os HITL checkpoints do AI SDLC Kit — quando ocorrem, o que revisar e quando retroceder.
---

## O que é HITL neste contexto?

Human in the Loop (HITL) é a prática de inserir **portões de revisão humana obrigatórios** em pontos específicos do fluxo orientado por IA. No AI SDLC Kit, HITL não é uma caixa de seleção — é o princípio estrutural que impede que artefatos gerados por IA fluam diretamente para a implementação sem validação humana.

O kit trata cada HITL checkpoint como um ponto de decisão: _Este artefato é preciso e completo o suficiente para guiar o próximo passo?_

Se a resposta for **não**, o fluxo retorna à etapa anterior. Não há avanço com uma spec "próxima o suficiente".

---

## Referência completa de HITL

### Flow A — Discovery + Entrega

| Checkpoint | Artefato a revisar | Obrigatório? | O que verificar |
|---|---|---|---|
| Após `/discovery-refine` | `idea.md` | ✅ Obrigatório | Ideia original preservada? Ambiguidades sinalizadas? Nada inventado? |
| Após `/discovery-spec` | `non-technical-spec.md` | ✅ Obrigatório | Fluxos de usuário completos? Regras de negócio capturadas? Perguntas em aberto listadas? |
| Após `/discovery-prd` | `PRD.md` | ✅ Obrigatório | Escopo delimitado? Critérios de aceitação testáveis? RNFs realistas? |
| Após `/discovery-tech-spec` | `technical-spec.md` | ✅ Obrigatório | Decisões de arquitetura justificadas? Riscos documentados? Sem contradições com `CONTEXT.md`? |
| Após `/discovery-epics` | `epics.md` | ✅ Obrigatório | Sequenciamento tecnicamente correto? Epics independentemente entregáveis? Dependências precisas? |
| Após `/epic-init` → `epic-N.md` | `doc-specs/<N>-epic/epic-N.md` | ✅ Obrigatório | Limites claros? Dependências completas? Critérios de conclusão observáveis? |
| Após `/epic-init` → `PRD.md` | `doc-specs/<N>-epic/PRD.md` | ✅ Obrigatório | RFs testáveis? RNFs realistas? Critérios de aceitação inequívocos? |
| Após `/epic-init` → `spec-epic-N.md` | `doc-specs/<N>-epic/spec-epic-N.md` | ✅ Obrigatório | **Este é o portão.** Spec específica o suficiente? Arquivos nomeados? Sem premissas perigosas? |
| Durante `/task-implement` (plano) | Plano proposto pelo Implementer | ⚠️ Recomendado | Plano razoável? Escopo mantido? Sem mudanças inesperadas? |
| Após `/task-review` | Saída do Reviewer | ✅ Obrigatório | Aderência suficiente? Desvios aceitáveis? Entrega aprovada? |
| Após `/epic-close` | `ops-epic-N.md` | ✅ Obrigatório | Deploy seguro? Padrões de anomalia definidos? Dívida registrada? |

### Flow B — Entrega Direta

| Checkpoint | Artefato a revisar | Obrigatório? | O que verificar |
|---|---|---|---|
| Após `/task-init` | `tarefa.md` | ✅ Obrigatório | Objetivo da tarefa claro? Sem distorção em relação ao original? Ambiguidades sinalizadas? |
| Após `/task-prd` | `PRD.md` | ✅ Obrigatório | Escopo correto? Critérios testáveis? Perguntas em aberto respondidas? |
| Após `/task-spec` | `spec.md` | ✅ Obrigatório | **Este é o portão.** Spec específica o suficiente? Riscos documentados? |
| Durante `/task-implement` (plano) | Plano proposto pelo Implementer | ⚠️ Recomendado | Plano razoável? Sem escopo inesperado? |
| Após `/task-review` | Saída do Reviewer | ✅ Obrigatório | Entrega aprovada? Desvios aceitáveis? |

---

## O que verificar em cada tipo de checkpoint

### Checkpoints de ideia / spec funcional

- A intenção foi preservada sem distorção?
- Foram adicionadas features ou decisões que não estavam no input?
- As perguntas em aberto estão explicitamente documentadas em vez de assumidas?

### Checkpoints de PRD

- O escopo está delimitado — o que está incluído E o que está explicitamente excluído?
- Os critérios de aceitação são testáveis (não subjetivos)?
- Os RNFs têm valores concretos e mensuráveis?

### Checkpoints de spec técnica

- As decisões de arquitetura são rastreáveis aos requisitos do PRD?
- Os arquivos e componentes nomeados são consistentes com o codebase existente?
- Os riscos estão documentados com detalhes suficientes para serem acionáveis?

### Checkpoint de `spec-epic-N.md` (o mais crítico)

- A spec nomeia arquivos, funções ou interfaces específicos a criar/modificar?
- Um engenheiro poderia implementar isso sem fazer decisões não especificadas?
- Existe algum "decidir na hora da implementação" que deveria ser resolvido agora?

### Checkpoint de revisão

- O resumo de aderência do Reviewer corresponde à sua compreensão do trabalho?
- Os desvios são explicados por entradas em `decisions-log.md` (ou seja, deliberados e documentados)?
- Os riscos introduzidos pela implementação são aceitáveis?

---

## Quando e como retroceder

| Situação | Retroceder para |
|---|---|
| `idea.md` distorce a ideia original | Revise `idea.txt` → execute `/discovery-refine` novamente |
| `PRD.md` tem escopo errado | Execute `/discovery-prd` novamente (ou `/task-prd` para Flow B) |
| `spec-epic-N.md` tem premissas perigosas | Edite a spec diretamente → execute `/epic-init` apenas para aquele arquivo |
| Implementer sinaliza ambiguidade crítica | Atualize `spec-epic-N.md` → retome `/task-implement` |
| Portão QA falha | Retorne ao Implementer → humano decide se corrige ou adia |
| Reviewer encontra desvio da spec | Atualize spec ou implementação → execute `/task-review` novamente |

Retroceder não é uma falha — é o mecanismo que mantém o fluxo preciso. O custo de uma spec ruim que flui para a implementação é sempre maior do que o custo de uma iteração HITL extra.
