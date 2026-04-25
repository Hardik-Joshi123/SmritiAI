/**
 * Domain Filter Component
 * Handles domain filtering UI and functionality
 */

import { getAvailableDomains } from '../services/message-service.js';
import { createElement } from '../utils/dom-helpers.js';

export class DomainFilter {
  constructor() {
    this.container = null;
    this.input = null;
    this.inputContainer = null; // Add this reference
    this.suggestionList = null;
    this.availableDomains = [];
    this.currentFilter = '';
    this.isVisible = false;
    
    // Don't call init() automatically - it will be called from sidebar.js
  }

  /**
   * Initialize the domain filter component
   */
  async init() {
    await this.loadAvailableDomains();
    this.createUI();
    this.attachEventListeners();
  }

  /**
   * Load available domains from the background script
   */
  async loadAvailableDomains() {
    try {
      const response = await getAvailableDomains();
      if (response.success) {
        this.availableDomains = response.data.domains;
        console.log(`Loaded ${this.availableDomains.length} available domains`);
      }
    } catch (error) {
      console.error('Failed to load available domains:', error);
      this.availableDomains = [];
    }
  }

  /**
   * Create the domain filter UI
   */
  createUI() {
    // Main container
    this.container = createElement('div', {
