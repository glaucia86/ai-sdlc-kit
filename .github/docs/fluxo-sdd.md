# Fluxo SDD

## Objetivo

Garantir que a implementação só comece depois da validação humana dos artefatos de especificação.

---

## Quando usar cada fluxo

| Situação | Fluxo indicado |
|---|---|
| Projeto novo com uma ideia a ser estruturada | **Fluxo A** — Discovery + Delivery |
| Projeto existente com tarefa já clara e definida | **Fluxo B** — Delivery direto |
| Projeto que usou Discovery e agora quer implementar um épico | **Fluxo A** — a partir de `/epic-preparar` |

A Fase de Discovery é **sempre opcional**. Nenhum fluxo é pré-requisito do outro.

---

## Fluxo A — Discovery + Delivery

Indicado quando existe uma ideia bruta a ser refinada e estruturada antes da implementação.

### Fase de Discovery

1. Criar `doc-specs/idea.txt`
2. Executar `/discovery-refinar-ideia` → **revisar** `doc-specs/idea.md` (HIL ✅)
3. Executar `/discovery-non-technical-spec` → **revisar** `doc-specs/non-technical-spec.md` (HIL ✅)
4. Executar `/discovery-prd` → **revisar** `doc-specs/PRD.md` (HIL ✅)
5. Executar `/discovery-technical-spec` → **revisar** `doc-specs/technical-spec.md` (HIL ✅)
6. Executar `/discovery-epics` → **revisar** `doc-specs/epics.md` (HIL ✅)

### Fase de Delivery (por épico)

Para cada épico em `epics.md`:

0. Criar a branch do épico:
   ```
   git checkout -b feat/E<NN>-<slug-do-epico>
   ```

7. Executar `/epic-preparar` (o agente pergunta o número do épico)
   - **revisar** `doc-specs/<N>-epic/epic-<N>.md` (HIL ✅)
   - **revisar** `doc-specs/<N>-epic/PRD.md` (HIL ✅)
   - **revisar** `doc-specs/<N>-epic/spec-epic-<N>.md` (HIL ✅)
   - `doc-specs/<N>-epic/decisions-log.md` criado automaticamente (vazio)
8. Executar `/sdd-implementar` apontando para `doc-specs/<N>-epic/PRD.md` e `doc-specs/<N>-epic/spec-epic-<N>.md`
9. Preencher o checklist em `spec-epic-<N>.md` e atualizar `decisions-log.md`
10. Executar `/sdd-gerar-testes` → aguardar gate de QA (HIL se gate bloqueado ⛔)
11. Executar `/sdd-revisar`
12. Executar `/ops-fechar-epico <N>` → **revisar** `doc-specs/<N>-epic/ops-epic-<N>.md` (HIL ✅)
13. Mergear branch `feat/E<NN>-<slug>` para `main` e validar deploy em produção
14. Executar `/ops-atualizar-context <N>`
15. Avançar para o próximo épico

> **Regra de ouro:** Sem `spec-epic-<N>.md` validada por humano, não se implementa o épico N. Não se inicia o épico N+1 sem a branch do épico N mergeada e o deploy validado em produção.

---

## Fluxo B — Delivery direto

Indicado quando a tarefa já está clara. Este é o fluxo original do ai-sdlc-kit, preservado integralmente.

1. Criar `doc-specs/tarefa.txt`
2. Executar `/sdd-preparar-tarefa` → **revisar** `doc-specs/tarefa.md` (HIL ✅)
3. Executar `/sdd-gerar-prd` → **revisar** `doc-specs/PRD.md` (HIL ✅)
4. Executar `/sdd-gerar-spec` → **revisar** `doc-specs/spec.md` (HIL ✅)
5. Executar `/sdd-implementar`
6. Executar `/sdd-gerar-testes` → aguardar gate de QA (HIL se gate bloqueado ⛔)
7. Executar `/sdd-revisar`

---

## Operações contínuas (pós-merge)

Após o merge e o deploy de qualquer épico, o seguinte comando fica disponível a qualquer momento:

| Situação | Comando |
|---|---|
| Incidente ou alerta observado em produção | `/ops-triagem-incidente` |

### Como funciona

1. Executar `/ops-triagem-incidente`
2. O agente pergunta o sintoma observado e o épico potencialmente afetado
3. O agente lê `ops-epic-<N>.md` e mapeia o sintoma ao padrão de anomalia documentado
4. O agente propõe ações graduadas: contornar → mitigar → corrigir → prevenir
5. O resultado da triagem é registrado em `doc-specs/<N>-epic/incident-log.md`
6. Se o incidente revelar lacuna no playbook ou exigir correção permanente, o agente sinaliza o que deve ser atualizado em `epics.md`

> **Nota:** `/ops-triagem-incidente` não executa ações em produção. Ele propõe, documenta e fecha o ciclo de aprendizado.

---

## Princípios

- Não implementar sem spec aprovada.
- Não inventar requisitos.
- Registrar ambiguidades.
- Preservar Human in the Loop.
- Manter rastreabilidade entre ideia/tarefa, PRD, spec e código.
