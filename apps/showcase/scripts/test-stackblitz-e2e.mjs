#!/usr/bin/env node

/**
 * E2E Test for StackBlitz Integration
 *
 * This script simulates the StackBlitz project generation and validates:
 * 1. All required files are generated correctly
 * 2. package.json has correct dependencies
 * 3. TypeScript code is valid
 * 4. Simulates npm install validation (checks package.json structure)
 *
 * For full E2E testing with actual StackBlitz WebContainers,
 * you would need to use Playwright with the StackBlitz SDK.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Test configuration
const DEMOS_JSON_PATH = path.join(ROOT_DIR, 'public', 'demos.json');
const TEMP_DIR = path.join(ROOT_DIR, '.test-stackblitz');
const TEST_SELECTOR = process.argv[2] || 'select-basic-demo';
const TEST_ALL = process.argv.includes('--all');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    dim: '\x1b[2m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Load and transform code like app.code.ts does
function transformTypescriptForStackBlitz(code, selector) {
    let str = code.typescript;

    const importModuleStatement = "import { ImportsModule } from './imports';";

    if (str && !str.includes(importModuleStatement)) {
        // Remove module imports and replace with ImportsModule
        let modifiedCodeWithImportsModule = str.replace(/import\s+{[^{}]*}\s+from\s+'[^']+';[\r\n]*/g, (match) => {
            if (match.includes('Module') && !match.includes('ReactiveFormsModule') && !match.includes('Ref')) {
                return '';
            }
            return match;
        });

        // Replace imports array with ImportsModule (always add trailing comma)
        modifiedCodeWithImportsModule = modifiedCodeWithImportsModule.replace(/\bimports:\s*\[[^\]]*\],?/, 'imports: [ImportsModule],');

        const finalModifiedCode = modifiedCodeWithImportsModule.replace(/import\s+\{[^{}]*\}\s+from\s+'@angular\/core';/, (match) => match + '\n' + importModuleStatement);

        str = finalModifiedCode;
    }

    // Add theme-switcher to template
    str = str.replace(/template:\s*`\s*/, 'template: `\n        <theme-switcher />\n        ');

    // Add selector to @Component if missing
    if (selector && !/@Component\s*\(\s*\{[\s\S]*?selector\s*:/.test(str)) {
        str = str.replace(/@Component\s*\(\s*\{/, `@Component({\n    selector: '${selector}',`);
    }

    return str;
}

// Generate StackBlitz project files
function generateStackBlitzProject(demo, selector) {
    const code = demo.code;
    const services = demo.metadata?.services || [];
    const transformedTs = transformTypescriptForStackBlitz(code, selector);

    const componentName = selector
        .split('-')
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join('');

    const packageJson = {
        name: `primeng-${selector}`,
        version: '1.0.0',
        scripts: {
            ng: 'ng',
            start: 'ng serve',
            build: 'ng build'
        },
        dependencies: {
            '@angular/cdk': '^21.0.0',
            '@angular/common': '^21.0.0',
            '@angular/compiler': '^21.0.0',
            '@angular/core': '^21.0.0',
            '@angular/forms': '^21.0.0',
            '@angular/platform-browser': '^21.0.0',
            '@angular/platform-browser-dynamic': '^21.0.0',
            '@angular/router': '^21.0.0',
            '@primeuix/themes': '^2.0.2',
            primeicons: '^7.0.0',
            primeng: '21.0.0',
            rxjs: '~7.8.0',
            tailwindcss: '^3.4.10',
            'tailwindcss-primeui': '^0.6.1',
            tslib: '^2.3.0',
            'zone.js': '~0.15.0'
        },
        devDependencies: {
            '@angular-devkit/build-angular': '^21.0.0',
            '@angular/build': '^21.0.0',
            '@angular/cli': '^21.0.0',
            '@angular/compiler-cli': '^21.0.0',
            typescript: '~5.9.2'
        }
    };

    const mainTs = `import { bootstrapApplication } from '@angular/platform-browser';
import { ${componentName} } from './app/${selector}';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        providePrimeNG({
            theme: { preset: Aura, options: { darkModeSelector: '.p-dark' } },
        }),
    ],
};

bootstrapApplication(${componentName}, appConfig).catch((err) =>
    console.error(err)
);`;

    const indexHtml = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>PrimeNG ${componentName}</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <${selector}></${selector}>
</body>
</html>`;

    return {
        files: {
            'package.json': JSON.stringify(packageJson, null, 2),
            'src/main.ts': mainTs,
            'src/index.html': indexHtml,
            [`src/app/${selector}.ts`]: transformedTs
        },
        packageJson,
        services,
        selector
    };
}

// Validate TypeScript syntax
function validateTypeScript(tsContent, filePath, selector) {
    const errors = [];

    // Basic syntax checks
    if (!tsContent.includes('@Component(')) {
        errors.push('Missing @Component decorator');
    }

    if (!tsContent.includes('export class')) {
        errors.push('Missing export class');
    }

    // Check for unbalanced braces
    const openBraces = (tsContent.match(/{/g) || []).length;
    const closeBraces = (tsContent.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
        errors.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
    }

    // Check for unbalanced template literals
    const templateLiterals = (tsContent.match(/`/g) || []).length;
    if (templateLiterals % 2 !== 0) {
        errors.push('Unbalanced template literals');
    }

    // Check for invalid imports
    if (tsContent.includes("from 'primeng/") && tsContent.includes('ImportsModule')) {
        // Should not have direct primeng imports when using ImportsModule
        const directImports = tsContent.match(/import\s+\{[^}]*Module[^}]*\}\s+from\s+'primeng\/[^']+'/g);
        if (directImports) {
            errors.push('Has direct PrimeNG module imports alongside ImportsModule');
        }
    }

    // Check for comma after imports: [ImportsModule]
    if (tsContent.includes('imports: [ImportsModule]') && !tsContent.includes('imports: [ImportsModule],')) {
        errors.push('Missing comma after imports: [ImportsModule]');
    }

    // Check for selector in @Component
    if (selector && !tsContent.includes(`selector: '${selector}'`)) {
        errors.push(`Missing selector: '${selector}' in @Component`);
    }

    return errors;
}

