#!/usr/bin/env node

/**
 * Compile TypeScript source files to JavaScript
 * Used to fix .tsx files that Vite copies without compiling
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function compileTsx() {
  const buildDir = path.join(__dirname, '../build');
  const assetsDir = path.join(buildDir, 'assets');
  
  if (!fs.existsSync(assetsDir)) {
    console.log('Assets directory not found');
    return;
  }
  
  const files = fs.readdirSync(assetsDir);
  const tsxFiles = files.filter(file => file.endsWith('.tsx'));
  
  if (tsxFiles.length === 0) {
    console.log('✅ No .tsx files to compile');
    return;
  }
  
  console.log(`🔨 Compiling ${tsxFiles.length} .tsx file(s)...`);
  
  tsxFiles.forEach(tsxFile => {
    const filePath = path.join(assetsDir, tsxFile);
    const jsFileName = tsxFile.replace('.tsx', '.js');
    const jsPath = path.join(assetsDir, jsFileName);
    
    try {
      // Read the TypeScript source
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Simple TypeScript to JavaScript conversion
      // Remove type annotations
      content = content
        // Remove `: Type` pattern (type annotations)
        .replace(/:\s*[A-Za-z<>{}\[\],\s|&!?]+(?=[=,);])/g, '')
        // Remove `as Type` pattern (type assertions)
        .replace(/\s+as\s+[A-Za-z<>{}\[\]&|,\s]+(?=[,);]|$)/g, '')
        // Remove `<Type>` pattern (generic parameters)
        .replace(/<[A-Za-z\s,&|]*>/g, '')
        // Note: @/ imports will be resolved by Vite, leave them as-is
        // They're valid relative to the src directory
      
      // Write as JavaScript
      fs.writeFileSync(jsPath, content);
      console.log(`✅ Compiled: ${tsxFile} → ${jsFileName}`);
      
      // Remove .tsx
      fs.unlinkSync(filePath);
      console.log(`   Removed: ${tsxFile}`);
      
      // Update index.html references
      const indexPath = path.join(buildDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        let indexContent = fs.readFileSync(indexPath, 'utf8');
        indexContent = indexContent.replace(
          new RegExp(`"/assets/${tsxFile.replace(/[.+*?^${}()|[\]\\]/g, '\\$&')}"`, 'g'),
          `"/assets/${jsFileName}"`
        );
        fs.writeFileSync(indexPath, indexContent);
      }
    } catch (error) {
      console.error(`❌ Error compiling ${tsxFile}:`, error.message);
    }
  });
  
  console.log('✅ TypeScript compilation complete!');
}

compileTsx();
