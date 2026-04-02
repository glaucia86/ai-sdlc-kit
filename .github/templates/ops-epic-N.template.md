# Operations — Épico <N>

## Resumo da entrega

## Preparação para deploy

### Variáveis de ambiente necessárias

### Dependências de infraestrutura

### Sequência de deploy

### Breaking changes

### Plano de rollback

## Observabilidade

### Logs críticos

### Métricas de saúde

### Alertas recomendados

### Critérios de validação em produção

## Padrões de anomalia esperados

> Defina o que distingue comportamento normal de anormal para os fluxos deste épico.
> Use métricas e observações agnósticas à ferramenta de monitoramento (ex: taxa de erro, latência, volume).

| Indicador | Valor normal esperado | Limiar de alerta | Limiar crítico |
|---|---|---|---|
| <!-- ex: taxa de erro nas rotas do épico --> | <!-- ex: < 0,5% --> | <!-- ex: > 2% --> | <!-- ex: > 5% --> |
| <!-- ex: tempo de resposta médio --> | <!-- ex: < 200 ms --> | <!-- ex: > 500 ms --> | <!-- ex: > 2 s --> |

<!-- Adicione quantas linhas forem necessárias. Se não aplicável, escreva "Não aplicável neste épico." -->

## Playbook de triagem de incidentes

> Para cada sintoma relevante, descreva o caminho de investigação e remediação.
> Este playbook é utilizado pelo prompt `/ops-triagem-incidente`.

### [Sintoma 1 — ex: erro inesperado em produção]

- **Hipótese provável:** <!-- O que provavelmente causou isso? -->
- **Investigação imediata:** <!-- Onde olhar primeiro? Quais logs, métricas ou endpoints verificar? -->
- **Ação de remediação:**
  1. Contornar: <!-- Ação imediata para limitar o impacto sem corrigir a causa -->
  2. Mitigar: <!-- Reduzir o impacto enquanto a correção é preparada -->
  3. Corrigir: <!-- Correção definitiva -->
  4. Prevenir: <!-- O que mudar para que isso não repita -->
- **Escalonamento:** <!-- Se as ações acima não resolverem em X minutos, quem/o quê acionar? -->

<!-- Adicione um bloco por sintoma relevante identificado para este épico. -->

## Feedback para épicos futuros

### Aprendizados

### Riscos identificados

### Sugestões de ajuste no epics.md
