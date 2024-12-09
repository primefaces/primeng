import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'csp-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The <i>nonce</i> value to use on dynamically generated style elements in core.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class CspDoc {
    code: Code = {
        typescript: `providePrimeNG({
    csp: {
        nonce: '...'
    }
})`
    };
}
