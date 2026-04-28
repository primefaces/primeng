import { AccessibilityDoc } from '@/doc/terminal/accessibility-doc';
import { BasicDoc } from '@/doc/terminal/basic-doc';
import { ImportDoc } from '@/doc/terminal/import-doc';
import { PTComponent } from '@/doc/terminal/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Terminal Component"
        header="Terminal"
        description='Terminal is a text based user interface. Enter "date" to display the current date.'
        [docs]="docs"
        [apiDocs]="['Terminal']"
        [ptDocs]="ptComponent"
        themeDocs="terminal"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class TerminalDemo {
    ptComponent = PTComponent;

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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
