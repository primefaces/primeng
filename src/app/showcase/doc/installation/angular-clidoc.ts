import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'angular-cli-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p><i>Angular CLI</i> is the official CLI tool for Angular. We strongly suggest using Angular CLI when starting an Angular project.</p>
        </app-docsectiontext>
        <h3>Dependencies</h3>
        <p class="doc-section-description">Add PrimeNG and PrimeIcons as dependencies.</p>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>
    </div>`
})
export class AngularCliDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        basic: `
"dependencies": {
    //...
    "primeng": "^15.0.0",
    "primeicons": "^6.0.0"
},`
    };
}
