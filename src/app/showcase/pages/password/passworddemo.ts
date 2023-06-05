import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '../../doc/password/reactiveformsdoc';
import { AccessibilityDoc } from '../../doc/password/accessibilitydoc';
import { BasicDoc } from '../../doc/password/basicdoc';
import { DisabledDoc } from '../../doc/password/disableddoc';
import { EventsDoc } from '../../doc/password/eventsdoc';
import { FloatLabelDoc } from '../../doc/password/floatlabeldoc';
import { ImportDoc } from '../../doc/password/importdoc';
import { InvalidDoc } from '../../doc/password/invaliddoc';
import { MeterDoc } from '../../doc/password/meterdoc';
import { PropsDoc } from '../../doc/password/propsdoc';
import { StyleDoc } from '../../doc/password/styledoc';
import { TemplateDoc } from '../../doc/password/templatedoc';
import { TemplatesDoc } from '../../doc/password/templatesdoc';
import { ToggleMaskDoc } from '../../doc/password/togglemaskdoc';

@Component({
    templateUrl: './passworddemo.html'
})
export class PasswordDemo {
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
            id: 'meter',
            label: 'Meter',
            component: MeterDoc
        },
        {
            id: 'togglemask',
            label: 'Toggle Mask',
            component: ToggleMaskDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
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
