# Spec — Épico <N>

## Contexto técnico

## Objetivo técnico

## Escopo de implementação

## Arquivos e componentes potencialmente afetados

## Fluxo técnico esperado

## Regras e restrições

## Estratégia de implementação

## Estratégia de testes

### Testes unitários

- **Cenários principais:** <!-- Quais unidades de comportamento devem ser verificadas isoladamente? -->
- **Dados de entrada necessários:** <!-- Valores válidos, inválidos e limites -->
- **Resultado esperado:** <!-- O que deve ser verdadeiro após a execução? -->

### Testes de integração

- **Cenários principais:** <!-- Quais fluxos entre componentes devem ser verificados? -->
- **Dados de entrada necessários:** <!-- Fixtures, estados de banco, respostas de dependências externas -->
- **Resultado esperado:** <!-- Comportamento observável fim a fim -->

### Testes funcionais

- **Cenários principais:** <!-- Quais jornadas de usuário ou contratos de API devem ser exercitados? -->
- **Dados de entrada necessários:** <!-- Payloads, parâmetros, usuários de teste -->
- **Resultado esperado:** <!-- Saída ou estado visível externamente -->

### Dados de teste sintéticos necessários

<!-- Descreva os conjuntos de dados que precisam ser criados ou simulados para cobrir os cenários acima.
     Foque em: casos normais, valores-limite (boundary values), entradas inválidas e edge cases.
     Não especifique sintaxe ou formato de arquivo — isso é responsabilidade da implementação. -->

## Critérios de aceite técnicos

> Cada critério deve ser verificável sem ambiguidade.
> O SDD Implementer deve marcar cada item antes de acionar /sdd-revisar.
> Itens não marcados bloqueiam o handoff para revisão.

### Checklist de verificação

#### Funcionalidade
- [ ] [descrever comportamento esperado de forma objetiva e testável]
- [ ] [ex: endpoint POST /users retorna 201 com body { id, email } quando payload válido]

#### Testes
- [ ] Testes unitários cobrem os casos principais descritos na spec
- [ ] Testes de integração cobrem os fluxos críticos
- [ ] Nenhum teste existente foi quebrado pela implementação

#### Qualidade de código
- [ ] Nenhum tipo implícito ou unsafe introduzido (conforme convenção do projeto)
- [ ] Sem dependências não listadas em technical-spec.md
- [ ] Padrões de nomenclatura da codebase preservados

#### Segurança e resiliência
- [ ] Inputs validados nos pontos de entrada
- [ ] Erros tratados com tipos explícitos, sem swallow silencioso
- [ ] Sem secrets hardcoded

#### Documentação
- [ ] `decisions-log.md` atualizado com decisões relevantes do épico
- [ ] Ambiguidades encontradas registradas neste arquivo na seção de dúvidas

### Critérios de bloqueio (impedem avanço mesmo com HIL)

<!-- Liste aqui os critérios cuja falha deve impedir completamente o avanço -->
<!-- Ex: "autenticação não pode ser bypassada em nenhum fluxo" -->

## Riscos e dúvidas em aberto
