import { db } from './db';
import { loadHnswlib } from 'hnswlib-wasm/dist/hnswlib.js';

// Global HNSW index instance
let hnswIndex = null;
let hnswLib = null;
let isIndexInitialized = false;
// Queue pages for indexing if they arrive before the index is initialized
const pendingIndexQueue = [];

// Configuration for HNSW
let HNSW_CONFIG = {
  dimension: 384, // all-MiniLM-L6-v2 embedding dimension
  maxElements: 10000, // Maximum number of pages we can index
  ef: 200, // ef parameter for search quality
  M: 16, // M parameter for construction
  metric: 'cosine' // Use cosine distance for semantic similarity
};

// Search settings
let searchSettings = {
  searchResultCount: 5,
  autoIndex: true
};

/**
 * Initializes the HNSW search index.
 * Loads the HNSW library and creates/loads the index with existing data.
 */
export async function initSearchIndex() {
  try {
    console.log('Loading HNSW library...');
    hnswLib = await loadHnswlib();
    
    console.log('Initializing HNSW index...');
    // Based on TypeScript definitions, HierarchicalNSW expects 3 parameters
    hnswIndex = new hnswLib.HierarchicalNSW(HNSW_CONFIG.metric, HNSW_CONFIG.dimension, '');
    // initIndex expects 4 parameters: maxElements, m, efConstruction, randomSeed
    hnswIndex.initIndex(HNSW_CONFIG.maxElements, HNSW_CONFIG.M, HNSW_CONFIG.ef, 100);
    
    // Load existing pages into the index
    await rebuildIndex();
    
    isIndexInitialized = true;
    console.log('HNSW search index initialized successfully.');

    // Flush any pages that arrived before initialization completed
    if (pendingIndexQueue.length > 0) {
      console.log(`Flushing ${pendingIndexQueue.length} queued pages into HNSW index...`);
      for (const page of pendingIndexQueue.splice(0, pendingIndexQueue.length)) {
        try {
          await addPageToIndex(page);
        } catch (e) {
          console.warn('Failed to index queued page:', page?.url, e);
        }
