---
name: lean-doc-features
description: Gerencia o canvas docs/canvases/features.md com as funcionalidades do sistema rastreadas à jornada de origem. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-features

## Objetivo

Responde à pergunta: **"Quais funcionalidades o sistema oferece ou precisa oferecer — e de qual jornada cada uma se origina?"**

O canvas de features é a lista de capacidades do produto, organizadas por categoria funcional. Em contexto brownfield, features existentes são extraídas do código; features ausentes (que o sistema deveria ter, mas não tem) surgem de lacunas nas jornadas. A referência à jornada de origem é obrigatória — ela é o elo que justifica por que a feature existe.

---

## Template

```markdown
# Features

## [Categoria funcional — ex. Gestão de Crédito]

| Feature | Descrição | Jornada de origem | Fonte |
|---|---|---|---|
| [nome curto da feature] | [o que faz, em uma frase] | [nome da jornada em journeys.md] | [Fonte: EV-XXX] |
| [nome curto] | [descrição] | [⚠️ Pendente: BL-XXX] | [Fonte: EV-XXX] |
```

Repita a tabela para cada categoria funcional identificada. Features sem jornada de origem conhecida entram com `[⚠️ Pendente: BL-XXX]` na coluna `Jornada de origem`.

---

## Como preencher

### Regra de evidência (princípio 1)

- **Features existentes** (o sistema já implementa) — evidência em código (rotas, controllers, casos de uso, módulos). Cite o arquivo e a linha ou função principal em `evidence-log.md`.
- **Features ausentes** (o sistema deveria ter, segundo jornada ou normativo) — a ausência em si é a evidência de lacuna. Crie um item `lacuna` em `backlog.md` com o canvas afetado `features.md`.
- Nunca inclua uma feature por "parece óbvio que o sistema teria isso" — se não há evidência, não há feature confirmada.

### Rastreabilidade à jornada de origem (seção 7.8 da especificação)

A coluna `Jornada de origem` é **obrigatória**. Ela garante a cadeia de rastreabilidade ponta a ponta:

```
fonte → evidence-log → knowledge-base → persona → jornada → feature
```

- Se a jornada de origem da feature é clara → preencha com o nome exato da jornada em `journeys.md`.
- Se a jornada de origem não é identificável → use `[⚠️ Pendente: BL-XXX]` e registre a lacuna.

### Proteção de blocos validados por humano (princípio 5)

Features confirmadas via `/lean:backlog` não são removidas nem alteradas por `/lean:discovery`. Contradições geram item `conflito_pós_validação`.
