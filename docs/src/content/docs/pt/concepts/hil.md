---
title: Human-in-the-Loop (HIL)
description: Por que os HIL checkpoints existem, o que protegem e como usá-los sem transformá-los em aprovações automáticas.
---

## O que é um HIL checkpoint?

Um HIL checkpoint (Human-in-the-Loop) é uma pausa deliberada no fluxo do agente onde um humano deve revisar, validar e aprovar explicitamente um artefato antes que o fluxo continue.

Os HIL checkpoints no ai-sdlc-kit não são sugestões. São paradas obrigatórias. Nenhuma etapa subsequente começa até que o humano no checkpoint tenha:

- **Aprovado** — o artefato é correto e completo; continue
- **Solicitado mudanças** — itens específicos a corrigir; o agente revisa e reapresenta
- **Rejeitado** — a direção está errada; premissas anteriores precisam ser revisitadas

---

## Por que o HIL não é opcional

A objeção comum aos HIL checkpoints é que eles atrasam as coisas. A posição do kit é o oposto: **pular os HIL checkpoints é o que cria atrasos**.

Quando um artefato está errado e nenhuma revisão humana o detecta:

1. O artefato errado se torna entrada para o próximo estágio
2. O próximo estágio produz saída que é internamente consistente mas externamente errada
3. No momento em que o erro aparece, ele se propagou por múltiplos artefatos
4. A correção requer revisitar cada artefato downstream — o que leva muito mais tempo do que a revisão original teria levado

O HIL checkpoint em cada portão é o mecanismo que mantém os erros _locais_.

---

## A diferença entre um HIL real e uma aprovação automática

Um HIL checkpoint só funciona se o humano realmente lê o artefato.

Sinais de que um HIL checkpoint se tornou uma aprovação automática:
- A revisão leva menos de 30 segundos para um documento de várias páginas
- Nenhuma solicitação de mudança foi feita nos últimos cinco checkpoints
- O humano está aprovando conteúdo que não entende completamente

Sinais de um HIL checkpoint real:
- O revisor consegue articular o que teria acontecido se um item específico estivesse errado
- As solicitações de mudança são específicas e acionáveis ("atualize os critérios de aceitação da tarefa 3 para incluir tratamento de erros para respostas 404")
- Rejeições ocasionais ocorrem quando a direção divergiu

**Atrofia de processo** — a erosão gradual da qualidade da revisão — é o principal risco em fluxos de trabalho do ai-sdlc-kit de longa duração. O kit sinaliza avisos nas saídas dos agentes quando artefatos foram aprovados sem mudanças registradas em múltiplos epics consecutivos.

---

## HIL no Flow A — Discovery

| Checkpoint | Após artefato | O que verificar |
|---|---|---|
| **HIL-A1** | `idea.md` | Ideia capturada sem viés estratégico; restrições inventadas removidas |
| **HIL-A2** | `non-technical-spec.md` | Requisitos funcionais estão completos; nada crítico foi descartado |
| **HIL-A3** | `PRD.md` | Os requisitos são testáveis; as prioridades estão corretas |
| **HIL-A4** | `technical-spec.md` | A arquitetura é sólida; as restrições são realistas |
| **HIL-A5** | `epics.md` | Os epics são independentemente entregáveis; o sequenciamento está correto |

---

## HIL no Flow B — Construção

| Checkpoint | Após artefato | O que verificar |
|---|---|---|
| **HIL-B1** | `spec-epic-N.md` + `epic-N.md` | O escopo está correto; os critérios de aceitação são completos e testáveis |
| **HIL-B2** | Lista de tarefas do `/task-init` | As tarefas são granulares; nenhuma tarefa abrange mais de uma preocupação |
| **HIL-B3** | Implementação do `/task-implement` | Os critérios de aceitação da spec estão satisfeitos; sem divergência |
| **HIL-B4** | Relatório de revisão do `/task-review` | Todos os problemas sinalizados foram endereçados ou explicitamente aceitos |
| **HIL-B5** | `ops-epic-N.md` | O plano de deploy é seguro; o rollback está definido |

---

## O que fazer quando você discorda de um artefato

1. Não aprove com uma nota mental para corrigir depois
2. Use "Solicitar mudanças" e escreva a correção específica necessária
3. Se o problema for fundamental (a direção da spec está errada), use "Rejeitar" e volte para o artefato anterior que levou à direção errada

Os agentes do kit são projetados para lidar com rejeições de forma graciosa. Fornecer uma razão clara — "a arquitetura assume um monorepo, mas este projeto usa polyrepo" — dá ao agente o contexto necessário para revisar corretamente.

---

## HIL e desenvolvedores solo

Quando se usa o ai-sdlc-kit como desenvolvedor solo, a mesma pessoa que solicitou o artefato também é o revisor. Isso cria um risco de viés — é tentador aprovar seu próprio enquadramento.

Mitigação: **revise o artefato no dia seguinte ao que foi gerado**. Uma lacuna de 24 horas quebra a ilusão de fluência e torna mais fácil ver o que está realmente errado.

Veja também: [Cenário de Desenvolvedor Solo](/pt/scenarios/solo-dev/) para práticas HIL adaptadas.
