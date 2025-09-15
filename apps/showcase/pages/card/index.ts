import { AccessibilityDoc } from '@/doc/card/accessibilitydoc';
import { AdvancedDoc } from '@/doc/card/advanceddoc';
import { BasicDoc } from '@/doc/card/basicdoc';
import { ImportDoc } from '@/doc/card/importdoc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Card Component" header="Card" description="Card is a flexible container component." [docs]="docs" [apiDocs]="['Card']" themeDocs="Card"></app-doc> `
})
export class CardDemo {
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
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
