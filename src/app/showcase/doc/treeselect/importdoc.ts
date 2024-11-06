import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'tree-select-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
})
export class ImportDoc {
    code: Code = {
        typescript: `import { TreeSelect } from 'primeng/treeselect';`,
    };
}
