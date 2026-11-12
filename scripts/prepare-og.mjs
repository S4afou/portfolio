import path from 'node:path';
import sharp from 'sharp';

const output = path.join(process.cwd(), 'public', 'og.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c8102e" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#c8102e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#09090b"/>
  <circle cx="1090" cy="120" r="330" fill="url(#glow)"/>
  <line x1="80" y1="84" x2="1120" y2="84" stroke="#2a2a2f"/>

  <text x="80" y="220" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="600" letter-spacing="-4" fill="#f4f2ec">Medjahri Mohammed</text>
  <text x="80" y="304" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="600" letter-spacing="-4" fill="#f4f2ec">Safouane</text>
  <text x="80" y="374" font-family="Georgia, serif" font-style="italic" font-size="27" fill="#f4f2ec">the dataset, the model, and the pipeline that keeps it honest.</text>

  <line x1="80" y1="496" x2="1120" y2="496" stroke="#2a2a2f"/>
  <text x="80" y="548" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#a3a19a">AI &amp; Data Science engineering student · ESI-SBA</text>
  <circle cx="94" cy="584" r="5" fill="#ef5468"/>
  <text x="112" y="590" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#a3a19a">Open to a PFE or research internship · ms.medjahri@esi-sba.dz</text>

  <g transform="translate(1006 148) scale(2.6)">
    <path d="M32 2.5 58 17v30L32 61.5 6 47V17Z" stroke="#f4f2ec" stroke-width="1.25" fill="none"/>
    <g transform="translate(32 29)">
      <path d="M-17 1a17 17 0 0 1 34 0A5.67 5.67 0 0 1 5.67 1A5.67 5.67 0 0 1 -5.67 1A5.67 5.67 0 0 1 -17 1Z" fill="#f4f2ec"/>
      <path d="M0 -15V1" stroke="#c8102e" stroke-width="1.1"/>
      <path d="M0 -15 -17 1M0 -15 17 1M0 -15 5.67 1M0 -15 -5.67 1" stroke="#c8102e" stroke-width="0.9"/>
      <path d="M0 1v16a2.6 2.6 0 0 0 5.2 0" stroke="#c8102e" stroke-width="2" stroke-linecap="round" fill="none"/>
    </g>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(output);
console.log(`wrote ${output}`);
