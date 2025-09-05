import { AccessibilityDoc } from '@/doc/menubar/accessibilitydoc';
import { BasicDoc } from '@/doc/menubar/basicdoc';
import { CommandDoc } from '@/doc/menubar/commanddoc';
import { ImportDoc } from '@/doc/menubar/importdoc';
import { RouterDoc } from '@/doc/menubar/routerdoc';
import { TemplateDoc } from '@/doc/menubar/templatedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Menubar Component" header="Menubar" description="Menubar is a horizontal menu component." [docs]="docs" [apiDocs]="['Menubar', 'MenuItem']" themeDocs="menubar"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class MenubarDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
