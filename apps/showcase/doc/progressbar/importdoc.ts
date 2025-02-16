import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'progress-bar-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ProgressBarModule } from 'primeng/progressbar';`
    };
}
