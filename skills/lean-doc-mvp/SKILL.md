---
name: lean-doc-mvp
description: Gerencia o canvas docs/canvases/mvp.md com o escopo mínimo viável derivado dos canvases anteriores. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-mvp

## Objetivo

Responde à pergunta: **"Qual é o menor conjunto de features que entrega valor real e validável para as personas prioritárias?"**

O MVP Canvas define o escopo mínimo viável do produto, cruzando personas com jornadas e features Must have. Em contexto brownfield, o MVP frequentemente representa o que já existe funcionando — e o exercício identifica o que está faltando para que ele entregue valor completo.

---

## Template

```markdown
# MVP Canvas

## Personas prioritárias
[Lista das personas para quem o MVP entrega valor direto] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]

## Jornadas cobertas
[Lista das jornadas completas que o MVP habilita] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]

## Features incluídas no MVP

| Feature | Classificação | Justificativa |
|---|---|---|
| [nome da feature] | Must have | [por que é obrigatória para este MVP] [Fonte: EV-XXX] |

## Features excluídas do MVP (Should/Could/Won't)

| Feature | Classificação | Quando entra |
|---|---|---|
| [nome da feature] | Should have | [próxima iteração / condição de entrada] |

## Proposta de valor do MVP
[Em uma frase: o MVP permite que [persona] faça [jornada] sem [principal obstáculo atual]] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]

## Critério de validação
[Como saberemos que o MVP entregou valor? Métrica ou resultado observável] [⚠️ Pendente: BL-XXX]
```

---

## Como preencher

### Regra de evidência (princípio 1)

- As **personas prioritárias** devem existir em `personas.md` com evidência rastreável.
- As **jornadas cobertas** devem existir em `journeys.md` com evidência rastreável.
- As **features incluídas** devem estar classificadas como `Must have` em `prioritization.md` com justificativa.
- A **proposta de valor** e o **critério de validação** frequentemente não têm evidência em código — use `[⚠️ Pendente: BL-XXX]` e resolva via `/lean:backlog`.

### Coerência com os canvases anteriores

O MVP Canvas não é preenchido de forma independente — ele é derivado de:
- `personas.md` → quem
- `journeys.md` → o que fazem
- `features.md` + `prioritization.md` → o que o sistema faz por elas
- `sequencer.md` → em que ordem

Se algum desses canvases tem campos pendentes críticos, o MVP Canvas reflete essa incerteza com `[⚠️ Pendente: BL-XXX]`.

### Proteção de blocos validados por humano (princípio 5)

Definições do MVP confirmadas via `/lean:backlog` não são alteradas por `/lean:discovery`. Contradições geram item `conflito_pós_validação`.
