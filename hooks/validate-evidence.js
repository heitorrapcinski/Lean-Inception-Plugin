#!/usr/bin/env node
/**
 * Hook: Validação de evidência (PostToolUse)
 *
 * Bloqueia (exit 2) se qualquer linha de conteúdo substantivo escrita em
 * docs/canvases/*.md ou docs/knowledge-base.md não tiver citação de evidência.
 *
 * Citação válida: [Fonte: EV-XXX] ou [⚠️ Pendente: BL-XXX]
 */

const fs = require('fs');
const path = require('path');

// --- Ler payload do stdin ---
let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    // Payload inválido — não bloquear, deixar passar
    process.exit(0);
  }

  const toolName = payload.tool_name || '';
  const input = payload.tool_input || {};

  // Determinar arquivo e conteúdo novo conforme a ferramenta
  let filePath = '';
  let newContent = '';

  if (toolName === 'Write') {
    filePath = input.file_path || '';
    newContent = input.content || '';
  } else if (toolName === 'Edit') {
    filePath = input.file_path || '';
    // Para Edit, verificar apenas o trecho novo
    newContent = input.new_string || '';
  } else {
    process.exit(0);
  }

  // Normalizar separadores para comparação cross-platform
  const normalized = filePath.replace(/\\/g, '/');

  // Aplicar apenas a docs/canvases/*.md e docs/knowledge-base.md
  const isCanvas = /docs\/canvases\/[^/]+\.md$/.test(normalized);
  const isKnowledgeBase = /docs\/knowledge-base\.md$/.test(normalized);

  if (!isCanvas && !isKnowledgeBase) {
    process.exit(0);
  }

  // Linhas que violam a regra de evidência
  const violations = findViolations(newContent);

  if (violations.length === 0) {
    process.exit(0);
  }

  // Reportar violações ao agente e bloquear
  const fileShort = path.basename(filePath);
  const lines = violations.map(v => `  Linha ${v.lineNum}: ${v.text}`).join('\n');

  console.error(
    `[lean-inception] BLOQUEADO — Violação da regra de evidência em ${fileShort}.\n` +
    `As seguintes linhas contêm conteúdo substantivo sem [Fonte: EV-XXX] ou [⚠️ Pendente: BL-XXX]:\n` +
    `${lines}\n\n` +
    `Ação requerida: adicione a citação de evidência em cada linha listada antes de gravar.\n` +
    `Se a informação não tem evidência, use [⚠️ Pendente: BL-XXX] e crie o item em backlog.md.`
  );
  process.exit(2);
});

/**
 * Identifica linhas de conteúdo substantivo sem citação de evidência.
 *
 * Critérios de exclusão (linha NÃO é verificada):
 *   - Linha vazia ou só espaços
 *   - Cabeçalho Markdown (começa com #)
 *   - Separador de tabela Markdown (só contém |, -, espaço)
 *   - Linha de template/estrutural curta (< 10 chars de conteúdo real)
 *   - Já contém [Fonte: ou [⚠️ Pendente:
 *   - Linha de metadado YAML (começa com --- ou contém: valor)
 *   - Linhas de lista que são puramente estruturais (- **Campo:**)
 *   - Linhas que são apenas marcadores de seção sem conteúdo
 */
function findViolations(content) {
  const violations = [];
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Pular linhas vazias
    if (!trimmed) return;

    // Pular cabeçalhos Markdown
    if (trimmed.startsWith('#')) return;

    // Pular separadores de tabela
    if (/^[\|\-\s]+$/.test(trimmed)) return;

    // Pular linha YAML front matter
    if (trimmed === '---') return;

    // Pular linhas que já têm citação
    if (trimmed.includes('[Fonte:') || trimmed.includes('[⚠️ Pendente:')) return;

    // Pular linhas de código (dentro de bloco ```)
    if (trimmed.startsWith('```')) return;

    // Pular linhas que são puramente rótulos de campo sem conteúdo
    // ex.: "- **Afirmação:**" sem valor após os dois pontos
    if (/^-?\s*\*\*[^*]+\*\*\s*:?\s*$/.test(trimmed)) return;

    // Pular linhas de cabeçalho de tabela (primeira linha com | e texto)
    if (/^\|.*\|$/.test(trimmed) && trimmed.includes('---') === false) {
      // Cabeçalho de tabela: se contém palavras reservadas de estrutura, pular
      const headerWords = ['ID', 'Tipo', 'Feature', 'Stakeholder', 'Persona', 'Jornada',
        'Canvas', 'Status', 'Resposta', 'Fonte', 'Sessão', 'Data', 'Afirmação',
        'Lacuna', 'Conflito', 'Valor', 'Esforço', 'Item', 'Depende', 'Pronto'];
      if (headerWords.some(w => trimmed.includes(w))) return;
    }

    // Conteúdo real: remover marcadores Markdown para medir tamanho
    const stripped = trimmed
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^\s*[-+*>]\s*/, '')
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .trim();

    // Pular conteúdo muito curto (rótulos sem valor, separadores residuais)
    if (stripped.length < 15) return;

    // Pular linhas que são só um placeholder de template (começam e terminam com [])
    if (/^\[.+\]$/.test(stripped)) return;

    // Violação: linha substantiva sem citação
    violations.push({ lineNum, text: trimmed.slice(0, 120) });
  });

  return violations;
}
