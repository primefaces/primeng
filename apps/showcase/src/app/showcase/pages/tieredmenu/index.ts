import { Component } from '@angular/core';
import { BasicDoc } from '@doc/tieredmenu/basicdoc';
import { ImportDoc } from '@doc/tieredmenu/importdoc';
import { PopupDoc } from '@doc/tieredmenu/popupdoc';
import { TemplateDoc } from '@doc/tieredmenu/templatedoc';
import { CommandDoc } from '@doc/tieredmenu/commanddoc';
import { RouterDoc } from '@doc/tieredmenu/routerdoc';
import { AccessibilityDoc } from '@doc/tieredmenu/accessibilitydoc';
import { TieredMenuDocModule } from '@doc/tieredmenu/tieredmenudoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular TieredMenu Component"
        header="TieredMenu"
        description="TieredMenu displays submenus in nested overlays."
        [docs]="docs"
        [apiDocs]="['TieredMenu', 'MenuItem']"
        themeDocs="tieredmenu"
    ></app-doc>`,
    standalone: true,
    imports: [TieredMenuDocModule],
})
export class TieredMenuDemo {
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
            id: 'popup',
            label: 'Popup',
            component: PopupDoc,
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
