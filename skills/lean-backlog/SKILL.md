---
name: lean-backlog
description: Resolve pendências do backlog de Lean Inception via formulário com o consultor. Use quando o usuário disser "resolver backlog", "tratar pendências", "responder itens", "fechar BL-" ou invocar /lean:backlog.
---

# lean-backlog

## Objetivo

Orquestrador de resolução de pendências. Apresenta itens do backlog ao consultor em formulário de perguntas estruturadas, captura as respostas como evidência do tipo `Validação Humana`, e atualiza os canvases e glossário afetados.

**Invocação:**
```
/lean:backlog                    # lista todas as pendências abertas
/lean:backlog BL-003             # trata apenas o item BL-003
/lean:backlog BL-003 BL-007      # trata BL-003 e BL-007 nesta sessão
```

---

## Fluxo de execução

### Passo 1 — Ler e filtrar o backlog

Leia `docs/backlog.md` e filtre os itens conforme a invocação:

- **Com IDs explícitos** (`/lean:backlog BL-003 BL-007`) → processe apenas esses IDs. Se um ID não existir ou já estiver `resolvido`, informe o consultor e pule.
- **Sem argumentos** → liste todos os itens com `Status: aberto` e pergunte ao consultor quais deseja tratar nesta sessão. Apresente a lista completa antes de iniciar qualquer formulário.

Se não houver itens abertos, informe o consultor e encerre.

---

### Passo 2 — Apresentar lista de pendências (apenas quando sem argumentos)

Quando invocado sem IDs, exiba antes de qualquer pergunta:

```
## Backlog aberto — [N] itens

| ID | Tipo | Lacuna/Conflito | Canvas afetado |
|---|---|---|---|
| BL-001 | lacuna | Permissões da persona "admin"? | personas.md |
| BL-002 | conflito_definição | "Aprovação": normativo 2 alçadas vs. código 1 | glossary.md |
...

Quais itens deseja tratar nesta sessão? (informe os IDs separados por espaço, ou "todos")
```

Aguarde a resposta do consultor antes de prosseguir.

---

### Passo 3 — Conduzir formulário de perguntas por item

Para cada item selecionado, conduza o formulário abaixo. Trate um item por vez — não exiba todos os formulários de uma vez.

#### Para itens do tipo `lacuna`:

```
## Item BL-XXX — Lacuna

**Contexto:** [descrição da lacuna + canvas afetado]
**Pergunta:** [reformule a lacuna como uma pergunta direta e específica]

Sua resposta:
```

Após a resposta:
- Se a resposta for suficiente para preencher o campo → prossiga para o Passo 4.
- Se a resposta for parcial ou gerar nova dúvida → faça uma pergunta de aprofundamento antes de fechar.
- Se o consultor disser "não sei" ou "a definir" → registre isso como resposta (não forçe uma decisão), marque o item como `adiado` em vez de `resolvido`, e não atualize o canvas.

#### Para itens do tipo `conflito_definição`:

```
## Item BL-XXX — Conflito de definição

**Contexto:** [termo ou fato em conflito + fontes que divergem]
**Conflito:**
  - [Fonte A, hierarquia N]: [o que diz]
  - [Fonte B, hierarquia M]: [o que diz]

**Hierarquia recomendaria:** [fonte de maior prioridade], mas sua opinião pode sobrepor.

Qual definição adotar para este projeto? (pode explicar o raciocínio)
```

#### Para itens do tipo `conflito_pós_validação`:

```
## Item BL-XXX — Conflito com validação anterior

**Contexto:** este campo foi validado por você em [data] como:
  "[conteúdo validado anteriormente]" (EV-XXX)

**Nova evidência encontrada:** [descrição da contradição] (EV-YYY, [fonte])

Deseja manter a validação anterior, ou atualizar com a nova evidência?
  (a) Manter validação anterior
  (b) Atualizar com nova evidência: [descreva a nova definição]
  (c) Registrar ambas e deixar em aberto
```

---

### Passo 4 — Registrar a resposta como evidência

Para cada item resolvido, invoque `lean-doc-evidence-log` para criar uma nova entrada:

