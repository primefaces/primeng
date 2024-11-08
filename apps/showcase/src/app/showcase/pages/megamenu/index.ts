import { Component } from '@angular/core';
import { ImportDoc } from '@doc/megamenu/importdoc';
import { BasicDoc } from '@doc/megamenu/basicdoc';
import { TemplateDoc } from '@doc/megamenu/templatedoc';
import { VerticalDoc } from '@doc/megamenu/verticaldoc';
import { AccessibilityDoc } from '@doc/megamenu/accessibilitydoc';
import { CommandDoc } from '@doc/megamenu/commanddoc';
import { RouterDoc } from '@doc/megamenu/routerdoc';
import { MegaMenuDocModule } from '@doc/megamenu/megamenudoc.module';

@Component({
    standalone: true,
    imports: [MegaMenuDocModule],
    template: `<app-doc
        docTitle="Angular MegaMenu Component"
        header="MegaMenu"
        description="MegaMenu is navigation component that displays submenus together."
        [docs]="docs"
        [apiDocs]="['MegaMenu', 'MegaMenuItem']"
        themeDocs="megamenu"
    ></app-doc>`,
    styles: [
        `
            :host ::ng-deep {
                .p-megamenu-panel {
                    z-index: 3;
                }
            }
        `,
    ],
})
export class MegaMenuDemo {
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
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc,
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
