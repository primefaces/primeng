import { AccessibilityDoc } from '@/doc/contextmenu/accessibility-doc';
import { BasicDoc } from '@/doc/contextmenu/basic-doc';
import { CommandDoc } from '@/doc/contextmenu/command-doc';
import { DocumentDoc } from '@/doc/contextmenu/document-doc';
import { UsageDoc } from '@/doc/contextmenu/usage-doc';
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
            [heroDoc]="heroDoc"
            [apiDocs]="['ContextMenu', 'MenuItem']"
            [ptDocs]="ptComponent"
            themeDocs="contextmenu"
        ></app-doc>
    `
})
export class ContextMenuDemo {
    ptComponent = PTComponent;
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
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
                }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
