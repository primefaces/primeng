import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'progress-bar-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ProgressBar } from 'primeng/progressbar';
// For dynamic progressbar demo
import { ToastModule } from 'primeng/toast';`
    };
}
