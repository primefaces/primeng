import { Code, ExtFile, RouteFile } from '@/domain/code';
import { DemoCodeService } from '@/service/democodeservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, inject, input, NgModule, PLATFORM_ID, ViewChild, signal, computed, effect, afterNextRender } from '@angular/core';
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
                    @if (fullCodeVisible()) {
                        @if (resolvedCode()!.html) {
                            <button (click)="changeLang('html')" class="py-0 px-2 rounded-border h-8" [ngClass]="{ 'code-active': lang() === 'html' }">
                                <span>HTML</span>
                            </button>
                        }
                        @if (resolvedCode()!.typescript) {
                            <button (click)="changeLang('typescript')" class="py-0 px-2 rounded-border h-8" [ngClass]="{ 'code-active': lang() === 'typescript' }">
                                <span>TS</span>
                            </button>
                        }
                        @if (resolvedCode()!.scss) {
                            <button (click)="changeLang('scss')" class="py-0 px-2 rounded-border h-8" [ngClass]="{ 'code-active': lang() === 'scss' }">
                                <span>SCSS</span>
                            </button>
                        }
                        @if (resolvedCode()!.data) {
                            <button
                                pTooltip="View Data"
                                tooltipPosition="bottom"
                                tooltipStyleClass="doc-section-code-tooltip"
                                (click)="changeLang('data')"
                                class="h-8 w-8 p-0 inline-flex items-center justify-center"
                                [ngClass]="{ 'doc-section-code-active text-primary': lang() === 'data' }"
                            >
                                <i class="pi pi-database"></i>
                            </button>
                        }
                    }
                    @if (!hideToggleCode()) {
                        <button pTooltip="Toggle Full Code" tooltipStyleClass="doc-section-code-tooltip" tooltipPosition="bottom" class="h-8 w-8 p-0 inline-flex items-center justify-center" (click)="toggleCode()">
                            <i class="pi pi-code"></i>
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

                <div dir="ltr">
                    @if (lang() === 'basic' && importCode()) {
                        <pre class="language-javascript"><code #codeElement>{{ resolvedCode()!.basic }}</code></pre>
                    }
                    @if (lang() === 'basic' && !importCode()) {
                        <pre class="language-markup"><code #codeElement>{{ resolvedCode()!.basic }}</code></pre>
                    }
                    @if (lang() === 'html') {
                        <pre class="language-markup"><code #codeElement>{{ resolvedCode()!.html }}</code></pre>
                    }
                    @if (lang() === 'typescript') {
                        <pre class="language-typescript"><code #codeElement>{{ resolvedCode()!.typescript }}</code></pre>
                    }
                    @if (lang() === 'data') {
                        <pre class="language-json"><code #codeElement>{{ resolvedCode()!.data }}</code></pre>
                    }
                    @if (lang() === 'scss') {
                        <pre class="language-scss"><code #codeElement>{{ resolvedCode()!.scss }}</code></pre>
                    }
                    @if (lang() === 'command') {
                        <pre class="language-shell"><code #codeElement>{{ resolvedCode()!.command }}</code></pre>
                    }
                </div>
            </div>
        }
    `
})
export class AppCode {
    // Signal-based inputs
    code = input<Code>();
    service = input<any>();
    selector = input<string>();
    extFiles = input<ExtFile[]>([]);
    routeFiles = input<RouteFile[]>([]);
    hideToggleCode = input(false, { transform: (v: boolean | string) => v === '' || v === true });
    hideCodeSandbox = input(true, { transform: (v: boolean | string) => v === '' || v === true });
    hideStackBlitz = input(false, { transform: (v: boolean | string) => v === '' || v === true });
    importCode = input(false, { transform: (v: boolean | string) => v === '' || v === true });

    @ViewChild('codeElement') codeElement: ElementRef;

    // Signal-based state
    fullCodeVisible = signal(false);
    lang = signal('basic');
    resolvedCode = signal<Code | null>(null);
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
                    const component = this.route.snapshot.url[0]?.path || '';
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
        return 'basic';
    });

    private demoCodeService = inject(DemoCodeService);
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
                // Priority 1: Use code input prop
                this.resolvedCode.set(codeInput);
                this.resolvedExtFiles.set(this.extFiles());
                this.resolvedRouteFiles.set(this.routeFiles());
                this.resolvedService.set(this.service() || []);
            } else if (selector && isLoaded) {
                // Priority 2: Look up from JSON
                const demo = this.demoCodeService.getCode(selector);
                if (demo) {
                    this.resolvedCode.set(demo.code);
                    this.resolvedExtFiles.set(demo.metadata.extFiles || []);
                    this.resolvedRouteFiles.set(demo.metadata.routeFiles || []);
                    this.resolvedService.set(demo.metadata.services || []);
                }
            }
        });

        // Effect: Set initial language when code is resolved
        effect(() => {
            const initialLang = this.initialLang();
            if (initialLang && this.lang() === 'basic' && initialLang !== 'basic') {
                // Only update if we haven't manually changed the lang
                this.lang.set(initialLang);
            }
        });

        // Prism highlighting after render
        afterNextRender(() => {
            this.highlightCode();
        });
    }

    private highlightCode() {
        if (isPlatformBrowser(this.platformId)) {
            if (window['Prism'] && this.codeElement && !this.codeElement.nativeElement.classList.contains('prism')) {
                window['Prism'].highlightElement(this.codeElement.nativeElement);
                this.codeElement.nativeElement.classList.add('prism');
                this.codeElement.nativeElement.setAttribute('tabindex', '-1');
                this.codeElement.nativeElement.parentElement?.setAttribute('tabindex', '-1');
            }
        }
    }

    changeLang(newLang: string) {
        this.lang.set(newLang);
        // Re-highlight after lang change
        setTimeout(() => this.highlightCode(), 0);
    }

    async copyCode() {
        const code = this.resolvedCode();
        if (code) {
            await navigator.clipboard.writeText(code[this.lang()]);
        }
    }

    toggleCode() {
        const isVisible = !this.fullCodeVisible();
        this.fullCodeVisible.set(isVisible);

        const code = this.resolvedCode();
        if (code) {
            if (isVisible) {
                this.lang.set(code.html ? 'html' : 'typescript');
            } else {
                this.lang.set('basic');
            }
            // Re-highlight after toggle
            setTimeout(() => this.highlightCode(), 0);
        }
    }

    openStackBlitz() {
        const code = this.resolvedCode();
        if (code) {
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

                modifiedCodeWithImportsModule = modifiedCodeWithImportsModule.replace(/\bimports:\s*\[[^\]]*\],?/, 'imports: [ImportsModule],');

                const finalModifiedCode = modifiedCodeWithImportsModule.replace(/import\s+\{[^{}]*\}\s+from\s+'@angular\/core';/, (match) => match + '\n' + importModuleStatement);

                str = finalModifiedCode;
            }

            // Add <theme-switcher /> to the beginning of the template
            str = str.replace(/template:\s*`\s*/, 'template: `\n        <theme-switcher />\n        ');

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
}

@NgModule({
    imports: [AppCode],
    exports: [AppCode]
})
export class AppCodeModule {}
