import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/togglebutton/accessibilitydoc';
import { BasicDoc } from '../../doc/togglebutton/basicdoc';
import { CustomizedDoc } from '../../doc/togglebutton/customizeddoc';
import { EventsDoc } from '../../doc/togglebutton/eventsdoc';
import { ImportDoc } from '../../doc/togglebutton/importdoc';
import { PropsDoc } from '../../doc/togglebutton/propsdoc';
import { StyleDoc } from '../../doc/togglebutton/styledoc';

@Component({
    templateUrl: './togglebuttondemo.html'
})
export class ToggleButtonDemo {
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
            id: 'customized',
            label: 'Customized',
            component: CustomizedDoc
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
        }
    ];
}
