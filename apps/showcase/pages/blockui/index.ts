import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/blockui/accessibility-doc';
import { BasicDoc } from '@/doc/blockui/basic-doc';
import { DocumentDoc } from '@/doc/blockui/document-doc';
import { ImportDoc } from '@/doc/blockui/import-doc';
import { PTComponent } from '@/doc/blockui/pt/PTComponent';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular BlockUI Component" header="BlockUI" description="BlockUI can either block other components or the whole page." [docs]="docs" [apiDocs]="['BlockUI']" [ptDocs]="ptComponent" themeDocs="BlockUI"></app-doc>`
})
export class BlockUIDemo {
    ptComponent = PTComponent;

    blockedPanel: boolean = false;

    blockedDocument: boolean = false;
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
            id: 'document',
            label: 'Document',
            component: DocumentDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
        }, 3000);
    }
}
