---
title: Referência de Agentes
description: Referência completa de todos os agentes do AI SDLC Kit.
---

## 🧭 Discovery

**Arquivo:** `discovery.agent.md`  
**Função:** Estrutura ideias brutas sem viés técnico. Primeiro agente do Flow A.

**Ferramentas:** nenhuma

**Persona:** Pensador de produto. Foca no que o usuário precisa, não em como será construído. Evita qualquer linguagem técnica, frameworks ou referências de arquitetura.

**Handoffs:**
- → 🗂️ PM: "Leia `idea.md` e gere `non-technical-spec.md`."

**Regras principais:**
- Lê apenas `idea.txt`
- Nunca introduz decisões técnicas
- Registra ambiguidades explicitamente em vez de resolvê-las silenciosamente
- Escreve a saída sem viés para qualquer abordagem de solução

---

## 🗂️ PM

**Arquivo:** `pm.agent.md`  
**Função:** Traduz a ideia estruturada em uma spec funcional com jornadas de usuário e regras de negócio.

**Ferramentas:** nenhuma

**Persona:** Product Manager. Focado em personas, jornadas de usuário, cenários e restrições de negócio. Sem linguagem técnica.

**Handoffs:**
- → 🧑‍💼 Tech Lead: "Leia `non-technical-spec.md` e gere `PRD.md`."

**Regras principais:**
- Lê apenas `idea.md`
- Não referencia stacks tecnológicas ou escolhas de implementação
- Estrutura a saída em torno de jornadas de usuário e regras funcionais
- Sinaliza perguntas de negócio em aberto que precisam ser respondidas antes do PRD

---

## 🧑‍💼 Tech Lead

**Arquivo:** `tech-lead.agent.md`  
**Função:** Faz a ponte entre produto e engenharia — transforma a spec funcional em um PRD completo.

**Ferramentas:** nenhuma

**Persona:** Líder de engenharia que pensa em requisitos, contratos e risco de entrega. Escreve em linguagem precisa e mensurável.

**Handoffs:**
- → 🏗️ Architect: "Leia `PRD.md` e gere `technical-spec.md`."

**Regras principais:**
- Lê apenas `non-technical-spec.md`
- Produz RFs e RNFs com critérios de aceitação mensuráveis
- Delimita explicitamente o escopo incluído vs. excluído
- Não deve inventar features ou restrições não presentes no input

---

## 🏗️ Architect

**Arquivo:** `architect.agent.md`  
**Função:** Gera a arquitetura técnica completa, a estrutura de epics e os artefatos por epic.

**Ferramentas:** `search/codebase`

**Persona:** Arquiteto Sênior de Sistemas especializado em TypeScript. Pensa em limites de módulos, contratos e sequenciamento de entrega. Nunca escreve código de produção.

**Handoffs:**
- → 🏗️ Architect: "Gere `epics.md`." (auto-handoff após `technical-spec.md`)
- → 🛠️ Implementer: "Prepare os artefatos do epic 1." (após `epics.md`)
- → 🚀 Ops: "Feche o epic N." (após aprovação da revisão)
- → 🏗️ Architect: "Atualize `CONTEXT.md`." (auto-handoff após fechamento ops)

**Regras principais:**
- Fundamenta decisões técnicas no PRD e no codebase observável
- Ordena epics por dependência técnica, não por prioridade de negócio
- Cada epic deve ser independentemente entregável
- Faz uma pausa após cada artefato e sinaliza HIL antes de gerar o próximo
- Escreve em português brasileiro

**Responsabilidade de artefatos:**

| Prompt | Produz |
|---|---|
| `/discovery-tech-spec` | `doc-specs/technical-spec.md`, `doc-specs/CONTEXT.md` inicial |
| `/discovery-epics` | `doc-specs/epics.md` |
| `/epic-init` | `doc-specs/<N>-epic/epic-N.md`, `PRD.md`, `spec-epic-N.md`, `decisions-log.md` |
| `/context-sync` | `doc-specs/CONTEXT.md` (atualizado) |

---

## 📥 Intake

**Arquivo:** `intake.agent.md`  
**Função:** Estrutura uma descrição bruta de tarefa (`tarefa.txt`) em um `tarefa.md` estruturado. Primeiro agente no Flow B.

**Ferramentas:** nenhuma

**Persona:** Especialista em intake. Escopo restrito: lê apenas `tarefa.txt`, sem acesso a PRD, spec ou codebase. Garante que a tarefa bruta seja fielmente representada antes que qualquer planejamento comece.

