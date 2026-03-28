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
    let resultCount = settings?.searchResultCount || 5;
    
    // If domain filtering is applied, search for more results to account for filtering
    if (message.domainFilter) {
        resultCount = Math.max(resultCount * 3, 15); // Get 3x more results for filtering
    }
    
    const results = await searchPages(queryEmbedding.data, resultCount);
    
    // 3. Apply domain filtering if specified
    let filteredResults = results;
    if (message.domainFilter) {
        filteredResults = applyDomainFilter(results, message.domainFilter);
        // Limit to the original requested count after filtering
        const originalCount = settings?.searchResultCount || 5;
        filteredResults = filteredResults.slice(0, originalCount);
        console.log(`Domain filtering: ${results.length} -> ${filteredResults.length} results`);
    }
    
    console.log(`Search results found: ${filteredResults.length} pages`);
    console.log("Search results:", filteredResults);
    
    // 4. Send the results back to the UI
    sendResponse(filteredResults);
}

/**
