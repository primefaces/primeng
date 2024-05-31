import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Directive, ElementRef, inject, PLATFORM_ID } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';

@Directive({ standalone: true })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    public el: ElementRef = inject(ElementRef);

    private _isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    private _isPlatformServer() {
        return isPlatformServer(this.platformId);
    }

    ngOnInit() {
        if (this._isPlatformServer()) {
            this.document.head.innerHTML += `<style>${this.theme}</style>`;
        }
    }

    get theme() {
        return this['_theme'];
    }

    get name() {
        return this.constructor.name.replace(/^_/, '').toLowerCase();
    }
}
