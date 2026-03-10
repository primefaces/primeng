import { AccessibilityDoc } from '@/doc/tieredmenu/accessibility-doc';
import { BasicDoc } from '@/doc/tieredmenu/basic-doc';
import { CommandDoc } from '@/doc/tieredmenu/command-doc';
import { UsageDoc } from '@/doc/tieredmenu/usage-doc';
import { PopupDoc } from '@/doc/tieredmenu/popup-doc';
import { PTComponent } from '@/doc/tieredmenu/pt/PTComponent';
import { RouterDoc } from '@/doc/tieredmenu/router-doc';
import { TemplateDoc } from '@/doc/tieredmenu/template-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular TieredMenu Component"
        header="TieredMenu"
        description="TieredMenu displays submenus in nested overlays."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['TieredMenu', 'MenuItem']"
        [ptDocs]="ptComponent"
        themeDocs="tieredmenu"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class TieredMenuDemo {
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
                    id: 'popup',
                    label: 'Popup',
                    component: PopupDoc
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
