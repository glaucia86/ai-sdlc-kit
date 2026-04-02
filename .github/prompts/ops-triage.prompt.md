---
name: "ops-triagem-incidente"
description: "Conduz a triagem estruturada de um incidente em produção com base nos padrões de anomalia e playbook do épico afetado."
agent: "🚀 Operations Agent"
---

#file:doc-specs/CONTEXT.md

**Antes de iniciar, pergunte ao usuário:**

> "Descreva o sintoma ou alerta observado em produção. Inclua: o que está acontecendo, quando começou (se souber) e qual épico ou área do sistema está potencialmente afetada."

Aguarde a resposta antes de continuar.

---

## Passo 1 — Identificar o épico afetado

Com base no sintoma descrito:

1. Leia `doc-specs/CONTEXT.md` para identificar os épicos concluídos e suas áreas de responsabilidade.
2. Determine qual épico (ou épicos) é o mais provável responsável pelo sintoma.
3. Se não for possível determinar, pergunte ao usuário: "O sintoma parece estar relacionado a qual épico? (ex: E1 — nome do épico)"

Para o épico identificado (chamado aqui N, com dois dígitos — ex: `01`, `02`):

Leia:
- `doc-specs/<N>-epic/ops-epic-<N>.md` — para consultar padrões de anomalia, playbook de triagem e critérios de validação em produção
- `doc-specs/<N>-epic/spec-epic-<N>.md` — para entender o comportamento esperado dos fluxos afetados

---

## Passo 2 — Mapear sintoma e hipótese

Com base nos padrões de anomalia registrados em `ops-epic-<N>.md`:

1. Identifique se o sintoma se enquadra em algum padrão de anomalia documentado.
2. Se enquadrar: use o playbook correspondente como guia principal.
3. Se não enquadrar: formule uma hipótese com base no comportamento esperado descrito na spec e nos logs/métricas mencionados pelo usuário.

Formato:

```
**Sintoma relatado:** [resumo do que o usuário descreveu]
**Padrão de anomalia correspondente:** [nome do padrão em ops-epic-<N>.md, ou "Não documentado"]
**Hipótese provável:** [o que provavelmente causou o incidente]
**Confiança:** Alta | Média | Baixa
**Justificativa:** [por que essa hipótese é plausível com base nos artefatos]
```

---

## Passo 3 — Propor ações graduadas

Proponha ações em quatro níveis, na ordem a seguir:

1. **Contornar** — ação imediata para limitar o impacto sem corrigir a causa (ex: desabilitar feature flag, redirecionar tráfego, ativar fallback)
2. **Mitigar** — reduzir o impacto enquanto a correção definitiva é preparada (ex: aumentar timeout, limitar carga, habilitar cache adicional)
3. **Corrigir** — correção definitiva da causa raiz
4. **Prevenir** — mudança estrutural para que o incidente não se repita (ex: adicionar teste, melhorar alerta, ajustar playbook)

Se o playbook de `ops-epic-<N>.md` já descreve ações para o sintoma, use-o como base e complemente se necessário.

---

## Passo 4 — Registrar a triagem

Registre o resultado da triagem em `doc-specs/<N>-epic/incident-log.md`.
Se o arquivo não existir, crie-o com a estrutura abaixo:

```markdown
# Incident Log — Épico <N>

> Registro de incidentes ocorridos em produção relacionados a este épico.
> Atualizado pelo Operations Agent via /ops-triagem-incidente.

---
```

Adicione uma nova entrada com o seguinte formato:

```markdown
## Incidente — [data: YYYY-MM-DD] — [título resumido]

- **Sintoma relatado:** [descrição do sintoma]
- **Hipótese:** [hipótese identificada]
- **Confiança:** Alta | Média | Baixa
- **Padrão de anomalia correspondente:** [nome ou "Não documentado"]
- **Ações propostas:**
  - Contornar: [ação]
  - Mitigar: [ação]
  - Corrigir: [ação]
  - Prevenir: [ação]
- **Status:** Em investigação | Mitigado | Resolvido | Fechado
- **Observações:** [qualquer informação adicional relevante]
```

---

## Passo 5 — Sinalizar próximos passos

Ao final, informe ao usuário:

1. Se o playbook foi suficiente para guiar a triagem.
2. Se o incidente revelou uma lacuna no playbook — e que o playbook em `ops-epic-<N>.md` deve ser atualizado com o novo sintoma.
3. Se a causa raiz exige uma nova tarefa ou épico para correção permanente — e que isso deve ser registrado em `doc-specs/epics.md` como dívida técnica.

Regras:
- baseie toda a análise nos artefatos do épico — não invente hipóteses sem fundamento
- não execute ações em produção; proponha e documente apenas
- escreva em português do Brasil
- use linguagem técnica, objetiva e acionável
- se não houver informação suficiente para uma hipótese, sinalize explicitamente e peça mais contexto ao usuário
