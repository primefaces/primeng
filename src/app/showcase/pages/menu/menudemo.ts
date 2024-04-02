import { Component } from '@angular/core';
import { BasicDoc } from '@doc/menu/basicdoc';
import { CustomContentDoc } from '@doc/menu/customdoc';
import { CommandDoc } from '@doc/menu/commanddoc';
import { GroupDoc } from '@doc/menu/groupdoc';
import { ImportDoc } from '@doc/menu/importdoc';
import { NavigationDoc } from '@doc/menu/navigationdoc';
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
            id: 'custom',
            label: 'Custom Content',
            component: CustomContentDoc
        },
        {
            id: 'navigation',
            label: 'Navigation',
            component: NavigationDoc
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc
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
