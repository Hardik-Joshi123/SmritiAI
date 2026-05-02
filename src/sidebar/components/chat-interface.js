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
