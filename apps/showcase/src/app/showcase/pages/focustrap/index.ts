import { Component } from '@angular/core';
import { BasicDoc } from '@doc/focustrap/basicdoc';
import { ImportDoc } from '@doc/focustrap/importdoc';
import { FocusTrapDocModule } from '@doc/focustrap/focustrapdoc.module';

@Component({
    template: ` <app-doc docTitle="Angular Focus Trap Component" header="Focus Trap" description="Focus Trap keeps focus within a certain DOM element while tabbing." [docs]="docs" [apiDocs]="['FocusTrap']"></app-doc> `,
    standalone: true,
    imports: [FocusTrapDocModule]
})
export class FocusTrapDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        }
    ];
}
