const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, 'server', 'db', 'seed.ts');
let content = fs.readFileSync(seedFilePath, 'utf8');

// Function to beautify HTML content
function beautifyProductHTML(html) {
    // Add styling to all h2 tags
    html = html.replace(
        /<h2>([^<]+)<\/h2>/g,
        '<h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">$1</h2>'
    );

    // Add styling to paragraphs
    html = html.replace(
        /<p>(\s*<strong[^>]*>)/g,
        '<p style="color: #374151; line-height: 1.7;">$1'
    );

    html = html.replace(
        /<p>(\s*[^<])/g,
        '<p style="color: #374151; line-height: 1.7;">$1'
    );

    // Add styling to strong tags within paragraphs
    html = html.replace(
        /<strong>([^<]+)<\/strong>/g,
        '<strong style="color: #1f2937;">$1</strong>'
    );

    // Beautify tables
    html = html.replace(
        /<table class="spec-table">/g,
        '<table class="spec-table" style="width: 100%; border-collapse: collapse;">'
    );

    // Add thead and tbody structure if not present, and style table rows
    html = html.replace(
        /<tr><th>([^<]+)<\/th><th>([^<]+)<\/th><th>([^<]+)<\/th><\/tr>/g,
        '<thead>\n                    <tr style="background-color: #f1f5f9;">\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$1</th>\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$2</th>\n                      <th style="padding: 12px; text-align: left; color: #1e40af; border-bottom: 2px solid #3b82f6;">$3</th>\n                    </tr>\n                  </thead>\n                  <tbody>'
    );

    // Close tbody before table close
    html = html.replace(
        /<\/table>/g,
        '</tbody>\n                </table>'
    );

    // Style table data rows (alternating colors)
    let rowCount = 0;
    html = html.replace(
        /<tr><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/g,
        (match, p1, p2, p3) => {
            const bgColor = rowCount % 2 === 0 ? '#ffffff' : '#f9fafb';
            const borderStyle = 'border-bottom: 1px solid #e5e7eb;';
            rowCount++;
            return `<tr style="background-color: ${bgColor};">
                      <td style="padding: 10px; color: #374151; ${borderStyle}">${p1}</td>
                      <td style="padding: 10px; color: #1f2937; font-weight: 600; ${borderStyle}">${p2}</td>
                      <td style="padding: 10px; color: #6b7280; ${borderStyle}">${p3}</td>
                    </tr>`;
        }
    );

    // Style benefit lists
    html = html.replace(
        /<ul>(\s*<li><strong>)/g,
        '<ul style="list-style: none; padding-left: 0;">$1'
    );

    html = html.replace(
        /<li><strong>([^<]+)<\/strong><br>([^<]+)<\/li>/g,
        '<li style="padding: 10px 0; border-left: 3px solid #e5e7eb; padding-left: 16px; margin-bottom: 8px;">\n                  <strong style="color: #1e40af;">$1</strong><br>\n                  <span style="color: #374151;">$2</span>\n                </li>'
    );

    // Style application lists
    html = html.replace(
        /<ul>(\s*<li>[^<]*[^s][^t][^r][^o][^n][^g])/g,
        '<ul style="color: #374151; line-height: 1.8;">$1'
    );

    html = html.replace(
        /<li>([^<]+)<\/li>/g,
        '<li style="padding: 4px 0;">$1</li>'
    );

    // Style processing guidelines in highlight divs
    html = html.replace(
        /<div class="highlight">(\s*)<h2[^>]*>([^<]+)<\/h2>(\s*)<p>/g,
        '<div class="highlight">$1<h2 style="color: #1e40af; border-left: 4px solid #3b82f6; padding-left: 12px; margin-bottom: 16px;">$2</h2>$3<p style="color: #374151; line-height: 1.7; background-color: #f0f9ff; padding: 16px; border-left: 4px solid #3b82f6;">'
    );

    // Style strong tags in processing guidelines
    html = html.replace(
        /<strong>(\d+[^<]*)<\/strong>/g,
        '<strong style="color: #1e40af;">$1</strong>'
    );

    return html;
}

// Find and replace all contentHtml blocks
const contentHtmlRegex = /contentHtml: `\s*([\s\S]*?)\s*`,/g;
let match;
const replacements = [];

while ((match = contentHtmlRegex.exec(content)) !== null) {
    const originalHTML = match[1];
    const beautifiedHTML = beautifyProductHTML(originalHTML);
    replacements.push({
        original: match[0],
        beautified: `contentHtml: \`\n${beautifiedHTML}\n        \`,`
    });
}

// Apply all replacements
replacements.forEach(({ original, beautified }) => {
    content = content.replace(original, beautified);
});

// Write back to file
fs.writeFileSync(seedFilePath, content, 'utf8');

console.log(`✅ Beautified ${replacements.length} product HTML blocks`);
