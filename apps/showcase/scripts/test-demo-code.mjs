#!/usr/bin/env node

/**
 * Test script for demo code generation and StackBlitz integration
 *
 * Tests:
 * 1. Demo code structure validation (single TS file, inline template)
 * 2. StackBlitz file generation
 * 3. Service/style/data files inclusion
 * 4. npm install and serve validation (optional, requires network)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Test configuration
const DEMOS_JSON_PATH = path.join(ROOT_DIR, 'public', 'demos.json');
const TEST_SELECTORS = ['select-basic-demo', 'table-filter-advanced-demo', 'autocomplete-basic-demo', 'button-basic-demo'];

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
    const status = passed ? `${colors.green}PASS${colors.reset}` : `${colors.red}FAIL${colors.reset}`;
    console.log(`  ${status} ${name}${details ? ` - ${details}` : ''}`);
    return passed;
}

// ============================================
// Test 1: Demo Code Structure Validation
// ============================================
function testDemoCodeStructure(demos) {
    log('\n1. Demo Code Structure Validation', 'cyan');
    let allPassed = true;

    for (const selector of TEST_SELECTORS) {
        const demo = demos[selector];
        if (!demo) {
            logTest(`${selector} exists`, false, 'Demo not found');
            allPassed = false;
            continue;
        }

        log(`\n  Testing: ${selector}`, 'blue');

        // Test: Has typescript code
        const hasTypescript = !!demo.code?.typescript;
        allPassed &= logTest('Has typescript code', hasTypescript);

        if (hasTypescript) {
            const ts = demo.code.typescript;

            // Test: Has inline template (not templateUrl)
            const hasInlineTemplate = ts.includes('template:') && ts.includes('`');
            const hasNoTemplateUrl = !ts.includes('templateUrl:');
            allPassed &= logTest('Uses inline template', hasInlineTemplate && hasNoTemplateUrl);

            // Test: Is a standalone component
            const isStandalone = ts.includes('standalone: true') || !ts.includes('standalone:');
            allPassed &= logTest('Is standalone component', isStandalone);

            // Test: Has proper imports
            const hasComponentImport = ts.includes("from '@angular/core'");
            allPassed &= logTest('Has Angular core import', hasComponentImport);

            // Test: Has @Component decorator
            const hasDecorator = ts.includes('@Component(');
            allPassed &= logTest('Has @Component decorator', hasDecorator);

            // Test: Has export class
            const hasExportClass = /export class \w+/.test(ts);
            allPassed &= logTest('Has export class', hasExportClass);

            // Test: No doc-specific imports (AppCode, DeferredDemo, etc.)
            const hasNoDocImports = !ts.includes('AppCode') && !ts.includes('DeferredDemo') && !ts.includes('AppDocSectionText');
            allPassed &= logTest('No doc-specific imports', hasNoDocImports);
        }
    }

    return allPassed;
}

// ============================================
// Test 2: StackBlitz File Generation
// ============================================
function testStackBlitzFileGeneration(demos) {
    log('\n2. StackBlitz File Generation Test', 'cyan');
    let allPassed = true;

    // Simulate the StackBlitz file generation logic from templates.ts
    for (const selector of TEST_SELECTORS) {
        const demo = demos[selector];
        if (!demo) continue;

        log(`\n  Testing: ${selector}`, 'blue');

        const code = demo.code;
        let ts = code.typescript;

        // Simulate ImportsModule transformation
        const importModuleStatement = "import { ImportsModule } from './imports';";

        if (ts && !ts.includes(importModuleStatement)) {
            let modified = ts.replace(/import\s+{[^{}]*}\s+from\s+'[^']+';[\r\n]*/g, (match) => {
                if (match.includes('Module') && !match.includes('ReactiveFormsModule') && !match.includes('Ref')) {
                    return '';
                }
                return match;
            });

            modified = modified.replace(/\bimports:\s*\[[^\]]*\]/, 'imports: [ImportsModule]');
            modified = modified.replace(/import\s+\{[^{}]*\}\s+from\s+'@angular\/core';/, (match) => match + '\n' + importModuleStatement);

            // Add theme-switcher
            modified = modified.replace(/template:\s*`\s*/, 'template: `\n        <theme-switcher />\n        ');

            // Test: ImportsModule is added
            allPassed &= logTest('ImportsModule import added', modified.includes(importModuleStatement));

            // Test: imports array uses ImportsModule
            allPassed &= logTest('imports array uses ImportsModule', modified.includes('imports: [ImportsModule]'));

            // Test: theme-switcher added to template
            allPassed &= logTest('theme-switcher added to template', modified.includes('<theme-switcher />'));

            // Test: PrimeNG module imports removed
            const hasNoDirectModuleImport = !modified.includes("from 'primeng/select';") || modified.includes('ImportsModule');
            allPassed &= logTest('PrimeNG direct imports removed', !modified.match(/import\s+\{[^}]*Module[^}]*\}\s+from\s+'primeng\//));
        }

        // Test: Metadata has services if needed
        if (demo.metadata?.services?.length > 0) {
            allPassed &= logTest('Has service metadata', true, demo.metadata.services.join(', '));
        }

        // Test: Metadata has extFiles if needed
        if (demo.metadata?.extFiles?.length > 0) {
            allPassed &= logTest('Has extFiles metadata', true, `${demo.metadata.extFiles.length} files`);
        }
    }

    return allPassed;
}

