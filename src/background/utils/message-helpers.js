/**
 * Utility functions for handling browser extension messages
 */

/**
 * Creates an async message handler wrapper
 * @param {Function} handler - The async handler function
 * @returns {Function} Wrapped handler that properly handles async responses
 */
export function createAsyncHandler(handler) {
    return (message, sender, sendResponse) => {
        handler(message, sender, sendResponse)
            .catch(error => {
                console.error('Handler error:', error);
                sendResponse({ success: false, error: error.message });
            });
        return true; // Indicate async response
    };
}
