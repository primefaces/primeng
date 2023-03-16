import { Component } from '@angular/core';
import { TabMenuControlledDemo } from '../../doc/tabmenu/controlleddoc';
import { TabMenuActiveDemo } from '../../doc/tabmenu/activedoc';
import { TabMenuBasicDemo } from '../../doc/tabmenu/basicdoc';
import { EventsDoc } from '../../doc/tabmenu/eventsdoc';
import { ImportDoc } from '../../doc/tabmenu/importdoc';
import { MenuItemDoc } from '../../doc/tabmenu/menuitemdoc';
import { PropsDoc } from '../../doc/tabmenu/propsdoc';
import { StyleDoc } from '../../doc/tabmenu/styledoc';
import { TabMenuScrollableDemo } from '../../doc/tabmenu/scrollabledoc';
import { TabMenuTemplateDemo } from '../../doc/tabmenu/templatedoc';
import { TemplatesDoc } from '../../doc/tabmenu/templatesdoc';

@Component({
    templateUrl: './tabmenudemo.html'
})
export class TabMenuDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: TabMenuBasicDemo
        },
        {
            id: 'active',
            label: 'Active Item',
            component: TabMenuActiveDemo
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: TabMenuControlledDemo
        },
        {
            id: 'scrollable',
            label: 'Scrollable',
            component: TabMenuScrollableDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: TabMenuTemplateDemo
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
