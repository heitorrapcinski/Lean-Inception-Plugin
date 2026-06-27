# lean-doc-journeys

## Objetivo

Responde à pergunta: **"Como cada persona percorre o sistema para atingir seu objetivo — quais são as etapas, dores e pontos de atrito?"**

As jornadas são a ponte entre personas e features: cada funcionalidade listada em `features.md` deve ser rastreável a uma etapa de jornada, que por sua vez é rastreável a uma persona. Sem essa cadeia, features "surgem do nada" sem justificativa de valor.

---

## Template

```markdown
# Jornadas de Usuário

## Jornada: [nome descritivo — ex. "Solicitação de crédito pessoa física"]

- **Persona:** [nome da persona] [Fonte: EV-XXX] · **Objetivo:** [o que a persona quer alcançar]
- **Etapas:**
  1. [etapa 1] [Fonte: EV-XXX]
  2. [etapa 2] [Fonte: EV-XXX]
  3. [...]
- **Dores / atritos:** [o que falha, demora ou frustra em cada etapa] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]
- **Sistemas / integrações envolvidos:** [sistemas externos ou internos tocados na jornada] [Fonte: EV-XXX] | [⚠️ Pendente: BL-XXX]
```

Repita o bloco `## Jornada` para cada fluxo principal identificado.

---

## Como preencher

### Regra de evidência (princípio 1)

- As **etapas** devem ser inferíveis de fluxos de código (sequência de chamadas, estados de um workflow, máquinas de estado) ou declaradas em documentos de processo. Cite `[Fonte: EV-XXX]` em cada etapa com base rastreável.
- **Dores e atritos** raramente estão em código — geralmente vêm de documentos ou de validação humana. Se não houver evidência, use `[⚠️ Pendente: BL-XXX]`.
- A **persona** referenciada deve existir em `personas.md` com seu próprio ID de evidência.

### Rastreabilidade ponta a ponta

Cada jornada é referenciada em `features.md` pela coluna `Jornada de origem`. Isso garante a cadeia completa:

```
fonte → evidence-log → knowledge-base → persona → jornada → feature → canvas
```

Se uma feature não consegue ser vinculada a nenhuma jornada, registre essa lacuna em `backlog.md`.

### Proteção de blocos validados por humano (princípio 5)

Jornadas confirmadas via `/lean:backlog` não são removidas nem alteradas por `/lean:discovery`. Contradições geram item `conflito_pós_validação`.
