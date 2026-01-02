import { Component } from '@angular/core';
import { Code } from '@/domain/code';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'tag-import-doc',
    standalone: true,
    imports: [AppCode],
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { TagModule } from 'primeng/tag';`
    };
}
