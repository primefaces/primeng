import { Component } from '@angular/core';
import { AccessibilityDoc } from '@doc/contextmenu/accessibilitydoc';
import { BasicDoc } from '@doc/contextmenu/basicdoc';
import { CommandDoc } from '@doc/contextmenu/commanddoc';
import { DocumentDoc } from '@doc/contextmenu/documentdoc';
import { ImportDoc } from '@doc/contextmenu/importdoc';
import { RouterDoc } from '@doc/contextmenu/routerdoc';
import { StyleDoc } from '@doc/contextmenu/styledoc';
import { TableDoc } from '@doc/contextmenu/tabledoc';
import { TemplateDoc } from '@doc/contextmenu/templatedoc';

@Component({
    templateUrl: './contextmenudemo.html'
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
