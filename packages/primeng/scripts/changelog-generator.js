const fs = require('fs');

const tsvFilePath = '';
const outputFilePath = '../CHANGELOG.md';
const today = new Date().toISOString().split('T')[0];

fs.readFile(tsvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('❌ File reading error:', err);
        return;
    }

    if (!data.includes('\t')) {
        console.error('❌ No tab character found in the TSV file! Please replace spaces with tabs.');
        return;
    }

    const lines = data.trim().split('\n');

    if (lines.length <= 1) {
        console.error('❌ No valid data found. Please check the content of the TSV file.');
        return;
    }

    lines.shift();
    let changelogData = {};

    lines.forEach((line) => {
        let columns = line.split('\t');

        if (columns.length < 6) {
            console.error(`❌ Missing data: "${line}"`);
            return;
        }

        let [title, issueUrl, assignees, pullRequestUrl, status, labels, milestone] = columns.map((item) => item.trim());

        if (!milestone) {
            console.warn(`⚠ Milestone (Version) information is missing: "${title}"`);
            return;
        }

        if (!changelogData[milestone]) {
            changelogData[milestone] = {
                bugs: [],
                enhancements: []
            };
        }

        let issueNumber = extractIssueNumber(issueUrl);
        let issueMarkdown = issueNumber ? `[#${issueNumber}](${issueUrl})` : '';

        if (labels.includes('Bug')) {
            changelogData[milestone].bugs.push(`- ${title} ${issueMarkdown}`);
        } else if (labels.includes('Enhancement') || labels.includes('New feature')) {
            changelogData[milestone].enhancements.push(`- ${title} ${issueMarkdown}`);
        }
    });

    const version = Object.keys(changelogData)[0];
    const previousVersion = decrementVersion(version);

    let changelogContent = '';

    changelogContent += `## [${version}](https://github.com/primefaces/primeng/tree/${version}) (${today})\n`;
    changelogContent += `[Full Changelog](https://github.com/primefaces/primeng/compare/${previousVersion}...${version})\n\n`;

    if (changelogData[version].bugs.length > 0) {
        changelogContent += `**Fixed bugs:**\n`;
        changelogContent += changelogData[version].bugs.join('\n') + '\n\n';
    }

    if (changelogData[version].enhancements.length > 0) {
        changelogContent += `**Implemented New Features and Enhancements:**\n`;
        changelogContent += changelogData[version].enhancements.join('\n') + '\n\n';
    }

    fs.readFile(outputFilePath, 'utf8', (err, existingData) => {
        if (err) {
            console.error('❌ Error reading changelog.md:', err);
            return;
        }

        if (!existingData.includes('# Changelog')) {
            console.error('❌ The changelog file does not contain "# Changelog" header.');
            return;
        }

        const existingLines = existingData.split('\n');

        const headerLine = existingLines[0];

        const updatedContent = `${headerLine}\n${changelogContent}${existingLines.slice(1).join('\n')}`;

        fs.writeFile(outputFilePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('❌ Error writing to changelog.md:', err);
                return;
            }
            console.log('✅ Changelog successfully updated: CHANGELOG.md');
        });
    });
});

function extractIssueNumber(url) {
    const match = url.match(/\/issues\/(\d+)$/);
    return match ? match[1] : null;
}

function decrementVersion(version) {
    const versionParts = version.split('.').map(Number);
    versionParts[2] -= 1;
    return versionParts.join('.');
}
