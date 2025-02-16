import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'chip-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ChipModule } from 'primeng/chip';`
    };
}
