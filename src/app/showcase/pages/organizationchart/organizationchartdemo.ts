import { Component } from '@angular/core';
import { TemplateDoc } from '../../doc/organizationchart/templatedoc';
import { BasicDoc } from '../../doc/organizationchart/basicdoc';
import { ImportDoc } from '../../doc/organizationchart/importdoc';
import { SelectionDoc } from '../../doc/organizationchart/selectiondoc';
import { ColoredDoc } from '../../doc/organizationchart/colored.doc';
import { StyleDoc } from '../../doc/organizationchart/styledoc';
import { PropsDoc } from '../../doc/organizationchart/propsdoc';
import { EventsDoc } from '../../doc/organizationchart/eventsdoc';
import { AccessibilityDoc } from '../../doc/organizationchart/accessibilitydoc';
import { TemplatesDoc } from '../../doc/organizationchart/templatesdoc';

@Component({
    templateUrl: './organizationchartdemo.html',
    styleUrls: ['./organizationchartdemo.scss']
})
export class OrganizationChartDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'selection',
            label: 'Selection',
            component: SelectionDoc
        },
        {
            id: 'colored',
            label: 'Colored',
            component: ColoredDoc
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
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        }
    ];
}
