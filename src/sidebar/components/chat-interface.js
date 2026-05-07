import { appendMessage } from '../utils/dom-helpers.js';
import { sendSearchQuery } from '../services/message-service.js';

/**
 * Chat Interface Manager
 */
export class ChatInterface {
  constructor() {
    this.chatForm = document.getElementById('chat-form');
    this.messageInput = document.getElementById('message-input');
    this.chatMessages = document.getElementById('chat-messages');
    this.domainFilter = null; // Reference to domain filter component
    this.init();
  }

  /**
   * Initialize chat interface
   */
  init() {
    // Set up form submission
    this.chatForm.addEventListener('submit', async (event) => {
      await this.handleFormSubmit(event);
    });

    // Set up input auto-resize
    this.messageInput.addEventListener('input', () => {
      this.autoResizeInput();
    });
  }

  /**
   * Set the domain filter component reference
   * @param {DomainFilter} domainFilter - Domain filter component
   */
  setDomainFilter(domainFilter) {
    this.domainFilter = domainFilter;
  }

  /**
   * Handle form submission
   * @param {Event} event - Form submit event
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    const messageText = this.messageInput.value.trim();
    if (!messageText) return;

    // Handle slash commands (delegate to command handler)
    if (messageText.startsWith('/')) {
      // This will be handled by the command system
      return;
    }

    // Handle regular search
    await this.performSearch(messageText);
  }

  /**
   * Perform a search query
   * @param {string} query - Search query
   */
  async performSearch(query) {
    this.addMessage(query, 'sent');
    this.clearInput();
    
    const thinkingMessage = this.addMessage('Thinking...', 'received');

    try {
      // Get domain filter if available
      const domainFilter = this.domainFilter ? this.domainFilter.getCurrentFilter() : null;
      
      const results = await sendSearchQuery(query, domainFilter);
      thinkingMessage.remove();
      this.displayResults(results, domainFilter);
    } catch (error) {
      console.error('Error performing search:', error);
      thinkingMessage.textContent = 'Search failed. See console for details.';
    }
  }

  /**
   * Add a message to the chat
   * @param {string} text - Message text
   * @param {string} type - Message type ('sent' | 'received')
   * @returns {HTMLElement} Created message element
   */
  addMessage(text, type) {
    return appendMessage(text, type, this.chatMessages);
  }

  /**
   * Display search results
   * @param {Array} results - Search results
   * @param {string} domainFilter - Applied domain filter (for display)
   */
  displayResults(results, domainFilter = null) {
    if (!results || results.length === 0) {
      let message = 'No results found.';
      if (domainFilter) {
        message += ` (with domain filter: ${domainFilter})`;
      }
      this.addMessage(message, 'received');
      return;
    }

    const resultsMessageElement = document.createElement('div');
    resultsMessageElement.classList.add('message', 'received');

    // Add filter info if applied
    if (domainFilter) {
      const filterInfo = document.createElement('div');
      filterInfo.style.fontSize = '0.85em';
      filterInfo.style.opacity = '0.7';
      filterInfo.style.marginBottom = '8px';
      filterInfo.textContent = `Filtered by: ${domainFilter}`;
      resultsMessageElement.appendChild(filterInfo);
    }

    const ul = document.createElement('ul');
    results.forEach(page => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.url;
      a.textContent = page.title;
      a.title = page.url;
      a.target = '_blank';
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    resultsMessageElement.appendChild(ul);
    this.chatMessages.appendChild(resultsMessageElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  /**
   * Clear the input field
   */
  clearInput() {
    this.messageInput.value = '';
    this.autoResizeInput();
  }

  /**
   * Auto-resize the input field
   */
  autoResizeInput() {
    this.messageInput.style.height = 'auto';
    this.messageInput.style.height = `${this.messageInput.scrollHeight}px`;
