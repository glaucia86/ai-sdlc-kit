---
name: "sdd-implementar"
description: "Inicia a implementação da tarefa com base no PRD.md e spec.md."
agent: "🛠️ SDD Implementer"
---

#file:doc-specs/CONTEXT.md

Leia atentamente os arquivos:

- `doc-specs/PRD.md`
- `doc-specs/spec.md`

Se a implementação for parte de um épico do Fluxo A, leia também:
- o `PRD.md` e `spec-epic-<N>.md` do épico em andamento em `doc-specs/<N>-epic/`
- `doc-specs/<N>-epic/decisions-log.md`

Antes de alterar qualquer arquivo:
1. resuma rapidamente o que será implementado;
2. identifique os principais arquivos e componentes potencialmente impactados;
3. sinalize qualquer ambiguidade crítica.

Em seguida, inicie a implementação da tarefa com base em `spec.md` (ou `spec-epic-<N>.md`).

Regras:
- preserve os padrões existentes da codebase;
- faça mudanças mínimas e intencionais;
- não introduza convenções não sustentadas pelo projeto;
- ao final, apresente um resumo do que foi implementado, como foi validado e o que ficou pendente.

---

Antes de encerrar e acionar `/sdd-revisar`:

1. Verifique o checklist de `spec-epic-<N>.md` (seção `### Checklist de verificação`). Marque cada item verificado com `[x]`. Itens não verificados devem ser sinalizados com justificativa antes de avançar.
2. Registre em `doc-specs/<N>-epic/decisions-log.md` qualquer decisão técnica relevante tomada durante a implementação.
3. Só acione `/sdd-revisar` após o checklist estar integralmente preenchido.
