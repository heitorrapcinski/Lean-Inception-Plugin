---
name: lean-doc-stakeholders
description: Gerencia o canvas docs/canvases/stakeholders.md com o mapa de interesse e influência. Invocado internamente pelo lean-discovery e lean-backlog.
---

# lean-doc-stakeholders

## Objetivo

Responde à pergunta: **"Quem tem interesse ou influência sobre o produto — e como engajá-los?"**

O mapa de stakeholders não é uma lista de nomes: é um instrumento de gestão de engajamento. Em contexto brownfield, stakeholders frequentemente aparecem implicitamente no código (integrações, permissões, notificações) e em documentos normativos (responsáveis, aprovadores, reguladores).

---

## Template

```markdown
# Stakeholders

| Stakeholder | Papel | Interesse | Influência | Como engajar |
|---|---|---|---|---|
| [nome/área] [Fonte: EV-XXX] | [papel no sistema/organização] [Fonte: EV-XXX] | [o que ganha ou perde com o produto] | alta \| média \| baixa | [canal ou abordagem recomendada] |
```

Para cada stakeholder com dados incompletos, use `[⚠️ Pendente: BL-XXX]` no campo faltante.

---

## Como preencher

### Regra de evidência (princípio 1)

Cada linha da tabela representa um stakeholder identificado em uma fonte rastreável. Para incluir um stakeholder:

- O nome/área deve ter evidência: aparece em código (ex.: destinatário de e-mail, grupo de permissão), em documento (ex.: responsável listado em normativo), ou em entrevista capturada via `/lean:backlog`.
- Cite `[Fonte: EV-XXX]` na coluna `Stakeholder` e em qualquer outro campo sustentado por evidência distinta.
- Campos sem evidência ficam como `[⚠️ Pendente: BL-XXX]`.

Não inclua stakeholders "óbvios" sem evidência — "usuário final" sem nenhuma referência rastreável é uma lacuna, não um fato.

### Nível de influência

O campo `Influência` (`alta | média | baixa`) deve ter base em evidência — ex.: um grupo de aprovação normativo tem influência alta; um destinatário de relatório periférico tem baixa. Se não houver evidência para classificar, use `[⚠️ Pendente: BL-XXX]`.

### Proteção de blocos validados por humano (princípio 5)

Linhas confirmadas via `/lean:backlog` não são removidas nem alteradas por `/lean:discovery`. Se uma nova fonte traz informação incompatível, crie item `conflito_pós_validação` em `backlog.md`.
