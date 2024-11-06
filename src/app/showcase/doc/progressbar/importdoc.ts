import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'progress-bar-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ProgressBar } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';`,
    };
}
