import { Component } from '@angular/core';
import { BasicDoc } from '@doc/tieredmenu/basicdoc';
import { ImportDoc } from '@doc/tieredmenu/importdoc';
import { PopupDoc } from '@doc/tieredmenu/popupdoc';
import { TemplateDoc } from '@doc/tieredmenu/templatedoc';
import { CommandDoc } from '@doc/tieredmenu/commanddoc';
import { RouterDoc } from '@doc/tieredmenu/routerdoc';
import { StyleDoc } from '@doc/tieredmenu/styledoc';
import { AccessibilityDoc } from '@doc/tieredmenu/accessibilitydoc';

@Component({
    templateUrl: './tieredmenudemo.html'
})
export class TieredMenuDemo {
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
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
