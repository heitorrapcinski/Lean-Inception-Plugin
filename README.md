# lean-inception-plugin

Plugin Claude Code/Cowork que atua como co-facilitador de **Lean Inception** (método de Paulo Caroli) para consultores trabalhando em sistemas brownfield.

O plugin extrai conhecimento auditável de código, documentação e normativos, monta os canvases da Lean Inception com rastreabilidade de fontes, e gerencia um backlog de lacunas para validação humana — garantindo que nenhuma afirmação seja registrada sem evidência.

## Comandos

| Comando | O que faz |
|---|---|
| `/lean:discovery [fontes]` | Escaneia as fontes indicadas e popula/atualiza todos os documentos em `docs/`. Tudo que não encontrar evidência vai para o backlog. |
| `/lean:backlog [id...]` | Apresenta pendências em formulário, captura resposta do consultor como "Validação Humana" e atualiza os canvases afetados. |

## Instalação

1. Clone ou copie este repositório para sua máquina.
2. No Claude Code, habilite o plugin:
   ```
   /plugins add <caminho-para-lean-inception-plugin>
   ```
3. Abra o repositório do cliente e rode o primeiro discovery:
   ```
   /lean:discovery src/ docs/normativo.pdf
   ```

## Princípios fundamentais

- **Sem evidência, sem afirmação.** Lacunas vão para o backlog, nunca são preenchidas por inferência.
- **Hierarquia de fontes.** Normativo > Corporativo > Código > Informal. Conflitos são registrados, nunca escondidos.
- **Validação humana protegida.** Blocos de canvas confirmados via `/lean:backlog` nunca são sobrescritos por um discovery posterior.
- **Escopo humano.** O consultor decide quais fontes escanear a cada sessão; o plugin nunca rescaneia sozinho.

## Estrutura gerada no projeto do cliente

```
docs/
  knowledge-base.md     # fatos extraídos por domínio
  evidence-log.md       # tabela de evidências rastreáveis
  glossary.md           # linguagem ubíqua + conflitos
  backlog.md            # lacunas e conflitos pendentes
  canvases/
    vision.md · stakeholders.md · personas.md · journeys.md
    features.md · sequencer.md · prioritization.md · mvp.md · roadmap.md

.lean-inception-plugin/
  state.json            # histórico de sessões
  sources.json          # fontes escaneadas por sessão
```
