#!/usr/bin/env node

/**
 * Simple script to check if the deployment is working
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Checking deployment readiness...\n');

// Check if build directory exists
const buildDir = 'build';
if (!existsSync(buildDir)) {
  console.error('❌ Build directory not found. Run `npm run build` first.');
  process.exit(1);
}

// Check essential files
const essentialFiles = [
  'index.html',
  '_app/version.json',
  'health.json'
];

let allFilesExist = true;

essentialFiles.forEach(file => {
  const filePath = join(buildDir, file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Check index.html content
const indexPath = join(buildDir, 'index.html');
if (existsSync(indexPath)) {
  const indexContent = readFileSync(indexPath, 'utf8');
  if (indexContent.includes('Intertwinked')) {
    console.log('✅ index.html contains app title');
  } else {
    console.log('⚠️  index.html might be missing app content');
  }
}

// Check health.json
const healthPath = join(buildDir, 'health.json');
if (existsSync(healthPath)) {
  try {
    const health = JSON.parse(readFileSync(healthPath, 'utf8'));
    console.log(`✅ Health check: ${health.status}`);
  } catch (e) {
    console.log('⚠️  health.json is not valid JSON');
  }
}

console.log('\n📊 Build Summary:');
console.log(`- Build directory: ${buildDir}`);
console.log(`- All essential files: ${allFilesExist ? '✅' : '❌'}`);

if (allFilesExist) {
  console.log('\n🚀 Deployment ready!');
  console.log('The build can be deployed to IPFS or any static hosting service.');
} else {
  console.log('\n❌ Deployment not ready. Please fix the missing files.');
  process.exit(1);
}