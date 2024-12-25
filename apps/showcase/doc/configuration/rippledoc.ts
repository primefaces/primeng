import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'ripple-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Ripple is an optional animation for the supported components such as buttons. It is disabled by default.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class RippleDoc {
    code: Code = {
        typescript: `providePrimeNG({
    ripple: true
})`
    };
}
