import { AccessibilityDoc } from '@/doc/menu/accessibility-doc';
import { BasicDoc } from '@/doc/menu/basic-doc';
import { CommandDoc } from '@/doc/menu/command-doc';
import { GroupDoc } from '@/doc/menu/group-doc';
import { ImportDoc } from '@/doc/menu/import-doc';
import { PopupDoc } from '@/doc/menu/popup-doc';
import { PTComponent } from '@/doc/menu/pt/PTComponent';
import { RouterDoc } from '@/doc/menu/router-doc';
import { TemplateDoc } from '@/doc/menu/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Menu Component"
        header="Menu"
        description="Menu is a navigation / command component that supports dynamic and static positioning."
        [docs]="docs"
        [apiDocs]="['Menu', 'MenuItem']"
        [ptDocs]="ptComponent"
        themeDocs="menu"
    ></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class MenuDemo {
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
            id: 'group',
            label: 'Group',
            component: GroupDoc
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
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
