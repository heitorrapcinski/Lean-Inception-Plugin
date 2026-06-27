# lean-discovery

## Objetivo

Orquestrador principal do plugin. Escaneia as fontes indicadas pelo consultor, extrai conhecimento auditável, popula/atualiza todos os documentos em `docs/`, e registra como backlog tudo que não encontrar evidência.

**Invocação:** `/lean:discovery [fonte1] [fonte2] ...`

Exemplos:
```
/lean:discovery src/credito/ docs/normativo_v3.pdf
/lean:discovery README.md src/auth/
```

---

## Fluxo de execução

### Passo 1 — Registrar as fontes em `sources.json`

Antes de qualquer leitura, registre cada fonte passada como argumento em `.lean-inception-plugin/sources.json`.

Para cada fonte:
1. Atribua o próximo ID sequencial (`SRC-001`, `SRC-002`, …).
2. Determine o tipo com base na extensão e contexto:
   - `.pdf` com nome que sugere normativo/regulamento → `Normativo`
   - `.pdf` ou `.docx` com nome que sugere política/manual corporativo → `Corporativo`
   - Arquivos de código-fonte (`.py`, `.js`, `.ts`, `.java`, `.go`, `.rb`, etc.) ou pastas de código → `Código`
   - READMEs, wikis, arquivos `.md` informais, comentários exportados → `Informal`
   - Em caso de dúvida, pergunte ao consultor antes de prosseguir.
3. Registre a sessão atual (lida de `state.json`) e a data de hoje.
4. **Nunca sobrescreva entradas anteriores** — apenas adicione. Uma mesma fonte pode ter múltiplas entradas em sessões diferentes.

Schema de `sources.json`:
```json
{
  "fontes": [
    {
      "id": "SRC-001",
      "caminho": "src/credito/",
      "tipo": "Código",
      "sessao": 1,
      "data": "2026-06-27"
    }
  ]
}
```

Se `.lean-inception-plugin/sources.json` não existir, crie-o com a estrutura acima. Se já existir, adicione ao array `fontes`.

---

### Passo 2 — Escanear as fontes

> **Princípio 4 — escopo humano:** escanear **somente** as fontes passadas como argumento nesta chamada. Nunca reprocessar fontes de sessões anteriores automaticamente.

Para cada fonte registrada no Passo 1:

- **Pastas de código** — leia os arquivos recursivamente. Para cada arquivo, extraia:
  - Entidades de domínio (classes, tipos, enums com nomes de negócio)
  - Fluxos e estados (máquinas de estado, workflows, sequências de chamadas)
  - Regras de negócio embutidas (validações, cálculos, condições de autorização)
  - Integrações (chamadas a APIs externas, filas, bancos de dados secundários)
  - Perfis de usuário e permissões (grupos, roles, scopes)

- **Documentos normativos / corporativos (PDF, DOCX)** — leia e extraia:
  - Definições de termos de negócio
  - Regras e obrigações declaradas
  - Papéis e responsabilidades mencionados
  - Processos descritos passo a passo

- **Documentos informais (MD, TXT, wiki)** — leia e extraia com status `inferido`, não `confirmado`.

Para cada fato extraído, anote internamente: `(fato, localização precisa, tipo de fonte, arquivo)`. Não escreva em disco ainda — processe todo o escopo antes de gravar.

> **Nota de implementação:** para escanear grandes volumes de código sem poluir o contexto da sessão principal, delegue a leitura de arquivos individuais a um subagente `general-purpose` **sem** `memory:` ativado. O subagente devolve apenas o resumo estruturado de fatos; o orquestrador consolida e grava. Isso preserva o princípio de rastreabilidade — o resumo estruturado contém as localizações precisas, não inferências livres.

---

### Passo 3 — Invocar os skills de documento

Com os fatos coletados, invoque os skills na ordem abaixo. Cada skill recebe como entrada o conjunto de fatos relevantes para ele.

#### 3a. `lean-doc-evidence-log`
Crie uma entrada `EV-XXX` para **cada fato** que será registrado. Faça isso primeiro — os IDs gerados aqui são referenciados por todos os outros documentos.

#### 3b. `lean-doc-knowledge-base`
Registre cada fato como afirmação no subdomínio correspondente, citando o `EV-XXX` gerado no passo anterior.

#### 3c. `lean-doc-glossary`
Para cada termo de domínio identificado:
- Se o termo já existe no glossário → compare com a definição atual e aplique a hierarquia de fontes. Se conflitar, atualize `Conflitos detectados` e crie item em `backlog.md`.
- Se o termo é novo → crie entrada completa.

