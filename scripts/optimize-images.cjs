const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for image optimization
const OPTIMIZATION_CONFIG = {
  webp: {
    quality: 85,
    effort: 6,
  },
  thumb: {
    width: 400,
    height: 533,
    quality: 75,
  },
  full: {
    width: 800,
    height: 1067,
    quality: 85,
  }
};

// Directories
const INPUT_DIR = path.join(__dirname, '../public/paintings');
const OUTPUT_DIR = path.join(__dirname, '../public/paintings');

async function optimizeImage(inputPath, outputPath, options) {
  try {
    let pipeline = sharp(inputPath);
    
    if (options.width && options.height) {
      pipeline = pipeline.resize(options.width, options.height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    await pipeline
      .webp({
        quality: options.quality,
        effort: OPTIMIZATION_CONFIG.webp.effort
      })
      .toFile(outputPath);
      
    const stats = fs.statSync(outputPath);
    console.log(`✓ Optimized: ${path.basename(outputPath)} (${(stats.size / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function generateResponsiveImages() {
  if (!fs.existsSync(INPUT_DIR)) {
    console.error('Input directory does not exist:', INPUT_DIR);
    return;
  }
  
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .filter(file => !file.includes('-thumb'));
  
  console.log(`Found ${files.length} images to optimize...`);
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.parse(file).name;
    
    // Generate full-size WebP
    const fullOutputPath = path.join(OUTPUT_DIR, `${baseName}.webp`);
    await optimizeImage(inputPath, fullOutputPath, OPTIMIZATION_CONFIG.full);
    
    // Generate thumbnail WebP
    const thumbOutputPath = path.join(OUTPUT_DIR, `${baseName}-thumb.webp`);
    await optimizeImage(inputPath, thumbOutputPath, OPTIMIZATION_CONFIG.thumb);
  }
  
  console.log('✅ Image optimization complete!');
}

// Performance monitoring functions
function generateImagePreloadList() {
  const criticalImages = [
    '/paintings/9.webp', // Hero image
    '/paintings/1.webp', // First portfolio image
    '/paintings/3.webp', // Second portfolio image
    '/saatchi-art.webp', // Logo
  ];
  
  const preloadScript = criticalImages.map(src => 
    `<link rel="preload" href="${src}" as="image" fetchpriority="high">`
  ).join('\n    ');
  
  console.log('\nAdd these preload tags to your HTML head:');
  console.log(preloadScript);
}

// Size analysis
function analyzeImageSizes() {
  const webpFiles = fs.readdirSync(INPUT_DIR)
    .filter(file => file.endsWith('.webp'));
  
  let totalSize = 0;
  const sizeReport = [];
  
  webpFiles.forEach(file => {
    const filePath = path.join(INPUT_DIR, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    totalSize += stats.size;
    
    sizeReport.push({
      file,
      size: sizeKB + 'KB',
      category: file.includes('-thumb') ? 'thumbnail' : 'full'
    });
  });
  
  console.log('\n📊 Image Size Analysis:');
  console.log(`Total WebP images: ${webpFiles.length}`);
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  
  // Group by category
  const thumbnails = sizeReport.filter(img => img.category === 'thumbnail');
  const fullSize = sizeReport.filter(img => img.category === 'full');
  
  console.log(`\nThumbnails (${thumbnails.length}): Avg ${(thumbnails.reduce((sum, img) => sum + parseFloat(img.size), 0) / thumbnails.length).toFixed(1)}KB`);
  console.log(`Full-size (${fullSize.length}): Avg ${(fullSize.reduce((sum, img) => sum + parseFloat(img.size), 0) / fullSize.length).toFixed(1)}KB`);
}

// Main execution
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'optimize':
      generateResponsiveImages();
      break;
    case 'analyze':
      analyzeImageSizes();
      break;
    case 'preload':
      generateImagePreloadList();
      break;
    default:
      console.log('Available commands:');
      console.log('  npm run optimize-images optimize  - Optimize images to WebP');
      console.log('  npm run optimize-images analyze   - Analyze image sizes');
      console.log('  npm run optimize-images preload   - Generate preload tags');
  }
}