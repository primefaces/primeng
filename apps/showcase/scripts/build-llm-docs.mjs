import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ComponentTokens from '@primeuix/themes/tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../doc');
const PAGES_DIR = path.resolve(__dirname, '../pages');
const API_DOC_PATH = path.resolve(__dirname, '../doc/apidoc/index.json');
const OUTPUT_DIR = path.resolve(__dirname, '../public/llms');

// Mapping for components where route name doesn't match API component name
const COMPONENT_NAME_MAP = {
    datepicker: 'DatePicker',
    datatable: 'DataTable',
    dataview: 'DataView',
    treetable: 'TreeTable',
    treeselect: 'TreeSelect',
    multiselect: 'MultiSelect',
    selectbutton: 'SelectButton',
    togglebutton: 'ToggleButton',
    splitbutton: 'SplitButton',
    speeddial: 'SpeedDial',
    inputtext: 'InputText',
    inputnumber: 'InputNumber',
    inputmask: 'InputMask',
    inputotp: 'InputOtp',
    inputgroup: 'InputGroup',
    iconfield: 'IconField',
    floatlabel: 'FloatLabel',
    iftalabel: 'IftaLabel',
    colorpicker: 'ColorPicker',
    listbox: 'Listbox',
    orderlist: 'OrderList',
    picklist: 'PickList',
    contextmenu: 'ContextMenu',
    tieredmenu: 'TieredMenu',
    menubar: 'Menubar',
    megamenu: 'MegaMenu',
    panelmenu: 'PanelMenu',
    tabmenu: 'TabMenu',
    confirmdialog: 'ConfirmDialog',
    confirmpopup: 'ConfirmPopup',
    dynamicdialog: 'DynamicDialog',
    fileupload: 'FileUpload',
    progressbar: 'ProgressBar',
    progressspinner: 'ProgressSpinner',
    blockui: 'BlockUI',
    scrollpanel: 'ScrollPanel',
    scrolltop: 'ScrollTop',
    virtualscroller: 'VirtualScroller',
    animateonscroll: 'AnimateOnScroll',
    autofocus: 'AutoFocus',
    focustrap: 'FocusTrap',
    styleclass: 'StyleClass'
};

/**
 * Get the correct component name for API lookups
 */
function getApiComponentName(componentName) {
    const lowerName = componentName.toLowerCase();
    if (COMPONENT_NAME_MAP[lowerName]) {
        return COMPONENT_NAME_MAP[lowerName];
    }
    // Default: capitalize first letter
    return componentName.charAt(0).toUpperCase() + componentName.slice(1);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Extract description text from Angular template
 */
function extractDescriptionFromTemplate(template) {
    const descriptions = [];

    // Extract content from app-docsectiontext
    const docTextMatches = template.matchAll(/<app-docsectiontext[^>]*>([\s\S]*?)<\/app-docsectiontext>/gi);
    for (const match of docTextMatches) {
        const content = match[1]
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        if (content) {
            descriptions.push(content);
        }
    }

    return descriptions.join(' ');
}

/**
 * Extract code examples from Angular TypeScript file
 * Looks for: code: Code = { basic: `...`, html: `...`, typescript: `...` }
 */
function extractCodeExamples(content) {
    // Find the code property assignment
    const codeMatch = content.match(/code:\s*Code\s*=\s*{/);
    if (!codeMatch) return null;

    const startIndex = codeMatch.index + codeMatch[0].length;
    let braceDepth = 1;
    let endIndex = -1;

    // Find the matching closing brace for the code object
    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '{') {
            braceDepth++;
        } else if (content[i] === '}') {
            braceDepth--;
            if (braceDepth === 0) {
                endIndex = i;
                break;
            }
        }
    }

    if (endIndex === -1) return null;

    const codeContent = content.substring(startIndex, endIndex);
    const examples = {};

    // Helper function to extract content between backticks
    function extractBetweenBackticks(text, prefix) {
        const startPattern = prefix + '\\s*`';
        const startMatch = text.match(new RegExp(startPattern));

        if (!startMatch) return null;

        const startIdx = startMatch.index + startMatch[0].length;
        let endIdx = -1;

        for (let i = startIdx; i < text.length; i++) {
            if (text[i] === '\\' && text[i + 1] === '`') {
                i++;
                continue;
            }

            if (text[i] === '`') {
                const after = text.substring(i + 1).match(/^[\s\n]*[,}]/);
                if (after) {
                    endIdx = i;
                    break;
                }
            }
        }

        if (endIdx === -1) return null;

        return text.substring(startIdx, endIdx).trim();
    }

    const basic = extractBetweenBackticks(codeContent, 'basic:');
    const html = extractBetweenBackticks(codeContent, 'html:');
    const typescript = extractBetweenBackticks(codeContent, 'typescript:');
    const data = extractBetweenBackticks(codeContent, 'data:');
    const scss = extractBetweenBackticks(codeContent, 'scss:');

    if (basic) examples.basic = basic;
    if (html) examples.html = html;
    if (typescript) examples.typescript = typescript;
    if (data) examples.data = data;
    if (scss) examples.scss = scss;

    return Object.keys(examples).length > 0 ? examples : null;
}

