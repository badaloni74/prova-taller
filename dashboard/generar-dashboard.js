#!/usr/bin/env node
/**
 * Generador del dashboard de trazabilidad y estado de app-taller.
 *
 * Lee los documentos reales de docs/ y registro-ids.json (nunca datos
 * inventados) y produce dashboard/dashboard-actual.html: una página HTML
 * autocontenida, sin dependencias externas, que se puede abrir directamente
 * en el navegador.
 *
 * "Carga automática si cambian los datos" en un fichero estático sin
 * servidor no es posible de verdad (un navegador no puede leer el
 * filesystem por su cuenta) — lo que sí es real y barato es que
 * regenerar el dashboard entero es este único comando, en segundos:
 *
 *   node dashboard/generar-dashboard.js
 *
 * Uso: ejecutarlo cada vez que docs/ cambie y quieras un dashboard al día.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const OUT = path.join(__dirname, 'dashboard-actual.html');
const HOME = process.env.USERPROFILE || process.env.HOME;
const MATRIZ_SCRIPT = path.join(HOME, '.claude', 'skills', 's14-matriz-trazabilidad', 'scripts', 'matriz.js');
const CASCADA_SCRIPT = path.join(HOME, '.claude', 'skills', 's16-cascada-obsolescencia', 'scripts', 'cascada.js');

// -------------------------------------------------------------- utilidades

const clean = (s) => {
  if (s == null) return null;
  let v = String(s).trim();
  if (!/^["']/.test(v)) v = v.replace(/\s+#.*$/, '').trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
  return v.replace(/\\"/g, '"').trim() || null;
};

function readBlocks(file, blockName) {
  const t = fs.readFileSync(file, 'utf8');
  const re = new RegExp('```ya?ml ?' + blockName + '\\n([\\s\\S]*?)\\n```', 'g');
  const out = [];
  let m;
  while ((m = re.exec(t))) out.push(m[1]);
  return out;
}

/** Trocea un bloque YAML plano por líneas que empiezan una entrada de lista ("  - id: X" o "  - clave: X"). */
function entries(body, startKeyRe) {
  const lines = body.split('\n');
  const out = [];
  let current = null;
  for (const l of lines) {
    const start = l.match(startKeyRe);
    if (start) { current = {}; out.push(current); }
    if (!current) continue;
    const kv = l.match(/^\s*-?\s*(\w+):\s*(.*)$/);
    if (kv) {
      const [, key, rawVal] = kv;
      if (current[key] === undefined) {
        const v = clean(rawVal);
        if (v !== null && !v.startsWith('[') && !v.startsWith('>') && !v.startsWith('|')) current[key] = v;
        else if (v && v.startsWith('[')) current[key] = v.slice(1, -1).split(',').map((x) => x.trim()).filter(Boolean);
      }
    }
  }
  return out;
}

function frontMatter(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return {};
  const fm = {};
  for (const l of m[1].split('\n')) {
    const kv = l.match(/^([a-zA-Z_][\w]*):\s*(.*)$/);
    if (kv) fm[kv[1]] = clean(kv[2]);
  }
  return fm;
}

// ------------------------------------------------------------ requisitos

function extraeRequisitos() {
  const blocks = readBlocks(path.join(DOCS, 'DOC-04-FUNCIONAL.md'), 'requirements');
  const reqs = [];
  for (const b of blocks) {
    for (const e of entries(b, /^\s*-\s+id:\s*(REQ-\d+)/)) {
      reqs.push({
        id: e.id,
        description: e.statement || '',
        module: e.module || '',
        priority: e.priority || '',
        confidence: e.confidence || '',
        status: e.status || 'active',
      });
    }
  }
  return reqs;
}

// -------------------------------------------------------------- casos TC

function extraeCasos() {
  const t = fs.readFileSync(path.join(DOCS, 'DOC-05-PLAN-PRUEBAS.md'), 'utf8');
  const blockRe = /```yaml testcases\n([\s\S]*?)\n```/g;
  const cases = [];
  let m;
  while ((m = blockRe.exec(t))) {
    const body = m[1];
    const module = (body.match(/^module:\s*(.+)$/m) || [, ''])[1].trim();
    for (const e of entries(body, /^\s*-\s+id:\s*(TC-\d+)/)) {
      cases.push({
        id: e.id,
        req: e.requirement || '',
        module,
        priority: e.priority || '',
        via: { ui: 'UI', service: 'Servicio', mixed: 'Mixta', manual: 'Manual' }[e.verification_path] || e.verification_path || '—',
        automation: e.automation_grade || e.grade || '',
        objective: e.name || '',
        deprecated: e.deprecated === 'true',
      });
    }
  }
  return cases;
}

// -------------------------------------------------------------- cobertura

/** Ejecuta S-14 (matriz.js) de verdad: el JOIN determinista, no una reimplementación. */
function ejecutaMatriz() {
  const args = [
    MATRIZ_SCRIPT,
    '--doc04', path.join(DOCS, 'DOC-04-FUNCIONAL.md'),
    '--doc05', path.join(DOCS, 'DOC-05-PLAN-PRUEBAS.md'),
    '--registro', path.join(ROOT, 'registro-ids.json'),
    '--out', DOCS,
    '--json',
  ];
  const out = execFileSync('node', args, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, cwd: ROOT });
  return JSON.parse(out);
}

function parseCsvRfc4180(text) {
  const lines = text.trim().split('\n');
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cols = [];
    let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (inQ) {
        if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (c === '"') inQ = false;
        else cur += c;
      } else if (c === '"') inQ = true;
      else if (c === ',') { cols.push(cur); cur = ''; }
      else cur += c;
    }
    cols.push(cur);
    const row = {};
    header.forEach((h, i) => { row[h] = cols[i]; });
    return row;
  });
}

