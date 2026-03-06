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
      }
    }
  } catch (error) {
    console.error('Failed to initialize HNSW index:', error);
    throw error;
  }
}

/**
 * Rebuilds the HNSW index from all pages in the database.
 * This is called during initialization to populate the index with existing data.
 */
async function rebuildIndex() {
  try {
    const pageCount = await db.pages.count();
    console.log(`Rebuilding HNSW index with ${pageCount} existing pages...`);
    
    let processedCount = 0;
    await db.pages.each(page => {
      if (page.embedding && page.embedding.length === HNSW_CONFIG.dimension) {
        const embedding = new Float32Array(page.embedding);
        hnswIndex.addPoint(embedding, page.id, false);
      }
      processedCount++;
      if (processedCount > 0 && processedCount % 1000 === 0) {
        console.log(`...indexed ${processedCount} of ${pageCount} pages...`);
      }
    });
    
    console.log(`HNSW index rebuilt successfully with ${hnswIndex.getCurrentCount()} items.`);
  } catch (error) {
    console.error('Failed to rebuild HNSW index:', error);
  }
}

/**
 * Searches for the k most similar pages using HNSW.
