#!/usr/bin/env node

/**
 * Fix build script - Renames .tsx files to .js and updates references
 */

const fs = require('fs');
const path = require('path');

function fixBuildFiles() {
  const buildDir = path.join(__dirname, '../build');
  const assetsDir = path.join(buildDir, 'assets');
  
  console.log('🔧 Fixing build files...');
  console.log('Build dir:', buildDir);
  console.log('Assets dir:', assetsDir);
  
  if (!fs.existsSync(assetsDir)) {
    console.log('❌ Assets directory not found');
    return;
  }
  
  const files = fs.readdirSync(assetsDir);
  console.log('Files found:', files);
  
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  console.log('TSX files:', tsxFiles);
  
  tsxFiles.forEach(tsxFile => {
    const oldPath = path.join(assetsDir, tsxFile);
    const newFileName = tsxFile.replace('.tsx', '.js');
    const newPath = path.join(assetsDir, newFileName);
    
    try {
      // Copy file content
      const content = fs.readFileSync(oldPath);
      fs.writeFileSync(newPath, content);
      console.log(`✅ Created: ${newFileName}`);
      
      // Remove original file
      fs.unlinkSync(oldPath);
      console.log(`✅ Removed: ${tsxFile}`);
      
      // Update index.html references
      const indexPath = path.join(buildDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        indexContent = indexContent.replace(new RegExp(tsxFile, 'g'), newFileName);
        fs.writeFileSync(indexPath, indexContent);
        console.log(`✅ Updated index.html references`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${tsxFile}:`, error.message);
    }
  });
  
  console.log('🎉 Build files fixed!');
}

fixBuildFiles();