/**
 * Parse a single TypeScript documentation file
 */
function parseDocFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract template from @Component decorator
    const templateMatch = content.match(/template:\s*`([\s\S]*?)`(?=\s*(?:,|\}))/);
    const template = templateMatch ? templateMatch[1] : '';

    const description = extractDescriptionFromTemplate(template);
    const codeExamples = extractCodeExamples(content);

    return {
        description,
        codeExamples
    };
}

/**
 * Get component metadata from page file
 */
function getComponentMetadata(componentName) {
    const pagePath = path.join(PAGES_DIR, componentName, 'index.ts');

    if (!fs.existsSync(pagePath)) {
        return null;
    }

    const content = fs.readFileSync(pagePath, 'utf-8');

    // Extract from app-doc template attributes
    const docTitleMatch = content.match(/docTitle="([^"]+)"/);
    const headerMatch = content.match(/header="([^"]+)"/);
    const descriptionMatch = content.match(/description="([^"]+)"/);
    const apiDocsMatch = content.match(/\[apiDocs\]="(\[[^\]]+\])"/);
    const themeDocsMatch = content.match(/themeDocs="([^"]+)"/);

    // Extract docs array for sections
    const docsMatch = content.match(/docs\s*=\s*\[([\s\S]*?)\];/);
    let sections = [];

    if (docsMatch) {
        const docsContent = docsMatch[1];
        const sectionMatches = docsContent.matchAll(/{\s*id:\s*['"]([^'"]+)['"]\s*,\s*label:\s*['"]([^'"]+)['"]/g);

        for (const match of sectionMatches) {
            sections.push({
                id: match[1],
                label: match[2]
            });
        }
    }

    // Parse apiDocs array
    let apiComponents = [];
    if (apiDocsMatch) {
        try {
            apiComponents = JSON.parse(apiDocsMatch[1].replace(/'/g, '"'));
        } catch (e) {
            // Try extracting manually
            const apiMatches = apiDocsMatch[1].matchAll(/['"]([^'"]+)['"]/g);
            for (const m of apiMatches) {
                apiComponents.push(m[1]);
            }
        }
    }

    return {
        title: docTitleMatch ? docTitleMatch[1] : componentName,
        header: headerMatch ? headerMatch[1] : componentName,
        description: descriptionMatch ? descriptionMatch[1] : '',
        sections,
        apiComponents,
        themeDocs: themeDocsMatch ? themeDocsMatch[1] : componentName.toLowerCase()
    };
}

/**
 * Process a component directory
 */
function processComponent(componentName, componentDir) {
    const metadata = getComponentMetadata(componentName);

    if (!metadata) {
        return null;
    }

    const component = {
        name: componentName,
        title: metadata.title,
        description: metadata.description,
        apiComponents: metadata.apiComponents,
        themeDocs: metadata.themeDocs,
        sections: []
    };

    const files = fs.readdirSync(componentDir);

    for (const file of files) {
        if (!file.endsWith('.ts') || file.endsWith('.spec.ts')) continue;

        const filePath = path.join(componentDir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) continue;

        // Extract section id from filename (e.g., "basicdoc.ts" -> "basic")
        const sectionId = file.replace(/doc\.ts$/i, '').toLowerCase();
        const sectionInfo = metadata.sections.find((s) => s.id === sectionId);

        const docData = parseDocFile(filePath);

        if (docData.description || docData.codeExamples) {
            component.sections.push({
                id: sectionId,
                label: sectionInfo ? sectionInfo.label : file.replace('.ts', ''),
                description: docData.description,
                examples: docData.codeExamples
            });
        }
    }

    return component;
}

/**
 * Get all components from the docs directory
 */
function getAllComponents() {
    const entries = fs.readdirSync(DOCS_DIR);
    const components = [];

    // Directories to exclude (non-component documentation)
    const excludeDirs = [
        'apidoc',
        'common',
        'guides',
        'theming',
        'configuration',
        'contribution',
        'customicons',
        'designer',
        'icons',
        'introduction',
        'installation',
        'setup',
        'tailwind',
        'colors',
        'primeflex',
        'Image',
        'domain',
        'filterservice',
        'classnames',
        'bind',
        'forms',
        'passthrough',
        'cdn',
        'nuxt',
        'accessibility'
    ];

    for (const entry of entries) {
        const componentDir = path.join(DOCS_DIR, entry);
        const stat = fs.statSync(componentDir);

        if (!stat.isDirectory() || excludeDirs.includes(entry)) continue;

        const component = processComponent(entry, componentDir);
        if (component && component.sections.length > 0) {
            components.push(component);
        }
    }

    return components;
}

/**
 * Load API documentation
 */
function loadApiDocs() {
    if (!fs.existsSync(API_DOC_PATH)) {
        console.warn('API documentation not found. Run build:apidoc first.');
        return {};
    }

    return JSON.parse(fs.readFileSync(API_DOC_PATH, 'utf-8'));
}

/**
 * Get Props from API documentation
 */
function getPropsFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return null;

    // Get the main component (usually matches the componentName)
    const mainComponent = apiDoc.components[componentName] || Object.values(apiDoc.components)[0];

    if (!mainComponent || !mainComponent.props || !mainComponent.props.values) return null;

    return mainComponent.props.values.map((prop) => ({
        name: prop.name,
        type: prop.type || '',
        default: prop.default || '-',
        description: prop.description || '',
        deprecated: prop.deprecated || ''
    }));
}

/**
 * Get Templates (Slots) from API documentation
 */
function getTemplatesFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return null;

    const mainComponent = apiDoc.components[componentName] || Object.values(apiDoc.components)[0];

    if (!mainComponent || !mainComponent.templates || !mainComponent.templates.values) return null;

    return mainComponent.templates.values.map((template) => ({
        name: template.name,
        type: template.type || '',
        description: template.description || ''
    }));
}

