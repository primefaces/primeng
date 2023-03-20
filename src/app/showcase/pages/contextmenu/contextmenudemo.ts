import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/contextmenu/accessibilitydoc';
import { BasicDoc } from '../../doc/contextmenu/basicdoc';
import { DocumentDoc } from '../../doc/contextmenu/documentdoc';
import { EventsDoc } from '../../doc/contextmenu/eventsdoc';
import { ImportDoc } from '../../doc/contextmenu/importdoc';
import { MenuItemDoc } from '../../doc/contextmenu/menuitemdoc';
import { MethodsDoc } from '../../doc/contextmenu/methodsdoc';
import { PropsDoc } from '../../doc/contextmenu/propsdoc';
import { StyleDoc } from '../../doc/contextmenu/styledoc';
import { TriggerEventDoc } from '../../doc/contextmenu/triggereventdoc';

@Component({
    templateUrl: './contextmenudemo.html'
})
export class ContextMenuDemo {
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
            id: 'document',
            label: 'Document',
            component: DocumentDoc
        },
        {
            id: 'triggerevent',
            label: 'Trigger Event',
            component: TriggerEventDoc
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
