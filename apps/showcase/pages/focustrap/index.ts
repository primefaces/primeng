import { AppDoc } from '@/components/doc/app.doc';
import { BasicDoc } from '@/doc/focustrap/basic-doc';
import { ImportDoc } from '@/doc/focustrap/import-doc';
import { Component } from '@angular/core';

@Component({
    template: ` <app-doc docTitle="Angular Focus Trap Component" header="Focus Trap" description="Focus Trap keeps focus within a certain DOM element while tabbing." [docs]="docs" [apiDocs]="['FocusTrap']"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
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
