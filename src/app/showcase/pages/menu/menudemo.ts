import { Component } from '@angular/core';
import { MenuBasicDemo } from '../../doc/menu/basicdoc';
import { MenuCustomContentDemo } from '../../doc/menu/customdoc';
import { MenuCommandDemo } from '../../doc/menu/commanddoc';
import { EventsDoc } from '../../doc/menu/eventsdoc';
import { MethodsDoc } from '../../doc/menu/methodsdoc';
import { MenuGroupDemo } from '../../doc/menu/groupdoc';
import { ImportDoc } from '../../doc/menu/importdoc';
import { MenuItemDoc } from '../../doc/menu/menuitemdoc';
import { MenuNavigationDemo } from '../../doc/menu/navigationdoc';
import { MenuPopupDemo } from '../../doc/menu/popupdoc';
import { PropsDoc } from '../../doc/menu/propsdoc';
import { StyleDoc } from '../../doc/menu/styledoc';

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
            component: MenuBasicDemo
        },
        {
            id: 'group',
            label: 'Group',
            component: MenuGroupDemo
        },
        {
            id: 'popup',
            label: 'Popup',
            component: MenuPopupDemo
        },
        {
            id: 'custom',
            label: 'Custom Content',
            component: MenuCustomContentDemo
        },
        {
            id: 'navigation',
            label: 'Navigation',
            component: MenuNavigationDemo
        },
        {
            id: 'command',
            label: 'Command',
            component: MenuCommandDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
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
