---
name: lean-doc-evidence-log
description: Gerencia o documento docs/evidence-log.md com o registro imutável de evidências rastreáveis. Invocado internamente pelo lean-discovery e lean-backlog para criar entradas EV-XXX.
---

# lean-doc-evidence-log

## Objetivo

Responde à pergunta: **"De onde vêm os fatos registrados no projeto?"**

O log de evidências é a âncora de rastreabilidade de todo o plugin. Cada afirmação em `knowledge-base.md`, cada campo preenchido nos canvases, e cada termo definido no glossário precisa de uma entrada aqui. É o único lugar onde a localização exata da fonte (arquivo, seção, linha) é registrada.

---

## Template

```markdown
# Log de Evidências

| ID | Afirmação (resumo) | Fonte | Localização | Tipo de fonte | Sessão | Data |
|---|---|---|---|---|---|---|
| EV-001 | [resumo em até 15 palavras] | [nome do arquivo ou documento] | [seção, página, linha ou intervalo] | [tipo] | [número] | [AAAA-MM-DD] |
```

**Tipos de fonte válidos:** `Normativo`, `Corporativo`, `Código`, `Informal`, `Validação Humana`

---

## Como preencher

### Regra de evidência (princípio 1)

Cada entrada no log representa **uma** afirmação rastreável. Para criar uma entrada:

1. Atribua o próximo ID sequencial (`EV-001`, `EV-002`, …). IDs nunca são reutilizados ou removidos.
2. Escreva o resumo da afirmação em até 15 palavras — suficiente para identificá-la, sem reproduzir a fonte.
3. Preencha `Fonte` com o nome do arquivo, documento ou PDF.
4. Preencha `Localização` com a referência precisa: número de linha (`L142-160`), seção (`Seção 4.2`), página (`p. 23`), ou trecho identificável.
5. Classifique o `Tipo de fonte` conforme a tabela de hierarquia abaixo.

Se não for possível apontar uma localização precisa, a afirmação **não tem evidência suficiente** — crie um item de backlog em vez de uma entrada de evidência.

### Hierarquia de tipos de fonte (princípio 2)

| Tipo | Exemplos |
|---|---|
| `Normativo` | Leis, regulamentos, portarias, normas técnicas (ISO, ABNT) |
| `Corporativo` | Políticas internas, manuais oficiais, atas de decisão |
| `Código` | Arquivos de código-fonte, migrations, contratos de API |
| `Informal` | READMEs, wikis internas, comentários de código, e-mails |
| `Validação Humana` | Resposta do consultor via `/lean:backlog`, com data |

### Evidências do tipo `Validação Humana` (princípio 3)

Quando o consultor responde um item de backlog via `/lean:backlog`:

- Crie uma nova entrada com tipo `Validação Humana`.
- No campo `Fonte`, escreva: `validação consultor — [AAAA-MM-DD]`.
- No campo `Localização`, escreva o ID do item de backlog resolvido: `BL-XXX`.
- Essa evidência tem precedência sobre todas as outras — mesmo sobre normativo — para o fato específico que ela resolve.

### Apêndice, nunca sobrescrita (princípio 6)

Nunca remova ou edite entradas existentes. O log é um registro histórico imutável. Corrija um fato criando uma nova entrada e referenciando a anterior na coluna `Afirmação (resumo)` (ex.: "Correção de EV-003: …").