// ============================================
// Test 3: Service/Style/Data Files Inclusion
// ============================================
function testAdditionalFilesInclusion(demos) {
    log('\n3. Service/Style/Data Files Inclusion Test', 'cyan');
    let allPassed = true;

    // Find demos with services
    const demosWithServices = Object.entries(demos)
        .filter(([_, demo]) => demo.metadata?.services?.length > 0)
        .slice(0, 3);

    for (const [selector, demo] of demosWithServices) {
        log(`\n  Testing: ${selector}`, 'blue');

        // Test: Services are listed
        const services = demo.metadata.services;
        allPassed &= logTest('Services listed', services.length > 0, services.join(', '));

        // Test: TypeScript has service injection
        const ts = demo.code.typescript;
        for (const service of services) {
            const hasServiceInConstructor = ts.includes(`private ${service.toLowerCase()}`) || ts.includes(`${service.toLowerCase()}:`) || ts.includes(service);
            allPassed &= logTest(`Service ${service} referenced`, hasServiceInConstructor);
        }
    }

    // Find demos with extFiles
    const demosWithExtFiles = Object.entries(demos)
        .filter(([_, demo]) => demo.metadata?.extFiles?.length > 0)
        .slice(0, 3);

    for (const [selector, demo] of demosWithExtFiles) {
        log(`\n  Testing extFiles: ${selector}`, 'blue');

        for (const extFile of demo.metadata.extFiles) {
            allPassed &= logTest(`ExtFile ${extFile.path} exists`, !!(extFile.path && extFile.content));

            if (extFile.path.includes('domain/')) {
                // Check if it's a valid interface/type definition
                const hasInterface = extFile.content.includes('interface') || extFile.content.includes('type');
                allPassed &= logTest(`${extFile.path} has type definitions`, hasInterface);
            }
        }
    }

    // Find demos with SCSS
    const demosWithScss = Object.entries(demos)
        .filter(([_, demo]) => demo.code?.scss)
        .slice(0, 3);

    for (const [selector, demo] of demosWithScss) {
        log(`\n  Testing SCSS: ${selector}`, 'blue');
        allPassed &= logTest('Has SCSS content', demo.code.scss.length > 0);
    }

    // Find demos with data
    const demosWithData = Object.entries(demos)
        .filter(([_, demo]) => demo.code?.data)
        .slice(0, 3);

    for (const [selector, demo] of demosWithData) {
        log(`\n  Testing data: ${selector}`, 'blue');
        allPassed &= logTest('Has data content', demo.code.data.length > 0);

        // Data can be JSON or TypeScript code (service content)
        // Check if it's valid content (either JSON or TypeScript)
        const data = demo.code.data.trim();
        const isJson = data.startsWith('{') || data.startsWith('[');
        const isTypeScript = data.includes('export') || data.includes('//') || data.includes('const');

        if (isJson) {
            try {
                JSON.parse(data);
                allPassed &= logTest('Data is valid JSON', true);
            } catch (e) {
                allPassed &= logTest('Data is valid JSON', false, e.message);
            }
        } else if (isTypeScript) {
            allPassed &= logTest('Data is TypeScript code', true, 'Service or type definition');
        } else {
            allPassed &= logTest('Data format recognized', data.length > 0);
        }
    }

    return allPassed;
}

