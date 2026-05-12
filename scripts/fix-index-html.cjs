#!/usr/bin/env node

/**
 * Fix index.html after build to ensure correct script loading
 * - Remove external scripts (gpteng.co)
 * - Ensure main bundle is loaded as script module
 */

const fs = require('fs');
const path = require('path');

function fixIndexHtml() {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html not found');
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  const originalContent = content;
  
  console.log('🔧 Fixing index.html...');
  
  // 1. Remove external gpteng.co script
  content = content.replace(
    /<script[^>]*src="https:\/\/cdn\.gpteng\.co\/[^"]*"[^>]*><\/script>/g,
    ''
  );
  console.log('✅ Removed external script');
  
  // 2. Find main bundle file (look for main-*.js)
  const mainBundleMatch = content.match(/\/assets\/main-[a-zA-Z0-9]+\.js/);
  if (!mainBundleMatch) {
    console.log('⚠️  Main bundle not found in index.html');
    return;
  }
  
  const mainBundlePath = mainBundleMatch[0];
  console.log(`Found main bundle: ${mainBundlePath}`);
  
  // 3. Replace the script module src to point to main bundle
  // Remove old script module tags for index helper
  content = content.replace(
    /<script[^>]*type="module"[^>]*src="\/assets\/index-[a-zA-Z0-9]+\.js"[^>]*><\/script>/g,
    `<script type="module" crossorigin src="${mainBundlePath}"></script>`
  );
  console.log('✅ Updated script module to load main bundle');
  
  if (content !== originalContent) {
    fs.writeFileSync(indexPath, content);
    console.log('✅ index.html updated successfully');
  } else {
    console.log('ℹ️  No changes needed');
  }
}

fixIndexHtml();
