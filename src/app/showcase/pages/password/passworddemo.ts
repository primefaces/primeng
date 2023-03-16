import { Component } from '@angular/core';
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
import { TogglemaskDoc } from '../../doc/password/togglemaskdoc';

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
            id: 'meter',
            label: 'Meter',
            component: MeterDoc
        },
        {
            id: 'togglemask',
            label: 'Toggle Mask',
            component: TogglemaskDoc
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
