import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-popup-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ConfirmPopupModule } from 'primeng/confirmpopup';`
    };
}
