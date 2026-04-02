---
title: Desenvolvedor Solo
description: Como um desenvolvedor solo usa o ai-sdlc-kit de forma eficaz, adaptando práticas HIL e papéis de agentes para uma equipe de um.
---

## Quando usar este cenário

Use este passo a passo se você é a única pessoa trabalhando no projeto. Todos os papéis de agentes são executados pelo mesmo indivíduo, o que muda a dinâmica do HIL, mas não o processo fundamental.

---

## A vantagem do desenvolvedor solo

Desenvolvedores solo se beneficiam do ai-sdlc-kit mais do que grandes equipes em alguns aspectos:

- **Sem overhead de coordenação** — você não precisa compartilhar artefatos entre pessoas; a estrutura do kit substitui a necessidade de reuniões sobre escopo
- **Ciclos de spec mais rápidos** — você pode aprovar artefatos assim que os terminar (com atraso de revisão adequado)
- **Contexto completo** — você já conhece as restrições; `CONTEXT.md` as captura para os agentes

A desvantagem é que a mesma pessoa que formula o problema também é a pessoa que valida o enquadramento. Isso cria riscos de viés de confirmação nos HIL checkpoints.

---

## Adaptando os HIL checkpoints

### A regra das 24 horas

Revise os artefatos gerados 24 horas depois de terem sido criados, não imediatamente. A fluência da prosa gerada por IA torna fácil aprovar conteúdo com o qual você não concorda realmente. Uma pausa de um dia quebra a ilusão de fluência.

Isso se aplica especialmente a:
- `idea.md` após o Discovery
- `spec-epic-N.md` antes do início da Construção
- Relatórios de revisão antes do merge

### Processo HIL simplificado para desenvolvedores solo

| Checkpoint | Processo padrão | Adaptação solo |
|---|---|---|
| **HIL-A1** a **HIL-A5** | Reunião de revisão em equipe | Auto-revisão async; use a regra das 24 horas |
| **HIL-B1** (spec) | Revisão da spec com stakeholders | Teste de leitura em voz alta: se você precisa explicar um critério, ele não é específico o suficiente |
| **HIL-B3** (implementação) | Revisão de código por pares | Revisão de diff apenas contra critérios de aceitação da spec; não estilo |
| **HIL-B4** (relatório de revisão) | Discussão de revisão | Corrija bloqueadores; aceite ou documente explicitamente a dívida técnica |
| **HIL-B5** (ops) | Aprovação de deploy pelo tech lead | Escreva os passos de rollback antes de aprovar — se você não consegue escrevê-los, o plano está incompleto |

### Quando comprimir checkpoints

Para epics pequenos (menos de 5 tarefas), é aceitável combinar:
- HIL-B1 e HIL-B2 em uma única revisão (spec + lista de tarefas juntos)
- HIL-B3 e HIL-B4 em uma única revisão (implementação + relatório de revisão juntos)

Não combine HIL-A4 (spec técnica) e HIL-A5 (epics). São revisões separadas de diferentes níveis de abstração.

---

## Adaptando os papéis dos agentes

Em um contexto de equipe, diferentes humanos invocam diferentes agentes. Como desenvolvedor solo, você invoca todos os agentes. A distinção de papel ainda é útil:

| Agente | Qual perspectiva ele força você a considerar |
|---|---|
| 🧭 Discovery | "Estou resolvendo o problema real, ou apenas a primeira formulação do problema?" |
| 🗂️ PM | "Estou descrevendo o que o produto faz para os usuários, ou como funciona tecnicamente?" |
| 🧑‍💼 Tech Lead | "Esses requisitos são testáveis? As prioridades estão corretas?" |
| 🏗️ Architect | "Esta arquitetura é apropriada, ou é a arquitetura que conheço melhor?" |
| 📐 Planner | "Essas tarefas são independentes o suficiente para serem implementadas e testadas separadamente?" |
| 🛠️ Implementer | "Estou implementando a spec, ou o que eu gostaria que a spec dissesse?" |
| 🧪 QA | "Este teste prova o comportamento, ou apenas que o código executa?" |
| 🔎 Reviewer | "Esta implementação satisfaz os critérios de aceitação, ou apenas parece correta?" |
| 🚀 Ops | "Isso pode ser deployado com segurança? Pode ser revertido com segurança?" |

Executar um agente significa adotar sua perspectiva crítica, não apenas gerar sua saída.

---

## Fluxo de trabalho recomendado para um desenvolvedor solo

### Para um novo projeto

Siga o passo a passo completo de [Novo Projeto](/pt/scenarios/new-project/), com estas diretrizes de time-boxing:

| Fase | Orçamento de tempo por iteração |
|---|---|
| Flow A (Discovery → Epics) | 1–2 horas para projetos pequenos; 1–2 dias para projetos grandes |
| Revisão HIL por checkpoint | Mínimo 15 minutos; aplique a regra das 24 horas para spec e epics |
| Flow B por epic | Varia pelo escopo; revisão de spec é sempre no mínimo no mesmo dia |

### Para um projeto existente

Siga o passo a passo de [Projeto Existente](/pt/scenarios/existing-project/). A etapa de população do `CONTEXT.md` é o investimento de maior valor para desenvolvedores solo — leva 1–2 horas e se paga em cada interação subsequente com agentes.

---

## Erros comuns de desenvolvedores solo

**Erro 1 — Pular a fase de Discovery**  
Desenvolvedores solo frequentemente pulam o Flow A porque "já sabem o que querem construir". A fase de Discovery não é para quando você não sabe o que construir. É para tornar sua ideia explícita o suficiente para funcionar como entrada para uma spec. A spec não pode ser mais precisa do que o documento de ideia.

**Erro 2 — Comprimir excessivamente os epics para ir mais rápido**  
A tentação de colocar tudo no Epic 1 é real quando você é o único desenvolvedor e o prazo é seu. Epics que são muito grandes não podem ser revisados de forma coerente, e os HIL checkpoints se tornam aprovações automáticas por necessidade. Dimensione os epics corretamente em 3–7 tarefas.

**Erro 3 — Usar saídas de agentes sem lê-las**  
Este é o caminho mais rápido para um codebase que é internamente consistente mas externamente errado. Toda saída de agente requer revisão genuína. Uma spec gerada por IA que você aprovou sem ler não é uma spec validada — é uma responsabilidade.
