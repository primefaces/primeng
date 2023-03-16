import { Component } from '@angular/core';
import { StyleDoc } from '../../doc/dock/styledoc';
import { DockAdvancedDemo } from '../../doc/dock/advanceddoc';
import { DockBasicDemo } from '../../doc/dock/basicdoc';
import { EventsDoc } from '../../doc/dock/eventsdoc';
import { ImportDoc } from '../../doc/dock/importdoc';
import { MenuItemDoc } from '../../doc/dock/menuitemdoc';
import { MethodsDoc } from '../../doc/dock/methodsdoc';
import { PropsDoc } from '../../doc/dock/propsdoc';

@Component({
    templateUrl: './dockdemo.html',
    styleUrls: ['./dockdemo.scss']
})
export class DockDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: DockBasicDemo
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: DockAdvancedDemo
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
