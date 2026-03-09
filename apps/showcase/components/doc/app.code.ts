import { Code, ExtFile, RouteFile } from '@/domain/code';
import { resolveDomainTypes, ResolvedRouteFiles, resolveRouteFiles } from '@/domain/types';
import { DemoCodeService } from '@/service/democodeservice';
import { HighlightService } from '@/service/highlightservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, input, NgModule, PLATFORM_ID, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { useCodeSandbox, useStackBlitz } from './codeeditor';

@Component({
    selector: 'app-code',
    standalone: true,
    imports: [CommonModule, ButtonModule, TooltipModule],
    template: `
        @if (resolvedCode()) {
            <div class="doc-section-code">
                <div class="doc-section-code-buttons animate-scalein animate-duration-300">
                    @if (!hideToggleCode()) {
                        <button [pTooltip]="fullCodeVisible() ? 'Collapse' : 'Expand'" tooltipStyleClass="doc-section-code-tooltip" tooltipPosition="bottom" class="h-8 w-8 p-0 inline-flex items-center justify-center" (click)="toggleCode()">
                            <i class="pi pi-arrows-v"></i>
                        </button>
                    }
                    @if (!hideStackBlitz() && !hideToggleCode()) {
                        <button pTooltip="Edit in StackBlitz" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" class="h-8 w-8 p-0 inline-flex items-center justify-center" (click)="openStackBlitz()">
                            <svg role="img" width="13" height="18" viewBox="0 0 13 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="display: 'block'">
                                <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                            </svg>
                        </button>
                    }
                    <button type="button" class="h-8 w-8 p-0 inline-flex items-center justify-center" (click)="copyCode()" pTooltip="Copy Code" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip">
                        <i class="pi pi-copy"></i>
                    </button>
                </div>

                <div dir="ltr" [style]="{ 'max-height': codeHeight() }" class="overflow-auto" [innerHTML]="highlightedHtml()"></div>
            </div>
        }
    `
})
export class AppCode {
    code = input<Code>();
    service = input<any>();
    selector = input<string>();
    extFiles = input<ExtFile[] | string[]>([]);
    routeFiles = input<RouteFile[] | string[]>([]);
    hideToggleCode = input(false, { transform: (v: boolean | string) => v === '' || v === true });
    hideCodeSandbox = input(true, { transform: (v: boolean | string) => v === '' || v === true });
    hideStackBlitz = input(false, { transform: (v: boolean | string) => v === '' || v === true });
    importCode = input(false, { transform: (v: boolean | string) => v === '' || v === true });
    codeHeight = computed(() => (this.fullCodeVisible() ? '50rem' : '20rem'));

    fullCodeVisible = signal(false);
    lang = signal('typescript');
    resolvedCode = signal<Code | null>(null);
    highlightedHtml = signal<SafeHtml>('');
    resolvedExtFiles = signal<ExtFile[]>([]);
    resolvedRouteFiles = signal<RouteFile[]>([]);
    resolvedService = signal<string[]>([]);

    // Computed selector - auto-detects from parent if not provided
    resolvedSelector = computed(() => {
        // 1. Use explicit selector if provided
        const explicitSelector = this.selector();
        if (explicitSelector) {
            return explicitSelector;
        }

        // 2. Auto-detect from parent component's tag name
        const parentElement = this.elementRef.nativeElement.parentElement;
        if (parentElement) {
            let el = parentElement;
            while (el) {
                const tagName = el.tagName?.toLowerCase();
                if (tagName && (tagName.endsWith('-doc') || tagName.endsWith('-demo'))) {
                    const component = this.route.snapshot.url[0]?.path || this.route.parent?.snapshot.url[0]?.path || '';
                    const section = tagName.replace('-doc', '').replace('-demo', '');
                    if (component && section) {
                        return `${component}-${section}-demo`;
                    }
                    return tagName;
                }
                el = el.parentElement;
            }
        }

        return '';
    });

    // Computed initial language based on resolved code
    private initialLang = computed(() => {
        const code = this.resolvedCode();
        if (code) {
            return Object.keys(code)[0];
        }
        return 'typescript';
    });

    private demoCodeService = inject(DemoCodeService);
    private highlightService = inject(HighlightService);
    private sanitizer = inject(DomSanitizer);
    private elementRef = inject(ElementRef);
    private route = inject(ActivatedRoute);
    private platformId = inject(PLATFORM_ID);

    constructor() {
        // Effect: Resolve code when inputs change or service loads
        effect(() => {
            const codeInput = this.code();
            const selector = this.resolvedSelector();
            const isLoaded = this.demoCodeService.isLoaded();

            if (codeInput) {
                this.resolvedCode.set(codeInput);
                this.resolvedExtFiles.set(this.resolveExtFilesInput(this.extFiles()));
                const { routeFiles: resolvedRoutes, services: routeServices } = this.resolveRouteFilesInput(this.routeFiles());
                this.resolvedRouteFiles.set(resolvedRoutes);
                const codeServices = this.service() || [];
                this.resolvedService.set(this.mergeServices(codeServices, routeServices));
            } else if (selector && isLoaded) {
                const demo = this.demoCodeService.getCode(selector);
                if (demo) {
                    this.resolvedCode.set(demo.code);
                    const inputExtFiles = this.resolveExtFilesInput(this.extFiles());
                    const demoExtFiles = demo.metadata.extFiles || [];
                    this.resolvedExtFiles.set(this.mergeExtFiles(inputExtFiles, demoExtFiles));
                    const { routeFiles: inputRouteFiles, services: routeServices } = this.resolveRouteFilesInput(this.routeFiles());
                    const demoRouteFiles = demo.metadata.routeFiles || [];
                    this.resolvedRouteFiles.set(this.mergeRouteFiles(inputRouteFiles, demoRouteFiles));
                    const demoServices = demo.metadata.services || [];
                    this.resolvedService.set(this.mergeServices(demoServices, routeServices));
                }
            }
        });

        // Effect: Set initial language when code is resolved
        effect(() => {
            const initialLang = this.initialLang();
            if (initialLang && this.lang() === 'typescript' && initialLang !== 'typescript') {
                this.lang.set(initialLang);
            }
        });

        // Effect: Highlight code with Shiki when code or lang changes
        effect(() => {
            const code = this.resolvedCode();
            const lang = this.lang();

            if (code && isPlatformBrowser(this.platformId)) {
                const source = code[lang] || '';
                const shikiLang = lang === 'html' ? 'html' : lang === 'scss' ? 'scss' : lang === 'command' ? 'bash' : 'typescript';

                this.highlightService.highlight(source, shikiLang).then((html) => {
                    this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
                });
            }
        });
    }

