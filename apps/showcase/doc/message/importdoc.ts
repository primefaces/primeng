import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'message-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { Message } from 'primeng/message';`
    };
}
