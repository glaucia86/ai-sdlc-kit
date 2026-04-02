---
title: Memória de Contexto
description: Como CONTEXT.md e decisions-log.md mantêm memória coerente do projeto entre epics, agentes e conversas.
---

## O problema de contexto em fluxos de IA

Toda conversa com um agente de IA começa do zero. O agente não tem memória do epic anterior, não conhece decisões tomadas há três semanas e não está ciente das restrições descobertas durante a implementação.

Sem uma solução para esse problema, cada epic é efetivamente um novo projeto. O agente precisa ser re-instruído toda vez, e o risco de inconsistência se acumula a cada epic.

O ai-sdlc-kit resolve isso com dois documentos de contexto estruturados que todo agente lê no início de cada sessão.

---

## CONTEXT.md — a memória viva do projeto

`CONTEXT.md` é a única fonte de verdade para o estado atual do projeto. Ele é gerado a partir do template em `.github/templates/CONTEXT.template.md` e atualizado pelo 🏗️ Architect e pelo prompt `/context-sync` após o fechamento de cada epic.

### O que o CONTEXT.md contém

| Seção | Conteúdo |
|---|---|
| **Resumo do projeto** | Descrição de um parágrafo; escopo, objetivos, não-objetivos |
| **Epic atual** | Qual epic está ativo; em qual fase (spec / construção / ops) |
| **Stack** | Linguagens, frameworks, serviços, infraestrutura |
| **Decisões principais** | Escolhas arquiteturais feitas e por quê (de `decisions-log.md`) |
| **Restrições** | Limites fixos: orçamentos de desempenho, restrições de dependência, acordos da equipe |
| **Glossário** | Termos de domínio que aparecem na spec e no código |
| **Perguntas em aberto** | Itens não resolvidos sinalizados para o próximo HIL checkpoint |

### Por que todos os agentes leem o CONTEXT.md primeiro

O `CONTEXT.md` é referenciado por todo agente e todo prompt como o primeiro `include:` em seu frontmatter. Isso significa que:

- O Implementer sabe qual framework está em uso sem ser informado
- O Reviewer sabe quais decisões já estão fechadas
- O agente Ops conhece o destino de deploy e a estratégia de rollback
- O Planner conhece o limite de escopo do epic atual

Sem esse contexto compartilhado, cada agente teria que inferir esses fatos a partir do código — e inferências podem estar erradas.

---

## decisions-log.md — o registro ADR append-only

`decisions-log.md` é um log de Registros de Decisão Arquitetural (ADR). Ao contrário do `CONTEXT.md`, que é um snapshot do estado atual, `decisions-log.md` é append-only: entradas nunca são excluídas, apenas substituídas.

### Quando uma entrada é adicionada

- Uma decisão arquitetural é tomada (ex.: "Usaremos Postgres, não SQLite")
- Uma restrição é descoberta (ex.: "O endpoint da API tem um limite de payload de 5 MB")
- Uma decisão anterior é revertida (ex.: "Estamos mudando de Postgres para PlanetScale; veja ADR-007")
- Um trade-off é aceito (ex.: "Não adicionaremos cache no Epic 3 porque o escopo está fixo")

### Formato de entrada (baseado no template)

```markdown
### ADR-001 — [Título curto]

**Data:** AAAA-MM-DD  
**Status:** Aceito | Substituído pelo ADR-XXX  
**Contexto:** Por que essa decisão foi necessária?  
**Decisão:** O que foi decidido?  
**Consequências:** O que muda como resultado?  
```

---

## Como a memória de contexto é mantida entre epics

```
Epic N fecha
    │
    ▼
Prompt /epic-close
    │
    ▼
Agente Ops gera ops-epic-N.md
    │
    ▼
Humano aprova → merge
    │
    ▼
Prompt /context-sync
    │
    ▼
Architect lê:
  - CONTEXT.md (atual)
  - decisions-log.md
  - spec-epic-N.md
  - ops-epic-N.md
    │
    ▼
Architect atualiza CONTEXT.md:
  - Epic atual → Epic N+1
  - Decisões principais → adicionadas
  - Perguntas em aberto → resolvidas ou mantidas
    │
    ▼
CONTEXT.md atualizado commitado
    │
    ▼
Epic N+1 começa
    └── Todos os agentes leem o CONTEXT.md atualizado
```

---

## O que quebra sem memória de contexto

| Contexto ausente | O que dá errado |
|---|---|
| Stack não registrado | Agente sugere uma nova dependência que conflita com escolhas existentes |
| Decisão principal não registrada | Agente reabre uma decisão fechada e gera código divergente |
| Restrições não registradas | Agente produz uma implementação que viola um limite conhecido |
| Glossário não registrado | Agente usa um termo diferente para o mesmo conceito; specs ficam inconsistentes |
| Perguntas em aberto não mantidas | Itens não resolvidos críticos são silenciosamente descartados |

O `CONTEXT.md` é barato de manter — o prompt `/context-sync` automatiza a maior parte da atualização. O custo de não mantê-lo cresce exponencialmente com a duração do projeto.

---

## Memória de contexto e múltiplos agentes

Em uma sessão típica do ai-sdlc-kit, o mesmo `CONTEXT.md` é implicitamente compartilhado entre todos os agentes por meio do sistema de include do VS Code. Quando qualquer agente executa um prompt que inclui `CONTEXT.md`, o agente tem o mesmo conhecimento do projeto que todos os outros agentes que executaram o mesmo include.

Esta é a aproximação mais próxima de um sistema de memória compartilhada dentro das restrições de conversas de IA sem estado.

Para projetos longos (mais de 5 epics), vale a pena revisar `CONTEXT.md` no início de cada sub-ciclo de Concepção para garantir que as seções de resumo do projeto e stack ainda estejam precisas. O agente Architect pode realizar essa revisão como parte do `/epic-init`.
