---
title: Referência de Templates
description: Todos os templates do AI SDLC Kit — o que são, quando são usados e sua estrutura.
---

Os templates estão em `.github/templates/`. Eles são usados pelos agentes como guias estruturais ao gerar artefatos. Os agentes não copiam os templates literalmente — eles os usam como esquemas de seções e os preenchem com conteúdo derivado dos artefatos anteriores.

---

## `idea.template.md`

**Usado por:** 🧭 Discovery (via `/discovery-refine`)  
**Produz:** `doc-specs/idea.md`

| Seção | Propósito |
|---|---|
| Problem | O problema central que a ideia endereça |
| Target users | Quem precisa disso |
| Key scenarios | As coisas mais importantes que os usuários precisam fazer |
| Success criteria | Como sabemos que funciona |
| Out of scope | O que explicitamente não está incluído |
| Constraints | Limitações conhecidas ou decisões fixas |
| Context | Contexto de fundo, origem ou relacionado |
| Open questions | Ambiguidades que precisam ser resolvidas antes de avançar |

---

## `non-technical-spec.template.md`

**Usado por:** 🗂️ PM (via `/discovery-spec`)  
**Produz:** `doc-specs/non-technical-spec.md`

| Seção | Propósito |
|---|---|
| Personas | Quem usa isso e o que precisam |
| User journeys | Fluxos passo a passo para cada persona |
| Functional scenarios | Casos de uso concretos com caminhos principais e casos extremos |
| Business rules | Restrições e políticas que governam o comportamento |
| Acceptance criteria | Condições testáveis para cada cenário |
| Open questions | Itens que requerem validação de negócio antes do PRD |

---

## `PRD.template.md`

**Usado por:** 🧑‍💼 Tech Lead (via `/discovery-prd`) e 📐 Planner (via `/task-prd`)  
**Produz:** `doc-specs/PRD.md`

| Seção | Propósito |
|---|---|
| Overview | Resumo executivo do que está sendo construído |
| Objectives | Como é o sucesso |
| Scope — included | O que está nesta entrega |
| Scope — excluded | O que explicitamente não está nesta entrega |
| Assumptions | Coisas tratadas como verdadeiras sem verificação |
| Functional requirements | Lista numerada de comportamentos necessários |
| Non-functional requirements | Desempenho, segurança, acessibilidade, etc. |
| Acceptance criteria | Condições que devem ser verdadeiras para aprovação |
| Open questions | Itens que precisam ser resolvidos antes da implementação |

---

## `technical-spec.template.md`

**Usado por:** 🏗️ Architect (via `/discovery-tech-spec`)  
**Produz:** `doc-specs/technical-spec.md`

| Seção | Propósito |
|---|---|
| Architecture overview | Como o sistema está estruturado |
| Architecture decisions | Decisões principais com justificativas (formato ADR) |
| Components | Módulos, serviços e suas responsabilidades |
| Contracts and interfaces | APIs, esquemas de dados, eventos |
| Data flows | Como os dados se movem pelo sistema |
| Persistence strategy | Escolhas de armazenamento e migrações |
| Auth and security | Autenticação, autorização, proteção de dados |
| Testing strategy | Abordagem de testes unitários, integração, end-to-end |
| Risks | Riscos técnicos com notas de mitigação |
| Open questions | Decisões técnicas não resolvidas |

---

## `epics.template.md`

**Usado por:** 🏗️ Architect (via `/discovery-epics`)  
**Produz:** `doc-specs/epics.md`

| Seção | Propósito |
|---|---|
| Epic list | Tabela ordenada: N, título, descrição, dependências |
| Sequencing rationale | Por que esta ordem — o que guia o grafo de dependências |
| Branch naming | Convenção: `feat/E<NN>-<slug>` |

---

## `epic-N.template.md`

**Usado por:** 🏗️ Architect (via `/epic-init`)  
**Produz:** `doc-specs/<N>-epic/epic-N.md`

