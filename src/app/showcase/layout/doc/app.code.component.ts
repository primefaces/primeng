import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, NgModule, PLATFORM_ID, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Code, ExtFile, RouteFile } from 'src/app/showcase/domain/code';
import { useCodeSandbox, useStackBlitz } from './codeeditor';

@Component({
    selector: 'app-code',
    template: `
        <div *ngIf="code" class="doc-section-code">
            <div class="doc-section-code-buttons scalein animation-duration-300">
                <ng-container *ngIf="fullCodeVisible">
                    <button *ngIf="code.html" (click)="changeLang('html')" class="py-0 px-2 border-round h-2rem" [ngClass]="{ 'code-active': lang === 'html' }"><span>HTML</span></button>
                    <button *ngIf="code.typescript" (click)="changeLang('typescript')" class="py-0 px-2 border-round h-2rem" [ngClass]="{ 'code-active': lang === 'typescript' }"><span>TS</span></button>

                    <button
                        *ngIf="code.data"
                        pTooltip="View Data"
                        tooltipPosition="bottom"
                        tooltipStyleClass="doc-section-code-tooltip"
                        (click)="changeLang('data')"
                        class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center"
                        [ngClass]="{ 'doc-section-code-active text-primary': lang === 'data' }"
                    >
                        <i class="pi pi-database"></i>
                    </button>
                </ng-container>
                <button *ngIf="!hideToggleCode" pTooltip="Toggle Full Code" tooltipStyleClass="doc-section-code-tooltip" tooltipPosition="bottom" class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center" (click)="toggleCode()">
                    <i class="pi pi-code"></i>
                </button>

                <button
                    pTooltip="Edit in CodeSandbox"
                    tooltipPosition="bottom"
                    tooltipStyleClass="doc-section-code-tooltip"
                    *ngIf="!hideCodeSandbox && !hideToggleCode"
                    class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center"
                    (click)="openCodeSandbox()"
                >
                    <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="display: 'block'">
                        <path
                            d="M2 6l10.455-6L22.91 6 23 17.95 12.455 24 2 18V6zm2.088 2.481v4.757l3.345 1.86v3.516l3.972 2.296v-8.272L4.088 8.481zm16.739 0l-7.317 4.157v8.272l3.972-2.296V15.1l3.345-1.861V8.48zM5.134 6.601l7.303 4.144 7.32-4.18-3.871-2.197-3.41 1.945-3.43-1.968L5.133 6.6z"
                        />
                    </svg>
                </button>

                <button
                    pTooltip="Edit in StackBlitz"
                    tooltipPosition="bottom"
                    tooltipStyleClass="doc-section-code-tooltip"
                    *ngIf="!hideStackBlitz && !hideToggleCode"
                    class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center"
                    (click)="openStackBlitz()"
                >
                    <svg role="img" width="13" height="18" viewBox="0 0 13 19" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="display: 'block'">
                        <path d="M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z" />
                    </svg>
                </button>

                <button type="button" class="h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center" (click)="copyCode()" pTooltip="Copy Code" tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip">
                    <i class="pi pi-copy"></i>
                </button>
            </div>

            <pre *ngIf="lang === 'basic'" class="language-markup"><code #codeElement>
{{code.basic}}

</code></pre>

            <pre *ngIf="lang === 'html'" class="language-markup"><code #codeElement>
{{code.html}}

</code></pre>

            <pre *ngIf="lang === 'typescript'" class="language-typescript"><code #codeElement>
{{code.typescript}}

</code></pre>

            <pre *ngIf="lang === 'data'" class="language-json"><code #codeElement>
{{code.data}}

</code></pre>

            <pre *ngIf="lang === 'scss'" class="language-scss"><code #codeElement>
{{code.scss}}

</code></pre>

            <pre *ngIf="lang === 'command'" class="language-shell"><code #codeElement>
{{code.command}}

</code></pre>
        </div>
    `
})
export class AppCodeComponent {
    @Input() code!: Code;

    @Input() service!: any;

    @Input() selector!: string;

    @Input() extFiles: ExtFile[] = [];

    @Input() routeFiles: RouteFile[] = [];

    @Input() hideToggleCode: boolean = false;

    @Input() hideCodeSandbox: boolean = false;

    @Input() hideStackBlitz: boolean = false;

    @ViewChild('codeElement') codeElement: ElementRef;

    fullCodeVisible: boolean = false;

    lang!: string;

    constructor(@Inject(PLATFORM_ID) public platformId: any, @Inject(DOCUMENT) public document: Document) {}

    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            if (window['Prism'] && this.codeElement && !this.codeElement.nativeElement.classList.contains('prism')) {
                window['Prism'].highlightElement(this.codeElement.nativeElement);
                this.codeElement.nativeElement.classList.add('prism');
                this.codeElement.nativeElement.parentElement.setAttribute('tabindex', '-1');
            }
        }
    }

    ngOnInit() {
        this.lang = this.getInitialLang();
    }

    changeLang(lang: string) {
        this.lang = lang;
    }

    getInitialLang(): string {
        if (this.code) {
            return Object.keys(this.code)[0];
        }
    }

    async copyCode() {
        await navigator.clipboard.writeText(this.code[this.lang]);
    }

    getCode(lang: string = 'basic') {
        if (this.code) {
            if (this.fullCodeVisible || this.hideToggleCode) {
                return this.code[lang];
            } else {
                return this.code['basic'];
            }
        }
    }

    toggleCode() {
        this.fullCodeVisible = !this.fullCodeVisible;
        this.fullCodeVisible && (this.lang = 'html');
        !this.fullCodeVisible && (this.lang = 'basic');
    }

    openStackBlitz() {
        if (this.code) {
            useStackBlitz({ code: this.code, selector: this.selector, extFiles: this.extFiles, routeFiles: this.routeFiles });
        }
    }

    openCodeSandbox() {
        if (this.code) {
            useCodeSandbox({ code: this.code, selector: this.selector, extFiles: this.extFiles, routeFiles: this.routeFiles });
        }
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, TooltipModule],
    exports: [AppCodeComponent],
    declarations: [AppCodeComponent]
})
export class AppCodeModule {}
