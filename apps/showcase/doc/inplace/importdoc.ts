import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'inplace-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { InplaceModule } from 'primeng/inplace';`
    };
}