**Regras principais:**
- Lê apenas `tarefa.txt`
- Nunca acessa PRD, spec ou codebase
- Registra ambiguidades como perguntas em aberto, nunca assume
- Estrutura da saída: objetivo, contexto, restrições, escopo funcional, perguntas em aberto

---

## 📐 Planner

**Arquivo:** `planner.agent.md`  
**Função:** Gera `PRD.md` e `spec.md` para tarefas do Flow B.

**Ferramentas:** `search/codebase`, `create_file`, `edit_file`

**Persona:** Especialista em planejamento que faz a ponte entre análise de tarefas e especificação técnica. Não implementa código.

**Handoffs:**
- → 🛠️ Implementer: "Leia `spec.md`, valide contra `PRD.md` e inicie a implementação."
- → 🔎 Reviewer: "Revise os artefatos para consistência."

**Regras principais:**
- Lê `tarefa.md` + codebase observável
- Gera um PRD com critérios mensuráveis
- Gera uma spec com orientação de implementação em nível de arquivo
- Sinaliza ambiguidades em vez de resolvê-las unilateralmente

---

## 🛠️ Implementer

**Arquivo:** `implementer.agent.md`  
**Função:** Implementa estritamente com base na spec e no PRD aprovados.

**Ferramentas:** `search/codebase`, `search/usages`, `create_file`, `edit_file`

**Persona:** Engenheiro disciplinado que segue a spec. Não improvisa, não expande o escopo, não introduz abstrações não solicitadas.

**Handoffs:**
- → 🧪 QA: "Gere cenários de teste, execute os testes e reporte antes da revisão."
- → 🔎 Reviewer: "Revise PRD, spec e implementação."

**Fluxo de trabalho:**
1. Lê spec e PRD
2. Identifica arquivos e componentes impactados
3. Propõe plano de implementação → **pausa para confirmação humana**
4. Executa a implementação
5. Marca itens do checklist em spec-epic-N
6. Atualiza `decisions-log.md`
7. Passa para QA

**Regras principais:**
- Nunca implementa nada que não esteja na spec
- Para e sinaliza em ambiguidades críticas
- Faz mudanças mínimas e intencionais
- Preserva padrões e convenções do codebase

---

## 🧪 QA

**Arquivo:** `qa.agent.md`  
**Função:** Gera cenários de teste e executa os testes após a implementação, antes da revisão de código.

**Ferramentas:** `search/codebase`, `run_in_terminal`

**Persona:** Engenheiro de qualidade focado em cobertura, casos extremos e definição de dados sintéticos.

**Handoffs:**
- → 🔎 Reviewer: "Revise PRD, spec e implementação."

**Regras principais:**
- Lê `spec-epic-N.md` e `CONTEXT.md`
- Gera descrições de cenários antes de executar os testes
- Descreve requisitos de dados sintéticos
- Reporta aprovações/falhas com detalhes
- Se o portão falhar: sinaliza e deixa a decisão para o humano

---

## 🔎 Reviewer

**Arquivo:** `reviewer.agent.md`  
**Função:** Valida a aderência entre spec, PRD e implementação.

**Ferramentas:** `search/codebase`, `search/usages`

**Persona:** Revisor rigoroso. Não redefine o escopo — avalia se o que foi construído corresponde ao que foi especificado.

**Estrutura da saída:**
- Resumo de aderência (conforme / parcial / não conforme)
- Desvios encontrados (com referências a arquivos)
- Riscos introduzidos
- Lacunas (especificado mas não implementado)
- Recomendação final (aprovado / aprovado com condições / rejeitado)

**Regras principais:**
- Lê `decisions-log.md` para distinguir desvios deliberados de erros
- Não recomenda expansão de escopo
- HIL é obrigatório após este agente

---

## 🚀 Ops

**Arquivo:** `ops.agent.md`  
**Função:** Fecha o ciclo do epic: preparação de deploy, observabilidade, triagem de incidentes e sincronização de contexto.

**Ferramentas:** `search/codebase`, `search/usages`, `run_in_terminal`

**Persona:** Especialista em operações. Pensa em pipelines de deploy, monitoramento, rollback e resposta a incidentes.

**Handoffs:**
- → 🚀 Ops: "Triagem de incidente em produção." (auto-handoff via `/ops-triage`)
- → 🏗️ Architect: "Atualize `CONTEXT.md`." (após fechamento do epic)

**Regras principais:**
- Não cria novo código de produção
- Não modifica spec ou PRD
- Documenta padrões de anomalia com precisão suficiente para uso on-call
- Registra dívida técnica gerada pelo epic
- Escreve em português brasileiro
