import { Component } from '@angular/core';
import { AccordionBasicDemo } from '../../doc/accordion/basicdoc';
import { AccordionControlledDemo } from '../../doc/accordion/controlleddoc';
import { AccordionDisabledDemo } from '../../doc/accordion/disableddoc';
import { EventsDoc } from '../../doc/accordion/eventsdoc';
import { ImportDoc } from '../../doc/accordion/importdoc';
import { AccordionMultipleDemo } from '../../doc/accordion/multipledoc';
import { PropsDoc } from '../../doc/accordion/propsdoc';
import { StyleDoc } from '../../doc/accordion/styledoc';
import { AccordionTemplateDemo } from '../../doc/accordion/templatedoc';
import { TemplatesDoc } from '../../doc/accordion/templatesdoc';

@Component({
    templateUrl: './accordiondemo.html',
    styleUrls: ['./accordiondemo.scss']
})
export class AccordionDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: AccordionBasicDemo
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: AccordionMultipleDemo
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: AccordionDisabledDemo
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: AccordionControlledDemo
        },
        {
            id: 'template',
            label: 'Template',
            component: AccordionTemplateDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        }
    ];
    apiDocs = [
        {
            id: 'properties',
            label: 'Properties',
            component: PropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
