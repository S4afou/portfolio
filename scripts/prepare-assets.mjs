import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const out = (p) => path.join(root, 'public', p);

const folders = [
  'projects/pocket-omr',
  'projects/spell-caster',
  'projects/h-gate',
  'projects/nasa',
];

async function ensureDirs() {
  for (const folder of folders) {
    await fs.mkdir(out(folder), { recursive: true });
  }
}

async function webp(src, dest, width, quality = 82) {
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(out(dest));
}

async function renderSvg(svg, dest, width) {
  await sharp(Buffer.from(svg), { density: 144 })
    .resize(width)
    .webp({ quality: 88 })
    .toFile(out(dest));
}

const pocket = 'E:/All/Studies/Procket_OMR/Report';
const spell = 'E:/All/Studies/Final/Images';

async function pocketOmr() {
  // Cover: the original and rectified sheet panels, recomposed on the site's dark background.
  const segmentation = path.join(pocket, 'report_plots/03_segmentation_pipeline.png');
  const panel = { left: 0, top: 48, width: 798, height: 830 };
  const original = await sharp(segmentation).extract(panel).resize({ height: 780 }).toBuffer();
  const canonical = await sharp(segmentation)
    .extract({ ...panel, left: 798 })
    .resize({ height: 780 })
    .toBuffer();

  await sharp({ create: { width: 1600, height: 900, channels: 3, background: '#080809' } })
    .composite([
      { input: original, left: 35, top: 60 },
      { input: canonical, left: 815, top: 60 },
    ])
    .webp({ quality: 84 })
    .toFile(out('projects/pocket-omr/cover.webp'));

  await webp(path.join(pocket, 'Diagrams/System Architecture Diagram.png'), 'projects/pocket-omr/architecture.webp', 1400);
  await webp(path.join(pocket, 'report_plots/03_segmentation_pipeline.png'), 'projects/pocket-omr/segmentation.webp', 1300);
  await webp(path.join(pocket, 'report_plots/21_sample_predictions.png'), 'projects/pocket-omr/name-recognition.webp', 2200);
  await webp(path.join(pocket, 'report_plots/05_per_field_bar_metrics.png'), 'projects/pocket-omr/per-field-metrics.webp', 1500);
}

async function spellCaster() {
  await webp(path.join(spell, 'fireball_cast.png'), 'projects/spell-caster/cover.webp', 1000);
  await webp(path.join(spell, 'whisperspellengine_architecture.png'), 'projects/spell-caster/architecture.webp', 1600);
  await webp(path.join(spell, 'ice_cast.png'), 'projects/spell-caster/ice-cast.webp', 1100);
  await webp(path.join(spell, 'whisper_confusion_matrix.png'), 'projects/spell-caster/confusion-matrix.webp', 900);
  // The source latency plot measures the unquantised CPU/GPU paths, not the INT8 result we publish.
  await renderSvg(spellLatency(), 'projects/spell-caster/latency.webp', 1600);
}

