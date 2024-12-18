import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'accordion-import-doc',
    standalone: false,
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {
    code: Code = {
        typescript: `import { AccordionModule } from 'primeng/accordion';`
    };
}
