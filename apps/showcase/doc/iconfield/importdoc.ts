import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'icon-field-import-doc',
    standalone: false,
    template: `<app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';`
    };
}
