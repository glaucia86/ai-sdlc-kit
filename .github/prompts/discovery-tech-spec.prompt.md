---
name: "discovery-technical-spec"
description: "Lê PRD.md e gera technical-spec.md com especificação técnica detalhada."
agent: "🏗️ Architect Agent"
---

#file:doc-specs/PRD.md
#file:doc-specs/non-technical-spec.md

Leia atentamente os arquivos `doc-specs/PRD.md` e `doc-specs/non-technical-spec.md`.

Com base EXCLUSIVAMENTE nesses conteúdos e no contexto observável da codebase, gere um arquivo `doc-specs/technical-spec.md`.

O `technical-spec.md` deve conter:
1. Contexto e objetivo técnico
2. Decisões de arquitetura
3. Componentes e módulos principais
4. Contratos e interfaces (tipos, entidades, APIs)
5. Fluxos técnicos detalhados
6. Estratégia de banco de dados e persistência
7. Estratégia de autenticação e autorização (se aplicável)
8. Estratégia de testes
9. Critérios de aceite técnicos
10. Riscos, dependências e pontos de atenção
11. Dúvidas e ambiguidades em aberto

Regras:
- não implemente código de produção
- fundamente decisões técnicas no PRD e na codebase observável
- seja detalhado e robusto
- escreva em português do Brasil
- use TypeScript como referência de linguagem para tipos e contratos

Ao concluir, avise o usuário que `technical-spec.md` está pronto para revisão (HIL obrigatório antes de avançar para `/discovery-epics`).

---

Após a aprovação do usuário, crie também o arquivo `doc-specs/CONTEXT.md` com o seguinte conteúdo inicial:

- Seção `## Propósito do projeto`: resumo em 2-3 frases extraído de `doc-specs/idea.md`
- Seção `## Stack e convenções técnicas`: extraído de `doc-specs/technical-spec.md` (linguagens, frameworks, padrões, estrutura de pastas)
- Seção `## Restrições globais`: extraído de `doc-specs/technical-spec.md`
- Demais seções (`## Decisões arquiteturais (ADRs)`, `## Épicos concluídos`, `## Aprendizados e ajustes de rota`, `## Perguntas abertas de nível global`): deixar vazias com o comentário `<!-- a preencher durante o desenvolvimento -->`

Use o template `.github/templates/CONTEXT.template.md` como estrutura de referência.

Não preencha as seções de ADRs, épicos concluídos ou aprendizados — elas serão preenchidas pelo Operations Agent ao longo dos épicos.
