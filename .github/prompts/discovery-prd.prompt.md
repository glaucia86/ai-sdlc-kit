---
name: "discovery-prd"
description: "Lê non-technical-spec.md e gera PRD.md detalhado."
agent: "🧑‍💼 Tech Lead Agent"
---

#file:doc-specs/non-technical-spec.md

Leia atentamente o arquivo `doc-specs/non-technical-spec.md`.

Com base EXCLUSIVAMENTE nesse conteúdo, gere um arquivo `doc-specs/PRD.md`.

O `PRD.md` deve conter:
1. Visão geral
2. Objetivos
3. Escopo (incluído / não incluído)
4. Premissas
5. Requisitos funcionais
6. Requisitos não funcionais
7. Critérios de aceite
8. Perguntas abertas

Regras:
- não invente requisitos
- não extrapole além de non-technical-spec.md
- seja detalhado e robusto
- escreva em português do Brasil
- use subtítulos claros e evite excesso de bullets

Ao concluir, avise o usuário que `PRD.md` está pronto para revisão (HIL obrigatório antes de avançar para `/discovery-technical-spec`).
