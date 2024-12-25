import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'text-area-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { TextareaModule } from 'primeng/textarea';`
    };
}
