import { AccessibilityDoc } from '@/doc/terminal/accessibilitydoc';
import { BasicDoc } from '@/doc/terminal/basicdoc';
import { ImportDoc } from '@/doc/terminal/importdoc';
import { TerminalDocModule } from '@/doc/terminal/terminaldoc.module';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Terminal Component" header="Terminal" description='Terminal is a text based user interface. Enter "date" to display the current date.' [docs]="docs" [apiDocs]="['Terminal']" themeDocs="terminal"></app-doc> `,
    standalone: true,
    imports: [TerminalDocModule]
})
export class TerminalDemo {
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
