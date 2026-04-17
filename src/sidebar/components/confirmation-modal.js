/**
 * Confirmation Modal Manager
 */
export class ConfirmationModal {
  constructor() {
    this.confirmationModal = document.getElementById('confirmation-modal');
    this.closeConfirm = document.getElementById('close-confirm');
    this.confirmYes = document.getElementById('confirm-yes');
    this.confirmNo = document.getElementById('confirm-no');
    this.confirmTitle = document.getElementById('confirm-title');
    this.confirmMessage = document.getElementById('confirm-message');
    
    this.init();
  }

  /**
   * Initialize confirmation modal
   */
  init() {
    // Close modal event listeners
    this.closeConfirm.addEventListener('click', () => this.hide());
    this.confirmNo.addEventListener('click', () => this.hide());
    
    // Close modal when clicking outside
    this.confirmationModal.addEventListener('click', (e) => {
      if (e.target === this.confirmationModal) {
        this.hide();
      }
    });
  }
