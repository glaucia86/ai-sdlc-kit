# Fluxo SDD

## Objetivo

Garantir que a implementação só comece depois da validação humana dos artefatos de especificação.

## Sequência

1. Criar `doc-specs/tarefa.txt`
2. Executar `/sdd-preparar-tarefa`
3. Revisar `doc-specs/tarefa.md`
4. Executar `/sdd-gerar-prd`
5. Revisar `doc-specs/PRD.md`
6. Executar `/sdd-gerar-spec`
7. Revisar `doc-specs/spec.md`
8. Executar `/sdd-implementar`
9. Executar `/sdd-revisar`

## Princípios

- Não implementar sem spec aprovada.
- Não inventar requisitos.
- Registrar ambiguidades.
- Preservar Human in the Loop.
- Manter rastreabilidade entre tarefa, PRD, spec e código.
