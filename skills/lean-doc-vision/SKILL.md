---
name: lean-doc-vision
description: Gerencia o canvas docs/canvases/vision.md com a visão do produto. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-vision

## Objetivo

Responde à pergunta: **"Por que este produto existe — qual problema resolve, para quem, e o que o diferencia?"**

O canvas de visão é o primeiro a ser preenchido e o mais dependente de evidência sólida: um problema mal descrito contamina todos os canvases subsequentes. Em contexto brownfield, a visão frequentemente precisa ser reconstruída a partir do código e de documentos existentes, não de uma declaração de propósito explícita.

---

## Template

```markdown
# Visão do Produto

## Para
[Descrição do público-alvo principal] [Fonte: EV-XXX]

## Que
[Necessidade ou problema central que o produto atende] [Fonte: EV-XXX]

## O [nome do produto]
[Nome oficial do produto ou sistema] [Fonte: EV-XXX]

## É um(a)
[Categoria do produto: sistema, plataforma, serviço, aplicativo…] [Fonte: EV-XXX]

## Que
[Principal benefício ou capacidade entregue] [Fonte: EV-XXX]

## Diferente de
[Principal alternativa ou concorrente] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]

## Nosso produto
[Principal diferencial competitivo ou razão de existir] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]

---

## Problema
[Descrição expandida do problema] [Fonte: EV-XXX, EV-YYY]

## Lacunas identificadas
[⚠️ Pendente: BL-XXX] — [descrição do que está faltando para completar este campo]
```

---

## Como preencher

### Regra de evidência (princípio 1)

Cada campo do canvas de visão deve ser sustentado por pelo menos uma evidência em `evidence-log.md`:

- Se existe evidência → preencha o campo e cite `[Fonte: EV-XXX]` ao final.
- Se não existe evidência → deixe o campo como `[⚠️ Pendente: BL-XXX]` e crie o item de backlog correspondente.

Nunca infira silenciosamente o problema, o público-alvo ou o diferencial. Em sistemas brownfield, é comum que nenhuma fonte declare explicitamente a visão do produto — nesse caso, **todos** os campos ficam como pendentes até validação humana.

### Proteção de blocos validados por humano (princípio 5)

Se um campo foi preenchido via `/lean:backlog` (evidência tipo `Validação Humana`), `/lean:discovery` não o substitui em execuções futuras. Contradições de novas fontes geram item `conflito_pós_validação` em `backlog.md`.

### Citação de múltiplas fontes

Um campo pode ser sustentado por mais de uma evidência: `[Fonte: EV-014, EV-022]`. Use múltiplas citações quando fontes diferentes corroboram o mesmo fato — isso aumenta a confiança na afirmação.
