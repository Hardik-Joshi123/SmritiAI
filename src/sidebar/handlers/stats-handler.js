import { getIndexStats } from '../services/message-service.js';

/**
 * Statistics Handler for displaying index stats
 */
export class StatsHandler {
  constructor(chatInterface) {
    this.chatInterface = chatInterface;
  }

  /**
   * Show index statistics
   */
  async showStats() {
    try {
      const response = await getIndexStats();

      if (response.success) {
        this.displayIndexStats(response.stats);
      } else {
        this.chatInterface.addMessage('Failed to get index stats.', 'received');
      }
    } catch (error) {
      console.error('Error getting index stats:', error);
      this.chatInterface.addMessage('Error getting index stats. See console for details.', 'received');
    }
  }

  /**
   * Display index statistics in chat
   * @param {Object} stats - Index statistics
   */
