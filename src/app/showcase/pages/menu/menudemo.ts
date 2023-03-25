import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/menu/basicdoc';
import { CustomContentDoc } from '../../doc/menu/customdoc';
import { CommandDoc } from '../../doc/menu/commanddoc';
import { EventsDoc } from '../../doc/menu/eventsdoc';
import { MethodsDoc } from '../../doc/menu/methodsdoc';
import { GroupDoc } from '../../doc/menu/groupdoc';
import { ImportDoc } from '../../doc/menu/importdoc';
import { MenuItemDoc } from '../../doc/menu/menuitemdoc';
import { NavigationDoc } from '../../doc/menu/navigationdoc';
import { PopupDoc } from '../../doc/menu/popupdoc';
import { PropsDoc } from '../../doc/menu/propsdoc';
import { StyleDoc } from '../../doc/menu/styledoc';
import { AccessibilityDoc } from '../../doc/menu/accessibilitydoc';

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

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'menuitem',
            label: 'MenuItem API',
            component: MenuItemDoc
        }
    ];
}
