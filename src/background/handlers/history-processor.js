import { addOrUpdatePage } from '../../db.js';
import { addPageToIndex } from '../../search.js';
import { EmbeddingPipelineSingleton } from '../services/embedding-service.js';
import { createSuccessResponse, createErrorResponse } from '../utils/message-helpers.js';

/**
 * Handles browser history processing requests from the UI
 * @param {Object} message - The message containing time range
 * @param {Object} sender - Message sender info
 * @param {Function} sendResponse - Response callback
 */
export async function handleProcessBrowserHistory(message, sender, sendResponse) {
    try {
        console.log('Processing browser history for AI indexing...');
        
        // Calculate start time based on the selected range
        const now = Date.now();
        let startTime = 0; // Default to all time
        
        if (message.timeRange && message.timeRange !== 'all') {
