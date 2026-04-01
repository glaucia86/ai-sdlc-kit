---
name: "sdd-gerar-prd"
description: "Gera PRD.md a partir de tarefa.md usando o agente de planejamento SDD."
agent: "📐 SDD Planner"
---

Leia atentamente o arquivo `doc-specs/tarefa.md`.

Com base EXCLUSIVAMENTE nesse conteúdo e no contexto observável da codebase, gere um arquivo `doc-specs/PRD.md`.

O `PRD.md` deve conter exatamente:

1. Visão geral
2. Objetivos
3. Escopo (incluído / não incluído)
4. Premissas
5. Requisitos funcionais
6. Requisitos não funcionais
7. Critérios de aceite
8. Perguntas abertas

> observação: o `PRD.md` deve ser gerado de forma bem detalhada e robusta, servindo como um guia claro e acionável para toda a equipe de desenvolvimento. O foco deve ser na clareza, precisão e utilidade prática para orientar a implementação da etapa descrita na tarefa.

Regras:
- não invente requisitos;
- não extrapole além do que estiver em `tarefa.md`;
- quando houver ambiguidade, registre em "Perguntas abertas";
- escreva em português do Brasil;
- seja curto, objetivo e fiel à tarefa;
- use subtítulos claros;
- evite excesso de bullets.
