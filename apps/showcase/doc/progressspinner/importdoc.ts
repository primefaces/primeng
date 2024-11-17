import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'progress-spinner-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ProgressSpinner } from 'primeng/progressspinner';`
    };
}
