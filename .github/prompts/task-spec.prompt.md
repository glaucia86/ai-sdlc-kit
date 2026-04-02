---
name: "sdd-gerar-spec"
description: "Gera spec.md a partir de PRD.md com foco em implementação."
agent: "📐 SDD Planner"
---

Leia atentamente o arquivo `doc-specs/PRD.md`.

Com base EXCLUSIVAMENTE no conteúdo de `PRD.md` e no contexto observável da codebase atual, gere um arquivo `doc-specs/spec.md`.

O `spec.md` deve conter:

1. Contexto da tarefa
2. Objetivo técnico
3. Escopo de implementação
4. Impacto na arquitetura atual
5. Componentes/arquivos potencialmente afetados
6. Fluxo funcional esperado
7. Regras e restrições técnicas
8. Estratégia de implementação sugerida
9. Estratégia de testes e validação
10. Critérios de aceite técnicos
11. Riscos, dependências e pontos de atenção
12. Dúvidas ou ambiguidades em aberto

> observação: o `spec.md` deve ser gerado de forma bem detalhada e robusta, servindo como um guia técnico claro e acionável para a implementação da etapa descrita no PRD. O foco deve ser na clareza, precisão e utilidade prática para os desenvolvedores que irão implementar a funcionalidade.

Regras:
- não invente requisitos;
- não extrapole além do PRD e da codebase observável;
- explicite dúvidas e ambiguidades;
- escreva em português do Brasil;
- use texto técnico, objetivo e acionável;
- estruture a saída para servir como base direta para implementação via Agent Mode.
