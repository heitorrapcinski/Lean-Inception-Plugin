# lean-doc-glossary

## Objetivo

Responde à pergunta: **"O que cada termo central do domínio significa, segundo cada fonte — e onde há conflito?"**

O glossário estabelece a linguagem ubíqua do projeto. Ele não apenas define termos: expõe divergências entre fontes para que o consultor e o cliente tomem decisões conscientes. Um conflito registrado aqui é melhor do que uma definição falsa aceita tacitamente.

---

## Template

```markdown
# Glossário — Linguagem Ubíqua

## Termo: "[nome do termo]"

- **Definição priorizada ([tipo de fonte]):** [definição] → EV-XXX
- **NÃO confundir com:** [⚠️ Pendente: BL-XXX] | [termo parecido e por quê são diferentes]
- **Contexto (bounded context):** [⚠️ Pendente: BL-XXX] | [ex.: Crédito, Atendimento]
- **Conflitos detectados:**
  - [Tipo de fonte] (EV-XXX): [descrição do conflito] ⚠️
- **Status:** conflito aberto | resolvido por humano | sem conflito
- **Resolução humana:** [se houver] → fonte: "validação consultor — AAAA-MM-DD" (EV-XXX)
```

Se não houver conflitos, omita a seção `Conflitos detectados`. Se não houver resolução humana, omita `Resolução humana`.

---

## Como preencher

### Regra de evidência (princípio 1)

Cada campo do bloco de um termo segue a mesma regra:

- Se existe evidência rastreável para o campo → preencha e cite o `EV-XXX` correspondente.
- Se não existe evidência → use `[⚠️ Pendente: BL-XXX]` e crie o item de backlog.

Os campos `NÃO confundir com` e `Contexto (bounded context)` **não são opcionais por padrão** — são pendentes até que haja evidência ou resolução humana.

### Hierarquia de fontes para a definição priorizada (princípio 2)

A `Definição priorizada` usa **sempre** a fonte de maior hierarquia que descreve o termo:

| Prioridade | Tipo de fonte |
|---|---|
| 1 (maior) | Normativo / regulatório |
| 2 | Documentação corporativa oficial |
| 3 | Código-fonte |
| 4 | Documentação técnica informal |

- O tipo da fonte vencedora aparece entre parênteses: `Definição priorizada (normativo):`.
- Todas as outras definições encontradas entram em `Conflitos detectados`, com seus tipos e IDs de evidência.
- Mesmo que uma fonte de menor hierarquia pareça "mais correta" na prática, registre o conflito e deixe a decisão para o consultor via `/lean:backlog`.

### Conflitos de glossário como itens de backlog (princípio 1 + 2)

Sempre que dois ou mais IDs de evidência descrevem o mesmo termo de formas incompatíveis:

1. Crie um item `conflito_definição` em `backlog.md` com `Canvas afetado: glossary.md`.
2. No campo `Status` do termo, marque `conflito aberto`.
3. Quando o consultor resolver via `/lean:backlog`, preencha `Resolução humana` e marque `resolvido por humano`.

### Proteção de blocos validados por humano (princípio 5)

Se o campo `Resolução humana` de um termo estiver preenchido, `/lean:discovery` **nunca** substitui a definição priorizada nem o status. Se uma nova fonte contradiz a resolução, crie um item `conflito_pós_validação` em `backlog.md`.