| Seção | Propósito |
|---|---|
| Epic overview | O que este epic realiza no projeto mais amplo |
| Scope — included | O que este epic entrega |
| Scope — excluded | O que é adiado para epics futuros |
| Technical dependencies | Epics anteriores ou infraestrutura que deve existir |
| Completion criteria | Sinais observáveis de que o epic está concluído |

---

## `spec-epic-N.template.md`

**Usado por:** 🏗️ Architect (via `/epic-init`)  
**Produz:** `doc-specs/<N>-epic/spec-epic-N.md`

O template mais crítico do kit — este documento é o portão para a implementação.

| Seção | Propósito |
|---|---|
| Technical context | Decisões de arquitetura do `CONTEXT.md` relevantes para este epic |
| Implementation scope | O que está dentro e fora |
| Affected files | Lista explícita: criar / modificar / excluir |
| Data model changes | Mudanças de esquema, migrações |
| Implementation strategy | Plano passo a passo sem decisões ambíguas |
| Test strategy | Cenários a cobrir e como testá-los |
| Technical acceptance criteria | ✅ Checklist que o Implementer deve completar |
| Risks and open questions | Bloqueadores a sinalizar antes de começar |

---

## `decisions-log.template.md`

**Usado por:** 🏗️ Architect (criado vazio via `/epic-init`); atualizado pelo 🛠️ Implementer  
**Produz:** `doc-specs/<N>-epic/decisions-log.md`

Cada entrada segue o formato ADR (Architectural Decision Record):

| Campo | Descrição |
|---|---|
| Date | Quando a decisão foi tomada |
| Decision | O que foi decidido |
| Context | Qual situação tornou essa decisão necessária |
| Alternatives | Outras opções que foram consideradas |
| Consequences | O que essa decisão implica para epics futuros |

As entradas **nunca são excluídas** — apenas adicionadas ou emendadas.

---

## `ops-epic-N.template.md`

**Usado por:** 🚀 Ops (via `/epic-close`)  
**Produz:** `doc-specs/<N>-epic/ops-epic-N.md`

| Seção | Propósito |
|---|---|
| Deploy preparation | Variáveis de ambiente, dependências de infra, sequência de migração, feature flags, plano de rollback |
| Breaking changes | Impacto em outros serviços ou epics futuros |
| Observability | Logs, métricas e alertas a configurar |
| Production validation | Como confirmar que o epic funciona em produção |
| Anomaly patterns | O que distingue comportamento normal de anormal para essas features |
| Technical debt | Dívida registrada para epics futuros |
| Feedback for future epics | Aprendizados, riscos e ajustes sugeridos para `epics.md` |

---

## `CONTEXT.template.md`

**Usado por:** 🏗️ Architect (criação inicial via `/discovery-tech-spec`; atualizado via `/context-sync`)  
**Produz:** `doc-specs/CONTEXT.md`

| Seção | Propósito |
|---|---|
| Project overview | O que é este projeto, em resumo |
| Architecture decisions | ADRs cumulativos de todos os epics |
| Completed epics | Resumo de cada epic mergiado e deployado |
| Technical debt | Dívida registrada em todos os epics |
| Active risks | Riscos levantados pelo Ops que ainda não foram resolvidos |
| Test strategy | Convenções de testes para todo o projeto |
| Development conventions | Padrões e restrições que todos os agentes devem seguir |

---

## `AGENTS.base.md`

**Usado por:** 📐 Planner (via `/agents-init`)  
**Produz:** `AGENTS.md` na raiz do projeto

Um esqueleto para o arquivo `AGENTS.md` de nível de projeto. Contém:

| Seção | Propósito |
|---|---|
| Purpose | O que este projeto faz |
| Global behavior | Convenções que todos os agentes devem seguir neste codebase |
| Limits | O que os agentes nunca devem fazer |
| Specialized files | Links para orientações adicionais dos agentes |

Usado apenas uma vez por projeto para estabelecer orientações base do Copilot para o codebase.