#### 3d. `lean-doc-vision`
Preencha ou atualize os campos com os fatos disponíveis. Campos sem evidência ficam como `[⚠️ Pendente: BL-XXX]`.

#### 3e. `lean-doc-stakeholders`
Identifique stakeholders nas fontes (grupos de permissão, responsáveis em normativos, destinatários de notificação). Preencha ou atualize a tabela.

#### 3f. `lean-doc-personas`
Identifique perfis de usuário nas fontes (roles, grupos, perfis de acesso). Preencha ou atualize os blocos de persona.

#### 3g. `lean-doc-journeys`
Identifique fluxos nas fontes (workflows, sequências de estados, processos documentados). Preencha ou atualize os blocos de jornada.

#### 3h. `lean-doc-features`
Mapeie funcionalidades identificadas para features, linkando cada uma à jornada de origem. Features sem jornada identificável ficam com `[⚠️ Pendente: BL-XXX]`.

#### 3i. `lean-doc-sequencer`
Posicione features nas ondas com base nas regras do sequenciador. Se dependências estiverem incompletas, registre no campo `Observação` como pendente.

#### 3j. `lean-doc-prioritization`
Classifique features com base em evidências de valor (normativo/negócio) e esforço (complexidade de código). Sem evidência suficiente → `[⚠️ Pendente: BL-XXX]`.

#### 3k. `lean-doc-mvp`
Derive o MVP dos canvases anteriores. Campos sem ancoragem ficam pendentes.

#### 3l. `lean-doc-roadmap`
Distribua features nos horizontes Now/Next/Later. Hipóteses entram em Depois sem exigir evidência.

#### 3m. `lean-doc-backlog`
Ao longo de todos os passos acima, sempre que um fato não tiver evidência ou houver conflito não resolvido, crie o item de backlog correspondente. Este skill é invocado incrementalmente durante os passos 3a–3l, não apenas ao final.

---

### Passo 4 — Proteção de blocos validados por humano

> **Princípio 5:** antes de gravar qualquer atualização nos canvases em `docs/canvases/`, verifique se o campo a ser atualizado contém uma referência a `Validação Humana` (via `EV-XXX` de tipo `Validação Humana` em `evidence-log.md`).

- Se o campo foi validado por humano e a nova evidência é **compatível** → mantenha o bloco validado sem alteração.
- Se o campo foi validado por humano e a nova evidência é **incompatível** → **não sobrescreva**. Crie item `conflito_pós_validação` em `backlog.md` com a nova evidência referenciada.

---

### Passo 5 — Atualizar `state.json`

Ao final da execução, atualize `.lean-inception-plugin/state.json`:

```json
{
  "sessao_atual": [incrementar em 1],
  "ultima_atualizacao": "[data de hoje]",
  "backlog_criticos_abertos": [contagem de itens com status "aberto" em backlog.md],
  "historico": [
    // ... entradas anteriores preservadas ...
    {
      "sessao": [número da sessão atual],
      "data": "[data de hoje]",
      "comando": "/lean:discovery",
      "foco": "[fontes passadas como argumento, separadas por vírgula]",
      "resultado": "[N fatos extraídos, M itens de backlog gerados, K conflitos detectados]"
    }
  ]
}
```

Se `state.json` não existir, crie-o com `sessao_atual: 1` e histórico vazio antes de adicionar a entrada desta sessão.

---

### Passo 6 — Exibir resumo final

Ao final da execução, exiba para o consultor:

```
## Resumo da sessão de discovery

**Fontes escaneadas:** [lista com tipo de cada fonte]
**Fatos extraídos:** [N]
**Evidências criadas:** EV-XXX a EV-YYY
**Itens de backlog gerados:** [N] (IDs: BL-XXX, BL-YYY, ...)
**Conflitos detectados:** [N]
**Blocos protegidos (validação humana) não alterados:** [N]

### Backlog aberto (todos os itens pendentes)
| ID | Tipo | Lacuna/Conflito | Canvas afetado |
|---|---|---|---|
| BL-001 | lacuna | ... | ... |
```

O consultor usa essa lista para decidir quais itens tratar na próxima sessão via `/lean:backlog [id...]`.

---

## Restrições

- **Nunca** afirme um fato sem `EV-XXX` correspondente em `evidence-log.md`.
- **Nunca** rescaneia fontes de sessões anteriores automaticamente.
- **Nunca** sobrescreve bloco de canvas com origem `Validação Humana`.
- **Nunca** remove entradas de `evidence-log.md`, `sources.json` ou `state.json`.
- **Nunca** infere glossário, personas ou stakeholders sem âncora em fonte rastreável.
