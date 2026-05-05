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
