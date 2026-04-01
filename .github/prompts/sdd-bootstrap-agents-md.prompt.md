---
name: "sdd-bootstrap-agents-md"
description: "Cria o AGENTS.md inicial do repositório com Progressive Disclosure."
agent: "📐 SDD Planner"
---

Leia atentamente:
- `doc-specs/PRD.md`
- a codebase atual

Com base EXCLUSIVAMENTE nesses insumos, gere um arquivo `AGENTS.md` minimalista e estável para a raiz do projeto.

Princípios obrigatórios:
- o AGENTS.md raiz deve ser curto, estável e minimalista;
- deve-se criar esse arquivo na raiz do projeto, mesmo que o conteúdo seja mínimo;
- documente apenas comportamento global do agente;
- não transforme o arquivo em um documento gigante;
- use progressive disclosure;
- direcione instruções especializadas para arquivos secundários, quando necessário;
- não documente estruturas profundas, caminhos instáveis ou detalhes desnecessários.

O `AGENTS.md` deve conter:
- uma frase de propósito do projeto;
- comportamento global do agente (do / don't);
- limites claros do agente;
- seção "Arquivos especializados" com links para conteúdos complementares, se necessário.

Regras:
- não invente padrões;
- não introduza convenções que não estejam refletidas no projeto;
- documente comportamento, não implementação;
- escreva em português do Brasil.
