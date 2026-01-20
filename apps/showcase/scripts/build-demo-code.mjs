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
const SKIP_DIRS = ['apidoc', 'theming', 'icons', 'installation', 'configuration', 'customicons', 'playground', 'uikit', 'templates', 'primeflex', 'csslayer', 'migration', 'llms', 'mcp'];

// Known services that exist in StackBlitz templates
const KNOWN_SERVICES = ['CarService', 'CountryService', 'CustomerService', 'EventService', 'NodeService', 'PhotoService', 'ProductService', 'TicketService'];

// PrimeNG API services that should be included in providers
const PRIMENG_SERVICES = ['MessageService', 'ConfirmationService', 'DialogService', 'TreeDragDropService', 'FilterService'];

// Known domain types and their paths
// Note: 'Event' is excluded because it conflicts with DOM Event type
const KNOWN_DOMAIN_TYPES = {
    Customer: 'customer',
    Representative: 'customer',
    Country: 'customer',
    Product: 'product',
    Car: 'car',
    Photo: 'photo'
};

// Domain type definitions for auto-generated extFiles
const DOMAIN_TYPE_DEFINITIONS = {
    customer: `export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`,
    product: `export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`,
    car: `export interface Car {
    vin?: string;
    year?: number;
    brand?: string;
    color?: string;
}`,
    photo: `export interface Photo {
    title?: string;
    thumbnailUrl?: string;
}`
};

// PrimeNG named exports that can be used as types (not modules)
const PRIMENG_NAMED_EXPORTS = {
    Table: 'table',
    Tree: 'tree',
    TreeTable: 'treetable',
    Paginator: 'paginator',
    OverlayPanel: 'overlaypanel',
    Popover: 'popover',
    Dialog: 'dialog',
    Drawer: 'drawer',
    Menu: 'menu',
    ContextMenu: 'contextmenu',
    TieredMenu: 'tieredmenu',
    MegaMenu: 'megamenu',
    Menubar: 'menubar',
    Steps: 'steps',
    TabMenu: 'tabmenu',
    PanelMenu: 'panelmenu'
};