/** Lee el CSV que acaba de escribir matriz.js (r.csv_path) — nunca lo recalcula. */
function extraeCobertura(matriz) {
  const csvPath = path.isAbsolute(matriz.csv_path) ? matriz.csv_path : path.join(ROOT, matriz.csv_path);
  const rows = parseCsvRfc4180(fs.readFileSync(csvPath, 'utf8'));
  return rows.map((r) => {
    const count = Number(r.test_case_count || 0);
    return {
      id: r.requirement_id,
      description: r.requirement_statement,
      module: r.module,
      priority: r.priority,
      cases: (r.test_case_ids || '').split(';').filter(Boolean).join('; '),
      count,
      diagnosis: r.diagnosis,
      verification: count > 1 ? 'Completa' : (count === 1 ? 'Básica' : 'Sin cobertura'),
    };
  });
}

// -------------------------------------------------------------- preguntas

function extraePreguntas() {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'registro-ids.json'), 'utf8'));
  const out = [];
  for (const [id, a] of Object.entries(reg.anchors)) {
    if (a.type !== 'open_question') continue;
    out.push({
      id,
      question: a.text,
      status: a.status === 'open' ? 'Abierta' : (a.status === 'answered' ? 'Respondida' : (a.status || '')),
      answer: a.resolution || '—',
      source: a.document || '',
      area: a.blocks || '',
      impact: a.status === 'open' ? 'Medio' : 'Bajo',
    });
  }
  out.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  return out;
}

// ------------------------------------------------------------------ bugs

function extraeBugs() {
  const d = JSON.parse(fs.readFileSync(path.join(DOCS, 'DOC-24-BUGS.json'), 'utf8'));
  // BUG-002 se cerró con SPE-06 (albara-canvi-client), implementada.
  const cerrados = { 'BUG-002': 'SPE-06' };
  return d.bugs.map((b) => ({
    id: b.id,
    title: b.title,
    level: b.severity === 'critical' ? 'Crítico' : (b.severity === 'high' ? 'Alto' : 'Medio'),
    status: cerrados[b.id] ? 'Cerrado' : 'Abierto',
    closedBy: cerrados[b.id] || null,
    requirement: b.requirement || '',
  }));
}

// -------------------------------------------------------------- roadmap

function extraeRoadmap() {
  const blocks = readBlocks(path.join(DOCS, 'DOC-16-ROADMAP.md'), 'roadmap');
  const out = [];
  for (const b of blocks) {
    for (const e of entries(b, /^\s*-\s+id:\s*(MEJ-\d+)/)) {
      out.push({ id: e.id, title: e.title || '', status: e.status || 'proposed' });
    }
  }
  return out;
}

// ------------------------------------------------------------ evolutivos

