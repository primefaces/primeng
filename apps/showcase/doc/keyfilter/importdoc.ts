import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'key-filter-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { KeyFilter } from 'primeng/keyfilter';`
    };
}
