import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';

@Component({
    selector: 'input-text-import-doc',
    standalone: true,
    imports: [AppCodeModule],
    template: ` <app-code [hideToggleCode]="true" [hideStackBlitz]="true" [hideCodeSandbox]="true" [code]="code"></app-code> `
})
export class ImportDoc {
    value1: string;

    code: Code = {
        typescript: `import { InputTextModule } from 'primeng/inputtext';`
    };
}
