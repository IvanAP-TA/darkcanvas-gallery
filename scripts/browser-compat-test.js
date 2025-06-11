#!/usr/bin/env node

/**
 * Cross-Browser Compatibility Testing Script
 * Validates browser compatibility features and polyfills
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Modern browser features we use that might need polyfills
const BROWSER_FEATURES = {
  css: [
    'backdrop-filter',
    'object-fit',
    'gap',
    'grid',
    'flexbox',
    'css-variables',
    'supports',
    'clamp()',
    'min()',
    'max()',
    'calc()',
    'transform',
    'transition',
    'safe-area-inset'
  ],
  
  javascript: [
    'fetch',
    'Promise',
    'async/await',
    'arrow functions',
    'destructuring',
    'template literals',
    'const/let',
    'Object.assign',
    'Array.from',
    'IntersectionObserver',
    'ResizeObserver'
  ],
  
  html: [
    'picture element',
    'srcset',
    'loading attribute',
    'data attributes'
  ]
};

// Browser support targets (based on browserslist)
const BROWSER_TARGETS = {
  chrome: '>= 91',
  firefox: '>= 90',
  safari: '>= 14',
  edge: '>= 91',
  ios: '>= 14',
  android: '>= 91'
};

function analyzeCSS() {
  try {
    const cssPath = 'src/index.css';
    const content = readFileSync(cssPath, 'utf-8');
    
    const results = {
      modernFeatures: [],
      hasPolyfills: false,
      hasSupportsQueries: false,
      hasFallbacks: false,
      issues: []
    };

    // Check for modern CSS features
    BROWSER_FEATURES.css.forEach(feature => {
      const featurePatterns = {
        'backdrop-filter': /backdrop-filter/g,
        'object-fit': /object-fit/g,
        'gap': /gap:/g,
        'grid': /grid-template|display:\s*grid/g,
        'flexbox': /display:\s*flex/g,
        'css-variables': /var\(--/g,
        'supports': /@supports/g,
        'clamp()': /clamp\(/g,
        'min()': /min\(/g,
        'max()': /max\(/g,
        'calc()': /calc\(/g,
        'transform': /transform:/g,
        'transition': /transition:/g,
        'safe-area-inset': /safe-area-inset/g
      };

      const pattern = featurePatterns[feature];
      if (pattern && pattern.test(content)) {
        results.modernFeatures.push(feature);
      }
    });

    // Check for support queries
    results.hasSupportsQueries = /@supports/.test(content);
    
    // Check for fallbacks
    results.hasFallbacks = /fallback|webkit|moz|ms/.test(content);

    // Identify potential issues
    if (results.modernFeatures.includes('backdrop-filter') && !results.hasSupportsQueries) {
      results.issues.push('backdrop-filter used without @supports fallback');
    }

    if (results.modernFeatures.includes('gap') && !content.includes('margin')) {
      results.issues.push('CSS gap used without margin fallbacks for older browsers');
    }

    return results;
  } catch (error) {
    return {
      error: error.message,
      issues: ['CSS file read error']
    };
  }
}

function analyzeViteConfig() {
  try {
    const configPath = 'vite.config.ts';
    const content = readFileSync(configPath, 'utf-8');
    
    const results = {
      hasLegacyPlugin: false,
      hasTargetConfig: false,
      hasPolyfills: false,
      issues: []
    };

    // Check for legacy browser support
    results.hasLegacyPlugin = content.includes('@vitejs/plugin-legacy');
    results.hasTargetConfig = content.includes('target:') || content.includes('es2015');
    
    // Check for build targets
    if (!results.hasTargetConfig) {
      results.issues.push('No specific build target configured');
    }

    return results;
  } catch (error) {
    return {
      error: error.message,
      issues: ['Vite config read error']
    };
  }
}

function analyzeBrowsersList() {
  try {
    // Check package.json for browserslist
    const packagePath = 'package.json';
    const packageContent = readFileSync(packagePath, 'utf-8');
    const packageJson = JSON.parse(packageContent);
    
    const results = {
      hasBrowsersList: false,
      browserslistConfig: null,
      issues: []
    };

    if (packageJson.browserslist) {
      results.hasBrowsersList = true;
      results.browserslistConfig = packageJson.browserslist;
    } else {
      // Check for .browserslistrc file
      try {
        const browserslistContent = readFileSync('.browserslistrc', 'utf-8');
        results.hasBrowsersList = true;
        results.browserslistConfig = browserslistContent.split('\n').filter(line => line.trim());
      } catch {
        results.issues.push('No browserslist configuration found');
      }
    }

    return results;
  } catch (error) {
    return {
      error: error.message,
      issues: ['Browserslist analysis error']
    };
  }
}

function analyzePolyfills() {
  try {
    const mainPath = 'src/main.tsx';
    const content = readFileSync(mainPath, 'utf-8');
    
    const results = {
      hasIntersectionObserver: false,
      hasResizeObserver: false,
      hasFetchPolyfill: false,
      hasWebVitalsSupport: false,
      issues: []
    };

    // Check for modern API usage and polyfills
    if (content.includes('IntersectionObserver')) {
      results.hasIntersectionObserver = true;
    }
    
    if (content.includes('ResizeObserver')) {
      results.hasResizeObserver = true;
    }
    
    if (content.includes('fetch')) {
      results.hasFetchPolyfill = true;
    }

    if (content.includes('web-vitals') || content.includes('getCLS')) {
      results.hasWebVitalsSupport = true;
    }

    return results;
  } catch (error) {
    return {
      error: error.message,
      issues: ['Main file analysis error']
    };
  }
}

function generateCompatibilityReport() {
  console.log('🌐 Cross-Browser Compatibility Analysis');
  console.log('=====================================\n');

  // CSS Analysis
  console.log('🎨 CSS Feature Analysis:');
  const cssResult = analyzeCSS();
  const cssStatus = cssResult.issues.length === 0 ? '✅' : '⚠️';
  console.log(`${cssStatus} CSS Compatibility`);
  
  if (cssResult.modernFeatures.length > 0) {
    console.log(`   🔧 Modern features used: ${cssResult.modernFeatures.slice(0, 5).join(', ')}${cssResult.modernFeatures.length > 5 ? '...' : ''}`);
  }
  
  if (cssResult.hasSupportsQueries) {
    console.log('   ✅ @supports queries found for feature detection');
  }
  
  if (cssResult.hasFallbacks) {
    console.log('   ✅ Vendor prefixes/fallbacks found');
  }
  
  cssResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  console.log();

  // Vite Config Analysis
  console.log('⚙️ Build Configuration:');
  const viteResult = analyzeViteConfig();
  const viteStatus = viteResult.issues.length === 0 ? '✅' : '⚠️';
  console.log(`${viteStatus} Vite Configuration`);
  
  if (viteResult.hasLegacyPlugin) {
    console.log('   ✅ Legacy browser plugin configured');
  }
  
  if (viteResult.hasTargetConfig) {
    console.log('   ✅ Build target specified');
  }
  
  viteResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  console.log();

  // Browserslist Analysis
  console.log('📋 Browser Support Configuration:');
  const browsersResult = analyzeBrowsersList();
  const browsersStatus = browsersResult.issues.length === 0 ? '✅' : '⚠️';
  console.log(`${browsersStatus} Browserslist Configuration`);
  
  if (browsersResult.hasBrowsersList) {
    console.log('   ✅ Browserslist configuration found');
    if (Array.isArray(browsersResult.browserslistConfig)) {
      console.log(`   📊 Targets: ${browsersResult.browserslistConfig.slice(0, 3).join(', ')}`);
    }
  }
  
  browsersResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  console.log();

  // Polyfills Analysis
  console.log('🔧 Polyfills & Modern APIs:');
  const polyfillsResult = analyzePolyfills();
  console.log('✅ Modern API Support Analysis');
  
  if (polyfillsResult.hasWebVitalsSupport) {
    console.log('   ✅ Web Vitals tracking implemented');
  }
  
  polyfillsResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  console.log();

  // Summary
  const totalIssues = cssResult.issues.length + 
                     viteResult.issues.length + 
                     browsersResult.issues.length + 
                     polyfillsResult.issues.length;

  console.log('📊 Browser Compatibility Summary:');
  console.log(`Total compatibility checks: 4`);
  console.log(`Issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('🎉 Excellent cross-browser compatibility!');
  } else {
    console.log('🔧 Some compatibility improvements recommended.');
  }

  console.log('\n🌐 Browser Testing Checklist:');
  console.log('□ Chrome (latest + 2 versions back)');
  console.log('□ Firefox (latest + 2 versions back)');
  console.log('□ Safari (latest + 2 versions back)');
  console.log('□ Edge (latest + 2 versions back)');
  console.log('□ Mobile Safari (iOS 14+)');
  console.log('□ Chrome Mobile (Android 10+)');
  console.log('□ Test with slow network conditions');
  console.log('□ Test with disabled JavaScript (graceful degradation)');
  console.log('□ Test accessibility features (screen readers, keyboard navigation)');

  console.log('\n🎯 Recommended Browser Support:');
  Object.entries(BROWSER_TARGETS).forEach(([browser, version]) => {
    console.log(`□ ${browser.charAt(0).toUpperCase() + browser.slice(1)}: ${version}`);
  });
}

// Run the analysis
generateCompatibilityReport();
