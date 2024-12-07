import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'image-compare-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
    standalone: false
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ImageCompareModule } from 'primeng/imagecompare';`
    };
}
