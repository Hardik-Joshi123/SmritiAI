import { zip } from "zip-a-folder";
import fs from 'fs';
import path from 'path';

async function packageExtension() {
  try {
    console.log('📦 Packaging SmritiAI extension...');
    
    // Ensure dist directory exists
    if (!fs.existsSync('dist')) {
      console.error('❌ dist directory not found. Run "npm run build" first.');
      process.exit(1);
    }
    
    // Create extension zip with timestamp
    const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const zipName = `SmritiAI-${timestamp}.zip`;
    
    console.log(`📁 Zipping contents of 'dist/' directory...`);
    await zip('dist', zipName);
