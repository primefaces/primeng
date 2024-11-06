import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'fieldset-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
})
export class ImportDoc {
    code: Code = {
        typescript: `import { Fieldset } from 'primeng/fieldset';`,
    };
}
