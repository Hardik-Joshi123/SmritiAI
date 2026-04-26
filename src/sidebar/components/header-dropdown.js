/**
 * Header Dropdown Manager
 */
export class HeaderDropdown {
  constructor(statsHandler, settingsModal, dataHandler) {
    this.statsHandler = statsHandler;
    this.settingsModal = settingsModal;
    this.dataHandler = dataHandler;
    
    this.dropdownToggle = document.getElementById('dropdown-toggle');
    this.dropdownMenu = document.getElementById('dropdown-menu');
    this.isDropdownOpen = false;
    
    this.init();
  }

  /**
   * Initialize header dropdown
   */
  init() {
    // Toggle dropdown on click
    this.dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.dropdownMenu.contains(e.target) && !this.dropdownToggle.contains(e.target)) {
        this.closeDropdown();
      }
    });

    // Handle dropdown item clicks
    this.dropdownMenu.addEventListener('click', async (e) => {
      const dropdownItem = e.target.closest('.dropdown-item');
      if (!dropdownItem || dropdownItem.classList.contains('disabled')) {
        return;
      }

      const action = dropdownItem.dataset.action;
      
      // Close dropdown after selection
      this.closeDropdown();

      // Handle different actions
      await this.handleAction(action);
