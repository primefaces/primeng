import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/panelmenu/accessibility-doc';
import { BasicDoc } from '@/doc/panelmenu/basic-doc';
import { CommandDoc } from '@/doc/panelmenu/command-doc';
import { ControlledDoc } from '@/doc/panelmenu/controlled-doc';
import { ImportDoc } from '@/doc/panelmenu/import-doc';
import { MultipleDoc } from '@/doc/panelmenu/multiple-doc';
import { PTComponent } from '@/doc/panelmenu/pt/PTComponent';
import { RouterDoc } from '@/doc/panelmenu/router-doc';
import { TemplateDoc } from '@/doc/panelmenu/template-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular PanelMenu Component"
        header="PanelMenu"
        description="PanelMenu is a hybrid of Accordion and Tree components."
        [docs]="docs"
        [apiDocs]="['PanelMenu', 'MenuItem']"
        themeDocs="panelmenu"
        [ptDocs]="ptComponent"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PanelMenuDemo {
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
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
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

    ptComponent = PTComponent;
}
