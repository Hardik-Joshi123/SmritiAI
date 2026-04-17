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
