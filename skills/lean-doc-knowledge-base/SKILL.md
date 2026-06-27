# lean-doc-knowledge-base

## Objetivo

Responde à pergunta: **"O que sabemos, com evidência, sobre cada domínio do sistema?"**

A base de conhecimento é o repositório central de fatos extraídos das fontes escaneadas. Ela alimenta todos os canvases — nenhum campo de canvas é preenchido sem que o fato correspondente esteja aqui, com um ID de evidência (`EV-XXX`) vinculado ao `evidence-log.md`.

---

## Template

```markdown
# Base de Conhecimento — [Nome do Domínio]

## [Subdomínio: ex. Aprovação de Crédito]

- **Afirmação:** [texto em paráfrase — nunca cópia literal da fonte]
  - Status: confirmado | inferido | conflitante
  - Evidência: → ver evidence-log.md#EV-XXX
  - Sessão: [número da sessão em que foi extraído]
```

Repita o bloco `## Subdomínio` para cada área temática identificada. Repita o bloco de afirmação para cada fato distinto dentro do subdomínio.

---

## Como preencher

### Regra de evidência (princípio 1)

Antes de registrar qualquer afirmação:

1. Existe uma fonte rastreável (código, documento, normativo) que sustenta esse fato?
   - **Sim** → registre a afirmação, crie a entrada correspondente em `evidence-log.md`, cite o ID gerado (`EV-XXX`) neste arquivo.
   - **Não** → **não registre a afirmação.** Crie um item `lacuna` em `backlog.md` e deixe o campo do canvas afetado como `[⚠️ Pendente: BL-XXX]`.

2. O texto deve ser **paráfrase**, nunca cópia literal — protege documentos normativos/corporativos sujeitos a direitos autorais e força a síntese do conhecimento.

3. O campo `Status` reflete o estado da evidência:
   - `confirmado` — fonte única e clara, sem contradição
   - `inferido` — extraído por interpretação de comportamento do código, não declarado explicitamente
   - `conflitante` — duas ou mais fontes descrevem o mesmo fato de forma incompatível

### Hierarquia de fontes para conflitos (princípio 2)

Quando duas fontes descrevem o mesmo fato de forma incompatível:

| Prioridade | Tipo de fonte |
|---|---|
| 1 (maior) | Normativo / regulatório |
| 2 | Documentação corporativa oficial |
| 3 | Código-fonte |
| 4 | Documentação técnica informal |

- Registre o fato da fonte de maior prioridade como definição primária.
- Registre todas as versões conflitantes na mesma entrada, com seus IDs de evidência.
- Marque o status como `conflitante`.
- Crie um item `conflito_definição` em `backlog.md` para resolução humana.

### Proteção de blocos validados por humano (princípio 5)

Se uma afirmação tiver sido confirmada via `/lean:backlog` (evidência do tipo `Validação Humana` no `evidence-log.md`), `/lean:discovery` **nunca** a substitui em execuções futuras. Se uma nova fonte contradiz o fato validado, crie um item `conflito_pós_validação` em `backlog.md` em vez de sobrescrever.

### Apêndice, nunca sobrescrita (princípio 6)

Ao reprocessar uma fonte, adicione novas afirmações abaixo das existentes. Nunca remova entradas de sessões anteriores.
