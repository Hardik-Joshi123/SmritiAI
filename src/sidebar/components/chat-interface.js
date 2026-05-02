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
