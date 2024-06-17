import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'usage-doc',
    template: `
        <app-docsectiontext>
            <p>Each component can be imported individually so that you only bundle what you use. Import path is available in the documentation of the corresponding component.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-button label="Check" icon="pi pi-check"></p-button>
        </div>
        <app-code [code]="code" [hideStackBlitz]="true" [hideCodeSandbox]="true"></app-code>
    `
})
export class UsageDoc {
    code: Code = {
        typescript: `import { ButtonModule } from 'primeng/button';`,
        html: `
<div class="card flex justify-content-center">
    <p-button label="Check" icon="pi pi-check"></p-button>
</div>`
    };
}
