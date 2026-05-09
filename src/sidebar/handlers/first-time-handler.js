import { isFirstTimeUser, markNotFirstTime } from '../utils/storage-helpers.js';

/**
 * First Time User Experience Handler
 */
export class FirstTimeHandler {
  constructor(chatInterface, settingsModal) {
    this.chatInterface = chatInterface;
    this.settingsModal = settingsModal;
  }

  /**
   * Check and handle first time user experience
   */
  checkFirstTimeUser() {
    try {
      if (isFirstTimeUser()) {
        markNotFirstTime();
        this.showFirstTimeWelcome();
      }
    } catch (error) {
      console.error('Error checking first-time user:', error);
    }
  }

  /**
   * Show first time welcome message
   */
