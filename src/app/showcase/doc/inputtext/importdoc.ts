import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'import-doc',
    template: `
        <app-code [hideToggleCode]="true" [hideStackBlitz]="true" [hideCodeSandbox]="true" [code]="code"></app-code>
    `
})
export class ImportDoc {

    value1: string;

    code: Code = {
        typescript: `import { InputTextModule } from 'primeng/inputtext';`
    };
}
