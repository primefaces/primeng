import * as fs from 'fs';
import * as path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../doc');
const OUTPUT_PATH = path.resolve(__dirname, '../public/demos.json');

// Directories to skip (not component demos)
const SKIP_DIRS = ['apidoc', 'theming', 'icons', 'installation', 'configuration', 'customicons', 'playground', 'tailwind', 'uikit', 'templates', 'primeflex', 'csslayer', 'migration', 'llms', 'mcp'];

// Known services that exist in StackBlitz templates
const KNOWN_SERVICES = ['CarService', 'CountryService', 'CustomerService', 'EventService', 'NodeService', 'PhotoService', 'ProductService', 'TicketService'];

// PrimeNG API types that need to be imported from 'primeng/api'
const PRIMENG_API_TYPES = ['TreeNode', 'MenuItem', 'SelectItem', 'SelectItemGroup', 'FilterService', 'MessageService', 'ConfirmationService', 'PrimeNGConfig', 'TreeTableNode', 'ConfirmEventType'];

// PrimeNG selector to module mapping
const SELECTOR_TO_MODULE = {
    'p-accordion': 'AccordionModule',
    'p-autocomplete': 'AutoCompleteModule',
    'p-avatar': 'AvatarModule',
    'p-avatargroup': 'AvatarGroupModule',
    'p-badge': 'BadgeModule',
    'p-blockui': 'BlockUIModule',
    'p-breadcrumb': 'BreadcrumbModule',
    'p-button': 'ButtonModule',
    'p-datepicker': 'DatePickerModule',
    'p-card': 'CardModule',
    'p-carousel': 'CarouselModule',
    'p-cascadeselect': 'CascadeSelectModule',
    'p-chart': 'ChartModule',
    'p-checkbox': 'CheckboxModule',
    'p-chip': 'ChipModule',
    'p-colorpicker': 'ColorPickerModule',
    'p-confirmdialog': 'ConfirmDialogModule',
    'p-confirmpopup': 'ConfirmPopupModule',
    'p-contextmenu': 'ContextMenuModule',
    'p-dataview': 'DataViewModule',
    'p-dialog': 'DialogModule',
    'p-divider': 'DividerModule',
    'p-dock': 'DockModule',
    'p-drawer': 'DrawerModule',
    'p-select': 'SelectModule',
    'p-dynamicdialog': 'DynamicDialogModule',
    'p-editor': 'EditorModule',
    'p-fieldset': 'FieldsetModule',
    'p-fileupload': 'FileUploadModule',
    'p-floatlabel': 'FloatLabelModule',
    'p-galleria': 'GalleriaModule',
    'p-iconfield': 'IconFieldModule',
    'p-iftalabel': 'IftaLabelModule',
    'p-image': 'ImageModule',
    'p-imagecompare': 'ImageCompareModule',
    'p-inplace': 'InplaceModule',
    'p-inputgroup': 'InputGroupModule',
    'p-inputgroupaddon': 'InputGroupAddonModule',
    'p-inputicon': 'InputIconModule',
    'p-inputmask': 'InputMaskModule',
    'p-inputnumber': 'InputNumberModule',
    'p-inputotp': 'InputOtpModule',
    'p-inputtext': 'InputTextModule',
    'p-knob': 'KnobModule',
    'p-listbox': 'ListboxModule',
    'p-megamenu': 'MegaMenuModule',
    'p-menu': 'MenuModule',
    'p-menubar': 'MenubarModule',
    'p-message': 'MessageModule',
    'p-metergroup': 'MeterGroupModule',
    'p-multiselect': 'MultiSelectModule',
    'p-orderlist': 'OrderListModule',
    'p-organizationchart': 'OrganizationChartModule',
    'p-overlaybadge': 'OverlayBadgeModule',
    'p-paginator': 'PaginatorModule',
    'p-panel': 'PanelModule',
    'p-panelmenu': 'PanelMenuModule',
    'p-password': 'PasswordModule',
    'p-picklist': 'PickListModule',
    'p-popover': 'PopoverModule',
    'p-progressbar': 'ProgressBarModule',
    'p-progressspinner': 'ProgressSpinnerModule',
    'p-radiobutton': 'RadioButtonModule',
    'p-rating': 'RatingModule',
    'p-ripple': 'RippleModule',
    'p-scrollpanel': 'ScrollPanelModule',
    'p-scrolltop': 'ScrollTopModule',
    'p-scroller': 'ScrollerModule',
    'p-selectbutton': 'SelectButtonModule',
    'p-skeleton': 'SkeletonModule',
    'p-slider': 'SliderModule',
    'p-speeddial': 'SpeedDialModule',
    'p-splitbutton': 'SplitButtonModule',
    'p-splitter': 'SplitterModule',
    'p-steps': 'StepsModule',
    'p-stepper': 'StepperModule',
    'p-table': 'TableModule',
    'p-tabs': 'TabsModule',
    'p-tag': 'TagModule',
    'p-terminal': 'TerminalModule',
    'p-textarea': 'TextareaModule',
    'p-tieredmenu': 'TieredMenuModule',
    'p-timeline': 'TimelineModule',
    'p-toast': 'ToastModule',
    'p-togglebutton': 'ToggleButtonModule',
    'p-toggleswitch': 'ToggleSwitchModule',
    'p-toolbar': 'ToolbarModule',
    'p-tooltip': 'TooltipModule',
    'p-tree': 'TreeModule',
    'p-treeselect': 'TreeSelectModule',
    'p-treetable': 'TreeTableModule',
    'p-virtualscroller': 'VirtualScrollerModule'
};

