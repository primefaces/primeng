import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/accordion/accessibilitydoc';
import { BasicDoc } from '../../doc/accordion/basicdoc';
import { ControlledDoc } from '../../doc/accordion/controlleddoc';
import { DisabledDoc } from '../../doc/accordion/disableddoc';
import { EventsDoc } from '../../doc/accordion/eventsdoc';
import { ImportDoc } from '../../doc/accordion/importdoc';
import { MultipleDoc } from '../../doc/accordion/multipledoc';
import { PropsDoc } from '../../doc/accordion/propsdoc';
import { StyleDoc } from '../../doc/accordion/styledoc';
import { TemplateDoc } from '../../doc/accordion/templatedoc';
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
            component: BasicDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
