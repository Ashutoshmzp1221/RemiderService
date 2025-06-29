const fs = require('fs');

/**
 * Loads HTML template and replaces {{key}} placeholders.
 * @param {string} filePath - Path to HTML file.
 * @param {Object} replacements - Key-value pairs for replacement.
 * @returns {string} - Final HTML content.
 */
const loadHtmlTemplate = (filePath, replacements) => {
    if (typeof filePath !== 'string') {
        throw new TypeError('filePath must be a string');
    }

    let html = fs.readFileSync(filePath, 'utf-8');

    for (const key in replacements) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        html = html.replace(regex, replacements[key] || '');
    }

    return html;
};

module.exports = { loadHtmlTemplate };