// Component name to PascalCase mapping
function toPascalCase(str) {
    return str
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

// Extract interface definitions from file (before @Component)
function extractInterfaceDefinitions(content) {
    const interfaces = [];
    const seen = new Set();

    // Only look at content before @Component decorator
    const componentIndex = content.indexOf('@Component');
    if (componentIndex === -1) return [];

    const beforeComponent = content.substring(0, componentIndex);

    // Find all interface definitions
    const interfaceRegex = /^(interface\s+(\w+)\s*\{[\s\S]*?\n\})/gm;
    let match;
    while ((match = interfaceRegex.exec(beforeComponent)) !== null) {
        const name = match[2];
        if (!seen.has(name)) {
            seen.add(name);
            interfaces.push(match[1].trim());
        }
    }

    // Also find type aliases
    const typeRegex = /^(type\s+(\w+)\s*=\s*[^;]+;)/gm;
    while ((match = typeRegex.exec(beforeComponent)) !== null) {
        const name = match[2];
        if (!seen.has(name)) {
            seen.add(name);
            interfaces.push(match[1].trim());
        }
    }

    return interfaces;
}

// Extract class properties (excluding code, extFiles, routeFiles, and doc-specific ones)
function extractClassProperties(content) {
    // Find the class declaration start
    const classMatch = content.match(/export\s+class\s+\w+[^{]*\{/);
    if (!classMatch) return [];

    const classStartIndex = classMatch.index + classMatch[0].length;

    // Only look at properties before constructor or first method
    const constructorIndex = content.indexOf('constructor(', classStartIndex);
    const ngOnInitIndex = content.indexOf('ngOnInit(', classStartIndex);
    const loadDemoIndex = content.indexOf('loadDemoData(', classStartIndex);
    const codeIndex = content.indexOf('code: Code', classStartIndex);

    // Find the earliest boundary
    let endBoundary = content.length;
    if (constructorIndex > classStartIndex) endBoundary = Math.min(endBoundary, constructorIndex);
    if (ngOnInitIndex > classStartIndex) endBoundary = Math.min(endBoundary, ngOnInitIndex);
    if (loadDemoIndex > classStartIndex) endBoundary = Math.min(endBoundary, loadDemoIndex);
    if (codeIndex > classStartIndex) endBoundary = Math.min(endBoundary, codeIndex);

    const propertiesSection = content.substring(classStartIndex, endBoundary);

    const properties = [];
    const seen = new Set();

    // Match property declarations at class level (4 spaces indentation)
    const lines = propertiesSection.split('\n');

    for (const line of lines) {
        // Match lines that start with exactly 4 spaces and a word character (property declaration)
        // Supports: Type, Type[], Type | null, primitive types, union types
        const propMatch = line.match(/^    ([\w]+)([!?]?):\s*([A-Za-z][\w<>\[\]|, ]*(?:\s*\|\s*[\w\[\]]+)*)(?:\s*=\s*(.+))?;?\s*$/);
        if (!propMatch) continue;

        const propName = propMatch[1];
        const optional = propMatch[2];
        const propType = propMatch[3].trim();
        let defaultValue = propMatch[4]?.trim();

        // Skip doc-specific properties
        if (['code', 'extFiles', 'routeFiles', 'table', 'pt', 'codeElement'].includes(propName)) {
            continue;
        }

        // Skip if already seen
        if (seen.has(propName)) continue;
        seen.add(propName);

        // Skip injected services (they go in constructor)
        if (propName.endsWith('Service') || propName === 'cd') {
            continue;
        }

        // Clean up default value - handle multiline arrays/objects and trailing semicolons
        if (defaultValue) {
            // Remove trailing semicolon from default value
            defaultValue = defaultValue.replace(/;$/, '');
            // Handle multiline arrays (incomplete)
            if (defaultValue.startsWith('[') && !defaultValue.endsWith(']')) {
                defaultValue = undefined;
            }
            // Handle multiline objects (incomplete - only has opening brace)
            if (defaultValue && (defaultValue === '{' || (defaultValue.startsWith('{') && !defaultValue.endsWith('}')))) {
                defaultValue = undefined;
            }
            // Handle multiline function calls (incomplete - has unmatched parentheses)
            if (defaultValue) {
                const openParens = (defaultValue.match(/\(/g) || []).length;
                const closeParens = (defaultValue.match(/\)/g) || []).length;
                if (openParens !== closeParens) {
                    defaultValue = undefined;
                }
            }
        }

        properties.push({
            name: propName,
            optional,
            type: propType,
            defaultValue
        });
    }

    return properties;
}

// Extract constructor (cleaned up)
function extractConstructor(content, services = []) {
    // Find constructor with balanced braces
    const constructorStart = content.match(/constructor\s*\(([^)]*)\)\s*\{/);
    if (!constructorStart) return null;

    const params = constructorStart[1];
    const startIndex = constructorStart.index + constructorStart[0].length;

    // Find matching closing brace
    let braceCount = 1;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length && braceCount > 0; i++) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') braceCount--;
        endIndex = i;
    }

    const body = content.substring(startIndex, endIndex).trim();

    // Filter out doc-specific injections
    const cleanParams = params
        .split(',')
        .map((p) => p.trim())
        .filter((p) => {
            if (!p) return false;
            // Keep service injections
            if (services.some((s) => p.includes(s))) return true;
            // Keep common Angular services
            if (p.includes('MessageService') || p.includes('ConfirmationService')) return true;
            // Filter out doc-specific ones
            if (p.includes('ChangeDetectorRef') || p.includes('PLATFORM_ID') || p.includes('DOCUMENT')) return false;
            // Keep other services
            if (p.includes('Service')) return true;
            return false;
        })
        .join(', ');

    // Clean body - remove cd.markForCheck() calls
    const cleanBody = body
        .replace(/this\.cd\.markForCheck\(\);?/g, '')
        .replace(/\n\s*\n/g, '\n')
        .trim();

    if (!cleanParams && !cleanBody) return null;

    return {
        params: cleanParams,
        body: cleanBody
    };
}

// Extract method body with balanced braces
function extractMethodBody(content, methodName) {
    const methodStart = content.match(new RegExp(`${methodName}\\s*\\(\\s*\\)\\s*(?::\\s*\\w+\\s*)?\\{`));
    if (!methodStart) return null;

    const startIndex = methodStart.index + methodStart[0].length;

    // Find matching closing brace
    let braceCount = 1;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length && braceCount > 0; i++) {
        if (content[i] === '{') braceCount++;
        else if (content[i] === '}') braceCount--;
        endIndex = i;
    }

    let body = content.substring(startIndex, endIndex).trim();

    // Clean up the body - remove cd.markForCheck() calls
    body = body
        .replace(/this\.cd\.markForCheck\(\);?/g, '')
        .replace(/\n\s*\n/g, '\n')
        .trim();

    return body || null;
}

