import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'image-compare-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { ImageCompareModule } from 'primeng/imagecompare';`
    };
}
