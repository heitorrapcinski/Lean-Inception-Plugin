#!/usr/bin/env node
/**
 * Hook: Proteção de validação humana (PreToolUse)
 *
 * Bloqueia (exit 2) se uma escrita em docs/canvases/*.md removeria ou
 * alteraria um bloco cuja origem é "Validação Humana" (princípio 5).
 *
 * Um bloco é considerado de origem "Validação Humana" se contiver
 * referência a uma evidência do tipo Validação Humana, identificada por:
 *   - a string "validação consultor" (em qualquer capitalização), ou
 *   - "[Fonte: EV-" numa linha que, no evidence-log, corresponde a tipo
 *     "Validação Humana" — mas como o hook não consulta o log em tempo real,
 *     usamos a presença de "validação consultor" como marcador inline.
 *
 * O comando /lean:backlog é o único caminho autorizado para alterar esses blocos.
 */

const fs = require('fs');
const path = require('path');

// Padrão que identifica origem de validação humana numa linha
const HUMAN_VALIDATION_RE = /validação\s+consultor/i;

// --- Ler payload do stdin ---
let raw = '';
process.stdin.on('data', chunk => { raw += chunk; });
process.stdin.on('end', () => {
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    process.exit(0);
  }

  const toolName = payload.tool_name || '';
  const input = payload.tool_input || {};

  let filePath = '';
  let newContent = null;

  if (toolName === 'Write') {
    filePath = input.file_path || '';
    newContent = input.content || '';
  } else if (toolName === 'Edit') {
    filePath = input.file_path || '';
    // Para Edit, reconstruir o conteúdo resultante
    newContent = null; // calculado abaixo
  } else {
    process.exit(0);
  }

  // Aplicar apenas a docs/canvases/*.md
  const normalized = filePath.replace(/\\/g, '/');
  if (!/docs\/canvases\/[^/]+\.md$/.test(normalized)) {
    process.exit(0);
  }

  // Ler conteúdo atual do arquivo em disco
  let currentContent = '';
  try {
    currentContent = fs.readFileSync(filePath, 'utf8');
  } catch {
    // Arquivo ainda não existe — sem conteúdo atual para proteger
    process.exit(0);
  }

  // Extrair blocos de validação humana do conteúdo atual
  const protectedBlocks = extractHumanValidationBlocks(currentContent);

  if (protectedBlocks.length === 0) {
    // Nenhum bloco protegido no arquivo atual
    process.exit(0);
  }

  // Calcular conteúdo resultante após a operação
  if (toolName === 'Edit') {
    const oldString = input.old_string || '';
    const newString = input.new_string || '';
    newContent = currentContent.replace(oldString, newString);
  }

  if (newContent === null) {
    process.exit(0);
  }

  // Verificar se algum bloco protegido foi removido ou alterado
  const violated = protectedBlocks.filter(block => !newContent.includes(block));

  if (violated.length === 0) {
    process.exit(0);
  }

  // Reportar e bloquear
  const fileShort = path.basename(filePath);
  const blockSummaries = violated.map(b => `  "${b.slice(0, 100).trim()}..."`).join('\n');

  console.error(
    `[lean-inception] BLOQUEADO — Proteção de validação humana em ${fileShort}.\n` +
    `A operação removeria ou alteraria ${violated.length} bloco(s) com origem "validação consultor":\n` +
    `${blockSummaries}\n\n` +
    `Blocos validados por humano só podem ser alterados via /lean:backlog.\n` +
    `Se há conflito com nova evidência, rode /lean:backlog e escolha a opção (b) ou (c) no formulário.`
  );
  process.exit(2);
});

/**
 * Extrai as linhas (ou pequenos blocos de linhas) do conteúdo que contêm
 * marcação de validação humana. Retorna cada uma como string para comparação
 * com o conteúdo resultante.
 */
function extractHumanValidationBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if (HUMAN_VALIDATION_RE.test(line)) {
      // Incluir a linha anterior e posterior para contexto, garantindo que
      // uma edição parcial do bloco também seja detectada
      const start = Math.max(0, idx - 1);
      const end = Math.min(lines.length - 1, idx + 1);
      const block = lines.slice(start, end + 1).join('\n');
      blocks.push(block);
    }
  });

  return blocks;
}
