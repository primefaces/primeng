import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/paginator/accessibilitydoc';
import { BasicDoc } from '../../doc/paginator/basicdoc';
import { EventsDoc } from '../../doc/paginator/eventsdoc';
import { ImagesDoc } from '../../doc/paginator/imagesdoc';
import { ImportDoc } from '../../doc/paginator/importdoc';
import { PropsDoc } from '../../doc/paginator/propsdoc';
import { StyleDoc } from '../../doc/paginator/styledoc';
import { TemplateDoc } from '../../doc/paginator/templatedoc';
import { TemplatesDoc } from '../../doc/paginator/templatesdoc';

@Component({
    templateUrl: './paginatordemo.html',
    styleUrls: ['./paginatordemo.scss']
})
export class PaginatorDemo {
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
            id: 'images',
            label: 'Images',
            component: ImagesDoc
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
