import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'import-doc',
    template: `
        <app-docsectiontext>
            <p>Configuration is managed by the <i>PrimeNGConfig</i> instance imported from <i>primeng/api</i> and injected via dependency injection.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { PrimeNGConfig } from 'primeng/api';`
    };
}
