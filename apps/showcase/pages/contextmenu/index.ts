import { AccessibilityDoc } from '@/doc/contextmenu/accessibility-doc';
import { BasicDoc } from '@/doc/contextmenu/basic-doc';
import { CommandDoc } from '@/doc/contextmenu/command-doc';
import { DocumentDoc } from '@/doc/contextmenu/document-doc';
import { ImportDoc } from '@/doc/contextmenu/import-doc';
import { PTComponent } from '@/doc/contextmenu/pt/PTComponent';
import { RouterDoc } from '@/doc/contextmenu/router-doc';
import { TableDoc } from '@/doc/contextmenu/table-doc';
import { TemplateDoc } from '@/doc/contextmenu/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular ContextMenu Component"
            header="ContextMenu"
            description="ContextMenu displays an overlay menu on right click of its target."
            [docs]="docs"
            [apiDocs]="['ContextMenu', 'MenuItem']"
            [ptDocs]="ptComponent"
            themeDocs="contextmenu"
        ></app-doc>
    `
})
export class ContextMenuDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc
        },
        {
            id: 'table',
            label: 'Table',
            component: TableDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
