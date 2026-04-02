---
name: "discovery-epics"
description: "Lê technical-spec.md e gera epics.md com os épicos ordenados cronologicamente."
agent: "🏗️ Architect Agent"
---

#file:doc-specs/technical-spec.md
#file:doc-specs/PRD.md

Leia atentamente `doc-specs/technical-spec.md` e `doc-specs/PRD.md`.

Com base EXCLUSIVAMENTE nesses conteúdos, gere um arquivo `doc-specs/epics.md`.

O `epics.md` deve conter:
1. Visão geral dos épicos
2. Tabela cronológica de épicos (semanas / sprints)
3. Para cada épico:
   - ID (E1, E2, E3...)
   - Nome
   - Descrição funcional
   - Objetivo técnico
   - Dependências de outros épicos
   - Critérios de conclusão
4. Mapa de dependências entre épicos

Regras:
- ordene por dependência técnica, não por prioridade de negócio
- épicos com dependência devem aparecer depois dos que dependem
- não invente funcionalidades
- escreva em português do Brasil
- cada épico deve ser pequeno o suficiente para ser implementado de forma independente

Ao concluir, avise o usuário que `epics.md` está pronto para revisão (HIL obrigatório antes de avançar para `/epic-preparar`).
