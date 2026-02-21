/**
 * LocalStorage utilities for the sidebar
 */

/**
 * Default settings configuration
 */
export const DEFAULT_SETTINGS = {
  searchResultCount: 5,
  hnswEf: 200,
  hnswM: 16,
  maxElements: 10000,
  autoIndex: true
};

/**
 * Load settings from localStorage
 * @returns {Object} Settings object
 */
export function loadSettings() {
  const saved = localStorage.getItem('smriti-settings');
  if (saved) {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  }
  return { ...DEFAULT_SETTINGS };
}

/**
 * Save settings to localStorage
 * @param {Object} settings - Settings to save
 */
export function saveSettings(settings) {
  localStorage.setItem('smriti-settings', JSON.stringify(settings));