// Validate package.json
function validatePackageJson(packageJson) {
    const errors = [];
    const requiredDeps = ['@angular/core', '@angular/common', 'primeng', '@primeuix/themes'];

    for (const dep of requiredDeps) {
        if (!packageJson.dependencies?.[dep]) {
            errors.push(`Missing required dependency: ${dep}`);
        }
    }

    if (!packageJson.scripts?.start) {
        errors.push('Missing start script');
    }

    return errors;
}

// Test a single demo
function testSingleDemo(demo, selector, verbose = true) {
    const errors = [];

    // Generate project
    const project = generateStackBlitzProject(demo, selector);

    // Validate generated files
    for (const [filePath, content] of Object.entries(project.files)) {
        if (!content || content.length === 0) {
            errors.push(`Empty file: ${filePath}`);
        }
    }

    // Validate TypeScript
    const tsFile = `src/app/${selector}.ts`;
    const tsErrors = validateTypeScript(project.files[tsFile], tsFile, selector);
    errors.push(...tsErrors.map((e) => `TypeScript: ${e}`));

    // Validate package.json
    const pkgErrors = validatePackageJson(project.packageJson);
    errors.push(...pkgErrors.map((e) => `package.json: ${e}`));

    // Check transformed code
    const tsContent = project.files[tsFile];

    if (!tsContent.includes("import { ImportsModule } from './imports'")) {
        errors.push('Missing ImportsModule import');
    }
    if (!tsContent.includes('imports: [ImportsModule]')) {
        errors.push('imports array not using ImportsModule');
    }
    if (!tsContent.includes('<theme-switcher />')) {
        errors.push('Missing theme-switcher in template');
    }

    return { passed: errors.length === 0, errors, project };
}

