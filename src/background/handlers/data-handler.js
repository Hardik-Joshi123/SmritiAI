import { exportAllData, importData, clearAllData } from '../../search.js';
import { createSuccessResponse, createErrorResponse } from '../utils/message-helpers.js';

/**
 * Handles data export requests from the UI
 * @param {Object} message - The message
 * @param {Object} sender - Message sender info
 * @param {Function} sendResponse - Response callback
 */
export async function handleExportData(message, sender, sendResponse) {
    try {
        console.log('Data export requested from UI...');
        
        const data = await exportAllData();
        
        console.log('Data exported successfully.');
        sendResponse(createSuccessResponse({ data }));
    } catch (error) {
        console.error('Failed to export data:', error);
        sendResponse(createErrorResponse(error));
    }
}
