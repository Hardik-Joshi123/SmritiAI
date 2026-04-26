/**
 * Command System for handling slash commands
 */
export class CommandSystem {
  constructor(chatInterface, statsHandler, settingsModal) {
    this.chatInterface = chatInterface;
    this.statsHandler = statsHandler;
    this.settingsModal = settingsModal;
    this.domainFilter = null; // Reference to domain filter component
    
    this.messageInput = document.getElementById('message-input');
    this.commandDropdown = document.getElementById('command-dropdown');
    
    this.selectedCommandIndex = -1;
    this.availableCommands = [
      { command: '/clear', desc: 'Clear chat history' },
      { command: '/stats', desc: 'Show index statistics' },
      { command: '/settings', desc: 'Open settings' },
      { command: '/domain', desc: 'Filter by domain (e.g., /domain:example.com)' }
    ];
    
    this.init();
  }

  /**
   * Set the domain filter component reference
   * @param {DomainFilter} domainFilter - Domain filter component
   */
  setDomainFilter(domainFilter) {
    this.domainFilter = domainFilter;
  }

  /**
   * Initialize command system
   */
  init() {
    // Handle input changes for command dropdown
    this.messageInput.addEventListener('input', () => {
      this.handleCommandDropdown();
    });

    // Handle keyboard navigation
    this.messageInput.addEventListener('keydown', (e) => {
      this.handleKeyNavigation(e);
    });

    // Handle form submission for commands
    const chatForm = document.getElementById('chat-form');
    const originalSubmitHandler = chatForm.onsubmit;
    