// Extract ngOnInit method
function extractNgOnInit(content) {
    return extractMethodBody(content, 'ngOnInit');
}

// Extract loadDemoData method (and convert to ngOnInit pattern)
function extractLoadDemoData(content) {
    return extractMethodBody(content, 'loadDemoData');
}

// Extract other methods (excluding doc-specific ones)
function extractOtherMethods(content) {
    const methods = [];
    const seenMethods = new Set();

    // Look at the class definition before "code: Code" AND between code block end and extFiles
    const codeIndex = content.indexOf('code: Code');
    const extFilesIndex = content.indexOf('extFiles = ');

    // Content before code block
    let beforeCode = codeIndex > -1 ? content.substring(0, codeIndex) : content;

    // Content between code block end and extFiles (or end of class)
    let betweenCodeAndExtFiles = '';
    if (codeIndex > -1) {
        // Find end of code object using balanced braces
        const codeStart = content.indexOf('{', codeIndex);
        if (codeStart > -1) {
            let braceCount = 1;
            let inString = false;
            let stringChar = '';
            let codeEnd = codeStart + 1;

            for (let i = codeStart + 1; i < content.length && braceCount > 0; i++) {
                const char = content[i];
                const prevChar = i > 0 ? content[i - 1] : '';

                if ((char === '`' || char === '"' || char === "'") && prevChar !== '\\') {
                    if (!inString) {
                        inString = true;
                        stringChar = char;
                    } else if (char === stringChar) {
                        inString = false;
                        stringChar = '';
                    }
                }

                if (!inString) {
                    if (char === '{') braceCount++;
                    else if (char === '}') braceCount--;
                }
                codeEnd = i;
            }

            // Get content after code block
            const afterCodeEnd = codeEnd + 1;
            const endBoundary = extFilesIndex > -1 ? extFilesIndex : content.length;
            if (afterCodeEnd < endBoundary) {
                betweenCodeAndExtFiles = content.substring(afterCodeEnd, endBoundary);
            }
        }
    }

    const searchContent = beforeCode + '\n' + betweenCodeAndExtFiles;

    // Match method definitions
    const methodRegex = /^\s{4}((?:async\s+)?[\w]+)\s*\(([^)]*)\)\s*(?::\s*([^\{]+))?\s*\{([\s\S]*?)\n\s{4}\}/gm;
    let match;

    const skipMethods = ['ngOnInit', 'loadDemoData', 'constructor', 'ngAfterViewChecked', 'ngAfterViewInit'];

    while ((match = methodRegex.exec(searchContent)) !== null) {
        const methodName = match[1].replace('async ', '');
        if (skipMethods.includes(methodName)) continue;
        if (seenMethods.has(methodName)) continue;
        seenMethods.add(methodName);

        // Normalize the method body indentation
        const rawBody = match[4].trim();
        const normalizedBody = normalizeCodeIndent(rawBody);

        methods.push({
            name: match[1],
            params: match[2],
            returnType: match[3]?.trim(),
            body: normalizedBody
        });
    }

    return methods;
}

