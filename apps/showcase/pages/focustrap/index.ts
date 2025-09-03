import { BasicDoc } from '@/doc/focustrap/basicdoc';
import { ImportDoc } from '@/doc/focustrap/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { AppDocService } from '@/components/doc/app.doc.service';

@Component({
    template: ` <app-doc docTitle="Angular Focus Trap Component" header="Focus Trap" description="Focus Trap keeps focus within a certain DOM element while tabbing." [docs]="docs" [apiDocs]="['FocusTrap']"></app-doc> `,
    standalone: true,
    imports: [AppDoc],
    providers: [AppDocService]
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