    changeLang(newLang: string) {
        this.lang.set(newLang);
    }

    async copyCode() {
        const code = this.resolvedCode();
        if (code) {
            await navigator.clipboard.writeText(code[this.lang()]);
        }
    }

    toggleCode() {
        this.fullCodeVisible.set(!this.fullCodeVisible());
        this.lang.set('typescript');
    }

    openStackBlitz() {
        const code = this.resolvedCode();
        if (code) {
            let str = code.typescript;

            // Add <theme-switcher /> to the beginning of the template
            str = str.replace(/template:\s*`\s*/, 'template: `\n        <theme-switcher />\n        ');

            // Add ThemeSwitcher to imports array if not already present
            if (!str.includes('ThemeSwitcher')) {
                str = str.replace(/imports:\s*\[/, 'imports: [ThemeSwitcher, ');
                // Add ThemeSwitcher import statement after angular core imports
                str = str.replace(/import\s+\{[^{}]*\}\s+from\s+'@angular\/core';/, (match) => match + "\nimport { ThemeSwitcher } from './themeswitcher';");
            }

            // Add CommonModule if not already present
            if (!str.includes('CommonModule')) {
                str = str.replace(/imports:\s*\[/, 'imports: [CommonModule, ');
                str = str.replace(/import\s+\{[^{}]*\}\s+from\s+'@angular\/core';/, (match) => match + "\nimport { CommonModule } from '@angular/common';");
            }

            // Add selector to @Component if missing
            const selector = this.resolvedSelector();
            if (selector && !/@Component\s*\(\s*\{[\s\S]*?selector\s*:/.test(str)) {
                str = str.replace(/@Component\s*\(\s*\{/, `@Component({\n    selector: '${selector}',`);
            }

            // Include service array in the code object for StackBlitz
            const stackBlitzObject = { ...code, typescript: str, service: this.resolvedService() };

            useStackBlitz({
                code: stackBlitzObject,
                selector: this.resolvedSelector(),
                extFiles: this.resolvedExtFiles(),
                routeFiles: this.resolvedRouteFiles()
            });
        }
    }

    openCodeSandbox() {
        const code = this.resolvedCode();
        if (code) {
            // Include service array in the code object for CodeSandbox
            const codeSandboxObject = { ...code, service: this.resolvedService() };
            useCodeSandbox({
                code: codeSandboxObject,
                selector: this.resolvedSelector(),
                extFiles: this.resolvedExtFiles(),
                routeFiles: this.resolvedRouteFiles()
            });
        }
    }

    /**
     * Resolve extFiles input - handles both ExtFile[] and string[] (domain type names)
     */
    private resolveExtFilesInput(input: ExtFile[] | string[]): ExtFile[] {
        if (!input || input.length === 0) {
            return [];
        }

        // Check if it's a string array (domain type names)
        if (typeof input[0] === 'string') {
            return resolveDomainTypes(input as string[]);
        }

        // Already ExtFile array
        return input as ExtFile[];
    }

    /**
     * Merge two ExtFile arrays, avoiding duplicates by path
     */
    private mergeExtFiles(primary: ExtFile[], secondary: ExtFile[]): ExtFile[] {
        const result = [...primary];
        const paths = new Set(primary.map((f) => f.path));

        for (const file of secondary) {
            if (!paths.has(file.path)) {
                result.push(file);
                paths.add(file.path);
            }
        }

        return result;
    }

    /**
     * Resolve routeFiles input - handles both RouteFile[] and string[] (component names)
     */
    private resolveRouteFilesInput(input: RouteFile[] | string[]): ResolvedRouteFiles {
        if (!input || input.length === 0) {
            return { routeFiles: [], services: [] };
        }

        // Check if it's a string array (component names)
        if (typeof input[0] === 'string') {
            return resolveRouteFiles(input as string[]);
        }

        // Already RouteFile array - no additional services
        return { routeFiles: input as RouteFile[], services: [] };
    }

    /**
     * Merge two RouteFile arrays, avoiding duplicates by path
     */
    private mergeRouteFiles(primary: RouteFile[], secondary: RouteFile[]): RouteFile[] {
        const result = [...primary];
        const paths = new Set(primary.map((f) => f.path));

        for (const file of secondary) {
            if (!paths.has(file.path)) {
                result.push(file);
                paths.add(file.path);
            }
        }

        return result;
    }

    /**
     * Merge two service arrays, avoiding duplicates
     */
    private mergeServices(primary: string[], secondary: string[]): string[] {
        const result = [...primary];
        const added = new Set(primary);

        for (const service of secondary) {
            if (!added.has(service)) {
                result.push(service);
                added.add(service);
            }
        }

        return result;
    }
}

@NgModule({
    imports: [AppCode],
    exports: [AppCode]
})
export class AppCodeModule {}
