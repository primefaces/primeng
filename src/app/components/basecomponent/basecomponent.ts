import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Directive, inject, PLATFORM_ID } from '@angular/core';


@Directive({ standalone: true })
export class BaseComponent {
    public document: Document = inject(DOCUMENT);

    public platformId: any = inject(PLATFORM_ID);

    private _isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    private _isPlatformServer() {
        return isPlatformServer(this.platformId);
    }

    ngOnInit() {
        if (this._isPlatformServer()) {
            
        }
    }

}