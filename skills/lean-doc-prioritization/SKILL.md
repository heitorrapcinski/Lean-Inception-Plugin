# lean-doc-prioritization

## Objetivo

Responde à pergunta: **"Qual o esforço e o valor de cada feature — e qual é a classificação MoSCoW?"**

A matriz de priorização cruza valor de negócio com esforço técnico e aplica a classificação MoSCoW (Must have, Should have, Could have, Won't have). Em contexto brownfield, valor e esforço de features existentes frequentemente são inferíveis do código; features novas geralmente exigem estimativa humana via `/lean:backlog`.

---

## Template

```markdown
# Priorização de Features (MoSCoW)

| Feature | Valor (1–3) | Esforço (1–3) | Classificação MoSCoW | Justificativa | Fonte |
|---|---|---|---|---|---|
| [nome da feature] | [1=baixo, 2=médio, 3=alto] | [1=baixo, 2=médio, 3=alto] | Must \| Should \| Could \| Won't | [razão da classificação] | [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX] |
```

**Classificações MoSCoW:**
- **Must have** — obrigatório; sem ele o MVP não funciona
- **Should have** — importante, mas o MVP sobrevive sem ele inicialmente
- **Could have** — desejável, entra se houver capacidade
- **Won't have** — fora do escopo atual (registrado para não ser esquecido)

---

## Como preencher

### Regra de evidência (princípio 1)

- **Valor** — sustentado por evidência de negócio: normativo (obrigatoriedade legal = Must), documento corporativo (criticidade declarada), ou validação humana.
- **Esforço** — sustentado por evidência técnica: complexidade do código existente, integrações envolvidas, débito técnico identificado.
- **Classificação MoSCoW** — derivada da combinação de valor e esforço, com base nas regras da metodologia. Se não houver evidência suficiente para classificar, use `[⚠️ Pendente: BL-XXX]`.

Nunca atribua "Must have" sem evidência — é a classificação com maior impacto no escopo do MVP.

### Proteção de blocos validados por humano (princípio 5)

Classificações confirmadas via `/lean:backlog` não são alteradas por `/lean:discovery`. Contradições (ex.: normativo novo eleva prioridade de uma feature) geram item `conflito_pós_validação`.
