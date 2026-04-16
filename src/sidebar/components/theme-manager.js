import { getTheme, saveTheme } from '../utils/storage-helpers.js';

/**
 * Theme Manager for the sidebar
 */
export class ThemeManager {
  constructor() {
    this.body = document.body;
    this.themeToggleButton = document.getElementById('theme-toggle-btn');
    this.init();
  }

  /**
   * Initialize theme manager
   */
  init() {
    // Apply saved theme
    const savedTheme = getTheme();
    this.applyTheme(savedTheme);

    // Set up event listener
    this.themeToggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  /**
   * Apply a theme
   * @param {string} theme - Theme to apply ('light' or 'dark')
