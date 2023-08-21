import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
    private window: Window;

    constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: Document) {
        this.window = this.document.defaultView as Window;
    }

    isBrowser(): boolean {
        return isPlatformBrowser(this.platformId) && this.window !== null && this.window !== undefined;
    }
}
