import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/tieredmenu/basicdoc';
import { EventsDoc } from '../../doc/tieredmenu/eventsdoc';
import { ImportDoc } from '../../doc/tieredmenu/importdoc';
import { MenuItemDoc } from '../../doc/tieredmenu/menuitemdoc';
import { PopupDoc } from '../../doc/tieredmenu/popupdoc';
import { PropsDoc } from '../../doc/tieredmenu/propsdoc';
import { StyleDoc } from '../../doc/tieredmenu/styledoc';
import { MethodsDoc } from '../../doc/tieredmenu/methodsdoc';
import { AccessibilityDoc } from '../../doc/tieredmenu/accessibilitydoc';
import { TemplatesDoc } from '../../doc/tieredmenu/templatesdoc';

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
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
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
