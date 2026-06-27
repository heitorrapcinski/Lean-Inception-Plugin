---
name: lean-doc-roadmap
description: Gerencia o canvas docs/canvases/roadmap.md com o horizonte Now/Next/Later e checklist de adoção brownfield. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-roadmap

## Objetivo

Responde à pergunta: **"Qual é o horizonte de evolução do produto — o que fazemos agora, o que planejamos a seguir, e o que é hipótese futura?"**

O roadmap traduz o sequenciador e o MVP em um horizonte temporal dividido em três horizontes: **Agora** (este ciclo), **Próximo** (já planejado) e **Depois** (hipóteses a validar). Em contexto brownfield, inclui também uma seção de adoção do próprio levantamento — checklist para saber quando o discovery está maduro o suficiente para orientar decisões.

---

## Template

```markdown
# Roadmap do Produto

### 🟢 Agora (este ciclo)

| # | Item | Valor | Esforço | Depende de | Pronto quando |
|---|---|---|---|---|---|
| 1 | [feature ou iniciativa] | [alto \| médio \| baixo] | [alto \| médio \| baixo] | [feature ou pré-requisito] | [critério de conclusão] |

### 🟡 Próximo

| # | Item | Valor | Esforço | Depende de | Pronto quando |
|---|---|---|---|---|---|

### ⚪ Depois (hipóteses / a validar)

| # | Item | Hipótese a validar | Condição de entrada |
|---|---|---|---|
| 1 | [feature ou iniciativa] | [o que precisamos aprender antes de comprometer] | [o que precisa ser verdade para mover para Próximo] |

---

## Adoção do levantamento (apenas brownfield)

- [ ] Backlog crítico resolvido para os canvases de Visão e Personas
- [ ] Glossário revisado com o cliente (conflitos críticos fechados)
- [ ] Fontes normativas e corporativas centrais já registradas em `sources.json`
```

---

## Como preencher

### Regra de evidência (princípio 1)

- Itens em **Agora** devem estar ancorados em features de `features.md` classificadas como `Must have` em `prioritization.md`, posicionadas na Onda 1 do `sequencer.md`. Cite `[Fonte: EV-XXX]` ou referencie o canvas de origem.
- Itens em **Próximo** seguem o mesmo critério, para ondas subsequentes do sequenciador.
- Itens em **Depois** são hipóteses — o campo `Hipótese a validar` substitui a citação de evidência, registrando o que precisa ser aprendido. Não exigem evidência hoje, mas a ausência de evidência é explícita.
- Se a posição de um item no horizonte não está clara, use `[⚠️ Pendente: BL-XXX]` na coluna `Depende de` ou `Condição de entrada`.

### Nomenclatura Now/Next/Later (seção 7.9 da especificação)

O roadmap usa os três horizontes com emojis como marcadores visuais (🟢🟡⚪). Não use numeração de releases ou datas fixas — em consultoria brownfield, o horizonte temporal é frequentemente desconhecido no início do discovery.

### Seção de adoção (apenas brownfield)

A seção `Adoção do levantamento` é um checklist interno do consultor — não é entregável para o cliente. Indica quando o backlog de discovery está maduro o suficiente para que os canvases orientem decisões reais. Os três itens são fixos (conforme especificação seção 7.9); o consultor os marca conforme progride nas sessões.

### Proteção de blocos validados por humano (princípio 5)

Itens do roadmap confirmados via `/lean:backlog` não são alterados por `/lean:discovery`. Contradições (ex.: normativo novo muda prioridade) geram item `conflito_pós_validação`.
