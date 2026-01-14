import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/card/accessibility-doc';
import { AdvancedDoc } from '@/doc/card/advanced-doc';
import { BasicDoc } from '@/doc/card/basic-doc';
import { ImportDoc } from '@/doc/card/import-doc';
import { PTComponent } from '@/doc/card/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Card Component" header="Card" description="Card is a flexible container component." [docs]="docs" [apiDocs]="['Card']" themeDocs="Card" [ptDocs]="ptComponent"></app-doc> `
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

    ptComponent = PTComponent;
}
