import { Component } from '@angular/core';
import { BasicDoc } from '@doc/menu/basicdoc';
import { TemplateDoc } from '@doc/menu/templatedoc';
import { CommandDoc } from '@doc/menu/commanddoc';
import { GroupDoc } from '@doc/menu/groupdoc';
import { ImportDoc } from '@doc/menu/importdoc';
import { RouterDoc } from '@doc/menu/routerdoc';
import { PopupDoc } from '@doc/menu/popupdoc';
import { StyleDoc } from '@doc/menu/styledoc';
import { AccessibilityDoc } from '@doc/menu/accessibilitydoc';

@Component({
    templateUrl: './menudemo.html'
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