// Extract selector from @Component decorator
function extractSelector(content) {
    const match = content.match(/selector:\s*['"`]([^'"`]+)['"`]/);
    return match ? match[1] : null;
}

// Extract template from @Component decorator
function extractTemplate(content) {
    // Handle template: `...` (backtick template)
    const backtickMatch = content.match(/template:\s*`([\s\S]*?)`(?=\s*[,}]|\s*\/\/|\s*changeDetection)/);
    if (backtickMatch) {
        return backtickMatch[1];
    }

    // Handle template: '...' (single quote)
    const singleQuoteMatch = content.match(/template:\s*'([\s\S]*?)'(?=\s*[,}])/);
    if (singleQuoteMatch) {
        return singleQuoteMatch[1];
    }

    return null;
}

// Normalize code indentation - for TypeScript/JavaScript code blocks
function normalizeCodeIndent(text) {
    if (!text) return text;

    const lines = text.split('\n');

    // Find minimum indentation (ignoring empty lines)
    let minIndent = Infinity;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;
        const match = line.match(/^(\s*)/);
        if (match) {
            minIndent = Math.min(minIndent, match[1].length);
        }
    }

    // If first line has no indent but others do, find the minimum indent from other lines
    // and use that as the base to subtract
    if (minIndent === 0 && lines.length > 1) {
        let baseIndent = Infinity;
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim() === '') continue;
            const match = line.match(/^(\s*)/);
            if (match && match[1].length > 0) {
                baseIndent = Math.min(baseIndent, match[1].length);
            }
        }
        // Subtract the base indent from all lines (except first which has 0)
        if (baseIndent !== Infinity && baseIndent > 0) {
            return lines
                .map((line, i) => {
                    if (line.trim() === '') return '';
                    if (i === 0) return line;
                    const currentIndent = line.match(/^(\s*)/)[1].length;
                    const newIndent = Math.max(0, currentIndent - baseIndent);
                    return ' '.repeat(newIndent) + line.trimStart();
                })
                .join('\n');
        }
        return text;
    }

    if (minIndent === Infinity || minIndent === 0) return text;

    // Remove minimum indentation from all lines
    return lines
        .map((line) => {
            if (line.trim() === '') return '';
            return line.slice(minIndent);
        })
        .join('\n');
}

// Normalize indentation - properly format HTML with consistent 4-space indents
function normalizeIndent(text) {
    if (!text) return text;

    const lines = text.split('\n').filter((line) => line.trim() !== '');
    if (lines.length === 0) return text;

    // Calculate indent levels based on HTML structure
    let currentLevel = 0;
    const result = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // Check if line starts with closing tag
        const startsWithClose = /^<\//.test(trimmed);
        // Check if line is self-closing or has both open and close
        const isSelfClosing = /\/>$/.test(trimmed) || /<\w+[^>]*>.*<\/\w+>$/.test(trimmed);
        // Check if line has opening tag
        const hasOpenTag = /<[a-zA-Z][^\/]*[^\/]>/.test(trimmed) && !/<\//.test(trimmed.replace(/<\/\w+>$/, ''));

        // Decrease level for closing tags
        if (startsWithClose) {
            currentLevel = Math.max(0, currentLevel - 1);
        }

        // Add line with current indent
        result.push('    '.repeat(currentLevel) + trimmed);

        // Increase level for opening tags (but not self-closing)
        if (hasOpenTag && !isSelfClosing && !startsWithClose) {
            currentLevel++;
        }
    }

    return result.join('\n');
}

// Extract demo content from template (remove doc elements)
function extractDemoContent(template) {
    if (!template) return null;

    let html = template;

    // Remove app-docsectiontext
    html = html.replace(/<app-docsectiontext[\s\S]*?<\/app-docsectiontext>/g, '');

    // Remove app-code (self-closing and regular)
    html = html.replace(/<app-code[^>]*><\/app-code>/g, '');
    html = html.replace(/<app-code[^>]*\/>/g, '');

    // Handle p-deferred-demo wrapper - extract inner content
    const deferredMatch = html.match(/<p-deferred-demo[^>]*>([\s\S]*?)<\/p-deferred-demo>/);
    if (deferredMatch) {
        html = deferredMatch[1];
    }

    // Trim and clean up whitespace
    html = html.trim();

    // Remove leading/trailing empty lines
    html = html.replace(/^\s*\n/gm, '');

    // Normalize indentation
    html = normalizeIndent(html);

    return html || null;
}

// Extract content from inside a div with specific class, handling nested divs
function extractDivContent(html, classPattern) {
    const regex = new RegExp(`<div[^>]*class="[^"]*${classPattern}[^"]*"[^>]*>`);
    const match = html.match(regex);
    if (!match) return null;

    const startIndex = match.index + match[0].length;
    let depth = 1;
    let i = startIndex;

    // Find matching closing </div> using balanced counting
    while (i < html.length && depth > 0) {
        if (html.slice(i).startsWith('<div')) {
            depth++;
            i += 4;
        } else if (html.slice(i).startsWith('</div>')) {
            depth--;
            if (depth === 0) break;
            i += 6;
        } else {
            i++;
        }
    }

    if (depth === 0) {
        return html.slice(startIndex, i).trim();
    }
    return null;
}

// Extract basic code (just PrimeNG component without wrapper)
function extractBasicCode(htmlContent) {
    if (!htmlContent) return null;

    let basic = htmlContent;

    // Remove card wrapper div
    const cardContent = extractDivContent(basic, 'card');
    if (cardContent) {
        basic = cardContent;
    }

    // Also try to remove flex/grid wrapper inside card (but keep if it has meaningful structure)
    const flexContent = extractDivContent(basic, '(?:flex|grid)');
    if (flexContent) {
        // Only unwrap if the inner content has PrimeNG components and the flex div is just a simple wrapper
        const hasPrimeNG = flexContent.indexOf('<p-') !== -1 || flexContent.indexOf('pButton') !== -1;
        const isSimpleWrapper = !flexContent.includes('<div class="') || flexContent.split('<div').length <= 2;
        if (hasPrimeNG && isSimpleWrapper) {
            basic = flexContent;
        }
    }

    // Normalize indentation of the extracted content
    return normalizeIndent(basic.trim());
}

// Extract existing code object from doc file using balanced brace matching
function extractExistingCodeObject(content) {
    // Find the start of code: Code = {
    const codeStart = content.match(/code:\s*Code\s*=\s*\{/);
    if (!codeStart) return null;

    const startIndex = codeStart.index + codeStart[0].length;

    // Find matching closing brace using balanced brace counting
    let braceCount = 1;
    let endIndex = startIndex;
    let inString = false;
    let stringChar = '';

    for (let i = startIndex; i < content.length && braceCount > 0; i++) {
        const char = content[i];
        const prevChar = i > 0 ? content[i - 1] : '';

        // Handle string literals (skip braces inside strings)
        if ((char === '`' || char === '"' || char === "'") && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
                stringChar = '';
            }
        }

        if (!inString) {
            if (char === '{') braceCount++;
            else if (char === '}') braceCount--;
        }

        endIndex = i;
    }

    const codeBlock = content.substring(startIndex, endIndex);
    const code = {};

    // Extract basic
    const basicMatch = codeBlock.match(/basic:\s*`([\s\S]*?)`/);
    if (basicMatch) code.basic = basicMatch[1];

    // Extract html
    const htmlMatch = codeBlock.match(/html:\s*`([\s\S]*?)`/);
    if (htmlMatch) code.html = htmlMatch[1];

    // Extract typescript
    const tsMatch = codeBlock.match(/typescript:\s*`([\s\S]*?)`/);
    if (tsMatch) code.typescript = tsMatch[1];

    // Extract data
    const dataMatch = codeBlock.match(/data:\s*`([\s\S]*?)`/);
    if (dataMatch) code.data = dataMatch[1];

    // Extract scss
    const scssMatch = codeBlock.match(/scss:\s*`([\s\S]*?)`/);
    if (scssMatch) code.scss = scssMatch[1];

    // Extract service
    const serviceMatch = codeBlock.match(/service:\s*\[([\s\S]*?)\]/);
    if (serviceMatch) {
        const services = serviceMatch[1].match(/'([^']+)'/g);
        if (services) {
            code.service = services.map((s) => s.replace(/'/g, ''));
        }
    }

    return code;
}

