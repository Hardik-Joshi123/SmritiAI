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
