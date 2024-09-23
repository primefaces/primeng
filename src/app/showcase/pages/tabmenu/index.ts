import { Component } from '@angular/core';
import { ControlledDoc } from '@doc/tabmenu/controlleddoc';
import { BasicDoc } from '@doc/tabmenu/basicdoc';
import { ImportDoc } from '@doc/tabmenu/importdoc';
import { TemplateDoc } from '@doc/tabmenu/templatedoc';
import { AccessibilityDoc } from '@doc/tabmenu/accessibilitydoc';
import { CommandDoc } from '@doc/tabmenu/commanddoc';
import { RouterDoc } from '@doc/tabmenu/routerdoc';
import { TabMenuDocModule } from '@doc/tabmenu/tabmenudoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular TabMenu Component"
        header="TabMenu"
        description="TabMenu is a navigation component that displays items as tab headers. Example below uses nested routes with TabMenu."
        [docs]="docs"
        [apiDocs]="['TabMenu', 'MenuItem']"
        themeDocs="tabmenu"
    ></app-doc>`,
    standalone: true,
    imports: [TabMenuDocModule],
})
export class TabMenuDemo {
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
