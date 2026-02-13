import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedFilePath = path.join(__dirname, 'server', 'db', 'seed.ts');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Function to beautify HTML content
function beautifyProductHTML(html) {
    // Skip if already beautified
    if (html.includes('style="color: #1e40af')) {
        return html;
    }

    // Add styling to all h2 tags
    html = html.replace(
        /<h2>([^<]+)<\/h2>/g,
        '<h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">$1</h2>'
    );

    // Add styling to paragraphs with strong tags
    html = html.replace(
        /<p>\s*(<strong>)/g,
        '<p style="color: #374151; line-height: 1.7;">$1'
    );

    // Add styling to regular paragraphs
    html = html.replace(
        /<p>(\s*[A-Z])/g,
        '<p style="color: #374151; line-height: 1.7;">$1'
    );

    // Add styling to strong tags
    html = html.replace(
        /<strong>([^<]+)<\/strong>/g,
        '<strong style="color: #1f2937;">$1</strong>'
    );

    // Beautify tables - add table styling
    html = html.replace(
        /<table class="spec-table">/g,
        '<table class="spec-table" style="width: 100%; border-collapse: collapse;">'
    );

    // Convert table header row to thead with styling
    html = html.replace(
        /(<table[^>]*>)\s*<tr><th>([^<]+)<\/th><th>([^<]+)<\/th><th>([^<]+)<\/th><\/tr>/g,
        '$1\n                  <thead>\n                    <tr style="background-color: #f1f5f9;">\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$2</th>\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$3</th>\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$4</th>\n                    </tr>\n                  </thead>\n                  <tbody>'
    );

    // Close tbody before table close
    html = html.replace(
        /(\s*)<\/table>/g,
        '\n                  </tbody>\n                </table>'
    );

    // Style table data rows with alternating colors
    const tableRows = html.match(/<tr><td>[^<]+<\/td><td>[^<]+<\/td><td>[^<]+<\/td><\/tr>/g);
    if (tableRows) {
        tableRows.forEach((row, index) => {
            const bgColor = index % 2 === 0 ? '#ffffff' : '#f9fafb';
            const isLastRow = index === tableRows.length - 1;
            const borderStyle = isLastRow ? '' : 'border-bottom: 1px solid #e5e7eb;';

            const styledRow = row.replace(
                /<tr><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/,
                `<tr style="background-color: ${bgColor};">
                      <td style="padding: 10px; color: #374151; ${borderStyle}">$1</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ${borderStyle}">$2</td>
                      <td style="padding: 10px; color: #6b7280; ${borderStyle}">$3</td>
                    </tr>`
            );
            html = html.replace(row, styledRow);
        });
    }

    // Style benefit lists (lists with strong tags)
    html = html.replace(
        /<ul>\s*(<li><strong>)/g,
        '<ul style="list-style: none; padding-left: 0;">$1'
    );

    // Style individual benefit list items
    html = html.replace(
        /<li><strong>([^<]+)<\/strong><br>([^<]+)<\/li>/g,
        '<li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">\n                  <strong style="color: #1e40af;">$1</strong><br>\n                  <span style="color: #374151;">$2</span>\n                </li>'
    );

    // Style application lists (simple lists without strong tags)
    html = html.replace(
        /<ul>\s*(<li>[^<]*(?:&|[a-zA-Z]))/g,
        '<ul style="color: #374151; line-height: 1.8;">$1'
    );

    // Style simple list items
    html = html.replace(
        /<li>([^<]+)<\/li>/g,
        '<li style="padding: 4px 0;">$1</li>'
    );

    // Style processing guidelines in highlight divs
    html = html.replace(
        /<div class="highlight">\s*<h2[^>]*>([^<]+)<\/h2>\s*<p>/g,
        '<div class="highlight">\n              <h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">$1</h2>\n              <p style="color: #374151; line-height: 1.7; background-color: #f0f9ff; padding: 16px; border-left: 4px solid #3b82f6;">'
    );

    // Style temperature values in processing guidelines
    html = html.replace(
        /<strong>(\d+[^<]*°[^<]*)<\/strong>/g,
        '<strong style="color: #1e40af;">$1</strong>'
    );

    return html;
}

// Find and replace all contentHtml blocks
const contentHtmlRegex = /contentHtml: `([\s\S]*?)`,/g;
let match;
const replacements = [];

while ((match = contentHtmlRegex.exec(content)) !== null) {
    const originalHTML = match[1];
    const beautifiedHTML = beautifyProductHTML(originalHTML);
    if (beautifiedHTML !== originalHTML) {
        replacements.push({
            original: match[0],
            beautified: `contentHtml: \`${beautifiedHTML}\`,`
        });
    }
}

// Apply all replacements
replacements.forEach(({ original, beautified }) => {
    content = content.replace(original, beautified);
});

// Write back to file
fs.writeFileSync(seedFilePath, content, 'utf8');

console.log(`✅ Beautified ${replacements.length} product HTML blocks`);