```
| EV-XXX | [resumo da decisão do consultor] | validação consultor — AAAA-MM-DD | BL-XXX | Validação Humana | [sessão atual] | [data] |
```

> **Princípio 3 — validação humana é a evidência mais forte.** Esta entrada tem precedência sobre todas as outras fontes para o fato específico que resolve — inclusive sobre normativos.

---

### Passo 5 — Atualizar os documentos afetados

Com o `EV-XXX` de validação humana em mãos, invoque os skills dos documentos afetados (conforme coluna `Canvas afetado` em `backlog.md`):

| Canvas afetado | Skill invocado | O que atualizar |
|---|---|---|
| `vision.md` | `lean-doc-vision` | Substituir `[⚠️ Pendente: BL-XXX]` pelo valor validado + `[Fonte: EV-XXX]` |
| `stakeholders.md` | `lean-doc-stakeholders` | Idem |
| `personas.md` | `lean-doc-personas` | Idem |
| `journeys.md` | `lean-doc-journeys` | Idem |
| `features.md` | `lean-doc-features` | Idem |
| `sequencer.md` | `lean-doc-sequencer` | Idem |
| `prioritization.md` | `lean-doc-prioritization` | Idem |
| `mvp.md` | `lean-doc-mvp` | Idem |
| `roadmap.md` | `lean-doc-roadmap` | Idem |
| `glossary.md` | `lean-doc-glossary` | Preencher `Resolução humana`, atualizar `Status` para `resolvido por humano` |
| `knowledge-base.md` | `lean-doc-knowledge-base` | Atualizar `Status` da afirmação afetada para `confirmado` |

Se o item afeta múltiplos canvases, atualize todos.

---

### Passo 6 — Fechar o item no backlog

Invoque `lean-doc-backlog` para atualizar a linha do item em `docs/backlog.md`:

```
| BL-XXX | [tipo] | [lacuna/conflito original] | [canvas] | resolvido | [resumo da resposta] | validação consultor — AAAA-MM-DD | AAAA-MM-DD |
```

Se o item foi `adiado` (consultor respondeu "não sei"), mantenha `Status: aberto` e adicione uma nota na coluna `Resposta`: `Adiado em AAAA-MM-DD — [motivo]`.

---

### Passo 7 — Atualizar `state.json`

Ao final da sessão (após processar todos os itens selecionados), atualize `.lean-inception-plugin/state.json`:

```json
{
  "sessao_atual": [incrementar em 1],
  "ultima_atualizacao": "[data de hoje]",
  "backlog_criticos_abertos": [nova contagem de itens abertos],
  "historico": [
    // ... entradas anteriores preservadas ...
    {
      "sessao": [número da sessão],
      "data": "[data de hoje]",
      "comando": "/lean:backlog",
      "foco": "[IDs tratados, separados por vírgula, ou 'todos']",
      "resultado": "[N pendências resolvidas (IDs), M adiadas, K canvases atualizados]"
    }
  ]
}
```

---

### Passo 8 — Exibir resumo final

```
## Resumo da sessão de backlog

**Itens tratados:** [N]
**Resolvidos:** [N] (IDs: BL-XXX, BL-YYY)
**Adiados:** [N] (IDs: BL-ZZZ) — aguardam mais informação
**Evidências criadas:** EV-XXX a EV-YYY
**Canvases atualizados:** [lista de arquivos modificados]
**Backlog ainda aberto:** [N] itens
```

---

## Restrições

- **Nunca** resolve um item sem resposta explícita do consultor — não infira, não assuma.
- **Nunca** sobrescreve um bloco validado por humano sem passar pelo formulário de `conflito_pós_validação`.
- **Nunca** altera `evidence-log.md` de forma retroativa — apenas adiciona entradas novas.
- **Nunca** remove itens de `backlog.md` — apenas altera o `Status` para `resolvido` ou registra `adiado`.
- Se o consultor responder parcialmente e sair da sessão, salve o progresso parcial antes de encerrar: itens já resolvidos são gravados; itens não iniciados permanecem `aberto`.
