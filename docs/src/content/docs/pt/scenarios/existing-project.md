---
title: Projeto Existente
description: Como adotar o ai-sdlc-kit em um projeto que já tem código, documentação ou specs parciais.
---

## Quando usar este cenário

Use este passo a passo quando você já tem um codebase e quer adotar o ai-sdlc-kit para o desenvolvimento contínuo. O projeto existe — você pode ter um README, um backlog, decisões de arquitetura existentes ou até mesmo uma spec parcial.

---

## Antes de começar

Instale o kit no seu projeto:

```bash
npx ai-sdlc-kit@latest init
```

Não sobrescreva a documentação existente. O kit cria arquivos em `doc-specs/` — um diretório separado da sua documentação existente.

---

## Avalie o que você já tem

O ponto de entrada depende de quais artefatos já existem:

| O que você tem | Ponto de partida |
|---|---|
| Apenas notas brutas / README | Comece pelo Passo 1 — popule `idea.txt` a partir das notas existentes |
| Spec ou PRD informal | Comece pelo Passo 3 — converta para `PRD.md` estruturado |
| PRD e arquitetura validados | Comece pelo Passo 5 — gere `epics.md` a partir da spec existente |
| Epics definidos e sequenciados | Vá direto para o Flow B — `/epic-init` |
| Epic ativo em progresso | Vá direto para `/task-init` ou `/task-implement` |

---

## Passo 1 — Popule o arquivo de ideia (se começando das notas)

Extraia o propósito central do seu projeto do seu README, docs de onboarding ou conhecimento institucional.

Escreva em `doc-specs/idea.txt` como uma descrição em texto simples — sem formatação necessária. O agente 🧭 Discovery vai estruturá-la.

Em seguida, siga os passos 2–5 do passo a passo do Flow A para [Novo Projeto](/pt/scenarios/new-project/).

---

## Passo 2 — Crie o CONTEXT.md a partir do conhecimento existente

Para projetos com um codebase existente, o passo mais valioso que você pode dar antes de executar qualquer agente é popular o `CONTEXT.md` manualmente.

Copie o template:

```bash
cp .github/templates/CONTEXT.template.md doc-specs/CONTEXT.md
```

Preencha o que você já sabe:
- **Stack** — o que está realmente em execução (não o que foi planejado)
- **Decisões principais** — escolhas arquiteturais já feitas e os motivos
- **Restrições** — limites conhecidos (rate limits, limites de payload, acordos da equipe)
- **Glossário** — termos de domínio que o codebase usa

Quanto mais completo for este `CONTEXT.md` inicial, melhor serão todas as saídas subsequentes dos agentes. Agentes que leem `CONTEXT.md` não sugerirão substituir sua stack, não reabrirão debates arquiteturais fechados e respeitarão suas restrições reais.

---

## Passo 3 — Converter spec existente para PRD.md

Se você tem uma spec existente (página no Confluence, doc no Notion, Google Doc, um README longo), use `/discovery-prd`:

- Copie o conteúdo relevante para `doc-specs/non-technical-spec.md`
- Execute `/discovery-prd` usando o agente 🧑‍💼 Tech Lead
- Saída: `PRD.md` estruturado com critérios de aceitação testáveis

**HIL:** Revise `PRD.md` em relação ao entendimento real da sua equipe/stakeholders. A conversão pode ter omitido nuances ou formalizado excessivamente acordos informais.

---

## Passo 4 — Spec técnica

Se você não tem uma spec técnica formal, mas tem uma arquitetura existente:

- Use `/discovery-tech-spec` com o agente 🏗️ Architect
- Forneça `PRD.md` + o `CONTEXT.md` atual como contexto
- O agente documentará a arquitetura existente, não inventará uma nova

**HIL:** Verifique se o `technical-spec.md` gerado reflete a realidade com precisão. Agentes que documentam código existente podem perder nuances — especialmente comportamentos implícitos e restrições não documentadas.

---

## Passo 5 — Estrutura de epics para o escopo restante

Se você está no meio de um projeto e quer aplicar o kit ao seu backlog restante:

- Resuma o trabalho concluído em `CONTEXT.md` nas seções "Key decisions" e "Stack"
- Execute `/discovery-epics` usando o agente 🏗️ Architect
- Entrada: `technical-spec.md` + `PRD.md` (com escopo apenas para o que resta)
- Saída: `epics.md` apenas para o trabalho restante

**HIL:** Certifique-se de que o Epic 1 no novo `epics.md` representa trabalho que ainda não foi feito.

---

## Passo 6 — Entrar na fase de Construção

Assim que você tiver `CONTEXT.md`, `technical-spec.md` e `epics.md` validados, prossiga com o Flow B exatamente como em um novo projeto.

Veja [Novo Projeto — Flow B](/pt/scenarios/new-project/#flow-b-fase-de-construção-epic-1) para o passo a passo completo.

---

## Armadilhas comuns de adoção

**Armadilha 1 — Pular o CONTEXT.md**  
O erro mais comum ao adotar o ai-sdlc-kit em um projeto existente é pular a etapa de população do `CONTEXT.md`. Os agentes tomarão decisões de stack e arquitetura com base no que conseguem inferir — que é menos completo do que o que a equipe sabe.

**Armadilha 2 — Executar o Flow A em um codebase existente sem escopo definido**  
Os agentes do Flow A de Discovery gerarão especificações para o produto como se ele não existisse ainda. Se você tem 2 anos de código em produção, executar um Flow A completo sem escopar para "escopo restante apenas" arrisca gerar uma spec que conflita com a implementação existente.

**Armadilha 3 — Não registrar decisões passadas no decisions-log.md**  
Decisões tomadas antes que o kit fosse adotado são invisíveis para os agentes. Dedique uma hora para documentar as três decisões arquiteturais mais importantes que já foram tomadas como entradas ADR em `decisions-log.md`. Este investimento se paga imediatamente na qualidade das specs.
