---
name: "sdd-revisar"
description: "Revisa aderência entre PRD.md, spec.md e implementação."
agent: "🔎 SDD Reviewer"
---

#file:doc-specs/CONTEXT.md

Leia atentamente os arquivos:

- `doc-specs/PRD.md`
- `doc-specs/spec.md`

Se a revisão for parte de um épico do Fluxo A, leia também:
- o `PRD.md` e `spec-epic-<N>.md` do épico em andamento em `doc-specs/<N>-epic/`
- `doc-specs/<N>-epic/decisions-log.md`

Considere também os arquivos alterados da implementação atual.

Faça uma revisão estruturada cobrindo:
- aderência entre PRD, spec e implementação;
- desvios relevantes;
- riscos e pontos de atenção;
- lacunas;
- checklist de verificação de `spec-epic-<N>.md` — confirme que todos os itens estão marcados;
- avaliação do `decisions-log.md` — as decisões registradas são coerentes com a implementação?
- recomendação final.

Regras:
- fundamente a análise em evidências observáveis;
- não invente problemas;
- escreva em português do Brasil;
- use subtítulos claros e texto descritivo;
- use bullets apenas quando ajudarem a organizar pendências.

Ao concluir, complemente `doc-specs/<N>-epic/decisions-log.md` com quaisquer decisões ou dívidas técnicas identificadas durante a revisão que ainda não estejam registradas.
