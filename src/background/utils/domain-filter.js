/**
 * Domain filtering utilities for search results
 */

/**
 * Parse domain filter string into include/exclude lists
 * Format: "domain1.com,domain2.com,-exclude1.com,-exclude2.com"
 * @param {string} filterString - Domain filter string
 * @returns {Object} Parsed filter object with include/exclude arrays
 */
export function parseDomainFilter(filterString) {
  if (!filterString || typeof filterString !== 'string') {
    return { include: [], exclude: [] };
  }

  const domains = filterString.split(',').map(d => d.trim()).filter(d => d.length > 0);
  const include = [];
  const exclude = [];

  for (const domain of domains) {
    if (domain.startsWith('-')) {
      // Exclude domain (remove the - prefix)
      const excludeDomain = domain.substring(1).trim();
      if (excludeDomain.length > 0) {
        exclude.push(excludeDomain.toLowerCase());
      }
    } else {
      // Include domain
      include.push(domain.toLowerCase());
    }
  }

  return { include, exclude };
