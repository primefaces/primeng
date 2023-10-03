import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, NgModule, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Code, ExtFile, RouteFile } from 'src/app/showcase/domain/code';
import { useCodeSandbox, useStackBlitz } from '../codeeditor';

@Component({
    selector: 'app-code',
    templateUrl: './app.code.component.html'
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
