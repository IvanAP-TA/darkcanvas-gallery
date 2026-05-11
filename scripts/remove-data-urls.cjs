#!/usr/bin/env node

/**
 * Remove problematic data URLs from modulepreload links
 * These cause MIME type errors because they're encoded as octet-stream
 */

const fs = require('fs');
const path = require('path');

function removeDataUrls() {
  const indexPath = path.join(__dirname, '../build/index.html');
  
  if (!fs.existsSync(indexPath)) {
    console.log('❌ index.html not found');
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  const originalLength = content.length;
  
  // Remove modulepreload links with data: URLs
  content = content.replace(/<link rel="modulepreload" href="data:[^"]*"[^>]*>/g, '');
  
  if (content.length < originalLength) {
    fs.writeFileSync(indexPath, content);
    console.log('✅ Removed data: URL modulepreload links');
    console.log(`   Removed ${originalLength - content.length} bytes`);
  } else {
    console.log('ℹ️  No data: URL modulepreload links found');
  }
}

removeDataUrls();
