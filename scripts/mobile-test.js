#!/usr/bin/env node

/**
 * Mobile Responsiveness Testing Script
 * Validates mobile optimization across all pages
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Mobile breakpoints to test
const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

// Touch target minimum size (44x44px for accessibility)
const MIN_TOUCH_TARGET = 44;

// Critical mobile optimizations checklist
const MOBILE_CHECKS = {
  // CSS Classes that should be present for mobile optimization
  responsiveClasses: [
    'xs:', 'sm:', 'md:', 'lg:', 'xl:',
    'min-h-[44px]', 'min-h-[48px]',
    'touch-manipulation',
    'text-sm', 'text-base', 'text-lg'
  ],
  
  // Components that should have mobile-specific optimizations
  criticalComponents: [
    'src/components/layout/Navbar.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/home/Hero.tsx',
    'src/components/Contact.tsx',
    'src/components/portfolio/ArtworkGrid.tsx',
    'src/components/PhotoGallery.tsx'
  ],
  
  // CSS properties that should be present
  cssProperties: [
    'touch-action: manipulation',
    'safe-area-inset',
    '@media (max-width: 475px)',
    'grid-cols-1',
    'flex-col'
  ]
};

function analyzeComponentMobileOptimization(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const results = {
      file: filePath,
      hasResponsiveClasses: false,
      hasTouchOptimization: false,
      hasMinTouchTarget: false,
      hasXsBreakpoint: false,
      responsiveClassesFound: [],
      issues: []
    };

    // Check for responsive classes
    MOBILE_CHECKS.responsiveClasses.forEach(className => {
      if (content.includes(className)) {
        results.responsiveClassesFound.push(className);
        results.hasResponsiveClasses = true;
        
        if (className.startsWith('xs:')) {
          results.hasXsBreakpoint = true;
        }
      }
    });

    // Check for touch optimization
    if (content.includes('touch-manipulation') || content.includes('touch-action')) {
      results.hasTouchOptimization = true;
    }

    // Check for minimum touch target size
    if (content.includes('min-h-[44px]') || content.includes('min-h-[48px]')) {
      results.hasMinTouchTarget = true;
    }

    // Identify potential issues
    if (!results.hasResponsiveClasses) {
      results.issues.push('No responsive classes found');
    }
    
    if (!results.hasXsBreakpoint && filePath.includes('components/')) {
      results.issues.push('Missing xs: breakpoint for mobile-first design');
    }
    
    if (!results.hasTouchOptimization && (
      filePath.includes('Navbar') || 
      filePath.includes('Contact') || 
      filePath.includes('Button')
    )) {
      results.issues.push('Missing touch optimization');
    }

    return results;
  } catch (error) {
    return {
      file: filePath,
      error: error.message,
      issues: ['File read error']
    };
  }
}

function analyzeTailwindConfig() {
  try {
    const configPath = 'tailwind.config.ts';
    const content = readFileSync(configPath, 'utf-8');
    
    const hasXsBreakpoint = content.includes("'xs'") || content.includes('"xs"') || content.includes('xs:');
    const hasContainerPadding = content.includes('padding') && content.includes('container');
    
    return {
      hasXsBreakpoint,
      hasContainerPadding,
      issues: [
        ...(!hasXsBreakpoint ? ['Missing xs breakpoint in Tailwind config'] : []),
        ...(!hasContainerPadding ? ['Missing responsive container padding'] : [])
      ]
    };
  } catch (error) {
    return {
      error: error.message,
      issues: ['Tailwind config read error']
    };
  }
}

function analyzeMainCSS() {
  try {
    const cssPath = 'src/index.css';
    const content = readFileSync(cssPath, 'utf-8');
    
    const hasTouchOptimization = content.includes('touch-action') || content.includes('touch-manipulation');
    const hasSafeArea = content.includes('safe-area-inset');
    const hasResponsiveTypography = content.includes('@media');
    const hasScrollBehavior = content.includes('scroll-behavior');
    
    return {
      hasTouchOptimization,
      hasSafeArea,
      hasResponsiveTypography,
      hasScrollBehavior,
      issues: [
        ...(!hasTouchOptimization ? ['Missing global touch optimization'] : []),
        ...(!hasSafeArea ? ['Missing safe area inset support'] : []),
        ...(!hasResponsiveTypography ? ['Missing responsive typography'] : [])
      ]
    };
  } catch (error) {
    return {
      error: error.message,
      issues: ['CSS file read error']
    };
  }
}

function generateMobileTestReport() {
  console.log('📱 Mobile Responsiveness Analysis Report');
  console.log('========================================\n');

  // Analyze critical components
  console.log('🔍 Component Analysis:');
  const componentResults = MOBILE_CHECKS.criticalComponents.map(analyzeComponentMobileOptimization);
  
  componentResults.forEach(result => {
    const fileName = result.file.split('/').pop();
    const status = result.issues.length === 0 ? '✅' : '⚠️';
    
    console.log(`${status} ${fileName}`);
    if (result.responsiveClassesFound.length > 0) {
      console.log(`   📐 Responsive classes: ${result.responsiveClassesFound.slice(0, 5).join(', ')}${result.responsiveClassesFound.length > 5 ? '...' : ''}`);
    }
    if (result.issues.length > 0) {
      result.issues.forEach(issue => console.log(`   ❌ ${issue}`));
    }
    console.log();
  });

  // Analyze Tailwind config
  console.log('⚙️ Tailwind Configuration:');
  const tailwindResult = analyzeTailwindConfig();
  const tailwindStatus = tailwindResult.issues.length === 0 ? '✅' : '⚠️';
  console.log(`${tailwindStatus} Tailwind Config`);
  if (tailwindResult.issues.length > 0) {
    tailwindResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  }
  console.log();

  // Analyze main CSS
  console.log('🎨 CSS Analysis:');
  const cssResult = analyzeMainCSS();
  const cssStatus = cssResult.issues.length === 0 ? '✅' : '⚠️';
  console.log(`${cssStatus} Main CSS File`);
  if (cssResult.issues.length > 0) {
    cssResult.issues.forEach(issue => console.log(`   ❌ ${issue}`));
  }
  console.log();

  // Summary
  const totalIssues = componentResults.reduce((sum, r) => sum + r.issues.length, 0) + 
                     tailwindResult.issues.length + 
                     cssResult.issues.length;
  
  console.log('📊 Summary:');
  console.log(`Total components analyzed: ${componentResults.length}`);
  console.log(`Total issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('🎉 All mobile optimizations are in place!');
  } else {
    console.log('🔧 Some optimizations may need attention.');
  }

  console.log('\n📋 Mobile Testing Checklist:');
  console.log('□ Test on Chrome DevTools mobile emulation');
  console.log('□ Test on actual mobile devices');
  console.log('□ Verify touch targets are at least 44px');
  console.log('□ Check horizontal scrolling is prevented');
  console.log('□ Verify text is readable without zooming');
  console.log('□ Test form inputs on mobile');
  console.log('□ Check modal and overlay behavior');
  console.log('□ Verify safe area insets on notched devices');
}

// Run the analysis
generateMobileTestReport();
