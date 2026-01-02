import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';

@Component({
    selector: 'key-filter-import-doc',
    standalone: true,
    imports: [AppCodeModule],
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { KeyFilterModule } from 'primeng/keyfilter';`
    };
}
