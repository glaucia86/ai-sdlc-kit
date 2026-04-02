---
title: Fase de Epic
description: Como implementar um epic — de /task-implement até a revisão e o log de decisões.
---

## O que é a fase de Epic?

A fase de Epic cobre a implementação e revisão de um único epic, usando os três artefatos produzidos na [fase de Spec](/ai-sdlc-kit/pt/guide/spec-phase/). Nenhuma implementação começa sem um `spec-epic-N.md` validado por um humano.

---

## Sequência completa para um epic

```
spec-epic-N.md aprovado pelo humano
   ↓
/task-implement  (🛠️ Implementer lê spec-epic-N.md + PRD.md)
   ↓
  ⚠️ Implementer sinaliza ambiguidades → humano resolve → spec atualizada se necessário
   ↓
  Implementação executada
   ↓
  Implementer preenche checklist em spec-epic-N.md
  Implementer atualiza decisions-log.md
   ↓
/task-tests  (🧪 QA gera + executa testes)
   ↓
  Portão QA: se falhar → volta ao Implementer → humano decide
   ↓
/task-review  (🔎 Reviewer avalia aderência)
   ↓
  HIL ✅  Humano revisa saída do Reviewer
   ↓
  Se aprovado → avança para a fase de Operations
  Se rejeitado → atualiza spec ou implementação → executa novamente
```

---

## `/task-implement`

```
/task-implement
```

O agente 🛠️ Implementer:

1. Lê `spec-epic-N.md` e `PRD.md`
2. Lê `CONTEXT.md` para entender as restrições arquiteturais
3. Resume o que será implementado e quais arquivos serão afetados
4. **Faz uma pausa** — o humano confirma o plano antes de qualquer arquivo ser alterado
5. Executa a implementação
6. Marca os itens do checklist em `spec-epic-N.md`
7. Registra decisões em `decisions-log.md`

**Se o agente encontrar uma ambiguidade crítica**, ele para e sinaliza em vez de decidir sozinho. A resposta correta é atualizar `spec-epic-N.md` e executar novamente.

:::caution
Para tarefas de frontend, use `/task-implement-frontend`. Ele injeta as skills `frontend-design` e `web-design-guidelines`, que impõem padrões de acessibilidade, padrões de componentes e diretrizes de qualidade visual.
:::

### Log de decisões

Durante a implementação, toda decisão não trivial que não está totalmente especificada em `spec-epic-N.md` deve ser registrada em `doc-specs/<N>-epic/decisions-log.md`:

| Campo | Descrição |
|---|---|
| Decisão | O que foi decidido |
| Contexto | Qual situação tornou essa decisão necessária |
| Alternativas | Quais outras opções foram consideradas |
| Consequências | O que essa decisão implica para epics futuros |

Entradas em `decisions-log.md` nunca são excluídas — apenas adicionadas ou emendadas.

---

## `/task-tests`

```
/task-tests
```

O agente 🧪 QA:

1. Lê `spec-epic-N.md` e `CONTEXT.md`
2. Gera cenários de teste baseados nos critérios técnicos de aceitação
3. Descreve quaisquer dados sintéticos necessários
4. Executa o suite de testes do projeto
5. Reporta os resultados — resumo de aprovações/falhas com detalhes sobre as falhas

Se o portão QA falhar, o agente sinaliza o problema e deixa ao humano a decisão. O humano decide se retorna ao Implementer para correções ou aceita a falha como uma limitação conhecida.

---

## `/task-review`

```
/task-review
```

O agente 🔎 Reviewer:

1. Lê `PRD.md`, `spec-epic-N.md` e a implementação
2. Lê `decisions-log.md` para entender os desvios que foram feitos deliberadamente
3. Produz uma saída de revisão estruturada:

| Seção | Conteúdo |
|---|---|
| Resumo de aderência | Avaliação geral — conforme / parcialmente conforme / não conforme |
| Desvios encontrados | Lugares específicos onde a implementação diverge da spec |
| Riscos | Riscos técnicos ou de produto introduzidos por esta implementação |
| Lacunas | Coisas que foram especificadas mas não implementadas |
| Recomendação final | Aprovado / Aprovado com condições / Rejeitado |

**✅ HIL (obrigatório):** O humano revisa a saída do Reviewer e decide:
- A entrega está aprovada?
- Existem correções obrigatórias antes de fechar?
- A spec precisa ser ajustada?

---

## Após a fase de Epic

Assim que o humano aprovar a revisão, avance para a [fase de Operations](/ai-sdlc-kit/pt/guide/operations-phase/).
