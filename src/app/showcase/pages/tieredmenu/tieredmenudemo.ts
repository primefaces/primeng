import { Component } from '@angular/core';
import { TieredMenuBasicDemo } from '../../doc/tieredmenu/basicdoc';
import { EventsDoc } from '../../doc/tieredmenu/eventsdoc';
import { ImportDoc } from '../../doc/tieredmenu/importdoc';
import { MenuItemDoc } from '../../doc/tieredmenu/menuitemdoc';
import { TieredMenuPopupDemo } from '../../doc/tieredmenu/popupdoc';
import { PropsDoc } from '../../doc/tieredmenu/propsdoc';
import { StyleDoc } from '../../doc/tieredmenu/styledoc';
import { MethodsDoc } from '../../doc/tieredmenu/methodsdoc';

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
            component: TieredMenuBasicDemo
        },
        {
            id: 'popup',
            label: 'Popup',
            component: TieredMenuPopupDemo
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
