import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'block-ui-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
})
export class ImportDoc {
    code: Code = {
        typescript: `import { BlockUIModule } from 'primeng/blockui';`,
    };
}
