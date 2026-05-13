#!/usr/bin/env node
/**
 * Generate additional responsive variants for the hero image and the
 * Saatchi Art logo, without touching the original files.
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

async function generate(src, outName, width, quality = 80) {
  const srcPath = path.join(publicDir, src);
  const outPath = path.join(publicDir, outName);
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️  Source missing: ${src}`);
    return;
  }
  await sharp(srcPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  const { size } = fs.statSync(outPath);
  console.log(`✅ ${outName}  (${width}w, ${(size / 1024).toFixed(1)} KiB)`);
}

(async () => {
  // Hero image: existing 9-thumb.webp (600w) + 9.webp (original ~2000w).
  // Add a properly-sized desktop variant.
  await generate('paintings/9.webp', 'paintings/9-1600.webp', 1600, 78);

  // Saatchi Art logo: displayed at 35x35 (≤80w on retina), original is 500x500.
  await generate('saatchi-art.webp', 'saatchi-art-80.webp', 80, 85);
})();