/**
 * Get Emits from API documentation
 */
function getEmitsFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return null;

    const mainComponent = apiDoc.components[componentName] || Object.values(apiDoc.components)[0];

    if (!mainComponent || !mainComponent.emits || !mainComponent.emits.values) return null;

    return mainComponent.emits.values.map((emit) => ({
        name: emit.name,
        parameters: emit.parameters || [],
        description: emit.description || ''
    }));
}

/**
 * Get Methods from API documentation
 */
function getMethodsFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return null;

    const mainComponent = apiDoc.components[componentName] || Object.values(apiDoc.components)[0];

    if (!mainComponent || !mainComponent.methods || !mainComponent.methods.values) return null;

    return mainComponent.methods.values.map((method) => ({
        name: method.name,
        parameters: method.parameters || [],
        returnType: method.returnType || 'void',
        description: method.description || ''
    }));
}

/**
 * Get Pass Through Options from API types
 */
function getPTOptionsFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.types || !apiDoc.types.interfaces || !apiDoc.types.interfaces.values) return null;

    const ptInterface = apiDoc.types.interfaces.values.find((i) => i.name && i.name.includes('PassThrough') && i.name.includes('Options'));

    if (!ptInterface || !ptInterface.props) return null;

    return ptInterface.props.map((pt) => ({
        name: pt.name,
        type: pt.type || '',
        description: pt.description || ''
    }));
}

/**
 * Get CSS Classes from API style documentation
 */
