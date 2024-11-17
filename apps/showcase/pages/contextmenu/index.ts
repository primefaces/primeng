import { AccessibilityDoc } from '@/doc/contextmenu/accessibilitydoc';
import { BasicDoc } from '@/doc/contextmenu/basicdoc';
import { CommandDoc } from '@/doc/contextmenu/commanddoc';
import { ContextMenuDocModule } from '@/doc/contextmenu/contextmenudoc.module';
import { DocumentDoc } from '@/doc/contextmenu/documentdoc';
import { ImportDoc } from '@/doc/contextmenu/importdoc';
import { RouterDoc } from '@/doc/contextmenu/routerdoc';
import { TableDoc } from '@/doc/contextmenu/tabledoc';
import { TemplateDoc } from '@/doc/contextmenu/templatedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ContextMenuDocModule],
    template: `
        <app-doc docTitle="Angular ContextMenu Component" header="ContextMenu" description="ContextMenu displays an overlay menu on right click of its target." [docs]="docs" [apiDocs]="['ContextMenu', 'MenuItem']" themeDocs="contextmenu"></app-doc>
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
}
