---
name: lean-doc-sequencer
description: Gerencia o canvas docs/canvases/sequencer.md com a ordem de entrega das features por ondas. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-sequencer

## Objetivo

Responde à pergunta: **"Em que ordem as features devem ser desenvolvidas, considerando valor e dependências técnicas?"**

O sequenciador organiza as features em ondas de entrega (iterações), respeitando dependências e maximizando o valor entregue cedo. Em contexto brownfield, ele também captura a ordem real de implementação existente — útil para entender decisões passadas e planejar incrementos futuros.

---

## Template

```markdown
# Sequenciador de Features

## Onda 1

| # | Feature | Regra aplicada | Observação |
|---|---|---|---|
| 1 | [nome da feature] | [regra que justifica a posição: ex. "habilita 3+ features"] | [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX] |

## Onda 2

| # | Feature | Regra aplicada | Observação |
|---|---|---|---|

## Onda N

| # | Feature | Regra aplicada | Observação |
|---|---|---|---|

---

## Regras do sequenciador (metodologia Lean Inception)

- Uma onda pode conter no máximo **3 cartões** (features).
- Uma onda **não pode** ter mais de uma feature vermelha (alto risco/esforço).
- Uma onda **não pode** iniciar com uma feature apenas vermelha ou apenas amarela.
- Uma feature só entra numa onda se suas dependências estiverem em ondas anteriores.
```

---

## Como preencher

### Regra de evidência (princípio 1)

- A posição de uma feature numa onda deve ser justificada por uma das regras do sequenciador (acima) ou por uma decisão explícita do consultor via `/lean:backlog`.
- Se a evidência para posicionar uma feature é insuficiente (dependências desconhecidas, esforço não estimado), use `[⚠️ Pendente: BL-XXX]` na coluna `Observação`.
- Nunca posicione features em ondas por intuição sem registro.

### Dependências e features ausentes

Se uma feature depende de outra que ainda não está confirmada em `features.md`, registre a dependência como lacuna em `backlog.md` antes de sequenciar.

### Proteção de blocos validados por humano (princípio 5)

Sequências confirmadas via `/lean:backlog` não são alteradas por `/lean:discovery`. Se uma nova fonte (ex.: normativo) implica reordenação, crie item `conflito_pós_validação`.