// Extract extFiles from doc file
function extractExtFiles(content) {
    const extFilesMatch = content.match(/extFiles\s*=\s*\[([\s\S]*?)\];/);
    if (!extFilesMatch) return [];

    const extFilesContent = extFilesMatch[1];
    const files = [];

    // Parse each file object
    const fileMatches = extFilesContent.matchAll(/\{\s*path:\s*['"`]([^'"`]+)['"`],\s*content:\s*`([\s\S]*?)`\s*\}/g);
    for (const match of fileMatches) {
        files.push({
            path: match[1],
            content: match[2].trim()
        });
    }

    return files;
}

// Detect services from component file
function detectServices(content) {
    const services = [];

    // Method 1: Look for imports from @/service/*
    const serviceImportMatches = content.matchAll(/import\s*\{\s*([^}]+)\s*\}\s*from\s*['"`]@\/service\/[^'"`]+['"`]/g);
    for (const match of serviceImportMatches) {
        const names = match[1].split(',').map((n) => n.trim());
        for (const name of names) {
            if (KNOWN_SERVICES.includes(name) && !services.includes(name)) {
                services.push(name);
            }
        }
    }

    // Method 2: Look for providers array in @Component
    const providersMatch = content.match(/providers:\s*\[([^\]]+)\]/);
    if (providersMatch) {
        const providerNames = providersMatch[1].split(',').map((p) => p.trim());
        for (const name of providerNames) {
            if (KNOWN_SERVICES.includes(name) && !services.includes(name)) {
                services.push(name);
            }
        }
    }

    return services;
}

// Detect PrimeNG modules used in template
function detectPrimeNGModules(template) {
    const modules = new Set();

    // Check for p-* selectors
    for (const [selector, module] of Object.entries(SELECTOR_TO_MODULE)) {
        const regex = new RegExp(`<${selector}[\\s>]`, 'i');
        if (regex.test(template)) {
            modules.add(module);
        }
    }

    // Check for pButton directive
    if (/pButton/.test(template)) {
        modules.add('ButtonModule');
    }

    // Check for pInputText directive
    if (/pInputText/.test(template)) {
        modules.add('InputTextModule');
    }

    // Check for pRipple directive
    if (/pRipple/.test(template)) {
        modules.add('RippleModule');
    }

    // Check for pTooltip directive
    if (/pTooltip/.test(template)) {
        modules.add('TooltipModule');
    }

    // Check for ngModel (needs FormsModule)
    if (/\[\(ngModel\)\]/.test(template) || /ngModel/.test(template)) {
        modules.add('FormsModule');
    }

    // Check for formControl (needs ReactiveFormsModule)
    if (/formControl/.test(template) || /formGroup/.test(template)) {
        modules.add('ReactiveFormsModule');
    }

    // Check for *ngFor, *ngIf (needs CommonModule)
    if (/\*ngFor|\*ngIf|ngClass|ngStyle|\[ngClass\]|\[ngStyle\]/.test(template)) {
        modules.add('CommonModule');
    }

    return Array.from(modules);
}

// Generate demo TypeScript code with actual module imports (not ImportsModule)
function generateTypescript(componentName, template, services = [], fileContent = '') {
    const primeModules = detectPrimeNGModules(template);

    // Extract class details from original file
    const interfaces = extractInterfaceDefinitions(fileContent);
    const properties = extractClassProperties(fileContent);
    const ngOnInitBody = extractNgOnInit(fileContent);
    const loadDemoDataBody = extractLoadDemoData(fileContent);
    const constructor = extractConstructor(fileContent, services);
    const otherMethods = extractOtherMethods(fileContent);

    // Determine if we need OnInit
    const needsOnInit = ngOnInitBody || loadDemoDataBody || services.length > 0;

    // Build import statements with actual modules
    let importStatements = '';

    // Angular core imports
    const angularCoreImports = ['Component'];
    if (needsOnInit) angularCoreImports.push('OnInit');
    importStatements += `import { ${angularCoreImports.join(', ')} } from '@angular/core';\n`;

    // Add FormsModule if needed
    if (primeModules.includes('FormsModule')) {
        importStatements += `import { FormsModule } from '@angular/forms';\n`;
    }

    // Add ReactiveFormsModule if needed
    if (primeModules.includes('ReactiveFormsModule')) {
        importStatements += `import { ReactiveFormsModule } from '@angular/forms';\n`;
    }

    // Add PrimeNG modules
    const primeNGImports = primeModules.filter((m) => !['CommonModule', 'FormsModule', 'ReactiveFormsModule'].includes(m));
    for (const module of primeNGImports) {
        const moduleLower = module.replace('Module', '').toLowerCase();
        importStatements += `import { ${module} } from 'primeng/${moduleLower}';\n`;
    }

    // Add service imports if any
    for (const service of services) {
        importStatements += `import { ${service} } from '@/service/${service.toLowerCase()}';\n`;
    }

    // Detect and add PrimeNG API types (TreeNode, MenuItem, etc.)
    const usedApiTypes = [];
    const allContent = fileContent + (interfaces.length > 0 ? interfaces.join('\n') : '');
    for (const apiType of PRIMENG_API_TYPES) {
        // Check if type is used in properties, interfaces, or method signatures
        const typeRegex = new RegExp(`\\b${apiType}\\b`, 'g');
        if (typeRegex.test(allContent)) {
            usedApiTypes.push(apiType);
        }
    }
    if (usedApiTypes.length > 0) {
        importStatements += `import { ${usedApiTypes.join(', ')} } from 'primeng/api';\n`;
    }

    // Build imports array for decorator (actual modules, not ImportsModule)
    const decoratorImports = primeModules.filter((m) => m !== 'CommonModule');

    // Build providers if services exist
    const providersLine = services.length > 0 ? `\n    providers: [${services.join(', ')}],` : '';

    // Generate class name (e.g., SelectBasicDemo)
    const className = componentName + 'Demo';

    // Build interface definitions
    let interfaceBlock = '';
    if (interfaces.length > 0) {
        interfaceBlock = '\n' + interfaces.join('\n\n') + '\n';
    }

    // Build class implements
    const implementsClause = needsOnInit ? ' implements OnInit' : '';

    // Build class body
    let classBody = '';

    // Add properties
    if (properties.length > 0) {
        classBody += '\n';
        for (const prop of properties) {
            if (prop.defaultValue) {
                classBody += `    ${prop.name}${prop.optional}: ${prop.type} = ${prop.defaultValue};\n`;
            } else {
                classBody += `    ${prop.name}${prop.optional}: ${prop.type};\n`;
            }
        }
    }

    // Add constructor if needed
    if (constructor && constructor.params) {
        classBody += `\n    constructor(${constructor.params}) {`;
        if (constructor.body) {
            classBody += `\n        ${constructor.body.replace(/\n/g, '\n        ')}\n    `;
        }
        classBody += '}\n';
    } else if (services.length > 0) {
        // Generate constructor for services
        const serviceParams = services.map((s) => `private ${s.charAt(0).toLowerCase() + s.slice(1)}: ${s}`).join(', ');
        classBody += `\n    constructor(${serviceParams}) {}\n`;
    }

    // Add ngOnInit if needed
    if (needsOnInit) {
        classBody += '\n    ngOnInit() {\n';
        if (ngOnInitBody) {
            // Normalize TypeScript code indentation (different from HTML)
            const normalizedBody = normalizeCodeIndent(ngOnInitBody);
            classBody += `        ${normalizedBody.replace(/\n/g, '\n        ')}\n`;
        } else if (loadDemoDataBody) {
            const normalizedBody = normalizeCodeIndent(loadDemoDataBody);
            classBody += `        ${normalizedBody.replace(/\n/g, '\n        ')}\n`;
        }
        classBody += '    }\n';
    }

    // Add other methods
    for (const method of otherMethods) {
        const returnType = method.returnType ? `: ${method.returnType}` : '';
        classBody += `\n    ${method.name}(${method.params})${returnType} {\n`;
        classBody += `        ${method.body.replace(/\n/g, '\n        ')}\n`;
        classBody += '    }\n';
    }

    // Normalize template indentation first, then add proper indent for inline template
    const normalizedTemplate = normalizeIndent(template);
    const formattedTemplate = normalizedTemplate
        .split('\n')
        .map((line) => '        ' + line)
        .join('\n')
        .trimEnd();

    return `${importStatements}${interfaceBlock}
@Component({
    template: \`
${formattedTemplate}
    \`,
    standalone: true,
    imports: [${decoratorImports.join(', ')}]${providersLine}
})
export class ${className}${implementsClause} {${classBody}}`;
}

// Extract selector from app-code tag in template
// Skip app-code tags that have [code]= binding (those are helper snippets, not the main demo)
function extractAppCodeSelector(template) {
    // Find all app-code tags
    const appCodeRegex = /<app-code[^>]*>/g;
    let match;
    while ((match = appCodeRegex.exec(template)) !== null) {
        const tag = match[0];
        // Skip if it has [code]= binding (helper snippet)
        if (/\[code\]\s*=/.test(tag)) continue;
        // Extract selector from this tag
        const selectorMatch = tag.match(/selector\s*=\s*["']([^"']+)["']/);
        if (selectorMatch) {
            return selectorMatch[1];
        }
    }
    return null;
}

// Parse a single doc file
function parseDocFile(filePath, componentDir) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const selector = extractSelector(content);
    if (!selector) return null;

    const template = extractTemplate(content);
    if (!template) return null;

    const demoContent = extractDemoContent(template);
    if (!demoContent) return null;

    // Try to get existing code object (for data, scss that can't be auto-generated)
    const existingCode = extractExistingCodeObject(content);
    const extFiles = extractExtFiles(content);

    // Extract section name from filename
    const fileName = path.basename(filePath, '.ts');
    const section = fileName.replace(/doc$/, '');

    // Generate basic code
    const basicCode = extractBasicCode(demoContent);

    // Get the demo selector - prefer app-code selector, fallback to generated key
    const appCodeSelector = extractAppCodeSelector(template);
    const uniqueKey = appCodeSelector || `${componentDir}-${section}-demo`;

    // Get component name from selector (properly hyphenated) for correct PascalCase
    // e.g., "tree-table-sort-multiple-columns-demo" -> "TreeTableSortMultipleColumns"
    const componentName = toPascalCase(uniqueKey.replace(/-demo$/, ''));

    // Detect services from component file (preferred) or fall back to existing code block
    const detectedServices = detectServices(content);
    const services = detectedServices.length > 0 ? detectedServices : existingCode?.service || [];

    // Generate TypeScript - pass full content for class extraction
    const generatedTypescript = generateTypescript(componentName, demoContent, services, content);

    return {
        key: uniqueKey,
        selector: uniqueKey,
        component: componentDir,
        section,
        code: {
            basic: basicCode || existingCode?.basic || '',
            html: demoContent,
            typescript: generatedTypescript, // Always use generated TypeScript
            data: existingCode?.data,
            scss: existingCode?.scss
        },
        metadata: {
            services,
            extFiles,
            imports: detectPrimeNGModules(demoContent)
        }
    };
}

// Main function
async function main() {
    console.log('Building demo code JSON...');

    const demos = {};
    let processedCount = 0;
    let errorCount = 0;

    // Get all component directories
    const componentDirs = fs.readdirSync(DOCS_DIR).filter((dir) => {
        const fullPath = path.join(DOCS_DIR, dir);
        return fs.statSync(fullPath).isDirectory() && !SKIP_DIRS.includes(dir.toLowerCase());
    });

    for (const componentDir of componentDirs) {
        const componentPath = path.join(DOCS_DIR, componentDir);

        // Get all *doc.ts files in this component directory
        const docFiles = glob.sync('**/*doc.ts', { cwd: componentPath });

        // Files that are documentation, not demos
        const SKIP_FILES = ['accessibilitydoc', 'styledoc', 'methodsdoc', 'eventsdoc', 'themedoc', 'propsdoc', 'importdoc'];

        for (const docFile of docFiles) {
            const fileName = path.basename(docFile, '.ts').toLowerCase();

            // Skip non-demo documentation files
            if (SKIP_FILES.some((skip) => fileName.includes(skip))) {
                continue;
            }

            const filePath = path.join(componentPath, docFile);

            try {
                const demo = parseDocFile(filePath, componentDir);
                if (demo && demo.key) {
                    demos[demo.key] = demo;
                    processedCount++;
                }
            } catch (error) {
                console.error(`Error processing ${filePath}:`, error.message);
                errorCount++;
            }
        }
    }

    // Generate output
    const output = {
        version: '1.0.0',
        generatedAt: new Date().toISOString(),
        totalDemos: processedCount,
        demos
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write JSON file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

    console.log(`\nBuild complete!`);
    console.log(`  Processed: ${processedCount} demos`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Output: ${OUTPUT_PATH}`);
}

main().catch(console.error);