function spellLatency() {
  const scale = 24;
  const bar = { value: 19.3, y: 360 };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <rect width="1600" height="900" fill="#080809"/>
    <text x="80" y="90" font-family="Consolas, monospace" font-size="24" letter-spacing="4" fill="#c8102e">INFERENCE LATENCY</text>
    <text x="80" y="130" font-family="Consolas, monospace" font-size="18" letter-spacing="3" fill="#96968f">CONFORMER · CPU · BATCH SIZE 1 · ONNX INT8</text>
    <text x="80" y="${bar.y - 20}" font-family="Consolas, monospace" font-size="24" fill="#96968f">INT8</text>
    <rect x="80" y="${bar.y}" width="${bar.value * scale}" height="64" fill="#c8102e"/>
    <text x="${80 + bar.value * scale + 24}" y="${bar.y + 44}" font-family="Consolas, monospace" font-size="34" fill="#f2f1ed">${bar.value} ms</text>
    <text x="80" y="700" font-family="Arial, sans-serif" font-size="17" fill="#6f6f6a">Measured on CPU after ONNX export. The Whisper transcription path was not benchmarked.</text>
  </svg>`;
}

async function hGate() {
  const notebook = JSON.parse(
    await fs.readFile('E:/All/Studies/Final/HGATE_Malicious_URL_Detection.ipynb', 'utf8')
  );
  const pngs = [];
  for (const cell of notebook.cells ?? []) {
    for (const output of cell.outputs ?? []) {
      const data = output.data ?? {};
      const png = data['image/png'];
      if (png) {
        const raw = Array.isArray(png) ? png.join('') : png;
        pngs.push(Buffer.from(raw, 'base64'));
      }
    }
  }

  // Notebook order: class distribution, HHO convergence, confusion matrix, ROC curves, SHAP.
  const wanted = [
    { index: 0, name: 'class-distribution' },
    { index: 2, name: 'confusion-matrix' },
    { index: 3, name: 'roc' },
  ];

  for (const item of wanted) {
    const buffer = pngs[item.index];
    if (!buffer) continue;
    await sharp(buffer)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(out(`projects/h-gate/${item.name}.webp`));
  }

  await renderSvg(hGateCover(), 'projects/h-gate/cover.webp', 1600);
}

function hGateCover() {
  const base = [
    { x: 70, label: 'FT-TRANSFORMER', sub: 'PyTorch' },
    { x: 450, label: 'LIGHTGBM', sub: 'focal loss' },
    { x: 830, label: 'XGBOOST', sub: 'class-weighted' },
    { x: 1210, label: 'CATBOOST', sub: 'balanced' },
  ];

  const boxes = base
    .map(
      (item) => `
    <rect x="${item.x}" y="210" width="320" height="150" fill="#0d0d0f" stroke="#242428"/>
    <text x="${item.x + 24}" y="262" font-family="Consolas, monospace" font-size="24" fill="#f2f1ed">${item.label}</text>
    <text x="${item.x + 24}" y="300" font-family="Arial, sans-serif" font-size="18" fill="#96968f">${item.sub}</text>
    <line x1="${item.x + 160}" y1="360" x2="${item.x + 160}" y2="430" stroke="#3a3a3f" stroke-width="2"/>
    <line x1="${item.x + 160}" y1="430" x2="800" y2="430" stroke="#3a3a3f" stroke-width="2"/>
    <line x1="800" y1="430" x2="800" y2="475" stroke="#c8102e" stroke-width="2"/>`
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M80 0H0V80" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1600" height="1000" fill="#080809"/>
    <rect width="1600" height="1000" fill="url(#grid)"/>
    <text x="70" y="90" font-family="Consolas, monospace" font-size="26" letter-spacing="6" fill="#c8102e">H-GATE</text>
    <text x="70" y="130" font-family="Consolas, monospace" font-size="20" letter-spacing="4" fill="#96968f">STACKED MALICIOUS-URL DETECTION</text>
    ${boxes}
    <rect x="500" y="475" width="600" height="100" fill="#0d0d0f" stroke="#242428"/>
    <text x="530" y="516" font-family="Consolas, monospace" font-size="24" fill="#f2f1ed">LOGISTIC META-LEARNER</text>
    <text x="530" y="550" font-family="Arial, sans-serif" font-size="18" fill="#96968f">5-fold out-of-fold · SMOTE-NC · recall floor 0.90</text>
    <line x1="800" y1="575" x2="800" y2="640" stroke="#3a3a3f" stroke-width="2"/>
    <rect x="590" y="640" width="420" height="96" fill="#0d0d0f" stroke="#c8102e" stroke-width="2"/>
    <text x="620" y="682" font-family="Consolas, monospace" font-size="24" fill="#f2f1ed">5-CLASS PREDICTION</text>
    <text x="620" y="714" font-family="Arial, sans-serif" font-size="18" fill="#96968f">defacement · benign · malware · phishing · spam</text>
    <text x="70" y="900" font-family="Consolas, monospace" font-size="22" fill="#96968f">MACRO-F1</text>
    <text x="70" y="940" font-family="Consolas, monospace" font-size="34" fill="#f2f1ed">0.9856</text>
    <text x="420" y="900" font-family="Consolas, monospace" font-size="22" fill="#96968f">MACRO-FPR</text>
    <text x="420" y="940" font-family="Consolas, monospace" font-size="34" fill="#f2f1ed">0.37%</text>
    <text x="760" y="900" font-family="Consolas, monospace" font-size="22" fill="#96968f">BASELINE MACRO-F1</text>
    <text x="760" y="940" font-family="Consolas, monospace" font-size="34" fill="#96968f">0.9839</text>
    <text x="1220" y="940" font-family="Consolas, monospace" font-size="18" fill="#c8102e">ISCX-URL2016 · 36,707 URLs</text>
  </svg>`;
}