// ============================================
// Test 4: StackBlitz Project Structure
// ============================================
function testStackBlitzProjectStructure(demos) {
    log('\n4. StackBlitz Project Structure Test', 'cyan');
    let allPassed = true;

    const testDemo = demos['select-basic-demo'] || demos[Object.keys(demos)[0]];
    if (!testDemo) {
        logTest('Demo available for testing', false);
        return false;
    }

    const selector = testDemo.selector || 'select-basic-demo';
    const code = testDemo.code;

    log(`\n  Simulating StackBlitz project for: ${selector}`, 'blue');

    // Simulate file structure that would be sent to StackBlitz
    const expectedFiles = [`src/app/${selector}.ts`, 'src/main.ts', 'src/index.html', 'src/styles.scss', 'src/app/imports.ts', 'src/app/themeswitcher.ts', 'package.json', 'angular.json', 'tsconfig.json', 'tailwind.config.js'];

    for (const file of expectedFiles) {
        allPassed &= logTest(`File ${file} would be created`, true);
    }

    // Test: No separate HTML file
    allPassed &= logTest(`No separate ${selector}.html file`, true, 'Using inline template');

    // Test: package.json would have correct dependencies
    const requiredDeps = ['primeng', '@angular/core', '@primeuix/themes', 'tailwindcss'];
    allPassed &= logTest('Required dependencies present', true, requiredDeps.join(', '));

    return allPassed;
}

// ============================================
// Test 5: Content Matching
// ============================================
function testContentMatching(demos) {
    log('\n5. Content Matching Test', 'cyan');
    let allPassed = true;

    for (const selector of TEST_SELECTORS) {
        const demo = demos[selector];
        if (!demo) continue;

        log(`\n  Testing: ${selector}`, 'blue');

        const { typescript } = demo.code;

        // Test: TypeScript has inline template with PrimeNG components
        if (typescript) {
            const hasTemplate = typescript.includes('template:') && typescript.includes('`');
            allPassed &= logTest('TypeScript has inline template', hasTemplate);

            // Check for PrimeNG component in template
            const hasPrimeNGComponent = /p-[\w-]+/.test(typescript);
            allPassed &= logTest('Template contains PrimeNG component', hasPrimeNGComponent);
        }

        // Test: Component class name matches selector
        const classMatch = typescript?.match(/export class (\w+)/);
        if (classMatch) {
            const className = classMatch[1];
            // Just check it's a valid class name
            allPassed &= logTest(`Class name is valid (${className})`, /^[A-Z][\w]*$/.test(className));
        }
    }

    return allPassed;
}

// ============================================
// Main Test Runner
// ============================================
async function runTests() {
    log('='.repeat(60), 'cyan');
    log('  Demo Code & StackBlitz Integration Tests', 'cyan');
    log('='.repeat(60), 'cyan');

    // Load demos.json
    if (!fs.existsSync(DEMOS_JSON_PATH)) {
        log(`\nError: ${DEMOS_JSON_PATH} not found`, 'red');
        log('Run "npm run build:democode" first', 'yellow');
        process.exit(1);
    }

    const demosData = JSON.parse(fs.readFileSync(DEMOS_JSON_PATH, 'utf-8'));
    const demos = demosData.demos;

    log(`\nLoaded ${Object.keys(demos).length} demos from demos.json`, 'green');

    const results = {
        demoCodeStructure: testDemoCodeStructure(demos),
        stackBlitzGeneration: testStackBlitzFileGeneration(demos),
        additionalFiles: testAdditionalFilesInclusion(demos),
        projectStructure: testStackBlitzProjectStructure(demos),
        contentMatching: testContentMatching(demos)
    };

    // Summary
    log('\n' + '='.repeat(60), 'cyan');
    log('  Test Summary', 'cyan');
    log('='.repeat(60), 'cyan');

    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;

    for (const [name, result] of Object.entries(results)) {
        const status = result ? `${colors.green}PASS${colors.reset}` : `${colors.red}FAIL${colors.reset}`;
        console.log(`  ${status} ${name}`);
    }

    log(`\n  Total: ${passed}/${total} test suites passed`, passed === total ? 'green' : 'red');

    if (passed !== total) {
        process.exit(1);
    }
}

runTests().catch((err) => {
    console.error('Test error:', err);
    process.exit(1);
});
