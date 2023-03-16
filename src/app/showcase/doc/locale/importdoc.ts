import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'import-doc',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Locale values are stored in the global configuration that becomes accessible after installing the PrimeNG.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class ImportDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
import { PrimeNGConfig } from 'primeng/api';`
    };
}
