import { isPlatformBrowser } from '@angular/common';
import {
    Inject, PLATFORM_ID,
    Pipe,
    PipeTransform,
    SecurityContext
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(@Inject(PLATFORM_ID) private readonly platformId: any, private readonly domSanitizer: DomSanitizer) { }

    public transform(value: string): SafeHtml {
        if (!value || !isPlatformBrowser(this.platformId)) {
            return value;
        }

        const sanitizedValue = this.domSanitizer.sanitize(SecurityContext.HTML ,value);
        return this.domSanitizer.bypassSecurityTrustHtml(sanitizedValue);
    }
}
