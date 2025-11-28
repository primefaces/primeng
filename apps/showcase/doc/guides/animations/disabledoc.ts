import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';

@Component({
    selector: 'disable-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Individual animations can be reduced and even disabled completely using the animation duration.</p>
        </app-docsectiontext>
        <app-code [code]="code" hideToggleCode hideStackBlitz></app-code>
    `
})
export class DisableDoc {
    code: Code = {
        scss: `@media (prefers-reduced-motion: reduce) {
    .p-anchored-overlay-enter-active,
    .p-anchored-overlay-leave-active {
        animation-duration: 0s !important;
    }
}`
    };
}
