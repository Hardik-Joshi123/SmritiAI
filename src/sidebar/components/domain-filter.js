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
      className: 'domain-filter-container',
      innerHTML: `
        <div class="domain-filter-toggle">
          <button id="domain-filter-btn" class="domain-filter-button" title="Filter by domain">
            🌐 Domain Filter
          </button>
        </div>
        <div class="domain-filter-input-container hidden" id="domain-filter-input-container">
          <input 
            type="text" 
            id="domain-filter-input" 
            placeholder="Enter domains (e.g., example.com, -exclude.com)" 
            autocomplete="off"
          />
          <div class="domain-filter-help">
            <span>Use commas to separate domains. Prefix with '-' to exclude (e.g., github.com, -ads.com)</span>
          </div>
          <div class="domain-suggestions hidden" id="domain-suggestions"></div>
          <div class="domain-filter-actions">
            <button id="apply-domain-filter" class="btn-primary btn-small">Apply</button>
            <button id="clear-domain-filter" class="btn-secondary btn-small">Clear</button>
          </div>
        </div>
      `
    });

    // Get references to elements
    this.input = this.container.querySelector('#domain-filter-input');
    this.inputContainer = this.container.querySelector('#domain-filter-input-container'); // Store reference
    this.suggestionList = this.container.querySelector('#domain-suggestions');
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const toggleBtn = this.container.querySelector('#domain-filter-btn');
    const applyBtn = this.container.querySelector('#apply-domain-filter');
    const clearBtn = this.container.querySelector('#clear-domain-filter');

    // Toggle domain filter visibility
    toggleBtn.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      this.inputContainer.classList.toggle('hidden', !this.isVisible);
      
      if (this.isVisible) {
        this.input.focus();
        this.updateToggleButton();
      } else {
        this.hideSuggestions();
      }
    });
