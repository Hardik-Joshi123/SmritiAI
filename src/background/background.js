import { db } from '../db.js';
import { initSearchIndex } from '../search.js';
import { MessageRouter } from './handlers/message-router.js';

// Expose the db instance to the global scope for easy debugging from the console
globalThis.db = db;

// Initialize the search index when the extension first starts up
initSearchIndex();
