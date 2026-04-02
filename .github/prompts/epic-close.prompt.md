---
name: "ops-fechar-epico"
description: "Fecha o ciclo do épico: prepara deploy, define observabilidade e registra feedback para épicos futuros."
agent: "🚀 Operations Agent"
---

#file:doc-specs/CONTEXT.md
#file:doc-specs/epics.md

**Antes de iniciar, pergunte ao usuário:** "Qual o número do épico a ser fechado? (ex: 1, 2, 3)"

Aguarde a resposta antes de continuar.

---

Para o épico informado (chamado aqui de N, com dois dígitos — ex: `01`, `02`):

Leia atentamente:
- `doc-specs/<N>-epic/spec-epic-<N>.md`
- `doc-specs/<N>-epic/decisions-log.md`
- `doc-specs/<N>-epic/PRD.md`

Com base nesses artefatos e no contexto global do projeto, gere o arquivo `doc-specs/<N>-epic/ops-epic-<N>.md` com a seguinte estrutura:

---

## 1. Resumo da entrega

O que foi implementado neste épico, de forma objetiva e rastreável ao PRD.

---

## 2. Preparação para deploy

### Variáveis de ambiente necessárias
Liste todas as variáveis de ambiente que este épico introduz ou modifica.

### Dependências de infraestrutura
Banco de dados, filas, armazenamento, serviços externos — o que este épico requer.

### Sequência de deploy recomendada
Ordem segura de execução: migrations, seeds, toggles, serviços. Identifique o que não pode ser revertido facilmente.

### Breaking changes
Liste mudanças que afetam contratos com outros serviços, clientes ou épicos futuros.

### Plano de rollback
O que fazer se o deploy precisar ser revertido.

---

## 3. Observabilidade

### Logs críticos a monitorar
Quais entradas de log indicam que o épico está funcionando corretamente (e quais indicam falha).

### Métricas de saúde propostas
O que medir para garantir que os fluxos implementados estão saudáveis em produção.

### Alertas recomendados
Condições que devem disparar alertas operacionais.

### Critérios de validação em produção
Como confirmar, após o deploy, que o épico está funcionando conforme o esperado.

---

## 4. Dívidas técnicas registradas

O que foi conscientemente adiado neste épico, com justificativa.

---

## 5. Feedback para épicos futuros

### Aprendizados
O que este épico ensinou que impacta o planejamento dos próximos.

### Riscos identificados
O que deve ser endereçado antes de avançar para o próximo épico.

### Sugestões de ajuste no epics.md
Se a execução deste épico revelou a necessidade de revisar escopo, sequência ou critérios de épicos futuros, registre aqui.

---

Regras:
- baseie tudo no que está nos artefatos do épico — não invente problemas
- escreva em português do Brasil
- use linguagem técnica, objetiva e acionável
- se alguma seção não se aplicar ao épico, registre explicitamente "Não aplicável neste épico." em vez de omitir

**Pause aqui e avise o usuário que `ops-epic-<N>.md` está pronto para revisão (HIL obrigatório).**

Após a aprovação do usuário, sinalize:

> **Gate de produção:**
> 1. Faça o merge da branch `feat/E<NN>-<slug>` para `main`.
> 2. Execute o deploy e valide em produção usando os critérios definidos em "Critérios de validação em produção" acima.
> 3. Após confirmar que o épico está funcionando em produção, execute `/ops-atualizar-context <N>` e avance para o próximo épico.
