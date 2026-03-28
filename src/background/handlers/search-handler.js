import { searchPages, getIndexStats, manualRebuildIndex, getSearchSettings } from '../../search.js';
import { EmbeddingPipelineSingleton } from '../services/embedding-service.js';
import { createSuccessResponse, createErrorResponse } from '../utils/message-helpers.js';
import { applyDomainFilter, getUniqueDomains } from '../utils/domain-filter.js';
import { db } from '../../db.js';

/**
 * Handles search requests from the UI
 * @param {Object} message - The message containing search query and optional domain filter
 * @param {Object} sender - Message sender info
 * @param {Function} sendResponse - Response callback
 */
export async function handleSearch(message, sender, sendResponse) {
    console.log(`Searching for: "${message.query}"`);
    if (message.domainFilter) {
        console.log(`Domain filter applied: "${message.domainFilter}"`);
    }
    
    const extractor = await EmbeddingPipelineSingleton.getInstance();
    
    // 1. Generate an embedding for the user's query
    const queryEmbedding = await extractor(message.query, { pooling: 'mean', normalize: true });
    console.log(`Query embedding generated, length: ${queryEmbedding.data.length}`);

    // 2. Use our search function to find the top results
    const settings = getSearchSettings();
