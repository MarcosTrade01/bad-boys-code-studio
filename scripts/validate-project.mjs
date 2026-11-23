import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const failures = [];
let passed = 0;

function check(condition, message) {
  if (condition) {
    passed += 1;
    console.log(`OK   ${message}`);
  } else {
    failures.push(message);
    console.error(`FAIL ${message}`);
  }
}

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  check(fs.existsSync(fullPath), `arquivo presente: ${relativePath}`);
  return fs.readFileSync(fullPath, "utf8");
}

function checkBalanced(source, label) {
  const stack = [];
  let quote = null;
  let comment = false;
  let escaped = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (comment) {
      if (char === "*" && next === "/") {
        comment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "*") {
      comment = true;
      i += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }
    if (char === "{" || char === "(" || char === "[") {
      stack.push(char);
      continue;
    }
    if (char === "}" || char === ")" || char === "]") {
      const expected = char === "}" ? "{" : char === ")" ? "(" : "[";
      if (stack.pop() !== expected) return false;
    }
  }

  return !comment && !quote && stack.length === 0;
}

const html = read("index.html");
const sw = read("sw.js");
const manifestText = read("manifest.webmanifest");

check(/<!doctype html>/i.test(html), "HTML declara DOCTYPE");
check(/<html\\s+lang=["']pt-BR["']/i.test(html), "HTML declara idioma pt-BR");
check(/name=["']viewport["']/i.test(html), "viewport mobile presente");
check(/rel=["']manifest["']/i.test(html), "manifesto PWA referenciado");

const styleBlocks = [...html.matchAll(/<style\\b[^>]*>([\\s\\S]*?)<\\/style\\s*>/gi)];
check(styleBlocks.length === 1, "bloco principal de CSS encontrado");
if (styleBlocks.length === 1) {
  check(checkBalanced(styleBlocks[0][1], "CSS"), "delimitadores do CSS balanceados");
}

const scriptBlocks = [...html.matchAll(/<script\\b[^>]*>([\\s\\S]*?)<\\/script\\s*>/gi)];
check(scriptBlocks.length >= 1, "script inline do aplicativo encontrado");
for (let i = 0; i < scriptBlocks.length; i += 1) {
  try {
    new vm.Script(scriptBlocks[i][1], { filename: `index.html:inline-script-${i + 1}` });
    check(true, `sintaxe JavaScript do bloco inline ${i + 1}`);
  } catch (error) {
    check(false, `sintaxe JavaScript do bloco inline ${i + 1}: ${error.message}`);
  }
}

const ids = [...html.matchAll(/\\bid=["']([^"']+)["']/g)].map(match => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
check(duplicateIds.length === 0, duplicateIds.length
  ? `IDs HTML duplicados: ${[...new Set(duplicateIds)].join(", ")}`
  : "IDs HTML sem duplicatas");

const iframe = html.match(/<iframe\\b([^>]*)>/i);
check(Boolean(iframe), "iframe de pré-visualização encontrado");
if (iframe) {
  const sandbox = iframe[1].match(/sandbox=["']([^"']*)["']/i);
  check(Boolean(sandbox), "iframe possui atributo sandbox");
  if (sandbox) {
    const permissions = sandbox[1].split(/\\s+/);
    check(permissions.includes("allow-scripts"), "sandbox permite scripts da pré-visualização");
    check(!permissions.includes("allow-same-origin"), "sandbox não concede same-origin");
    check(!permissions.includes("allow-top-navigation"), "sandbox bloqueia navegação do contexto superior");
  }
}

check(/bbcs30-projects-v1/.test(html), "chave atual de projetos preservada");
check(/bbcs30-active-v1/.test(html), "chave atual do projeto ativo preservada");
check(/function\\s+persist\\s*\\(/.test(html), "rotina de persistência presente");
check(/function\\s+importBackup\\s*\\(/.test(html), "rotina de importação de backup presente");
check(/function\\s+backup\\s*\\(/.test(html), "rotina de exportação de backup presente");
check(/style\\.css/.test(html) && /script\\.js/.test(html), "arquivos padrão da pré-visualização reconhecidos");

try {
  new vm.Script(sw, { filename: "sw.js" });
  check(true, "sintaxe JavaScript do Service Worker");
} catch (error) {
  check(false, `sintaxe do Service Worker: ${error.message}`);
}

let manifest;
try {
  manifest = JSON.parse(manifestText);
  check(true, "manifesto PWA contém JSON válido");
} catch (error) {
  check(false, `manifesto PWA contém JSON válido: ${error.message}`);
}

if (manifest) {
  check(typeof manifest.name === "string" && manifest.name.length > 0, "manifesto possui nome");
  check(typeof manifest.start_url === "string" && typeof manifest.scope === "string", "manifesto possui start_url e scope");
  check(manifest.display === "standalone", "manifesto mantém modo standalone");
  check(Array.isArray(manifest.icons) && manifest.icons.length >= 1, "manifesto declara ícones");
  for (const icon of manifest.icons || []) {
    check(typeof icon.src === "string" && icon.src.length > 0, `ícone possui caminho: ${icon.src}`);
  }
}

console.log(`\\nResultado: ${passed} verificações aprovadas; ${failures.length} falha(s).`);
if (failures.length) process.exitCode = 1;
