import { Code } from '@/domain/code';
import { Component } from '@angular/core';
@Component({
    selector: 'input-number-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { InputNumberModule } from 'primeng/inputnumber';`
    };
}
