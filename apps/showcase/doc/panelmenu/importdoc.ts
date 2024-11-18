import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'panel-menu-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { PanelMenu } from 'primeng/panelmenu';`
    };
}
