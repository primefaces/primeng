import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/steps/basicdoc';
import { ImportDoc } from '../../doc/steps/importdoc';
import { InteractiveDoc } from '../../doc/steps/interactivedoc';
import { MenuItemDoc } from '../../doc/steps/menuitemdoc';
import { MethodsDoc } from '../../doc/steps/methodsdoc';
import { PropsDoc } from '../../doc/steps/propsdoc';
import { StyleDoc } from '../../doc/steps/styledoc';
import { EventsDoc } from '../../doc/steps/eventsdoc';
import { RoutingDoc } from '../../doc/steps/routingdoc';
import { AccessibilityDoc } from '../../doc/steps/accessibilitydoc';

@Component({
    templateUrl: './stepsdemo.html',
    styleUrls: ['stepsdemo.scss']
})
export class StepsDemo {
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
            id: 'interactive',
            label: 'Interactive',
            component: InteractiveDoc
        },
        {
            id: 'routing',
            label: 'Routing',
            component: RoutingDoc
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
