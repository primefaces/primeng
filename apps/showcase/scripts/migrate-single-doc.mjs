#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const componentDir = process.argv[2];
if (!componentDir) {
    console.error('Usage: node migrate-single-doc.mjs <component-name>');
    console.error('Example: node migrate-single-doc.mjs autofocus');
    process.exit(1);
}

const DOC_DIR = path.resolve('apps/showcase/doc', componentDir);
const PAGES_DIR = path.resolve('apps/showcase/pages', componentDir);

if (!fs.existsSync(DOC_DIR)) {
    console.error(`Doc folder not found: ${DOC_DIR}`);
    process.exit(1);
}

// Convert camelCase to kebab-case
function toKebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
}

// Convert filename like "basicdoc.ts" to "basic-doc.ts"
function convertFileName(fileName) {
    const baseName = fileName.replace(/\.ts$/, '');

    // Already in kebab-case with -doc suffix
    if (/^[a-z0-9]+(-[a-z0-9]+)*-doc$/.test(baseName)) {
        return fileName;
    }

    // Handle "xxxdoc" pattern
    if (baseName.endsWith('doc') && !baseName.endsWith('-doc')) {
        const withoutDoc = baseName.slice(0, -3);
        const kebab = toKebabCase(withoutDoc);
        return `${kebab}-doc.ts`;
    }

    return fileName;
}

console.log(`\nMigrating: ${componentDir}\n`);

// Get all .ts files in the doc folder (not in subdirectories)
const files = fs.readdirSync(DOC_DIR).filter((f) => f.endsWith('.ts') && !f.startsWith('.') && fs.statSync(path.join(DOC_DIR, f)).isFile());

const renamedFiles = [];

for (const file of files) {
    const filePath = path.join(DOC_DIR, file);
    const newFileName = convertFileName(file);

    // 1. Rename file if needed
    if (newFileName !== file) {
        const newFilePath = path.join(DOC_DIR, newFileName);
        try {
            execSync(`git mv "${filePath}" "${newFilePath}"`, { stdio: 'pipe' });
            console.log(`  Renamed: ${file} → ${newFileName}`);
        } catch (e) {
            fs.renameSync(filePath, newFilePath);
            console.log(`  Renamed: ${file} → ${newFileName}`);
        }
        renamedFiles.push({ from: file, to: newFileName });
    }

    // Work with current file path
    const currentFilePath = path.join(DOC_DIR, newFileName);
    let content = fs.readFileSync(currentFilePath, 'utf-8');
    let modified = false;

    // 2. Fix selector to match file name
    const expectedSelector = newFileName.replace(/\.ts$/, '');
    const selectorMatch = content.match(/selector:\s*['"]([^'"]+)['"]/);

    if (selectorMatch && selectorMatch[1] !== expectedSelector) {
        const oldSelector = selectorMatch[1];
        content = content.replace(/selector:\s*['"][^'"]+['"]/, `selector: '${expectedSelector}'`);
        console.log(`  Fixed selector: ${oldSelector} → ${expectedSelector}`);
        modified = true;
    }

    // 3. Remove selector from app-code
    if (content.includes('<app-code selector=')) {
        content = content.replace(/<app-code\s+selector="[^"]*"><\/app-code>/g, '<app-code></app-code>');
        content = content.replace(/<app-code\s+selector="[^"]*"\s*\/>/g, '<app-code />');
        content = content.replace(/<app-code\s+selector="[^"]*">/g, '<app-code>');
        console.log(`  Removed app-code selector from: ${newFileName}`);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(currentFilePath, content);
    }
}

// 4. Update imports in pages/*/index.ts
const indexPath = path.join(PAGES_DIR, 'index.ts');
if (fs.existsSync(indexPath) && renamedFiles.length > 0) {
    let content = fs.readFileSync(indexPath, 'utf-8');
    let modified = false;

    for (const { from, to } of renamedFiles) {
        const oldImport = from.replace('.ts', '');
        const newImport = to.replace('.ts', '');

        const oldPattern = `@/doc/${componentDir}/${oldImport}`;
        if (content.includes(oldPattern)) {
            content = content.replace(new RegExp(`@/doc/${componentDir}/${oldImport}`, 'g'), `@/doc/${componentDir}/${newImport}`);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(indexPath, content);
        console.log(`  Updated imports in: pages/${componentDir}/index.ts`);
    }
}

console.log('\nDone!');
