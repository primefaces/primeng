import { AccessibilityDoc } from '@/doc/menubar/accessibility-doc';
import { BasicDoc } from '@/doc/menubar/basic-doc';
import { CommandDoc } from '@/doc/menubar/command-doc';
import { UsageDoc } from '@/doc/menubar/usage-doc';
import { PTComponent } from '@/doc/menubar/pt/PTComponent';
import { RouterDoc } from '@/doc/menubar/router-doc';
import { TemplateDoc } from '@/doc/menubar/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Menubar Component"
        header="Menubar"
        description="Menubar is a horizontal menu component."
        [docs]="docs"
        [apiDocs]="['Menubar', 'MenuItem']"
        [ptDocs]="ptComponent"
        themeDocs="menubar"
        [heroDoc]="heroDoc"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class MenubarDemo {
    heroDoc = BasicDoc;
    ptComponent = PTComponent;
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
