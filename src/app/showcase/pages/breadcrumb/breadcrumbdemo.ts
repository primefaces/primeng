import { Component } from '@angular/core';
import { StyleDoc } from '../../doc/breadcrumb/styledoc';
import { BasicDoc } from '../../doc/breadcrumb/basicdoc';
import { EventsDoc } from '../../doc/breadcrumb/eventsdoc';
import { ImportDoc } from '../../doc/breadcrumb/importdoc';
import { MenuItemDoc } from '../../doc/breadcrumb/menuitemdoc';
import { PropsDoc } from '../../doc/breadcrumb/propsdoc';
import { AccessibilityDoc } from '../../doc/breadcrumb/accessibilitydoc';
import { TemplatesDoc } from '../../doc/breadcrumb/templatesdoc';

@Component({
    templateUrl: './breadcrumbdemo.html'
})
export class BreadcrumbDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            basic: 'basic',
            label: 'Basic',
            component: BasicDoc
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
            id: 'methods',
            label: 'Methods',
            component: EventsDoc
        },
        {
            id: 'menuitem',
            label: 'MenuItem API',
            component: MenuItemDoc
        }
    ];
}