// Test runner
async function runE2ETest() {
    log('='.repeat(60), 'cyan');
    log('  StackBlitz E2E Integration Test', 'cyan');
    log('='.repeat(60), 'cyan');

    // Load demos.json
    if (!fs.existsSync(DEMOS_JSON_PATH)) {
        log(`\nError: ${DEMOS_JSON_PATH} not found`, 'red');
        log('Run "npm run build:democode" first', 'yellow');
        process.exit(1);
    }

    const demosData = JSON.parse(fs.readFileSync(DEMOS_JSON_PATH, 'utf-8'));
    const demos = demosData.demos;
    const totalDemos = Object.keys(demos).length;

    log(`\nLoaded ${totalDemos} demos`, 'green');

    // Test all demos or single demo
    if (TEST_ALL) {
        log('\nTesting ALL demos...', 'cyan');

        let passed = 0;
        let failed = 0;
        const failedDemos = [];

        const demoEntries = Object.entries(demos);
        const startTime = Date.now();

        for (let i = 0; i < demoEntries.length; i++) {
            const [selector, demo] = demoEntries[i];

            // Progress indicator
            if ((i + 1) % 100 === 0 || i === demoEntries.length - 1) {
                process.stdout.write(`\r  Progress: ${i + 1}/${totalDemos} demos tested...`);
            }

            const result = testSingleDemo(demo, selector, false);

            if (result.passed) {
                passed++;
            } else {
                failed++;
                failedDemos.push({ selector, errors: result.errors });
            }
        }

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log('\n');

        // Summary
        log('='.repeat(60), 'cyan');
        log(`  Results: ${passed} passed, ${failed} failed (${elapsed}s)`, passed === totalDemos ? 'green' : 'yellow');
        log('='.repeat(60), 'cyan');

        if (failedDemos.length > 0) {
            log('\nFailed demos:', 'red');
            for (const { selector, errors } of failedDemos.slice(0, 20)) {
                log(`  ${selector}:`, 'yellow');
                errors.forEach((e) => log(`    - ${e}`, 'dim'));
            }
            if (failedDemos.length > 20) {
                log(`  ... and ${failedDemos.length - 20} more`, 'dim');
            }
            process.exit(1);
        }

        log('\nAll demos passed!', 'green');
        return;
    }

    // Single demo test (existing behavior)
    const demo = demos[TEST_SELECTOR];
    if (!demo) {
        log(`\nError: Demo "${TEST_SELECTOR}" not found`, 'red');
        log('Available demos:', 'yellow');
        Object.keys(demos)
            .slice(0, 10)
            .forEach((k) => log(`  - ${k}`, 'dim'));
        log('  ...', 'dim');
        process.exit(1);
    }

    log(`\nTesting: ${TEST_SELECTOR}`, 'blue');

    // Generate project
    log('\n1. Generating StackBlitz project files...', 'cyan');
    const result = testSingleDemo(demo, TEST_SELECTOR, true);
    const project = result.project;

    let allPassed = result.passed;

    // Validate generated files
    log('\n2. Validating generated files...', 'cyan');
    for (const [filePath, content] of Object.entries(project.files)) {
        const hasContent = content && content.length > 0;
        const status = hasContent ? `${colors.green}OK${colors.reset}` : `${colors.red}EMPTY${colors.reset}`;
        console.log(`   ${status} ${filePath} (${content.length} bytes)`);
    }

    // Validate TypeScript
    log('\n3. Validating TypeScript syntax...', 'cyan');
    const tsFile = `src/app/${TEST_SELECTOR}.ts`;
    const tsErrors = validateTypeScript(project.files[tsFile], tsFile, TEST_SELECTOR);
    if (tsErrors.length === 0) {
        log(`   ${colors.green}OK${colors.reset} TypeScript syntax valid`, 'reset');
    } else {
        tsErrors.forEach((err) => log(`   ${colors.red}ERROR${colors.reset} ${err}`, 'reset'));
    }

    // Validate package.json
    log('\n4. Validating package.json...', 'cyan');
    const pkgErrors = validatePackageJson(project.packageJson);
    if (pkgErrors.length === 0) {
        log(`   ${colors.green}OK${colors.reset} package.json valid`, 'reset');
    } else {
        pkgErrors.forEach((err) => log(`   ${colors.red}ERROR${colors.reset} ${err}`, 'reset'));
    }

    // Check transformed code
    log('\n5. Validating code transformations...', 'cyan');
    const tsContent = project.files[tsFile];

    const checks = [
        ['ImportsModule import present', tsContent.includes("import { ImportsModule } from './imports'")],
        ['imports array uses ImportsModule', tsContent.includes('imports: [ImportsModule]')],
        ['imports array has trailing comma', tsContent.includes('imports: [ImportsModule],')],
        ['selector in @Component', tsContent.includes(`selector: '${TEST_SELECTOR}'`)],
        ['selector matches index.html', project.files['src/index.html'].includes(`<${TEST_SELECTOR}>`)],
        ['theme-switcher in template', tsContent.includes('<theme-switcher />')],
        ['No separate HTML file', !project.files[`src/app/${TEST_SELECTOR}.html`]]
    ];

    for (const [name, passed] of checks) {
        const status = passed ? `${colors.green}OK${colors.reset}` : `${colors.red}FAIL${colors.reset}`;
        console.log(`   ${status} ${name}`);
    }

    // Optional: Write files to temp directory for manual inspection
    if (process.argv.includes('--write')) {
        log('\n6. Writing files to temp directory...', 'cyan');

        if (fs.existsSync(TEMP_DIR)) {
            fs.rmSync(TEMP_DIR, { recursive: true });
        }
        fs.mkdirSync(TEMP_DIR, { recursive: true });

        for (const [filePath, content] of Object.entries(project.files)) {
            const fullPath = path.join(TEMP_DIR, filePath);
            fs.mkdirSync(path.dirname(fullPath), { recursive: true });
            fs.writeFileSync(fullPath, content);
        }

        log(`   Files written to: ${TEMP_DIR}`, 'green');
        log(`   You can run: cd ${TEMP_DIR} && npm install && npm start`, 'dim');
    }

    // Summary
    log('\n' + '='.repeat(60), 'cyan');
    if (allPassed) {
        log('  All tests PASSED', 'green');
    } else {
        log('  Some tests FAILED', 'red');
        result.errors.forEach((e) => log(`  - ${e}`, 'red'));
        process.exit(1);
    }
    log('='.repeat(60), 'cyan');

    log('\nUsage:', 'dim');
    log('  node test-stackblitz-e2e.mjs [selector]           Test specific demo', 'dim');
    log('  node test-stackblitz-e2e.mjs --all                Test ALL demos', 'dim');
    log('  node test-stackblitz-e2e.mjs --write              Write files to temp dir', 'dim');
}

runE2ETest().catch((err) => {
    console.error('Test error:', err);
    process.exit(1);
});