// PrimeNG API types that need to be imported from 'primeng/api'
const PRIMENG_API_TYPES = [
    'TreeNode',
    'MenuItem',
    'MegaMenuItem',
    'SelectItem',
    'SelectItemGroup',
    'FilterService',
    'MessageService',
    'ConfirmationService',
    'PrimeNGConfig',
    'TreeTableNode',
    'ConfirmEventType',
    'SortEvent',
    'LazyLoadEvent',
    'FilterMetadata',
    'TableLazyLoadEvent'
];

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
        // Pattern 1: With type annotation - name: Type = value;
        let propMatch = line.match(/^    ([\w]+)([!?]?):\s*([A-Za-z][\w<>\[\]|, ]*(?:\s*\|\s*[\w\[\]]+)*)(?:\s*=\s*(.+))?;?\s*$/);

        // Pattern 2: Without type annotation - name = value;
        if (!propMatch) {
            const noTypeMatch = line.match(/^    ([\w]+)\s*=\s*(.+);?\s*$/);
            if (noTypeMatch) {
                const defaultVal = noTypeMatch[2].trim().replace(/;$/, '');
                let inferredType = 'any';

                // Check for signal declarations: signal<Type>(initialValue)
                const signalMatch = defaultVal.match(/^signal(<[^>]+>)?\((.*)?\)$/);
                if (signalMatch) {
                    // For signals, the type IS the signal call itself, no separate type annotation needed
                    // We'll store the full signal declaration as both type and default value
                    propMatch = [null, noTypeMatch[1], '', '__signal__', defaultVal];
                }
                // Check for inject() pattern: inject(ServiceName)
                else if (defaultVal.match(/^inject\(\w+\)$/)) {
                    propMatch = [null, noTypeMatch[1], '', '__inject__', defaultVal];
                } else if (defaultVal === '[]' || defaultVal.startsWith('[')) {
                    inferredType = 'any[]';
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                } else if (defaultVal === '{}' || defaultVal.startsWith('{')) {
                    inferredType = 'any';
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                } else if (defaultVal === 'true' || defaultVal === 'false') {
                    inferredType = 'boolean';
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                } else if (/^['"`]/.test(defaultVal)) {
                    inferredType = 'string';
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                } else if (/^\d+$/.test(defaultVal)) {
                    inferredType = 'number';
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                } else {
                    propMatch = [null, noTypeMatch[1], '', inferredType, defaultVal];
                }
            }
        }

        if (!propMatch) continue;

        const propName = propMatch[1];
        const optional = propMatch[2];
        const propType = propMatch[3]?.trim() || 'any';
        let defaultValue = propMatch[4]?.trim();

        // Skip doc-specific properties
        if (['code', 'extFiles', 'routeFiles', 'table', 'pt', 'codeElement'].includes(propName)) {
            continue;
        }

        // Skip if already seen
        if (seen.has(propName)) continue;
        seen.add(propName);

        // Skip injected services (they go in constructor) - unless using inject() pattern
        const isInjectPattern = propMatch[3] === '__inject__';
        if ((propName.endsWith('Service') || propName === 'cd') && !isInjectPattern) {
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
            // Keep PrimeNG config injection
            if (p.includes('PrimeNG')) return true;
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

// Normalize indentation - preserve relative indentation from source
// This function strips the minimum common indentation while preserving the internal structure
function normalizeIndent(text) {
    if (!text) return text;

    const lines = text.split('\n');
    if (lines.length === 0) return text;

    // Find minimum indentation (ignoring empty lines and the first line if it has 0 indent)
    let minIndent = Infinity;
    let firstNonEmptyLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') continue;

        if (firstNonEmptyLineIndex === -1) {
            firstNonEmptyLineIndex = i;
        }

        const match = line.match(/^(\s*)/);
        if (match) {
            const indent = match[1].length;
            // If it's the first non-empty line and has 0 indent, skip it for min calculation
            // (this handles cases where .trim() removed leading whitespace from first line)
            if (i === firstNonEmptyLineIndex && indent === 0) {
                continue;
            }
            minIndent = Math.min(minIndent, indent);
        }
    }

    // If we couldn't find a meaningful min indent, just clean up
    if (minIndent === Infinity || minIndent === 0) {
        return lines
            .map((line) => (line.trim() === '' ? '' : line))
            .join('\n')
            .trim();
    }

    // Remove minimum indentation from all lines (except first line which might have 0 indent already)
    return lines
        .map((line) => {
            if (line.trim() === '') return '';
            const match = line.match(/^(\s*)/);
            const currentIndent = match ? match[1].length : 0;
            if (currentIndent >= minIndent) {
                return line.slice(minIndent);
            }
            return line;
        })
        .join('\n')
        .trim();
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

    // Only remove flex/grid wrapper if it's the ONLY top-level element wrapping PrimeNG components
    // Don't remove flex divs that are inside ng-template or other components
    // Don't remove if there are sibling elements after the flex div
    const trimmed = basic.trim();
    const startsWithFlexDiv = /^<div[^>]*class="[^"]*(?:flex|grid)[^"]*"[^>]*>/.test(trimmed);
    if (startsWithFlexDiv) {
        const flexContent = extractDivContent(basic, '(?:flex|grid)');
        if (flexContent) {
            // Check if there's content AFTER the flex div (sibling elements)
            const flexDivMatch = trimmed.match(/^<div[^>]*class="[^"]*(?:flex|grid)[^"]*"[^>]*>/);
            if (flexDivMatch) {
                const flexDivStart = flexDivMatch[0].length;
                // Find the closing </div> for this flex div
                let depth = 1;
                let i = flexDivStart;
                while (i < trimmed.length && depth > 0) {
                    if (trimmed.slice(i).startsWith('<div')) {
                        depth++;
                        i += 4;
                    } else if (trimmed.slice(i).startsWith('</div>')) {
                        depth--;
                        if (depth === 0) break;
                        i += 6;
                    } else {
                        i++;
                    }
                }
                const afterFlexDiv = trimmed.slice(i + 6).trim(); // +6 for '</div>'

                // Only unwrap if there's nothing after the flex div
                if (!afterFlexDiv) {
                    // Only unwrap if the flex div directly contains PrimeNG components (not nested in templates)
                    const hasPrimeNGDirect = /^[\s\S]*?<p-[a-z]/.test(flexContent);
                    const hasNoTemplates = !flexContent.includes('<ng-template');
                    const isSimpleWrapper = flexContent.split('<div').length <= 3;
                    if (hasPrimeNGDirect && hasNoTemplates && isSimpleWrapper) {
                        basic = flexContent;
                    }
                }
            }
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

// Detect domain types used in component (from @/domain/*)
function detectDomainTypes(content) {
    const domainTypes = {};

    // Look for domain type imports first
    const domainImportMatches = content.matchAll(/import\s*\{\s*([^}]+)\s*\}\s*from\s*['"`]@\/domain\/([^'"`]+)['"`]/g);
    for (const match of domainImportMatches) {
        const names = match[1].split(',').map((n) => n.trim());
        const domainPath = match[2];
        for (const name of names) {
            if (KNOWN_DOMAIN_TYPES[name]) {
                if (!domainTypes[domainPath]) {
                    domainTypes[domainPath] = [];
                }
                if (!domainTypes[domainPath].includes(name)) {
                    domainTypes[domainPath].push(name);
                }
            }
        }
    }

    // Also check if domain types are used in the code but not imported
    for (const [typeName, path] of Object.entries(KNOWN_DOMAIN_TYPES)) {
        const typeRegex = new RegExp(`\\b${typeName}\\b`, 'g');
        if (typeRegex.test(content)) {
            if (!domainTypes[path]) {
                domainTypes[path] = [];
            }
            if (!domainTypes[path].includes(typeName)) {
                domainTypes[path].push(typeName);
            }
        }
    }

    return domainTypes;
}

// Detect PrimeNG named exports used as types in component
function detectPrimeNGNamedExports(content) {
    const namedExports = {};

    // Check each known named export
    for (const [exportName, modulePath] of Object.entries(PRIMENG_NAMED_EXPORTS)) {
        // Look for usage as type annotation (e.g., `: Table`, `Table[]`, `<Table>`)
        const typeRegex = new RegExp(`[:\\s<,]\\s*${exportName}\\b(?![a-zA-Z])`, 'g');
        if (typeRegex.test(content)) {
            if (!namedExports[modulePath]) {
                namedExports[modulePath] = [];
            }
            if (!namedExports[modulePath].includes(exportName)) {
                namedExports[modulePath].push(exportName);
            }
        }
    }

    return namedExports;
}

// Generate extFiles from detected domain types
function generateExtFilesFromDomainTypes(content) {
    const extFiles = [];
    const addedPaths = new Set();

    // Detect domain types used in the content
    for (const [typeName, domainPath] of Object.entries(KNOWN_DOMAIN_TYPES)) {
        const typeRegex = new RegExp(`\\b${typeName}\\b`, 'g');
        if (typeRegex.test(content) && DOMAIN_TYPE_DEFINITIONS[domainPath]) {
            const filePath = `src/domain/${domainPath}.ts`;
            if (!addedPaths.has(filePath)) {
                addedPaths.add(filePath);
                extFiles.push({
                    path: filePath,
                    content: DOMAIN_TYPE_DEFINITIONS[domainPath]
                });
            }
        }
    }

    return extFiles;
}

// Detect services from component file
function detectServices(content) {
    const services = [];
    const primeNGServices = [];

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
            // Also check for PrimeNG API services
            if (PRIMENG_SERVICES.includes(name) && !primeNGServices.includes(name)) {
                primeNGServices.push(name);
            }
        }
    }

    return { services, primeNGServices };
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
function generateTypescript(componentName, template, services = [], fileContent = '', primeNGServices = []) {
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

    // Check if we have signal properties
    const hasSignals = properties.some((p) => p.type === '__signal__');

    // Check if we have inject() properties or services that need inject()
    const hasInject = properties.some((p) => p.type === '__inject__') || services.length > 0 || primeNGServices.length > 0;

    // Build import statements with actual modules
    let importStatements = '';

    // Angular core imports
    const angularCoreImports = ['Component'];
    if (needsOnInit) angularCoreImports.push('OnInit');
    if (hasInject) angularCoreImports.push('inject');
    if (hasSignals) angularCoreImports.push('signal');
    importStatements += `import { ${angularCoreImports.join(', ')} } from '@angular/core';\n`;

    // Add FormsModule if needed
    if (primeModules.includes('FormsModule')) {
        importStatements += `import { FormsModule } from '@angular/forms';\n`;
    }

    // Add ReactiveFormsModule if needed
    if (primeModules.includes('ReactiveFormsModule')) {
        importStatements += `import { ReactiveFormsModule } from '@angular/forms';\n`;
    }

    // Add PrimeNG modules (will be modified below to include named exports)
    const primeNGImports = primeModules.filter((m) => !['CommonModule', 'FormsModule', 'ReactiveFormsModule'].includes(m));

    // Detect PrimeNG named exports early so we can combine them with module imports
    const primeNGNamedExportsEarly = detectPrimeNGNamedExports(fileContent);

    for (const module of primeNGImports) {
        const moduleLower = module.replace('Module', '').toLowerCase();
        // Check if there are named exports for this module
        const namedExportsForModule = primeNGNamedExportsEarly[moduleLower] || [];
        if (namedExportsForModule.length > 0) {
            // Combine module with named exports
            importStatements += `import { ${[...namedExportsForModule, module].join(', ')} } from 'primeng/${moduleLower}';\n`;
        } else {
            importStatements += `import { ${module} } from 'primeng/${moduleLower}';\n`;
        }
    }

    // Add service imports if any
    for (const service of services) {
        importStatements += `import { ${service} } from '@/service/${service.toLowerCase()}';\n`;
    }

    // Add PrimeNG config import if used in constructor
    if (constructor && constructor.params && constructor.params.includes('PrimeNG')) {
        importStatements += `import { PrimeNG } from 'primeng/config';\n`;
    }

    // Detect and add PrimeNG API types (TreeNode, MenuItem, etc.) and services
    const usedApiTypes = [];
    const allContent = fileContent + (interfaces.length > 0 ? interfaces.join('\n') : '');
    for (const apiType of PRIMENG_API_TYPES) {
        // Check if type is used in properties, interfaces, or method signatures
        const typeRegex = new RegExp(`\\b${apiType}\\b`, 'g');
        if (typeRegex.test(allContent)) {
            usedApiTypes.push(apiType);
        }
    }
    // Combine API types with PrimeNG services for import (avoid duplicates)
    const apiImports = [...new Set([...usedApiTypes, ...primeNGServices])];
    if (apiImports.length > 0) {
        importStatements += `import { ${apiImports.join(', ')} } from 'primeng/api';\n`;
    }

    // Detect and add domain type imports (Customer, Product, etc.)
    const domainTypes = detectDomainTypes(fileContent);
    for (const [domainPath, types] of Object.entries(domainTypes)) {
        importStatements += `import { ${types.join(', ')} } from '@/domain/${domainPath}';\n`;
    }

    // Add PrimeNG named exports that weren't combined with module imports
    for (const [modulePath, exports] of Object.entries(primeNGNamedExportsEarly)) {
        const moduleNameBase = modulePath.charAt(0).toUpperCase() + modulePath.slice(1);
        const moduleName = moduleNameBase + 'Module';
        // Only add separate import if we don't already have the module imported
        if (!primeNGImports.includes(moduleName)) {
            importStatements += `import { ${exports.join(', ')} } from 'primeng/${modulePath}';\n`;
        }
    }

    // Build imports array for decorator (actual modules, not ImportsModule)
    const decoratorImports = primeModules.filter((m) => m !== 'CommonModule');

    // Build providers if services exist (include both custom services and PrimeNG API services)
    const allProviders = [...services, ...primeNGServices];
    const providersLine = allProviders.length > 0 ? `,\n    providers: [${allProviders.join(', ')}]` : '';

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

    // Add inject() statements for services first (before other properties)
    const allServices = [...services, ...primeNGServices];
    if (allServices.length > 0) {
        classBody += '\n';
        for (const service of allServices) {
            const serviceName = service.charAt(0).toLowerCase() + service.slice(1);
            classBody += `    private ${serviceName} = inject(${service});\n`;
        }
    }

    // Add properties
    if (properties.length > 0) {
        if (allServices.length === 0) classBody += '\n';
        for (const prop of properties) {
            if (prop.type === '__signal__' || prop.type === '__inject__') {
                // Signal/inject properties: name = signal<Type>(value); or name = inject(Service);
                classBody += `    ${prop.name} = ${prop.defaultValue};\n`;
            } else if (prop.defaultValue) {
                classBody += `    ${prop.name}${prop.optional}: ${prop.type} = ${prop.defaultValue};\n`;
            } else {
                classBody += `    ${prop.name}${prop.optional}: ${prop.type};\n`;
            }
        }
    }

    // Add constructor only if it has body content (not just service injections)
    if (constructor && constructor.body && constructor.body.trim()) {
        classBody += `\n    constructor() {\n        ${constructor.body.replace(/\n/g, '\n        ')}\n    }\n`;
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

// Derive selector from filename
// e.g., "table/filter-advanced-doc.ts" -> "table-filter-advanced-demo"
function deriveSelectorFromFilename(fileName, componentDir) {
    // Remove doc suffix (handles both "basicdoc" and "basic-doc" patterns)
    let section = fileName.replace(/-?doc$/, '');
    return `${componentDir}-${section}-demo`;
}

// Parse a single doc file
function parseDocFile(filePath, componentDir) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const template = extractTemplate(content);
    if (!template) return null;

    const demoContent = extractDemoContent(template);
    if (!demoContent) return null;

    // Try to get existing code object (for data, scss that can't be auto-generated)
    const existingCode = extractExistingCodeObject(content);

    // Auto-generate extFiles from detected domain types
    const extFiles = generateExtFilesFromDomainTypes(content);

    // Extract section name from filename
    const fileName = path.basename(filePath, '.ts');
    // Remove doc suffix (handles both "basicdoc" and "basic-doc" patterns)
    const section = fileName.replace(/-?doc$/, '');

    // Derive selector from filename - no need for app-code selector attribute
    const uniqueKey = deriveSelectorFromFilename(fileName, componentDir);

    // Get component name from selector (properly hyphenated) for correct PascalCase
    // e.g., "tree-table-sort-multiple-columns-demo" -> "TreeTableSortMultipleColumns"
    const componentName = toPascalCase(uniqueKey.replace(/-demo$/, ''));

    // Detect services from component file (preferred) or fall back to existing code block
    const { services: detectedServices, primeNGServices } = detectServices(content);
    const services = detectedServices.length > 0 ? detectedServices : existingCode?.service || [];

    // Generate TypeScript - pass full content for class extraction
    const generatedTypescript = generateTypescript(componentName, demoContent, services, content, primeNGServices);

    return {
        key: uniqueKey,
        selector: uniqueKey,
        component: componentDir,
        section,
        code: {
            typescript: generatedTypescript, // Always use generated TypeScript
            data: existingCode?.data,
            scss: existingCode?.scss
        },
        metadata: {
            services,
            primeNGServices, // Add PrimeNG API services to metadata
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
