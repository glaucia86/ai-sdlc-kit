# CONTEXT.md — Memória Global do Projeto

> Este arquivo é lido por todos os agentes antes de qualquer ação.
> Ele é criado pelo Architect Agent ao final de `/discovery-technical-spec`.
> Ele é atualizado pelo Architect Agent após cada épico concluído via `/ops-atualizar-context`.
> Nunca remova seções. Apenas acrescente ou atualize.

---

## Propósito do projeto

<!-- Resumo em 2-3 frases extraído de idea.md -->

## Stack e convenções técnicas

<!-- Linguagens, frameworks, padrões de projeto, estrutura de pastas -->
<!-- Extraído de technical-spec.md -->

## Decisões arquiteturais (ADRs)

<!-- Formato: ### ADR-001 — [Título] | Data: YYYY-MM-DD | Status: Aceita -->
<!-- Adicionar uma entrada por decisão relevante tomada em qualquer épico -->

## Restrições globais

<!-- O que NUNCA deve ser feito neste projeto -->
<!-- Extraído de technical-spec.md e atualizado a cada épico -->

## Épicos concluídos

<!-- Formato: - E1 — [Nome] | Concluído em: YYYY-MM-DD | Observações: [resumo em uma frase] -->

## Aprendizados e ajustes de rota

<!-- Registrar aqui o que o Reviewer e o Operations Agent identificaram que impactou épicos futuros -->

## Perguntas abertas de nível global

<!-- Dúvidas que transcendem um épico específico -->

## Convenções de teste

### Comando para executar os testes

<!-- Informe o comando usado neste projeto para executar todos os testes.
     Exemplos: make test | cargo test | go test ./... | ./gradlew test | ./scripts/test.sh
     O QA Agent usará este comando ao acionar /sdd-gerar-testes. -->

### Estratégia de dados de teste

<!-- Descreva onde ficam os dados de teste (ex: pasta fixtures/, helpers de fábrica, mocks inline).
     Não especifique sintaxe — descreva apenas a convenção adotada no projeto. -->
