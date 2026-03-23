import { AccessibilityDoc } from '@/doc/menubar/accessibility-doc';
import { BasicDoc } from '@/doc/menubar/basic-doc';
import { CommandDoc } from '@/doc/menubar/command-doc';
import { ImportDoc } from '@/doc/menubar/import-doc';
import { PTComponent } from '@/doc/menubar/pt/PTComponent';
import { RouterDoc } from '@/doc/menubar/router-doc';
import { TemplateDoc } from '@/doc/menubar/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Menubar Component" header="Menubar" description="Menubar is a horizontal menu component." [docs]="docs" [apiDocs]="['Menubar', 'MenuItem']" [ptDocs]="ptComponent" themeDocs="menubar"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class MenubarDemo {
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
