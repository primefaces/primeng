import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'image-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { Image } from 'primeng/image';`
    };
}
