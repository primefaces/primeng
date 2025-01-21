import { Code } from '@/domain/code';
import { Component } from '@angular/core';
@Component({
    selector: 'cascade-select-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { CascadeSelectModule } from 'primeng/cascadeselect';`
    };
}
