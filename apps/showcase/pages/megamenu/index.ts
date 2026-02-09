import { AccessibilityDoc } from '@/doc/megamenu/accessibility-doc';
import { BasicDoc } from '@/doc/megamenu/basic-doc';
import { CommandDoc } from '@/doc/megamenu/command-doc';
import { ImportDoc } from '@/doc/megamenu/import-doc';
import { PTComponent } from '@/doc/megamenu/pt/PTComponent';
import { RouterDoc } from '@/doc/megamenu/router-doc';
import { TemplateDoc } from '@/doc/megamenu/template-doc';
import { VerticalDoc } from '@/doc/megamenu/vertical-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';
import { AppDocService } from '@/components/doc/app.doc.service';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Angular MegaMenu Component"
        header="MegaMenu"
        description="MegaMenu is navigation component that displays submenus together."
        [docs]="docs"
        [apiDocs]="['MegaMenu', 'MegaMenuItem']"
        [ptDocs]="ptComponent"
        themeDocs="megamenu"
    ></app-doc>`,
    styles: [
        `
            :host ::ng-deep {
                .p-megamenu-panel {
                    z-index: 3;
                }
            }
        `
    ],
    providers: [AppDocService]
})
export class MegaMenuDemo {
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
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
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
