---
title: Fase de Operations
description: Como fechar um epic, sincronizar a memória de contexto e preparar a próxima iteração.
---

## O que é a fase de Operations?

A fase de Operations é executada após o humano aprovar a revisão de um epic. Ela fecha o ciclo de entrega com três responsabilidades:

1. **Preparação de deploy** — o que deve acontecer antes e depois de fazer o deploy
2. **Definição de observabilidade** — como saber se o epic está saudável em produção
3. **Sincronização de contexto** — atualizar a memória global para epics futuros

---

## `/epic-close <N>`

```
/epic-close
```

O agente 🚀 Ops solicita o número do epic e lê:
- `doc-specs/<N>-epic/spec-epic-N.md`
- `doc-specs/<N>-epic/PRD.md`
- `doc-specs/<N>-epic/decisions-log.md`
- `doc-specs/CONTEXT.md`

Ele gera `doc-specs/<N>-epic/ops-epic-N.md` com:

| Seção | Conteúdo |
|---|---|
| Preparação de deploy | Variáveis de ambiente necessárias, dependências de infraestrutura, sequência de migração, feature flags, plano de rollback |
| Breaking changes | Quaisquer mudanças que afetam outros serviços ou epics futuros |
| Observabilidade | Logs críticos a monitorar, métricas de saúde, alertas a configurar |
| Validação em produção | Como confirmar que este epic funciona corretamente em produção |
| Dívida técnica | Dívida gerada por este epic que deve ser endereçada em epics futuros |
| Padrões de anomalia | O que distingue comportamento normal de anormal para as features entregues |
| Feedback para epics futuros | Riscos, aprendizados e ajustes sugeridos para `epics.md` |

**✅ HITL:** Revise `ops-epic-N.md` antes de fazer o deploy.
- A sequência de deploy é segura?
- Todos os breaking changes estão documentados?
- Os padrões de anomalia são precisos o suficiente para monitoramento on-call?

---

## Portão de produção

Após revisar `ops-epic-N.md`, o portão de produção é **manual** — sem prompt ou agente envolvido:

1. Faça o merge do branch do epic (`feat/E<NN>-<slug>`) para `main`
2. Execute o deploy
3. Valide em produção usando os critérios definidos em `ops-epic-N.md`
4. Somente após a validação em produção o próximo epic pode começar

---

## `/context-sync <N>`

```
/context-sync
```

Após o portão de produção ser aprovado, o agente 🏗️ Architect lê `ops-epic-N.md` e `decisions-log.md` e atualiza `doc-specs/CONTEXT.md` com:

- Resumo do epic concluído
- Todos os ADRs (registros de decisão arquitetural) de `decisions-log.md`
- Dívida técnica registrada pelo agente Ops
- Riscos e aprendizados que afetam epics futuros

`CONTEXT.md` é a memória de longo prazo do projeto. Todo agente a lê antes de agir em qualquer epic. Mantê-la precisa é o que garante que cada epic seja construído sobre um entendimento compartilhado e validado do que foi construído antes.

---

## Triagem de incidentes (contínua)

A qualquer momento após o deploy de um epic, se um incidente for observado em produção:

```
/ops-triage
```

O agente 🚀 Ops:
1. Solicita o sintoma observado e o epic potencialmente afetado
2. Lê `ops-epic-N.md` e mapeia o sintoma para os padrões de anomalia documentados
3. Propõe ações graduais: **conter → mitigar → corrigir → prevenir**
4. Registra a triagem em `doc-specs/<N>-epic/incident-log.md`
5. Se o incidente revelar uma lacuna no playbook ou exigir uma correção permanente, sinaliza como dívida técnica em `epics.md`

O agente Ops não executa ações em produção — ele propõe, documenta e fecha o ciclo de aprendizado.

---

## O loop para o próximo epic

```
/context-sync <N> concluído
       ↓
  CONTEXT.md atualizado
       ↓
  /epic-init <N+1>
       ↓
  Fase de Spec → Fase de Epic → Fase de Operations
       ↓
  Repete até que epics.md esteja completo
```

A cada iteração do loop, o agente Architect lê o `CONTEXT.md` atualizado, garantindo que cada epic subsequente seja informado pelo histórico completo de decisões, dívidas e aprendizados de todos os epics anteriores.
