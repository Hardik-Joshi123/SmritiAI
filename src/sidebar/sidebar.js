import { ThemeManager } from './components/theme-manager.js';
import { ChatInterface } from './components/chat-interface.js';
import { CommandSystem } from './components/command-system.js';
import { SettingsModal } from './components/settings-modal.js';
import { ConfirmationModal } from './components/confirmation-modal.js';
import { HeaderDropdown } from './components/header-dropdown.js';
import { DomainFilter } from './components/domain-filter.js';
import { StatsHandler } from './handlers/stats-handler.js';
import { DataHandler } from './handlers/data-handler.js';
import { FirstTimeHandler } from './handlers/first-time-handler.js';

/**
 * Main Sidebar Application
 * Coordinates all components and handles initialization
 */
class SidebarApp {
  constructor() {
    this.components = {};
    this.handlers = {};
  }

  /**
   * Initialize the sidebar application
   */
  async init() {
    // Initialize core components
    await this.initializeComponents();
    
    // Set up component dependencies
    this.setupDependencies();
    
    // Handle first time user experience
    this.handlers.firstTime.checkFirstTimeUser();
  }

  /**
   * Initialize all components
   */
