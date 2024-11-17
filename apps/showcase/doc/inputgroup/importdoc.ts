import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'input-group-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';`
    };
}
