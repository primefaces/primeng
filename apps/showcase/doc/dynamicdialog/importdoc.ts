import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'dynamic-dialog-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { DynamicDialogModule } from 'primeng/dynamicdialog';`
    };
}
