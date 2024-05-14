import { Component, inject } from '@angular/core';
import { Code } from '@domain/code';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'csp-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>nonce</i> value to use on dynamically generated style elements in core.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class CspDoc {
    code: Code = {
        basic: `constructor(private primengConfig: PrimeNGConfig) {
    this.config.csp.set({nonce: '...'});
}
        `
    };
}
