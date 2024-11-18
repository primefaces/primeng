import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'table-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code>`
})
export class ImportDoc {
    code: Code = {
        typescript: `import { TableModule } from 'primeng/table';`
    };
}
