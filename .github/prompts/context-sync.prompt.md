---
name: "ops-atualizar-context"
description: "Atualiza CONTEXT.md com ADRs, aprendizados e épico concluído após fechamento e validação em produção."
agent: "🏗️ Architect Agent"
---

#file:doc-specs/CONTEXT.md

**Antes de iniciar, pergunte ao usuário:** "Qual o número do épico que foi fechado e validado em produção? (ex: 1, 2, 3)"

Aguarde a resposta antes de continuar.

---

Para o épico informado (chamado aqui de N, com dois dígitos — ex: `01`, `02`):

Leia atentamente:
- `doc-specs/<N>-epic/ops-epic-<N>.md`
- `doc-specs/<N>-epic/decisions-log.md`

Com base nesses artefatos, atualize `doc-specs/CONTEXT.md` seguindo os passos abaixo:

---

### Passo 1 — Registrar o épico concluído

Na seção `## Épicos concluídos`, adicione uma nova entrada:

```
- E<N> — [Nome do épico] | Concluído em: YYYY-MM-DD | Observações: [resumo em uma frase]
```

---

### Passo 2 — Registrar ADRs

Na seção `## Decisões arquiteturais (ADRs)`, extraia e registre todas as decisões relevantes encontradas em `decisions-log.md` que ainda não constam no `CONTEXT.md`. Use o formato:

```
### ADR-<sequencial> — [Título] | Data: YYYY-MM-DD | Status: Aceita
[Resumo da decisão em 2-3 frases]
```

---

### Passo 3 — Registrar aprendizados

Na seção `## Aprendizados e ajustes de rota`, adicione os aprendizados identificados em `ops-epic-<N>.md` que impactam épicos futuros.

---

### Passo 4 — Atualizar perguntas abertas

Na seção `## Perguntas abertas de nível global`, adicione ou resolva perguntas com base no que foi descoberto durante este épico.

---

### Passo 5 — Atualizar restrições globais

Na seção `## Restrições globais`, adicione qualquer nova restrição identificada durante a implementação ou operação deste épico.

---

Regras:
- **NUNCA remova conteúdo existente de `CONTEXT.md`** — apenas acrescente ou atualize
- Mantenha o formato e a estrutura do arquivo intactos
- Escreva em português do Brasil
- Se uma seção já contiver a informação relevante, não duplique — apenas atualize se houver mudança

**Ao concluir, avise o usuário que `CONTEXT.md` foi atualizado e que o kit está pronto para iniciar o épico seguinte com `/epic-preparar <N+1>`.**
