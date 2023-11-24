import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'primeflex-doc',
    template: `
        <app-docsectiontext>
            <p>DataView depends on PrimeFlex Grid functionality so it needs to be installed and imported.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class PrimeflexDoc {
    code: Code = {
        basic: `npm install primeflex`
    };
}
