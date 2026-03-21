import { Readability } from '@mozilla/readability';

// Use a flag to ensure the script only runs once per page load.
if (typeof window.hasRun === 'undefined') {
  window.hasRun = true;

  try {
    /* Clone the document to avoid modifying the live page,
     * as Readability will modify the DOM of the document it is given. */
    const documentClone = document.cloneNode(true);
    const reader = new Readability(documentClone);
    const article = reader.parse();

    // 'article' will be null if Readability couldn't find an article.
    if (article && article.textContent.trim().length > 0) {
      const pageData = {
