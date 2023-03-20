import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/fieldset/importdoc';
import { BasicDoc } from '../../doc/fieldset/basicdoc';
import { ToggleableDoc } from '../../doc/fieldset/toggleabledoc';
import { TemplateDoc } from '../../doc/fieldset/templatedoc';
import { StyleDoc } from '../../doc/fieldset/styledoc';
import { PropsDoc } from '../../doc/fieldset/propsdoc';
import { EventsDoc } from '../../doc/fieldset/eventsdoc';
import { TemplatesDoc } from '../../doc/fieldset/templatesdoc';

@Component({
    templateUrl: './fieldsetdemo.html'
})
export class FieldsetDemo {
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
            id: 'toggleable',
            label: 'Toggleable',
            component: ToggleableDoc
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
