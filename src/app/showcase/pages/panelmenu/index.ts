import { Component } from '@angular/core';
import { BasicDoc } from '@doc/panelmenu/basicdoc';
import { ImportDoc } from '@doc/panelmenu/importdoc';
import { MultipleDoc } from '@doc/panelmenu/multipledoc';
import { AccessibilityDoc } from '@doc/panelmenu/accessibilitydoc';
import { ControlledDoc } from '@doc/panelmenu/controlleddoc';
import { TemplateDoc } from '@doc/panelmenu/templatedoc';
import { CommandDoc } from '@doc/panelmenu/commanddoc';
import { RouterDoc } from '@doc/panelmenu/routerdoc';
import { PanelMenuDocModule } from '@doc/panelmenu/panelmenudoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular PanelMenu Component"
        header="PanelMenu"
        description="PanelMenu is a hybrid of Accordion and Tree components."
        [docs]="docs"
        [apiDocs]="['PanelMenu', 'MenuItem']"
    ></app-doc>`,
    standalone: true,
    imports: [PanelMenuDocModule],
})
export class PanelMenuDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc,
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc,
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
