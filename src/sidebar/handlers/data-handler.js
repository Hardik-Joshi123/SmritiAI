import { exportData, importData, clearAllData } from '../services/message-service.js';
import { createStatusIndicator } from '../utils/dom-helpers.js';

/**
 * Data Operations Handler (Export, Import, Clear)
 */
export class DataHandler {
  constructor(chatInterface, confirmationModal) {
    this.chatInterface = chatInterface;
    this.confirmationModal = confirmationModal;
    this.importFileInput = document.getElementById('import-file-input');
    
    this.init();
  }

  /**
   * Initialize data handler
   */
  init() {
    // Set up import file handler
    this.importFileInput.addEventListener('change', async (event) => {
      await this.handleImportFile(event);
    });
  }

  /**
   * Handle data export
   */
  async handleExportData() {
    try {
      const exportStatus = document.getElementById('export-status');
      exportStatus.innerHTML = '<span class="spinner"></span>';

      const response = await exportData();

      if (response && response.success) {
        // Create and download the file
        const dataStr = JSON.stringify(response.data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `smriti-ai-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
