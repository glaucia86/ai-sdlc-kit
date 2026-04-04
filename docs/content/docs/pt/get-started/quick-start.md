---
title: Quick Start
description: Execute sua primeira descoberta com o AI SDLC Kit em menos de 5 minutos.
---

Este guia apresenta o primeiro passo do Flow A — pegar uma ideia bruta e transformá-la em um documento estruturado usando o agente 🧭 Discovery.

## Passo 1 — Crie o arquivo de ideia

Dentro da pasta `doc-specs/`, crie um arquivo chamado `idea.txt`:

```
doc-specs/idea.txt
```

Escreva sua ideia livremente — sem formato obrigatório, sem estrutura. O kit existe para organizar isso por você. Por exemplo:

```
Quero criar um app de gerenciamento de tarefas onde desenvolvedores
possam acompanhar seus itens de trabalho diários. Deve ser simples,
orientado a teclado e integrado ao GitHub Issues para que as tarefas
possam ser vinculadas a issues reais.

Deve funcionar como um aplicativo web e, opcionalmente, sincronizar offline.
```

---

## Passo 2 — Execute `/discovery-refine`

Abra o painel do GitHub Copilot Chat e execute:

```
/discovery-refine
```

O agente 🧭 Discovery lê `idea.txt` e gera `doc-specs/idea.md`.

**O que acontece:**
- O agente preserva sua ideia original fielmente — não adiciona funcionalidades nem decisões técnicas
- Ele estrutura a ideia em seções: enunciado do problema, usuários-alvo, cenários principais, ambiguidades explícitas
- Se algo não estiver claro, o agente registra perguntas em aberto em vez de assumir

---

## Passo 3 — Revise `idea.md` (HITL checkpoint)

Abra `doc-specs/idea.md` e revise:

- A ideia original foi preservada com precisão?
- As ambiguidades estão claramente sinalizadas?
- O agente inventou algo que não estava em `idea.txt`?

Se algo estiver errado, ajuste `idea.txt` e execute `/discovery-refine` novamente. **Não avance até que esteja correto.**

---

## O que esperar como saída

`doc-specs/idea.md` conterá uma versão estruturada da sua ideia, normalmente organizada assim:

| Seção | Conteúdo |
|---|---|
| **Problema** | Qual problema a ideia resolve |
| **Usuários-alvo** | Quem se beneficia da solução |
| **Cenários principais** | As jornadas de usuário mais importantes |
| **Fora do escopo** | O que não está incluído explicitamente |
| **Perguntas em aberto** | Ambiguidades que precisam ser resolvidas antes de avançar |

---

## Próximos passos

Após validar `idea.md`, continue com a fase de Discovery completa:

1. `/discovery-spec` — agente PM gera `non-technical-spec.md`
2. `/discovery-prd` — agente Tech Lead gera `PRD.md`
3. `/discovery-tech-spec` — agente Architect gera `technical-spec.md`
4. `/discovery-epics` — agente Architect gera `epics.md`

Consulte o [guia da fase de Discovery](/ai-sdlc-kit/pt/guide/discovery-phase/) para o passo a passo completo.
