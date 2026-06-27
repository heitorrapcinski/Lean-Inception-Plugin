# lean-doc-personas

## Objetivo

Responde à pergunta: **"Quem usa o produto no dia a dia — quais são seus objetivos, frustrações e comportamentos?"**

Personas em contexto brownfield são construídas a partir de evidências concretas: grupos de permissão no código, perfis de acesso em documentos de segurança, logs de uso, fluxos de aprovação. Evitar personas genéricas ("o usuário quer eficiência") e exigir ancoragem em evidência é o diferencial deste canvas.

---

## Template

```markdown
# Personas

## Persona: [Nome fictício — ex. "Ana, Analista de Crédito"]

- **Perfil:** [cargo, área, contexto organizacional] [Fonte: EV-XXX]
- **Objetivo principal:** [o que essa persona precisa alcançar usando o sistema] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]
- **Frustrações / dores:** [o que a impede ou atrapalha hoje] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]
- **Comportamentos relevantes:** [como interage com o sistema — frequência, canal, padrão] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]
- **Citação representativa:** [⚠️ Pendente: BL-XXX] | "[frase que captura a perspectiva desta persona]"
```

Repita o bloco `## Persona` para cada perfil distinto identificado.

---

## Como preencher

### Regra de evidência (princípio 1)

Cada persona deve ser sustentada por pelo menos uma evidência rastreável:

- **Perfil** — grupo de permissão no código, papel em normativo, cargo em documento corporativo.
- **Objetivo principal** — inferível de fluxos do código (ex.: o que o perfil pode aprovar/rejeitar), ou declarado em documento de requisitos.
- **Frustrações / dores** — raramente explícitas em código; geralmente vêm de documentos ou de validação humana via `/lean:backlog`.
- **Comportamentos relevantes** — logs, frequência de acesso, integrações consumidas pelo perfil.
- **Citação representativa** — quase sempre `[⚠️ Pendente: BL-XXX]` até entrevista com o cliente.

Se nenhuma evidência justifica a existência de um perfil, não crie a persona — crie um item `lacuna` em `backlog.md`.

### Proteção de blocos validados por humano (princípio 5)

Personas confirmadas via `/lean:backlog` não são removidas nem alteradas por `/lean:discovery`. Contradições de novas fontes geram item `conflito_pós_validação`.