function nasaCover() {
  const nodes = [
    { angle: -90, label: 'TRAIN', sub: 'LOF on normal rows' },
    { angle: -18, label: 'REGISTER', sub: 'W&amp;B artifact' },
    { angle: 54, label: 'SERVE', sub: 'Streamlit + logging' },
    { angle: 126, label: 'MONITOR', sub: 'batch F1 vs baseline' },
    { angle: 198, label: 'RETRAIN', sub: 'below 0.80' },
  ];

  const cx = 800;
  const cy = 520;
  const r = 300;

  const boxes = nodes
    .map((node) => {
      const rad = (node.angle * Math.PI) / 180;
      const x = cx + r * Math.cos(rad) - 130;
      const y = cy + r * Math.sin(rad) - 45;
      return `
      <rect x="${x}" y="${y}" width="260" height="90" fill="#0d0d0f" stroke="#242428"/>
      <text x="${x + 24}" y="${y + 40}" font-family="Consolas, monospace" font-size="24" fill="#f2f1ed">${node.label}</text>
      <text x="${x + 24}" y="${y + 68}" font-family="Arial, sans-serif" font-size="16" fill="#96968f">${node.sub}</text>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
    <defs>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M80 0H0V80" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
      </pattern>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
        <path d="M0,0 L0,6 L9,3 z" fill="#c8102e"/>
      </marker>
    </defs>
    <rect width="1600" height="1000" fill="#080809"/>
    <rect width="1600" height="1000" fill="url(#grid)"/>
    <text x="70" y="90" font-family="Consolas, monospace" font-size="26" letter-spacing="6" fill="#c8102e">SHUTTLE</text>
    <text x="70" y="130" font-family="Consolas, monospace" font-size="20" letter-spacing="4" fill="#96968f">SEMI-SUPERVISED ANOMALY DETECTION / MLOPS LOOP</text>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#242428" stroke-width="2" stroke-dasharray="8 10"/>
    <path d="M ${cx + 60} ${cy - r + 8} A ${r} ${r} 0 0 1 ${cx + r - 20} ${cy - 90}" fill="none" stroke="#c8102e" stroke-width="3" marker-end="url(#arrow)"/>
    ${boxes}
    <text x="${cx}" y="${cy - 20}" text-anchor="middle" font-family="Consolas, monospace" font-size="26" fill="#96968f">PRODUCTION F1</text>
    <text x="${cx}" y="${cy + 40}" text-anchor="middle" font-family="Consolas, monospace" font-size="56" fill="#c8102e">0.979 -> 0.432</text>
    <text x="${cx}" y="${cy + 90}" text-anchor="middle" font-family="Consolas, monospace" font-size="22" fill="#96968f">DRIFT INJECTED · RETRAIN FIRED</text>
    <text x="70" y="940" font-family="Consolas, monospace" font-size="20" fill="#96968f">55,941 TELEMETRY ROWS · OPENML SHUTTLE</text>
  </svg>`;
}

function nasaChart() {
  const scale = 900;
  const rows = [
    { label: 'BASELINE', value: 0.979, y: 250, color: '#f2f1ed', note: 'registered artifact' },
    { label: 'PRODUCTION', value: 0.432, y: 430, color: '#c8102e', note: 'after injected drift' },
  ];

  const bars = rows
    .map(
      (row) => `
      <text x="80" y="${row.y - 10}" font-family="Consolas, monospace" font-size="20" fill="#96968f">${row.label}</text>
      <rect x="80" y="${row.y}" width="${row.value * scale}" height="56" fill="${row.color}"/>
      <text x="${80 + row.value * scale + 24}" y="${row.y + 38}" font-family="Consolas, monospace" font-size="26" fill="#f2f1ed">${row.value.toFixed(3)}</text>
      <text x="80" y="${row.y + 100}" font-family="Arial, sans-serif" font-size="17" fill="#6f6f6a">${row.note}</text>`
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
    <rect width="1600" height="900" fill="#080809"/>
    <text x="80" y="90" font-family="Consolas, monospace" font-size="24" letter-spacing="4" fill="#c8102e">MONITORING</text>
    <text x="80" y="130" font-family="Consolas, monospace" font-size="18" letter-spacing="3" fill="#96968f">F1 AGAINST THE REGISTERED BASELINE</text>
    ${bars}
    <line x1="${80 + 0.8 * scale}" y1="190" x2="${80 + 0.8 * scale}" y2="620" stroke="#c8102e" stroke-width="2" stroke-dasharray="6 8"/>
    <text x="${80 + 0.8 * scale + 14}" y="210" font-family="Consolas, monospace" font-size="18" fill="#c8102e">RETRAIN &lt; 0.80</text>
    <text x="80" y="820" font-family="Arial, sans-serif" font-size="17" fill="#6f6f6a">Baseline and production F1 as recorded in the project's logged runs. Drift was injected deliberately to prove the retraining loop.</text>
  </svg>`;
}

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="glow" cx="72%" cy="0%" r="80%">
        <stop offset="0%" stop-color="#c8102e" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#c8102e" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#080809"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <path d="M960 90 1052 141v102l-92 51-92-51V141Z" fill="none" stroke="#f2f1ed" stroke-width="2"/>
    <g transform="translate(960 208)">
      <path d="M-44 3a44 44 0 0 1 88 0A14.7 14.7 0 0 1 29.3 3A14.7 14.7 0 0 1 -29.3 3A14.7 14.7 0 0 1 -44 3Z" fill="#f2f1ed"/>
      <path d="M0 -41V3M0 -41 -44 3M0 -41 44 3M0 -41 29.3 3M0 -41 -29.3 3" stroke="#c8102e" stroke-width="2.5" fill="none"/>
      <path d="M0 3v41a7 7 0 0 0 14 0" fill="none" stroke="#c8102e" stroke-width="6" stroke-linecap="round"/>
    </g>
    <text x="90" y="150" font-family="Consolas, monospace" font-size="20" letter-spacing="6" fill="#c8102e">AI &amp; DATA SCIENCE / ESI-SBA</text>
    <text x="90" y="280" font-family="Arial, sans-serif" font-size="76" font-weight="bold" fill="#f2f1ed">Medjahri Mohammed</text>
    <text x="90" y="366" font-family="Arial, sans-serif" font-size="76" font-weight="bold" fill="#f2f1ed">Safouane</text>
    <text x="90" y="440" font-family="Arial, sans-serif" font-size="26" fill="#96968f">End-to-end machine learning — vision, speech, and MLOps.</text>
    <text x="90" y="548" font-family="Consolas, monospace" font-size="19" fill="#96968f">ms.medjahri@esi-sba.dz</text>
    <text x="90" y="584" font-family="Consolas, monospace" font-size="19" fill="#c8102e">OPEN TO A PFE OR RESEARCH INTERNSHIP</text>
  </svg>`;
}

await ensureDirs();
await pocketOmr();
await spellCaster();
await hGate();
await renderSvg(nasaCover(), 'projects/nasa/cover.webp', 1600);
await renderSvg(nasaChart(), 'projects/nasa/monitoring.webp', 1600);
await sharp(Buffer.from(ogImage()), { density: 144 }).png().toFile(out('og.png'));

console.log('assets prepared');
