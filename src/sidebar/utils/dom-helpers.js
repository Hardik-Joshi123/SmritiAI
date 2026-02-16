/**
 * DOM utility functions for the sidebar
 */

/**
 * Create and append a message to the chat
 * @param {string} text - Message text
 * @param {string} type - Message type ('sent' | 'received')
 * @param {HTMLElement} container - Chat messages container
 * @returns {HTMLElement} Created message element
 */
export function appendMessage(text, type, container) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);
  messageElement.textContent = text;
  container.appendChild(messageElement);
  container.scrollTop = container.scrollHeight;
  return messageElement;
}

/**
 * Create a status indicator
 * @param {string} type - 'success', 'error', or 'loading'
 * @param {string} text - Optional text content
 * @returns {HTMLElement} Status element
 */
export function createStatusIndicator(type, text = '') {
  const status = document.createElement('span');
  
  switch (type) {
    case 'success':
      status.innerHTML = '<span class="success-text">✓</span>';
      break;
    case 'error':
      status.innerHTML = '<span class="error-text">✗</span>';
      break;
    case 'loading':
      status.innerHTML = '<span class="spinner"></span>';
      break;
    default:
      status.textContent = text;
  }
  
