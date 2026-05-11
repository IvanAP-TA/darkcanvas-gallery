#!/usr/bin/env node

/**
 * Fix .tsx files in build output and delete to force bundling
 * Some build artifacts are created as .tsx instead of being bundled
 * This script deletes them to force Vite to include them in main bundle
 */

const fs = require('fs');
const path = require('path');

function fixTsxFiles() {
  const buildDir = path.join(__dirname, '../build');
  const assetsDir = path.join(buildDir, 'assets');
  
  console.log('🔧 Checking for .tsx files in build...');
  
  if (!fs.existsSync(assetsDir)) {
    console.log('❌ Assets directory not found');
    return;
  }
  
  const files = fs.readdirSync(assetsDir);
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  
  if (tsxFiles.length === 0) {
    console.log('✅ No .tsx files found - build is clean');
    return;
  }
  
  console.log(`Found ${tsxFiles.length} .tsx file(s) - these should be bundled in main!`);
  console.log('Deleting to force rebuild with proper bundling...');
  
  tsxFiles.forEach(tsxFile => {
    const filePath = path.join(assetsDir, tsxFile);
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Deleted: ${tsxFile}`);
    } catch (error) {
      console.error(`❌ Error deleting ${tsxFile}:`, error.message);
    }
  });
  
  console.log('⚠️  Rebuild required - .tsx files detected and deleted');
  console.log('Run: npm run build again');
}

fixTsxFiles();
