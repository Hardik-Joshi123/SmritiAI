import { loadSettings, saveSettings, DEFAULT_SETTINGS } from '../utils/storage-helpers.js';
import { updateSettings as updateBackgroundSettings, rebuildIndex, processBrowserHistory } from '../services/message-service.js';
import { setButtonState, createStatusIndicator } from '../utils/dom-helpers.js';

/**
 * Settings Modal Manager
 */
export class SettingsModal {
  constructor(chatInterface) {
    this.chatInterface = chatInterface;
    this.currentSettings = loadSettings();
    
    // DOM elements
    this.settingsModal = document.getElementById('settings-modal');
    this.closeSettings = document.getElementById('close-settings');
    this.saveSettings = document.getElementById('save-settings');
    this.resetSettings = document.getElementById('reset-settings');
    
    // Rebuild index elements
    this.rebuildIndexBtn = document.getElementById('rebuild-index-btn');
    this.rebuildIndexText = document.getElementById('rebuild-index-text');
    this.rebuildIndexSpinner = document.getElementById('rebuild-index-spinner');
    
    // History processing elements
    this.processHistoryBtn = document.getElementById('process-history-btn');
    this.processHistoryText = document.getElementById('process-history-text');
    this.processHistorySpinner = document.getElementById('process-history-spinner');
    this.historyTimeRange = document.getElementById('history-time-range');
    this.historyProgressContainer = document.getElementById('history-progress-container');
    this.historyProgressFill = document.getElementById('history-progress-fill');
    this.historyProgressText = document.getElementById('history-progress-text');
    
    this.init();
  }

  /**
   * Initialize settings modal
   */
  init() {
    this.updateSettingsUI();
    this.setupEventListeners();
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Modal controls
    this.closeSettings.addEventListener('click', () => this.hide());
    this.saveSettings.addEventListener('click', () => this.handleSaveSettings());
    this.resetSettings.addEventListener('click', () => this.handleResetSettings());
    
    // Action buttons
    this.rebuildIndexBtn.addEventListener('click', () => this.handleRebuildIndex());
    this.processHistoryBtn.addEventListener('click', () => this.handleProcessHistory());
    
    // Close modal when clicking outside
    this.settingsModal.addEventListener('click', (e) => {
      if (e.target === this.settingsModal) {
        this.hide();
      }
    });
  }

  /**
   * Show the settings modal
   */
  show() {
    this.updateSettingsUI();
    this.settingsModal.classList.remove('hidden');
  }

  /**
   * Hide the settings modal
   */
  hide() {
    this.settingsModal.classList.add('hidden');
  }

  /**
   * Update the settings UI with current values
   */
  updateSettingsUI() {
    document.getElementById('search-result-count').value = this.currentSettings.searchResultCount;
    document.getElementById('hnsw-ef').value = this.currentSettings.hnswEf;
    document.getElementById('hnsw-m').value = this.currentSettings.hnswM;
    document.getElementById('max-elements').value = this.currentSettings.maxElements;
    document.getElementById('auto-index').checked = this.currentSettings.autoIndex;
  }

  /**
   * Handle save settings
   */
  async handleSaveSettings() {
    // Get values from form
    this.currentSettings.searchResultCount = parseInt(document.getElementById('search-result-count').value);
    this.currentSettings.hnswEf = parseInt(document.getElementById('hnsw-ef').value);
    this.currentSettings.hnswM = parseInt(document.getElementById('hnsw-m').value);
    this.currentSettings.maxElements = parseInt(document.getElementById('max-elements').value);
    this.currentSettings.autoIndex = document.getElementById('auto-index').checked;
    
    // Save to localStorage
    saveSettings(this.currentSettings);
    
    // Send updated settings to background script
