import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/cascadeselect/basicdoc';
import { EventsDoc } from '../../doc/cascadeselect/eventsdoc';
import { ImportDoc } from '../../doc/cascadeselect/importdoc';
import { PropsDoc } from '../../doc/cascadeselect/propsdoc';
import { StyleDoc } from '../../doc/cascadeselect/styledoc';
import { TemplateDoc } from '../../doc/cascadeselect/templatedoc';

@Component({
    templateUrl: './cascadeselectdemo.html'
})
export class CascadeSelectDemo {
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
        }
    ];
}
