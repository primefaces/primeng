import { AccessibilityDoc } from '@/doc/menu/accessibilitydoc';
import { BasicDoc } from '@/doc/menu/basicdoc';
import { CommandDoc } from '@/doc/menu/commanddoc';
import { GroupDoc } from '@/doc/menu/groupdoc';
import { ImportDoc } from '@/doc/menu/importdoc';
import { MenuDocModule } from '@/doc/menu/menudoc.module';
import { PopupDoc } from '@/doc/menu/popupdoc';
import { RouterDoc } from '@/doc/menu/routerdoc';
import { TemplateDoc } from '@/doc/menu/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Menu Component" header="Menu" description="Menu is a navigation / command component that supports dynamic and static positioning." [docs]="docs" [apiDocs]="['Menu', 'MenuItem']" themeDocs="menu"></app-doc> `,
    standalone: true,
    imports: [MenuDocModule]
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
}
