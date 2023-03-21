import { Component } from '@angular/core';
import { FilterDoc } from '../../doc/picklist/filterdoc';
import { BasicDoc } from '../../doc/picklist/basicdoc';
import { ImportDoc } from '../../doc/picklist/importdoc';
import { PropsDoc } from '../../doc/picklist/propsdoc';
import { EventsDoc } from '../../doc/picklist/eventsdoc';
import { TemplatesDoc } from '../../doc/picklist/templatesdoc';
import { MethodsDoc } from '../../doc/picklist/methodsdoc';
import { StyleDoc } from '../../doc/picklist/styledoc';
import { AccessibilityDoc } from '../../doc/picklist/accessibilitydoc';

@Component({
    templateUrl: './picklistdemo.html',
    styleUrls: ['./picklistdemo.scss']
})
export class PickListDemo {
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
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
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
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'properties',
            label: 'Properties',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'methods',
            label: 'Methods',
            component: MethodsDoc
        }
    ];
}
