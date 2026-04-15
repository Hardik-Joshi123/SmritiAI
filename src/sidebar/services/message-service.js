/**
 * Background script communication service
 */

/**
 * Send a search query to the background script
 * @param {string} query - Search query
 * @param {string} domainFilter - Optional domain filter string
 * @returns {Promise<Array>} Search results
 */
export async function sendSearchQuery(query, domainFilter = null) {
  const message = {
    action: 'search',
    query: query
  };
  
  if (domainFilter) {
    message.domainFilter = domainFilter;
  }
  
  return await browser.runtime.sendMessage(message);
}

/**
 * Get index statistics from background script
 * @returns {Promise<Object>} Index stats response
 */
export async function getIndexStats() {
  return await browser.runtime.sendMessage({
    action: 'get-index-stats'
  });
}

/**
 * Rebuild the search index
 * @returns {Promise<Object>} Rebuild response
 */
export async function rebuildIndex() {
  return await browser.runtime.sendMessage({
    action: 'rebuild-index'
  });
}

/**
 * Update settings in background script
 * @param {Object} settings - Settings to update
 * @returns {Promise<Object>} Update response
 */
export async function updateSettings(settings) {
  return await browser.runtime.sendMessage({
    action: 'update-settings',
    settings: settings
  });
}
