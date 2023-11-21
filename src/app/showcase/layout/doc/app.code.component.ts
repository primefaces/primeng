import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, NgModule, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Code, ExtFile, RouteFile } from 'src/app/showcase/domain/code';
import { useCodeSandbox, useStackBlitz } from './codeeditor';

@Component({
    selector: 'app-code',
    template: `
<div *ngIf="code" class="relative doc-section-code">
    <div class="flex surface-card align-items-center justify-content-end absolute z-2" style="right: .75rem; top: .75rem; gap: .75rem">
        <div class="flex align-items-center gap-2" *ngIf="fullCodeVisible">
            <button *ngIf="code.html" pButton label="HTML" (click)="changeLang('html')"
                class="py-0 px-2 h-2rem p-button-text p-button-plain p-0 inline-flex align-items-center justify-content-center"
                [ngClass]="{'doc-section-code-active text-primary':lang === 'html'}">
            </button>
    
            <button *ngIf="code.typescript" pButton label="TypeScript" (click)="changeLang('typescript')"
                class="py-0 px-2 h-2rem p-button-text p-button-plain inline-flex align-items-center justify-content-center"
                [ngClass]="{'doc-section-code-active text-primary':lang === 'typescript'}">
            </button>
    
            <button *ngIf="code.data" pButton icon="pi pi-database" pTooltip="View Data"
                tooltipPosition="bottom" tooltipStyleClass="doc-section-code-tooltip" (click)="changeLang('data')"
                class="p-button-rounded p-button-text text-sm p-button-plain p-0 w-2rem h-2rem inline-flex align-items-center justify-content-center"
                [ngClass]="{'doc-section-code-active text-primary':lang === 'data'}">
            </button>
        </div>
        <button *ngIf="!hideToggleCode" pButton icon="pi pi-code" pTooltip="Toggle Full Code" tooltipStyleClass="doc-section-code-tooltip" tooltipPosition="bottom" 
            class="p-button-rounded p-button-text text-sm p-button-plain p-0 w-2rem h-2rem inline-flex align-items-center justify-content-center" 
            (click)="toggleCode()">
        </button>

        <button pButton pTooltip="Edit in CodeSandbox" tooltipPosition="bottom"
            tooltipStyleClass="doc-section-code-tooltip" *ngIf="!hideCodeSandbox && !hideToggleCode"
            class="p-button-rounded p-button-text text-sm p-button-plain  p-0 w-2rem h-2rem inline-flex align-items-center justify-content-center" (click)="openCodeSandbox()">
            <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="var(--text-color-secondary)"
                style="display: block">
                <path
                    d="M2 6l10.455-6L22.91 6 23 17.95 12.455 24 2 18V6zm2.088 2.481v4.757l3.345 1.86v3.516l3.972 2.296v-8.272L4.088 8.481zm16.739 0l-7.317 4.157v8.272l3.972-2.296V15.1l3.345-1.861V8.48zM5.134 6.601l7.303 4.144 7.32-4.18-3.871-2.197-3.41 1.945-3.43-1.968L5.133 6.6z" />
            </svg>
        </button>

        <button pButton pTooltip="Edit in StackBlitz" tooltipPosition="bottom"
            tooltipStyleClass="doc-section-code-tooltip" *ngIf="!hideStackBlitz && !hideToggleCode"
            class="p-button-rounded p-button-text text-sm p-button-plain  p-0 w-2rem h-2rem inline-flex align-items-center justify-content-center" (click)="openStackBlitz()">
            <svg role="img" viewBox="0 0 24 24" width="16" height="16" fill="var(--text-color-secondary)"
                style="display: block">
                <path d="M0 15.98H8.15844L3.40299 27.26L19 11.1945H10.7979L15.5098 0L0 15.98Z" />
            </svg>
        </button>

        <button pButton type="button"
            class="p-button-rounded p-button-text p-button-plain h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center"
            (click)="copyCode()" icon="pi pi-copy" pTooltip="Copy Code" tooltipPosition="bottom"
            tooltipStyleClass="doc-section-code-tooltip">
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

    ngAfterViewChecked() {
        if (typeof window !== undefined && window['Prism'] && this.codeElement && !this.codeElement.nativeElement.classList.contains('prism')) {
            window['Prism'].highlightElement(this.codeElement.nativeElement);
            this.codeElement.nativeElement.classList.add('prism');
            this.codeElement.nativeElement.parentElement.setAttribute('tabindex', '-1');
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
