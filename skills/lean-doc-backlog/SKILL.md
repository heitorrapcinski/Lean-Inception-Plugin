---
name: lean-doc-backlog
description: Gerencia o documento docs/backlog.md com lacunas e conflitos pendentes de validação humana. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-backlog

## Objetivo

Responde à pergunta: **"O que ainda não sabemos, ou onde há conflito não resolvido, que impede o preenchimento correto dos canvases?"**

O backlog de pendências é o mecanismo de transparência do loop humano. Cada item representa uma decisão que o plugin não pode tomar sozinho — seja por falta de evidência, seja por conflito entre fontes. Nenhum item é resolvido automaticamente: toda resolução passa pelo consultor via `/lean:backlog`.

---

## Template

```markdown
# Backlog de Pendências

| ID | Tipo | Lacuna/Conflito | Canvas afetado | Status | Resposta | Fonte resposta | Data |
|---|---|---|---|---|---|---|---|
| BL-001 | lacuna | [descrição da informação que falta] | [arquivo do canvas ou glossary.md] | aberto | — | — | — |
| BL-002 | conflito_definição | [termo]: [fonte A diz X] vs. [fonte B diz Y] | [canvas ou glossary.md] | aberto | — | — | — |
| BL-003 | conflito_pós_validação | [nova fonte contradiz validação humana de EV-XXX] | [canvas] | aberto | — | — | — |
```

**Tipos válidos:** `lacuna`, `conflito_definição`, `conflito_pós_validação`

---

## Como preencher

### Criação de itens (princípio 1)

Um novo item de backlog é criado quando:

- **`lacuna`** — uma informação necessária para um campo de canvas não tem evidência em nenhuma fonte escaneada.
- **`conflito_definição`** — duas ou mais fontes descrevem o mesmo fato ou termo de formas incompatíveis e a hierarquia de fontes não é suficiente para resolver (ex.: normativo diz X, código implementa Y — qual é o comportamento correto do sistema?).
- **`conflito_pós_validação`** — uma nova fonte contradiz um bloco de canvas já validado por humano (princípio 5). Esse tipo nunca resulta em sobrescrita automática.

### Atribuição de IDs

IDs são sequenciais (`BL-001`, `BL-002`, …) e nunca são reutilizados. Atribua o próximo ID disponível ao criar o item.

### Resolução de itens

Somente o comando `/lean:backlog` resolve itens. Quando um item é resolvido:

1. Preencha `Resposta` com o resumo da decisão do consultor.
2. Preencha `Fonte resposta` com `validação consultor — AAAA-MM-DD`.
3. Preencha `Data` com a data da sessão.
4. Altere `Status` de `aberto` para `resolvido`.
5. Crie a entrada correspondente em `evidence-log.md` (tipo `Validação Humana`).
6. Atualize o campo pendente (`[⚠️ Pendente: BL-XXX]`) no canvas ou glossário afetado.

### Sem prioridade automática (princípio 6 / seção 6 da especificação)

O backlog **não** tem campo de prioridade. A seleção de quais itens tratar em cada sessão é sempre manual, via `/lean:backlog BL-XXX BL-YYY`. O consultor decide a ordem com base no contexto do projeto.
