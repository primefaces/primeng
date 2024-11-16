import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'speed-dial-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { SpeedDial } from 'primeng/speeddial';`
    };
}