function extraeEvolutivos() {
  const out = [];
  const implDir = path.join(ROOT, 'specs', 'implemented');
  if (fs.existsSync(implDir)) {
    for (const ent of fs.readdirSync(implDir, { withFileTypes: true })) {
      let specFile = null, slug = null;
      if (ent.isDirectory()) {
        const m = ent.name.match(/^SPE-(\d+)-(.+)$/);
        if (m) { slug = ent.name; specFile = path.join(implDir, ent.name, ent.name + '.md'); }
      } else if (ent.isFile() && /^SPE-\d+-.+\.md$/.test(ent.name)) {
        slug = ent.name.replace(/\.md$/, ''); specFile = path.join(implDir, ent.name);
      }
      if (!specFile || !fs.existsSync(specFile)) continue;
      const t = fs.readFileSync(specFile, 'utf8');
      const titulo = (t.match(/^#\s*SPEC\s*\d+\s*—\s*(.+)$/m) || [, slug])[1];
      const estado = (t.match(/>\s*\*\*(?:Estado|Estat):\*\*\s*(.+)/) || [, '?'])[1].trim();
      const origen = (t.match(/>\s*\*\*Origen:\*\*\s*(.+)/) || [, ''])[1].trim();
      out.push({ id: slug, title: titulo, status: estado.toLowerCase() === 'implemented' ? 'implemented' : estado.toLowerCase(), req: origen, effort: '—', gate: 'closed', risk: '—' });
    }
  }
  const pendingDir = path.join(ROOT, 'specs', 'pending');
  if (fs.existsSync(pendingDir)) {
    for (const f of fs.readdirSync(pendingDir).filter((f) => f.endsWith('.md'))) {
      const t = fs.readFileSync(path.join(pendingDir, f), 'utf8');
      const titulo = (t.match(/^#\s*SPEC\s*\d+\s*—\s*(.+)$/m) || [, f])[1];
      const estado = (t.match(/>\s*\*\*Estado:\*\*\s*(.+)/) || [, '?'])[1].trim();
      out.push({ id: f.replace(/\.md$/, ''), title: titulo, status: estado.toLowerCase(), req: '—', effort: '—', gate: 'pending', risk: '—' });
    }
  }
  return out;
}

// ------------------------------------------------------------- documentos

function extraeDocumentos() {
  const files = fs.readdirSync(DOCS).filter((f) => f.endsWith('.md') && !f.endsWith('-HIST.md') && f.startsWith('DOC-'));
  const areaPorPrefijo = {
    'DOC-01': 'Base', 'DOC-02': 'Base', 'DOC-04': 'Funcional', 'DOC-05': 'Pruebas',
    'DOC-06': 'Manual', 'DOC-07': 'Trazabilidad', 'DOC-08': 'Evolutivo', 'DOC-09': 'Evolutivo',
    'DOC-10': 'Evolutivo', 'DOC-11': 'Evolutivo', 'DOC-12': 'Evolutivo', 'DOC-14': 'Exploratorio',
    'DOC-16': 'Roadmap', 'DOC-23': 'Ejecución', 'DOC-25': 'Propuestas', 'DOC-27': 'Ejecución',
  };
  return files.map((f) => {
    const fm = frontMatter(path.join(DOCS, f));
    const prefix = (f.match(/^(DOC-\d+)/) || [, ''])[1];
    return {
      name: f,
      type: 'Markdown',
      area: areaPorPrefijo[prefix] || 'Otro',
      version: fm.version || '—',
      content: fm.generator || '',
      structured: 'Sí',
    };
  });
}

// --------------------------------------------------- nuevas funcionalidades

function extraeFuncionalidades() {
  const blocks = readBlocks(path.join(DOCS, 'DOC-25-PROPUESTAS-FUNCIONALES.md'), 'propuestas');
  const out = [];
  for (const b of blocks) {
    for (const e of entries(b, /^\s*-\s+id:\s*(FUN-\d+)/)) {
      out.push({
        id: e.id,
        title: e.title || '',
        status: e.status || 'proposed',
        impact: e.impact || '—',
        difficulty: e.difficulty || '—',
        business_value: e.business_value || '—',
        size: e.size || '—',
        confidence: e.confidence || '—',
      });
    }
  }
  return out;
}

// ------------------------------------------------------------ especificaciones

function extraeSpecs() {
  const out = [];
  const dir = path.join(ROOT, 'specs', 'implemented');
  if (!fs.existsSync(dir)) return out;
  const files = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      const f = path.join(dir, ent.name, ent.name + '.md');
      if (fs.existsSync(f)) files.push([ent.name, f]);
    } else if (ent.isFile() && /^SPE-\d+-.+\.md$/.test(ent.name)) {
      files.push([ent.name.replace(/\.md$/, ''), path.join(dir, ent.name)]);
    }
  }
  for (const [slug, f] of files) {
    const t = fs.readFileSync(f, 'utf8');
    const grab = (re, dflt) => (t.match(re) || [, dflt])[1].trim();
    out.push({
      id: slug,
      title: grab(/^#\s*SPEC\s*\d+\s*[—-]\s*(.+)$/m, slug),
      status: grab(/>\s*\*\*(?:Estado|Estat):\*\*\s*(.+)/, '?'),
      origin: grab(/>\s*\*\*Origen:\*\*\s*(.+)/, '—'),
      date: grab(/>\s*\*\*(?:Fecha|Data):\*\*\s*(.+)/, '—'),
      objective: grab(/>\s*\*\*(?:Objetivo|Objectiu):\*\*\s*(.+)/, ''),
    });
  }
  out.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  return out;
}

// ------------------------------------------------------------------ test plans

/** Planes = módulos de DOC-05 §4; el estado de cada caso sale de DOC-23 (UI) y DOC-27 (servicio). */
function extraeTestPlans() {
  const casos = extraeCasos().filter((c) => !c.deprecated);

  const estadoUI = {};
  const doc23 = fs.readFileSync(path.join(DOCS, 'DOC-23-INFORME-EJECUCION-TCS-UI.md'), 'utf8');
  // Solo la sección §3 «Resultados por módulo» (tablas TC | Descripción | Resultat).
  const doc23s3 = (doc23.split(/^##\s+3\.\s+Resultados por m[oó]dulo/m)[1] || '').split(/^##\s+4\./m)[0];
  for (const m of doc23s3.matchAll(/^\|\s*(TC-\d+)\s*\|[^|]*\|\s*([^|]+?)\s*\|/gm)) {
    if (/verde/i.test(m[2])) estadoUI[m[1]] = 'Verde';
    else if (/rojo/i.test(m[2])) estadoUI[m[1]] = 'Rojo';
  }

  const estadoSvc = {};
  const doc27 = fs.readFileSync(path.join(DOCS, 'DOC-27-INFORME-EJECUCION-TCS-API.md'), 'utf8');
  for (const m of doc27.matchAll(/^\|\s*`?TCS\d+`?\s*\|\s*`?(TC-\d+)`?\s*\|[\s\S]*?(✅|❌)\s*\|/gm)) {
    const s = m[2] === '✅' ? 'Verde' : 'Rojo';
    if (estadoSvc[m[1]] !== 'Rojo') estadoSvc[m[1]] = s;
  }

  const PLAN_LABEL = {
    clients: 'Clientes', vehicles: 'Vehículos', peces: 'Piezas', albarans: 'Albaranes',
    factures: 'Facturas', personal: 'Personal', nomines: 'Nóminas', shell: 'Esqueleto', configuracio: 'Configuración',
  };
  const PLAN_ORDER = ['clients', 'vehicles', 'peces', 'albarans', 'factures', 'personal', 'nomines', 'shell', 'configuracio'];

  const cases = casos.map((c) => ({
    plan: PLAN_LABEL[c.module] || c.module,
    module: c.module,
    id: c.id,
    objective: c.objective,
    via: c.via,
    automation: c.automation || '—',
    status: estadoUI[c.id] || estadoSvc[c.id] || 'No ejecutado',
  }));

  const byPlan = {};
  for (const c of cases) (byPlan[c.plan] || (byPlan[c.plan] = [])).push(c);
  const plans = Object.keys(byPlan)
    .sort((a, b) => {
      const ia = PLAN_ORDER.indexOf(cases.find((c) => c.plan === a).module);
      const ib = PLAN_ORDER.indexOf(cases.find((c) => c.plan === b).module);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    })
    .map((name) => {
      const cs = byPlan[name];
      return {
        id: name,
        name,
        module: cs[0].module,
        cases: cs.length,
        automated: cs.filter((c) => c.automation && c.automation !== 'not-recommended' && c.automation !== '—').length,
        green: cs.filter((c) => c.status === 'Verde').length,
        red: cs.filter((c) => c.status === 'Rojo').length,
        source: 'DOC-05 §4 · DOC-23 · DOC-27',
      };
    });

  return { plans, cases };
}

// ---------------------------------------------------------------- riesgos

function sintetizaRiesgos({ preguntas, bugs, roadmap, evolutivos }) {
  const abiertas = preguntas.filter((q) => q.status === 'Abierta').length;
  const bugsCriticos = bugs.filter((b) => b.level === 'Crítico' && b.status === 'Abierto').length;
  const bugsAltos = bugs.filter((b) => b.level === 'Alto' && b.status === 'Abierto').length;
  const mejPropuestas = roadmap.filter((m) => m.status === 'proposed').length;
  const evoDraft = evolutivos.filter((e) => e.status !== 'implemented').length;
  const out = [];
  if (abiertas) out.push({ risk: 'Preguntas abiertas', category: 'Definición', count: String(abiertas), level: abiertas > 5 ? 'Alto' : 'Medio', action: 'Resolver y asignar responsables' });
  if (bugsCriticos) out.push({ risk: 'Defectos críticos abiertos', category: 'Calidad', count: String(bugsCriticos), level: 'Alto', action: 'Priorizar spec de corrección' });
  if (bugsAltos) out.push({ risk: 'Defectos altos abiertos', category: 'Calidad', count: String(bugsAltos), level: 'Medio', action: 'Planificar corrección' });
  if (mejPropuestas) out.push({ risk: 'Mejoras técnicas sin decidir', category: 'Deuda técnica', count: String(mejPropuestas), level: mejPropuestas > 4 ? 'Medio' : 'Bajo', action: 'Revisar roadmap y decidir' });
  if (evoDraft) out.push({ risk: 'Evolutivos en curso', category: 'Alcance', count: String(evoDraft), level: 'Bajo', action: 'Seguimiento normal' });
  return out;
}

// -------------------------------------------------------------------- run

// --------------------------------------------------------------- render HTML

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const PRIORITY_LABEL = { critical: 'Crítica', high: 'Alta', medium: 'Media', low: 'Baja' };
const PRIORITY_COLOR = { critical: '#ff3b30', high: '#ff9f0a', medium: '#ffd60a', low: '#30d158' };
const SEVERITY_CLASS = { Crítico: 'severity-critical', Alto: 'severity-high', Medio: 'severity-medium', Bajo: 'severity-low' };

function barChart(rows) {
  const max = Math.max(1, ...rows.map((r) => r.total));
  return rows.map((r) => `<div class="bar-row"><span>${esc(r.label)} (${r.total})</span><div class="bar-track"><div class="bar-fill" style="width:${(r.total / max) * 100}%;background:${r.color}"></div></div><b>${r.pct}%</b></div>`).join('');
}

function donut(segments, total, centerLabel) {
  let acc = 0;
  const stops = segments.map((s) => {
    const from = acc, to = acc + (total ? (s.value / total) * 100 : 0);
    acc = to;
    return `${s.color} ${from.toFixed(1)}% ${to.toFixed(1)}%`;
  }).join(',');
  const legend = segments.map((s) => `<div class="legend-row"><i class="dot" style="background:${s.color}"></i><span>${esc(s.label)}</span><b>${s.value}</b></div>`).join('');
  return `<div class="donut-layout"><div class="donut" style="background:conic-gradient(${stops})"><div class="donut-center"><b>${total}</b>${esc(centerLabel)}</div></div><div class="legend">${legend}</div></div>`;
}

function gaugeSvg(estado) {
  const angleFor = { GREEN: -60, AMBER: 0, RED: 60 };
  const colorFor = { GREEN: 'var(--green)', AMBER: 'var(--amber)', RED: 'var(--red)' };
  const a = angleFor[estado] ?? 0;
  return `<svg class="gauge-svg" viewBox="0 0 200 120">
    <path d="M20 110 A80 80 0 0 1 76 33" stroke="var(--green)" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M76 33 A80 80 0 0 1 124 33" stroke="var(--amber)" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M124 33 A80 80 0 0 1 180 110" stroke="var(--red)" stroke-width="16" fill="none" stroke-linecap="round"/>
    <g transform="translate(100,110) rotate(${a})"><line x1="0" y1="0" x2="0" y2="-72" stroke="${colorFor[estado]}" stroke-width="4" stroke-linecap="round"/><circle r="7" fill="${colorFor[estado]}"/></g>
  </svg>`;
}

function paginaGenerica(id, titulo, sub, kind, extraHtml, summaryLabels) {
  return `<section class="page" id="${id}"><h2>${esc(titulo)}</h2>${sub ? `<div class="muted">${sub}</div>` : ''}${extraHtml || ''}<Filters kind="${kind}"></Filters>${summaryLabels ? `<Summary labels="${summaryLabels}"></Summary>` : ''}<Table kind="${kind}"></Table></section>`;
}

function construyeHTML(data, meta) {
  const css = fs.readFileSync(path.join(__dirname, 'motor.css'), 'utf8');
  const motor = fs.readFileSync(path.join(__dirname, 'motor.js'), 'utf8');
  const t = meta.totals;
  const m = meta.matriz;

  // --- resumen: cobertura por prioridad (real, de S-14) ---
  const prioOrder = ['critical', 'high', 'medium', 'low'];
  const prioRows = prioOrder.filter((p) => m.summary.per_priority[p]).map((p) => {
    const d = m.summary.per_priority[p];
    return { label: PRIORITY_LABEL[p], total: d.total, pct: d.total ? Math.round((d.covered / d.total) * 100) : 0, color: PRIORITY_COLOR[p] };
  });

  // --- casos por grado de automatización (real, de S-14) ---
  const gradeLabel = { high: 'Alta', medium: 'Media', low: 'Baja', 'not-recommended': 'No recomendada' };
  const gradeColor = { high: '#44d17a', medium: '#ff9f0a', low: '#ffd60a', 'not-recommended': '#ff453a' };
  const gradeOrder = ['high', 'medium', 'low', 'not-recommended'];
  const totalTests = data.tests.length;
  const gradeRows = gradeOrder.filter((g) => m.automation.by_grade[g]).map((g) => ({ label: gradeLabel[g], total: m.automation.by_grade[g], pct: totalTests ? Math.round((m.automation.by_grade[g] / totalTests) * 100) : 0, color: gradeColor[g] }));

  // --- vía de verificación (real, de data.tests) ---
  const viaCount = {};
  data.tests.forEach((c) => { viaCount[c.via] = (viaCount[c.via] || 0) + 1; });
  const viaColor = { UI: '#168bff', Servicio: '#9b51e0', Mixta: '#27c8b8' };
  const viaDonut = donut(Object.entries(viaCount).map(([label, value]) => ({ label, value, color: viaColor[label] || '#888' })), totalTests, 'Total');

  // --- roadmap donut (real) ---
  const roadmapStatusLabel = { accepted: 'Aceptadas', proposed: 'Propuestas', rejected: 'Rechazadas', implemented: 'Implementadas', superseded: 'Sustituidas' };
  const roadmapColor = { accepted: '#44d17a', proposed: '#ff9f0a', rejected: '#ff453a', implemented: '#a7f0c9', superseded: '#888' };
  const roadmapCount = {};
  data.roadmap.forEach((r) => { roadmapCount[r.status] = (roadmapCount[r.status] || 0) + 1; });
  const roadmapDonut = donut(Object.entries(roadmapCount).map(([k, value]) => ({ label: roadmapStatusLabel[k] || k, value, color: roadmapColor[k] || '#888' })), data.roadmap.length, 'Total');

  // --- top requisitos con más casos ---
  const topReq = [...data.coverage].sort((a, b) => b.count - a.count).slice(0, 6);
  const topReqRows = topReq.map((r) => `<tr><td>${r.id}</td><td>${esc(r.description)}</td><td>${esc(r.module)}</td><td>${r.count}</td><td class="${SEVERITY_CLASS[PRIORITY_LABEL[r.priority] || r.priority] || ''}">${PRIORITY_LABEL[r.priority] || r.priority}</td></tr>`).join('');

  // --- preguntas abiertas (top por antigüedad de ID) ---
  const abiertasTop = data.questions.filter((q) => q.status === 'Abierta').slice(0, 6);
  const preguntasRows = abiertasTop.map((q) => `<tr><td>${q.id}</td><td>${esc(q.question.length > 80 ? q.question.slice(0, 77) + '…' : q.question)}</td><td>${esc(q.area)}</td></tr>`).join('');

  // --- defectos confirmados ---
  const bugsRows = data.bugs.map((b) => `<tr><td>${b.id}</td><td>${esc(b.requirement)}</td><td class="${SEVERITY_CLASS[b.level] || ''}">${b.level}</td><td>${b.status === 'Cerrado' ? `Cerrado (${b.closedBy})` : 'Abierto'}</td></tr>`).join('');

  // --- actividad reciente ---
  const actividadRows = meta.actividad.map((a) => `<div class="activity-item"><span class="subject">${esc(a.subject)}</span><span class="date">${a.date}</span></div>`).join('');

  const estadoBadge = { GREEN: ['badge-green', 'EN CURSO'], AMBER: ['badge-amber', 'AMBER'], RED: ['badge-red', 'RED'] }[meta.estadoGlobal];

  const resumenHtml = `<section class="page active executive-page" id="resumen">
<div class="topbar">
  <div><h2>Panel de trazabilidad y estado del proyecto</h2><div class="muted">Resumen ejecutivo — datos extraídos de docs/ el ${new Date(meta.generatedAt).toLocaleString('es-ES')}</div></div>
  <div class="kpi-ribbon">
    <div class="item"><span>Estado global</span><span class="badge-estado ${estadoBadge[0]}">${estadoBadge[1]}</span></div>
    <div class="item"><span>Cobertura funcional</span><b class="purple">${t.coveragePct.toFixed(2).replace('.', ',')}%</b></div>
    <div class="item"><span>Anomalías bloqueantes</span><b class="${m.blocking ? 'red' : 'green'}">${m.blocking}</b></div>
  </div>
</div>
<div class="executive-kpis">
  <div class="executive-kpi"><div class="kpi-label">▣ Requisitos totales</div><div class="kpi-value blue">${t.req}</div><div class="kpi-detail">${t.coveragePct}% cubiertos</div></div>
  <div class="executive-kpi"><div class="kpi-label">⚗ Casos de prueba</div><div class="kpi-value green">${t.tc}</div><div class="kpi-detail">${m.execution.total_waves} ola(s) de ejecución</div></div>
  <div class="executive-kpi"><div class="kpi-label">◎ Cobertura de requisitos</div><div class="kpi-value purple">${t.coveragePct.toFixed(2).replace('.', ',')}%</div><div class="kpi-detail">${t.gapPlan} brechas en el mapa</div></div>
  <div class="executive-kpi"><div class="kpi-label">✹ Defectos confirmados</div><div class="kpi-value red">${t.bugsAbiertos}</div><div class="kpi-detail">${t.bugsCriticos} críticos y ${t.bugsAltos} altos</div></div>
  <div class="executive-kpi"><div class="kpi-label">◉ Preguntas de negocio</div><div class="kpi-value amber">${t.preguntasTotal - t.preguntasAbiertas} / ${t.preguntasTotal}</div><div class="kpi-detail">resueltas o cerradas</div></div>
  <div class="executive-kpi"><div class="kpi-label">▥ Mejoras aceptadas</div><div class="kpi-value blue">${t.mejAceptadas}</div><div class="kpi-detail">de ${t.mejTotal} propuestas</div></div>
</div>
<div class="executive-grid">
  <div class="executive-card span-4"><h3>Cobertura por prioridad</h3><div class="bar-chart">${barChart(prioRows)}</div></div>
  <div class="executive-card span-4"><h3>Casos por grado de automatización</h3><div class="bar-chart">${barChart(gradeRows)}</div></div>
  <div class="executive-card span-4"><h3>Vía de verificación</h3>${viaDonut}</div>
  <div class="executive-card span-4"><h3>Riesgo global del proyecto</h3><div class="gauge-wrap">${gaugeSvg(meta.estadoGlobal)}<div class="gauge-label ${estadoBadge[0].replace('badge-', '')}">${estadoBadge[1]}</div><div class="gauge-sub">${t.bugsCriticos} críticos abiertos · ${t.preguntasAbiertas} preguntas abiertas · ${m.blocking} anomalías bloqueantes</div></div></div>
  <div class="executive-card span-8"><h3>Requisitos con más casos asociados</h3><table class="dashboard-table small-table"><thead><tr><th>REQ</th><th>Descripción</th><th>Módulo</th><th>Casos</th><th>Prioridad</th></tr></thead><tbody>${topReqRows}</tbody></table><div class="link-line">Ver todos los requisitos →</div></div>
  <div class="executive-card span-4"><h3>Preguntas abiertas (${t.preguntasAbiertas})</h3><table class="dashboard-table small-table"><thead><tr><th>ID</th><th>Pregunta</th><th>Bloquea</th></tr></thead><tbody>${preguntasRows}</tbody></table><div class="link-line">Ver las ${t.preguntasAbiertas} preguntas abiertas →</div></div>
  <div class="executive-card span-6"><h3>Defectos confirmados (DOC-24)</h3><table class="dashboard-table small-table"><thead><tr><th>Defecto</th><th>REQ</th><th>Severidad</th><th>Estado</th></tr></thead><tbody>${bugsRows}</tbody></table><div class="link-line">Ver detalles de defectos →</div></div>
  <div class="executive-card span-3"><h3>Roadmap técnico (DOC-16)</h3>${roadmapDonut}<div class="link-line">Ver hoja de ruta completa →</div></div>
  <div class="executive-card span-3"><h3>Actividad reciente</h3><div class="activity-feed">${actividadRows}</div></div>
</div>
<div class="quicklinks">
  <div class="quicklink">▦ Matriz de trazabilidad (DOC-07)</div>
  <div class="quicklink">☑ Requisitos (DOC-04)</div>
  <div class="quicklink">✓ Casos de prueba (DOC-05)</div>
  <div class="quicklink">⛭ Roadmap técnico (DOC-16)</div>
  <div class="quicklink">▤ Manual de usuario (DOC-06)</div>
</div>
<div class="project-info-box"><span class="live-dot"></span><b>Generado el</b> ${new Date(meta.generatedAt).toLocaleString('es-ES')} · <b>Rama</b> ${esc(meta.branch)} · <b>Commit</b> ${esc(meta.commit)} · <b>Fuente</b> docs/ (${data.documents.length} documentos) y registro-ids.json — regenerar con <code>node dashboard/generar-dashboard.js</code></div>
<div class="summary-footnote">ⓘ Todos los números de esta página se calculan al generar el fichero, a partir de los documentos reales del proyecto — nunca se escriben a mano. La cobertura, los bloqueantes y la automatización proceden de ejecutar S-14 (matriz.js); nada se recalcula por separado.</div>
</section>`;

  const paginaPruebas = paginaGenerica('pruebas', 'Casos de Prueba', `Los ${data.tests.length} TC individuales, con objetivo por escenario.`, 'tests', '', 'Visibles,UI,Servicio,Módulos');
  const paginaRequisitos = paginaGenerica('requisitos', 'Requisitos', `Los ${data.requirements.length} requisitos, no solo los problemáticos.`, 'requirements', '', 'Visibles,Críticos,Altos,Módulos');
  const paginaCobertura = `<section class="page" id="cobertura"><h2>Cobertura</h2><div class="muted">Los ${data.coverage.length} requisitos con descripción y casos asociados.</div><Filters kind="coverage"></Filters><div class="summary"><div class="card"><span class="muted">Requisitos visibles</span><b id="covVisible">${data.coverage.length}</b></div><div class="card"><span class="muted">Cubiertos</span><b class="green" id="covCovered">${m.summary.covered}</b></div><div class="card"><span class="muted">Cobertura</span><b class="purple" id="covPercent">${t.coveragePct}%</b></div><div class="card"><span class="muted">Verificación limitada</span><b class="amber" id="covLimited">${data.coverage.filter((r) => r.verification === 'Básica').length}</b></div></div><div class="card coverage-panel" id="coveragePanel"><h3>Cobertura de los requisitos filtrados<button type="button" class="panel-toggle" data-toggle="coveragePanelBody">Ocultar</button></h3><div id="coveragePanelBody"><div id="coverageChart"></div><div class="coverage-note">Cobertura formal significa que existe al menos un caso de prueba asociado. No demuestra ejecución, ausencia de defectos ni que todos los vectores sean alcanzables.</div></div></div><Table kind="coverage"></Table></section>`;
  const paginaPreguntas = paginaGenerica('preguntas', 'Preguntas', `${t.preguntasTotal} preguntas: ${t.preguntasAbiertas} abiertas y ${t.preguntasTotal - t.preguntasAbiertas} respondidas.`, 'questions', '', 'Visibles,Abiertas,Cerradas,Con respuesta');
  const paginaDefectos = paginaGenerica('defectos', 'Defectos', '', 'bugs');
  const paginaRoadmap = `<section class="page" id="roadmap"><h2>Mejoras</h2><Filters kind="roadmap"></Filters><div class="card"><b>Estado de mejoras</b>${Object.entries(roadmapCount).map(([k, v]) => `<div class="chart-row"><span>${roadmapStatusLabel[k] || k}</span><div class="track"><div class="fill" style="width:${(v / data.roadmap.length) * 100}%;background:${roadmapColor[k] || '#888'}"></div></div><b>${v}</b></div>`).join('')}</div><Table kind="roadmap"></Table></section>`;
  const paginaRiesgos = `<section class="page" id="riesgos"><h2>Riesgos y Alertas</h2><div class="muted">Detalle de los factores que componen el riesgo global del proyecto.</div><Filters kind="risks"></Filters><div class="summary"><div class="card"><span class="muted">Riesgos visibles</span><b data-kpi="0">${data.risks.length}</b></div><div class="card"><span class="muted">Nivel alto</span><b class="red" data-kpi="1">${data.risks.filter((r) => r.level === 'Alto').length}</b></div><div class="card"><span class="muted">Nivel medio</span><b class="amber" data-kpi="2">${data.risks.filter((r) => r.level === 'Medio').length}</b></div><div class="card"><span class="muted">Riesgo global</span><b class="badge-estado ${estadoBadge[0]}">${estadoBadge[1]}</b></div></div><Table kind="risks"></Table></section>`;
  const paginaEvolutivos = `<section class="page" id="evolutivos"><h2>Evolutivos</h2><div class="muted">Detalle de evolutivos: impacto, estado, gate y esfuerzo.</div><Filters kind="evolutions"></Filters><div class="summary"><div class="card"><span class="muted">Evolutivos visibles</span><b data-kpi="0">${data.evolutions.length}</b></div><div class="card"><span class="muted">Implementados</span><b class="green" data-kpi="1">${t.evoImplementados}</b></div><div class="card"><span class="muted">Pendientes</span><b class="amber" data-kpi="2">${t.evoPendientes}</b></div><div class="card"><span class="muted">Total</span><b data-kpi="3">${data.evolutions.length}</b></div></div><Table kind="evolutions"></Table></section>`;
  const paginaDocumentos = `<section class="page documents-page" id="documentos"><h2>Documentos</h2><div class="muted">Fuentes utilizadas por el dashboard, filtrables por tipo y ámbito.</div><Filters kind="documents"></Filters><Summary labels="Documentos visibles,Markdown,Datos estructurados,Ámbitos visibles"></Summary><Table kind="documents"></Table></section>`;

  // --- Especificaciones ---
  const specStatusCount = {};
  data.specs.forEach((s) => { const k = s.status || '?'; specStatusCount[k] = (specStatusCount[k] || 0) + 1; });
  const specStatusColor = { Implemented: '#a7f0c9', Approved: '#44d17a', Draft: '#ff9f0a' };
  const paginaEspecificaciones = `<section class="page" id="especificaciones"><h2>Especificaciones</h2><div class="muted">Las ${data.specs.length} especificaciones del proyecto (specs/implemented/) con su estado actual, origen y objetivo.</div><Filters kind="specs"></Filters><Summary labels="Especificaciones visibles,Implementadas,Orígenes distintos"></Summary><div class="card"><b>Estado de las especificaciones</b>${Object.entries(specStatusCount).map(([k, v]) => `<div class="chart-row"><span>${esc(k)}</span><div class="track"><div class="fill" style="width:${(v / data.specs.length) * 100}%;background:${specStatusColor[k] || '#888'}"></div></div><b>${v}</b></div>`).join('')}</div><Table kind="specs"></Table></section>`;

  // --- Nuevas funcionalidades ---
  const funStatusLabel = { proposed: 'Propuestas', accepted: 'Aceptadas', rejected: 'Rechazadas', implemented: 'Implementadas' };
  const funStatusColor = { proposed: '#ff9f0a', accepted: '#44d17a', rejected: '#ff453a', implemented: '#a7f0c9' };
  const funCount = {};
  data.funcionalidades.forEach((f) => { funCount[f.status] = (funCount[f.status] || 0) + 1; });
  const paginaFuncionalidades = `<section class="page" id="funcionalidades"><h2>Nuevas funcionalidades</h2><div class="muted">Las ${data.funcionalidades.length} propuestas de funcionalidad (FUN-nnn) de DOC-25, con impacto, dificultad, valor de negocio y confianza.</div><Filters kind="funcionalidades"></Filters><Summary labels="Propuestas visibles,Impacto alto,Valor de negocio alto"></Summary><div class="card"><b>Estado de las propuestas</b>${Object.entries(funCount).map(([k, v]) => `<div class="chart-row"><span>${funStatusLabel[k] || k}</span><div class="track"><div class="fill" style="width:${(v / data.funcionalidades.length) * 100}%;background:${funStatusColor[k] || '#888'}"></div></div><b>${v}</b></div>`).join('')}</div><Table kind="funcionalidades"></Table></section>`;

  // --- Test Plans ---
  const planCards = data.testplans.map((p) => {
    const none = p.cases - p.green - p.red;
    return `<div class="tp-plan" data-plan="${esc(p.name)}"><h4>${esc(p.name)}</h4><div class="tp-plan-meta"><span>${p.cases} casos</span><span>${p.automated} automatizados</span></div><div class="tp-plan-bar"><span class="tp-green" style="flex:${p.green}"></span><span class="tp-red" style="flex:${p.red}"></span><span class="tp-none" style="flex:${none}"></span></div><div class="tp-plan-legend"><b class="green">${p.green} verde</b> · <b class="red">${p.red} rojo</b> · <span class="muted">${none} sin ejecutar</span></div></div>`;
  }).join('');
  const paginaTestPlans = `<section class="page" id="testplans"><h2>Test Plans</h2><div class="muted">Planes de prueba por módulo (DOC-05 §4) con el estado real de cada caso (DOC-23 · UI, DOC-27 · servicio). Usa el filtro «plan» o pulsa un plan para ver sus casos.</div><Filters kind="testplancases"></Filters><h3 class="tp-h3">Planes de prueba (${data.testplans.length})</h3><div class="tp-plan-grid">${planCards}</div><h3 class="tp-h3">Casos del plan seleccionado</h3><Summary labels="Casos visibles,Verde,Rojo,Sin ejecutar"></Summary><Table kind="testplancases"></Table></section>`;

  const dataJson = JSON.stringify(data);

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>app-taller | Dashboard de Trazabilidad y Estado</title><style>${css}</style></head><body>
<div class="layout"><aside><h1>🛠 app-taller</h1><div class="muted">Dashboard de trazabilidad</div><div class="nav" id="nav"></div><div class="dashboard-version">INFORMACIÓN DEL PROYECTO<br><b>Generado</b> ${new Date(meta.generatedAt).toLocaleDateString('es-ES')}<br><b>Commit</b> ${esc(meta.commit)}<br><b>Rama</b> ${esc(meta.branch)}<br><b>Fuente</b> docs/ + registro-ids.json</div></aside>
<main>
${resumenHtml}
${paginaRequisitos}
${paginaPruebas}
${paginaCobertura}
${paginaTestPlans}
${paginaPreguntas}
${paginaDefectos}
${paginaRoadmap}
${paginaRiesgos}
${paginaEvolutivos}
${paginaEspecificaciones}
${paginaFuncionalidades}
${paginaDocumentos}
</main></div>
<script>const data=${dataJson};
${motor}</script>
</body></html>`;
}

function commitInfo() {
  try {
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
    const branch = execFileSync('git', ['branch', '--show-current'], { cwd: ROOT, encoding: 'utf8' }).trim();
    return { sha, branch };
  } catch { return { sha: '—', branch: '—' }; }
}

function ultimosCommits(n) {
  try {
    const out = execFileSync('git', ['log', '-n', String(n), '--date=format:%d-%m-%Y %H:%M', '--pretty=%ad|%s'], { cwd: ROOT, encoding: 'utf8' });
    return out.trim().split('\n').filter(Boolean).map((l) => {
      const i = l.indexOf('|');
      return { date: l.slice(0, i), subject: l.slice(i + 1) };
    });
  } catch { return []; }
}

function main() {
  const matriz = ejecutaMatriz();
  const requirements = extraeRequisitos();
  const tests = extraeCasos().filter((c) => !c.deprecated);
  const coverage = extraeCobertura(matriz);
  // La matriz (coverage) ya trae, por requisito, los TC asociados y el
  // diagnóstico de S-14 — se enriquece "requirements" con esos mismos campos
  // en vez de recalcularlos, para no tener dos fuentes del mismo dato.
  const coveragePorId = new Map(coverage.map((c) => [c.id, c]));
  for (const r of requirements) {
    const c = coveragePorId.get(r.id);
    r.cases = c ? c.cases : '';
    r.count = c ? c.count : 0;
    r.diagnosis = c ? c.diagnosis : 'GAP PLAN';
  }
  const questions = extraePreguntas();
  const bugs = extraeBugs();
  const roadmap = extraeRoadmap();
  const evolutions = extraeEvolutivos();
  const documents = extraeDocumentos();
  const funcionalidades = extraeFuncionalidades();
  const specs = extraeSpecs();
  const testPlans = extraeTestPlans();
  const risks = sintetizaRiesgos({ preguntas: questions, bugs, roadmap, evolutivos: evolutions });
  const { sha, branch } = commitInfo();
  const actividad = ultimosCommits(6);

  const data = {
    requirements, tests, coverage, questions, bugs, roadmap, risks, evolutions, documents,
    funcionalidades, specs, testplans: testPlans.plans, testplancases: testPlans.cases,
  };

  const bugsCriticos = bugs.filter((b) => b.level === 'Crítico' && b.status === 'Abierto').length;
  const bugsAltos = bugs.filter((b) => b.level === 'Alto' && b.status === 'Abierto').length;
  const preguntasAbiertas = questions.filter((q) => q.status === 'Abierta').length;
  const evoPendientes = evolutions.filter((e) => e.status !== 'implemented').length;

  // Estado global: replica el semáforo AMBER/GREEN/RED del jpg de referencia,
  // a partir de señales reales (nunca inventadas): anomalías bloqueantes de
  // S-14, defectos críticos abiertos, y preguntas abiertas.
  let estadoGlobal = 'GREEN';
  if (matriz.blocking.length > 0 || bugsCriticos > 0) estadoGlobal = 'RED';
  else if (bugsAltos > 0 || preguntasAbiertas > 5) estadoGlobal = 'AMBER';

  const meta = {
    generatedAt: new Date().toISOString(),
    branch, commit: sha,
    estadoGlobal,
    matriz: { summary: matriz.summary, automation: matriz.automation, execution: { total_waves: matriz.execution.total_waves, max_parallelism: matriz.execution.max_parallelism }, blocking: matriz.blocking.length, warnings: matriz.warnings.length },
    actividad,
    totals: {
      req: requirements.length,
      tc: tests.length,
      coveragePct: matriz.summary.coverage_percent,
      gapPlan: matriz.summary.gap_plan,
      bugsAbiertos: bugs.filter((b) => b.status === 'Abierto').length,
      bugsCriticos, bugsAltos,
      preguntasAbiertas, preguntasTotal: questions.length,
      mejAceptadas: roadmap.filter((m) => m.status === 'accepted').length,
      mejPropuestas: roadmap.filter((m) => m.status === 'proposed').length,
      mejTotal: roadmap.length,
      evoImplementados: evolutions.filter((e) => e.status === 'implemented').length,
      evoPendientes,
      evoTotal: evolutions.length,
    },
  };

  fs.writeFileSync(path.join(__dirname, '_data.json'), JSON.stringify({ data, meta }, null, 2));
  console.log('Datos extraídos:');
  console.log('  requisitos:', requirements.length, '| casos:', tests.length, '| cobertura:', meta.totals.coveragePct + '%', '| bloqueantes (S-14):', matriz.blocking.length);
  console.log('  preguntas:', questions.length, '(' + meta.totals.preguntasAbiertas + ' abiertas) | bugs abiertos:', meta.totals.bugsAbiertos, '| estado global:', estadoGlobal);
  console.log('  roadmap:', roadmap.length, '| evolutivos:', evolutions.length, '(' + meta.totals.evoImplementados + ' implementados) | documentos:', documents.length);
  console.log('  riesgos sintetizados:', risks.length);
  console.log('  funcionalidades (FUN):', funcionalidades.length, '| especificaciones:', specs.length, '| planes de prueba:', testPlans.plans.length, '(' + testPlans.cases.length + ' casos)');

  const html = construyeHTML(data, meta);
  fs.writeFileSync(OUT, html);
  console.log('Escrito:', path.relative(ROOT, OUT), '(' + (Math.round(html.length / 1024)) + ' KB)');
}

main();
