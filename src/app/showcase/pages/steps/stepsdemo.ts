import { Component } from '@angular/core';
import { StepsBasicDemo } from '../../doc/steps/basicdoc';
import { ImportDoc } from '../../doc/steps/importdoc';
import { StepsInteractiveDemo } from '../../doc/steps/interactivedoc';
import { MenuItemDoc } from '../../doc/steps/menuitemdoc';
import { MethodsDoc } from '../../doc/steps/methodsdoc';
import { PropsDoc } from '../../doc/steps/propsdoc';
import { StyleDoc } from '../../doc/steps/styledoc';
import { EventsDoc } from '../../doc/steps/eventsdoc';
import { StepsRoutingDemo } from '../../doc/steps/routingdoc';

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
            component: StepsBasicDemo
        },
        {
            id: 'interactive',
            label: 'Interactive',
            component: StepsInteractiveDemo
        },
        {
            id: 'routing',
            label: 'Routing',
            component: StepsRoutingDemo
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
