---
name: "sdd-gerar-testes"
description: "Gera cenários de teste e dados sintéticos a partir da spec do épico, executa os testes e reporta o resultado antes de acionar /sdd-revisar."
agent: "🧪 QA Agent"
---

#file:doc-specs/CONTEXT.md

Leia atentamente:

- `doc-specs/CONTEXT.md` — para identificar o comando de teste configurado no projeto (seção "Convenções de teste") e a estratégia de dados de teste
- O `spec-epic-<N>.md` do épico em andamento em `doc-specs/<N>-epic/` — para extrair comportamentos esperados e critérios de aceite
- O `PRD.md` do épico em `doc-specs/<N>-epic/` — para contexto adicional dos requisitos

Se a implementação for parte do Fluxo B (sem épico), leia:
- `doc-specs/spec.md`
- `doc-specs/PRD.md`

---

## Passo 1 — Gerar cenários de teste

Para cada comportamento verificável descrito na spec, gere cenários estruturados no formato:

```
**Cenário:** [nome descritivo]
**Dado:** [estado inicial ou pré-condição]
**Quando:** [ação executada]
**Então:** [resultado esperado e observável]
**Tipo:** Unitário | Integração | Funcional
```

Cubra obrigatoriamente:
- Casos normais (caminho feliz)
- Valores-limite (boundary values)
- Entradas inválidas que devem ser rejeitadas
- Edge cases descritos ou implícitos na spec

## Passo 2 — Descrever dados de teste sintéticos

Para os cenários gerados, descreva os dados necessários:
- O que é um dado de entrada válido típico?
- Quais são os valores-limite (mínimo, máximo, vazio, nulo)?
- Quais entradas devem ser rejeitadas pelo sistema?
- Há dependências entre dados (ordem de criação, estado prévio necessário)?

Use a estratégia de dados de teste registrada em `CONTEXT.md` como referência de convenção.
Descreva em linguagem natural — não gere fixtures com sintaxe específica de arquivo ou linguagem.

## Passo 3 — Executar os testes

1. Localize o campo `### Comando para executar os testes` em `CONTEXT.md`.
2. **Se o campo não estiver preenchido:** pare aqui e informe ao usuário: "O comando de teste não está configurado em `CONTEXT.md`. Por favor, informe o comando para que eu possa continuar."
3. Execute o comando de teste do projeto.
4. Aguarde a conclusão e colete o resultado.

## Passo 4 — Reportar resultado

Produza um relatório com:

- **Cenários gerados:** total e contagem por tipo (Unitário / Integração / Funcional)
- **Cobertura dos critérios de aceite:** quais itens do checklist do `spec-epic-<N>.md` estão cobertos por algum cenário
- **Resultado da execução:** total de testes executados, passaram, falharam, não executados
- **Falhas detalhadas (se houver):** uma entrada por falha com: qual teste falhou, mensagem de erro e rastreabilidade ao critério de aceite correspondente

## Gate de QA (obrigatório antes de acionar /sdd-revisar)

Ao final do relatório, sinalize explicitamente:

- Se todos os testes passaram:
  > ✅ **Gate liberado** — nenhum teste falhou. Pode acionar `/sdd-revisar`.

- Se há falhas:
  > 🔴 **Gate bloqueado** — [N] teste(s) falharam. Corrija os problemas apontados acima antes de acionar `/sdd-revisar`. Não avance sem validação humana explícita.

- Se o comando de teste não está configurado:
  > ⚠️ **Gate suspenso** — comando de teste ausente em `CONTEXT.md`. Informe o comando para que os testes possam ser executados.

Regras:
- fundamente todos os cenários em comportamentos rastreáveis à spec;
- não mencione linguagens, frameworks ou ferramentas específicas além do que estiver registrado em `CONTEXT.md`;
- escreva em português do Brasil;
- não avance para `/sdd-revisar` sem gate liberado ou aprovação humana explícita.
