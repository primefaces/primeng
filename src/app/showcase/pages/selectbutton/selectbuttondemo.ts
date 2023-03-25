import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '../../doc/selectbutton/reactiveformsdoc';
import { AccessibilityDoc } from '../../doc/selectbutton/accessibilitydoc';
import { BasicDoc } from '../../doc/selectbutton/basicdoc';
import { DisabledDoc } from '../../doc/selectbutton/disableddoc';
import { EventsDoc } from '../../doc/selectbutton/eventsdoc';
import { ImportDoc } from '../../doc/selectbutton/importdoc';
import { InvalidDoc } from '../../doc/selectbutton/invaliddoc';
import { MultipleDoc } from '../../doc/selectbutton/multipledoc';
import { PropsDoc } from '../../doc/selectbutton/propsdoc';
import { TemplateDoc } from '../../doc/selectbutton/templatedoc';

@Component({
    templateUrl: './selectbuttondemo.html'
})
export class SelectButtonDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
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
        }
    ];
}
