import { createAsyncHandler } from '../utils/message-helpers.js';
import { handleProcessPageData } from './page-processor.js';
import { handleSearch, handleGetEmbedding, handleRebuildIndex, handleGetIndexStats, handleGetAvailableDomains } from './search-handler.js';
import { handleUpdateSettings } from './settings-handler.js';
import { handleExportData, handleImportData, handleClearAllData } from './data-handler.js';
import { handleProcessBrowserHistory } from './history-processor.js';

/**
 * Message router that delegates messages to appropriate handlers
 */
export class MessageRouter {
    constructor() {
        this.handlers = new Map();
        this.setupHandlers();
    }

    /**
     * Set up all message handlers
     */
    setupHandlers() {
        // Page processing
        this.handlers.set('processPageData', handleProcessPageData);
        
        // Search operations
        this.handlers.set('search', handleSearch);
