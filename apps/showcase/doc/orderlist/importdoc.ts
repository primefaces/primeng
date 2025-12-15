import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';

@Component({
    selector: 'order-list-import-doc',
    standalone: true,
    imports: [AppCodeModule],
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { OrderListModule } from 'primeng/orderlist';`
    };
}
