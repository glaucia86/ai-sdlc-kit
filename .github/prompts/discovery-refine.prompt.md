---
name: "discovery-refinar-ideia"
description: "Lê idea.txt, refina a ideia original e gera idea.md."
agent: "🧭 Discovery Agent"
---

Leia atentamente o arquivo `doc-specs/idea.txt`.

Com base EXCLUSIVAMENTE nesse conteúdo, gere um arquivo `doc-specs/idea.md`.

O `idea.md` deve conter:
1. Resumo da ideia original (fiel ao que foi escrito)
2. Problema que a ideia resolve
3. Público-alvo percebido
4. Valor principal esperado
5. Funcionalidades percebidas (sem viés técnico)
6. Regras de negócio identificadas
7. Melhorias e refinamentos sugeridos (justificados)
8. Perguntas em aberto

Regras:
- não mencione tecnologia, stack ou arquitetura
- não invente funcionalidades
- preserve a intenção original
- escreva em português do Brasil
- use subtítulos claros e texto descritivo

Ao concluir, avise o usuário que `idea.md` está pronto para revisão (HIL obrigatório antes de avançar para `/discovery-non-technical-spec`).