function getStyleClassesFromApi(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.style || !apiDoc.style.classes || !apiDoc.style.classes.values) return null;

    return apiDoc.style.classes.values
        .filter((cls) => cls.class && typeof cls.class === 'string')
        .map((cls) => ({
            class: cls.class,
            description: cls.description || ''
        }));
}

/**
 * Get Design Tokens from @primeuix/themes
 */
function getTokensFromApi(componentName) {
    const tokens = [];
    const tokenKey = componentName.toLowerCase();

    if (ComponentTokens[tokenKey]) {
        const componentTokens = ComponentTokens[tokenKey].tokens;

        if (Array.isArray(componentTokens)) {
            for (const tokenData of componentTokens) {
                tokens.push({
                    token: tokenData.token,
                    variable: tokenData.variable,
                    description: tokenData.description || ''
                });
            }
        }
    }

    return tokens.length > 0 ? tokens : null;
}

/**
 * Get all related components from API doc
 */
function getRelatedComponents(apiDocs, componentName) {
    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return [];

    return Object.keys(apiDoc.components);
}

/**
 * Generate API section for markdown (with all sub-components)
 */
function generateApiSection(apiDocs, componentName, includeRelated = true) {
    let markdown = '';

    const apiDoc = apiDocs[componentName.toLowerCase()];
    if (!apiDoc || !apiDoc.components) return markdown;

    const components = includeRelated ? Object.keys(apiDoc.components) : [componentName];

    for (const compName of components) {
        const comp = apiDoc.components[compName];
        if (!comp) continue;

        const displayName = compName.replace(/([A-Z])/g, ' $1').trim();
        markdown += `## ${displayName}\n\n`;

        if (comp.description) {
            markdown += `${comp.description}\n\n`;
        }

        // Props
        if (comp.props && comp.props.values && comp.props.values.length > 0) {
            markdown += '### Props\n\n';
            markdown += '| Name | Type | Default | Description |\n';
            markdown += '|------|------|---------|-------------|\n';

            for (const prop of comp.props.values) {
                const name = prop.name || '';
                const type = (prop.type || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
                const defaultValue = prop.default || '-';
                const description = (prop.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
                const deprecated = prop.deprecated ? ' **(Deprecated)**' : '';

                markdown += `| ${name} | ${type} | ${defaultValue} | ${description}${deprecated} |\n`;
            }

            markdown += '\n';
        }

        // Emits
        if (comp.emits && comp.emits.values && comp.emits.values.length > 0) {
            markdown += '### Emits\n\n';
            markdown += '| Name | Parameters | Description |\n';
            markdown += '|------|------------|-------------|\n';

            for (const emit of comp.emits.values) {
                const name = emit.name || '';
                const params = emit.parameters
                    ? emit.parameters
                          .map((p) => `${p.name}: ${p.type}`)
                          .join(', ')
                          .replace(/\|/g, '\\|')
                    : '';
                const description = (emit.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

                markdown += `| ${name} | ${params} | ${description} |\n`;
            }

            markdown += '\n';
        }

        // Templates (Slots)
        if (comp.templates && comp.templates.values && comp.templates.values.length > 0) {
            markdown += '### Templates\n\n';
            markdown += '| Name | Type | Description |\n';
            markdown += '|------|------|-------------|\n';

            for (const template of comp.templates.values) {
                const name = template.name || '';
                const type = (template.type || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
                const description = (template.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

                markdown += `| ${name} | ${type} | ${description} |\n`;
            }

            markdown += '\n';
        }

        // Methods
        if (comp.methods && comp.methods.values && comp.methods.values.length > 0) {
            markdown += '### Methods\n\n';
            markdown += '| Name | Parameters | Return Type | Description |\n';
            markdown += '|------|------------|-------------|-------------|\n';

            for (const method of comp.methods.values) {
                const name = method.name || '';
                const params = method.parameters
                    ? method.parameters
                          .map((p) => `${p.name}: ${p.type}`)
                          .join(', ')
                          .replace(/\|/g, '\\|')
                    : '';
                const returnType = (method.returnType || 'void').replace(/\|/g, '\\|');
                const description = (method.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

                markdown += `| ${name} | ${params} | ${returnType} | ${description} |\n`;
            }

            markdown += '\n';
        }
    }

    return markdown;
}

/**
 * Generate Pass Through section for markdown
 */
function generatePTSection(apiDocs, componentName) {
    let markdown = '';

    const ptOptions = getPTOptionsFromApi(apiDocs, componentName);
    if (ptOptions && ptOptions.length > 0) {
        markdown += '## Pass Through Options\n\n';
        markdown += '| Name | Type | Description |\n';
        markdown += '|------|------|-------------|\n';

        for (const pt of ptOptions) {
            const name = pt.name || '';
            const type = (pt.type || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
            const description = (pt.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

            markdown += `| ${name} | ${type} | ${description} |\n`;
        }

        markdown += '\n';
    }

    return markdown;
}

/**
 * Generate Theming section for markdown
 */
function generateThemingSection(apiDocs, componentName) {
    let markdown = '';

    // CSS Classes
    const styleClasses = getStyleClassesFromApi(apiDocs, componentName);
    if (styleClasses && styleClasses.length > 0) {
        markdown += '## Theming\n\n';
        markdown += '### CSS Classes\n\n';
        markdown += '| Class | Description |\n';
        markdown += '|-------|-------------|\n';

        for (const style of styleClasses) {
            const className = style.class || '';
            const description = (style.description || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

            markdown += `| ${className} | ${description} |\n`;
        }

        markdown += '\n';
    }

    // Design Tokens
    const tokens = getTokensFromApi(componentName);
    if (tokens && tokens.length > 0) {
        if (!markdown.includes('## Theming')) {
            markdown += '## Theming\n\n';
        }
        markdown += '### Design Tokens\n\n';
        markdown += '| Token | CSS Variable | Description |\n';
        markdown += '|-------|--------------|-------------|\n';

        for (const token of tokens) {
            markdown += `| ${token.token} | ${token.variable} | ${token.description} |\n`;
        }

        markdown += '\n';
    }

    return markdown;
}

/**
 * Generate JSON output for MCP server
 */
function generateJsonOutput(components, apiDocs) {
    const output = {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        components: components.map((comp) => {
            const mainComponentName = getApiComponentName(comp.name);

            return {
                name: comp.name,
                title: comp.title,
                description: comp.description,
                sections: comp.sections.map((section) => ({
                    id: section.id,
                    label: section.label,
                    description: section.description,
                    examples: section.examples
                })),
                api: {
                    props: getPropsFromApi(apiDocs, mainComponentName),
                    templates: getTemplatesFromApi(apiDocs, mainComponentName),
                    emits: getEmitsFromApi(apiDocs, mainComponentName),
                    methods: getMethodsFromApi(apiDocs, mainComponentName),
                    pt: getPTOptionsFromApi(apiDocs, mainComponentName),
                    styles: getStyleClassesFromApi(apiDocs, mainComponentName),
                    tokens: getTokensFromApi(mainComponentName)
                }
            };
        })
    };

    const outputPath = path.join(OUTPUT_DIR, 'components.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`✓ Generated JSON output: ${outputPath}`);

    return output;
}

/**
 * Generate combined Markdown output for AI context
 */
function generateMarkdownOutput(components, apiDocs) {
    let markdown = '# PrimeNG Components Documentation\n\n';
    markdown += `Generated: ${new Date().toISOString()}\n\n`;
    markdown += '---\n\n';

    for (const comp of components) {
        const mainComponentName = getApiComponentName(comp.name);

        markdown += `# ${comp.title}\n\n`;
        markdown += `${comp.description}\n\n`;

        // Add sections with examples
        for (const section of comp.sections) {
            markdown += `## ${section.label}\n\n`;

            if (section.description) {
                markdown += `${section.description}\n\n`;
            }

            if (section.examples) {
                if (section.examples.basic) {
                    markdown += '**Basic Usage:**\n\n';
                    markdown += '```html\n';
                    markdown += section.examples.basic;
                    markdown += '\n```\n\n';
                }

                if (section.examples.typescript && section.id !== 'basic') {
                    markdown += '<details>\n<summary>TypeScript Example</summary>\n\n';
                    markdown += '```typescript\n';
                    markdown += section.examples.typescript;
                    markdown += '\n```\n';
                    markdown += '</details>\n\n';
                }

                if (section.examples.data) {
                    markdown += '**Sample Data:**\n\n';
                    markdown += '```json\n';
                    markdown += section.examples.data;
                    markdown += '\n```\n\n';
                }
            }
        }

        // Add API documentation
        markdown += generateApiSection(apiDocs, mainComponentName);

        // Add Pass Through Options
        markdown += generatePTSection(apiDocs, mainComponentName);

        // Add Theming
        markdown += generateThemingSection(apiDocs, mainComponentName);

        markdown += '---\n\n';
    }

    const outputPath = path.join(OUTPUT_DIR, 'components.md');
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    console.log(`✓ Generated Markdown output: ${outputPath}`);

    return markdown;
}

/**
 * Generate llms.txt index file
 */
function generateLlmsTxt(components) {
    let content = '# PrimeNG\n\n';
    content += '> The Most Complete Angular UI Component Library\n\n';
    content += '## Components\n\n';

    const sorted = [...components].sort((a, b) => a.title.localeCompare(b.title));

    for (const comp of sorted) {
        content += `- [${comp.title}](https://primeng.org/${comp.name}): ${comp.description}\n`;
    }

    const outputPath = path.join(OUTPUT_DIR, 'llms.txt');
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`✓ Generated llms.txt: ${outputPath}`);
}

/**
 * Generate individual component markdown files
 */
function generateIndividualMarkdownFiles(components, apiDocs) {
    const componentsDir = path.join(OUTPUT_DIR, 'components');

    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    for (const comp of components) {
        const mainComponentName = getApiComponentName(comp.name);

        let markdown = `# ${comp.title}\n\n`;
        markdown += `${comp.description}\n\n`;

        // Import section
        const importSection = comp.sections.find((s) => s.id === 'import');
        if (importSection && importSection.examples && importSection.examples.basic) {
            markdown += '## Import\n\n';
            markdown += '```typescript\n';
            markdown += importSection.examples.basic;
            markdown += '\n```\n\n';
        }

        // Other sections
        for (const section of comp.sections) {
            if (section.id === 'import') continue;

            markdown += `## ${section.label}\n\n`;

            if (section.description) {
                markdown += `${section.description}\n\n`;
            }

            if (section.examples) {
                if (section.examples.basic) {
                    markdown += '```html\n';
                    markdown += section.examples.basic;
                    markdown += '\n```\n\n';
                }

                if (section.examples.typescript && section.id !== 'basic') {
                    markdown += '<details>\n<summary>TypeScript Example</summary>\n\n';
                    markdown += '```typescript\n';
                    markdown += section.examples.typescript;
                    markdown += '\n```\n';
                    markdown += '</details>\n\n';
                }
            }
        }

        // Add API documentation (without related components for individual files)
        markdown += generateApiSection(apiDocs, mainComponentName, false);

        // Add Pass Through Options
        markdown += generatePTSection(apiDocs, mainComponentName);

        // Add Theming
        markdown += generateThemingSection(apiDocs, mainComponentName);

        const outputPath = path.join(componentsDir, `${comp.name}.md`);
        fs.writeFileSync(outputPath, markdown, 'utf-8');
    }

    console.log(`✓ Generated ${components.length} individual markdown files`);
}

/**
 * Main execution
 */
function main() {
    console.log('🚀 Building PrimeNG LLM Documentation...\n');

    console.log('📁 Parsing component documentation...');
    const components = getAllComponents();
    console.log(`   Found ${components.length} components\n`);

    console.log('📖 Loading API documentation...');
    const apiDocs = loadApiDocs();
    console.log(`   Loaded API docs for ${Object.keys(apiDocs).length} modules\n`);

    console.log('✨ Generating outputs...\n');
    generateJsonOutput(components, apiDocs);
    generateMarkdownOutput(components, apiDocs);
    generateLlmsTxt(components);
    generateIndividualMarkdownFiles(components, apiDocs);

    console.log('\n✅ LLM documentation generation complete!');
    console.log(`\nOutput directory: ${OUTPUT_DIR}`);
    console.log('   - components.json (for MCP server with full API data)');
    console.log('   - components.md (full documentation with Props, Templates, Emits, PT, Theming)');
    console.log('   - llms.txt (index file)');
    console.log('   - components/*.md (individual component files with complete API)');
}

main();
