import { Component } from '@angular/core';
import { EventsDoc } from '../../doc/Image/eventsdoc';
import { ImportDoc } from '../../doc/Image/importdoc';
import { PropsDoc } from '../../doc/Image/propsdoc';
import { StyleDoc } from '../../doc/Image/styledoc';
import { TemplatesDoc } from '../../doc/Image/templatesdoc';
import { BasicDoc } from '../../doc/Image/basicdoc';
import { TemplateDoc } from '../../doc/Image/templatedoc';
import { AccessibilityDoc } from '../../doc/Image/accessibilitydoc';
import { PreviewDoc } from '../../doc/Image/previewdoc';

@Component({
    templateUrl: './imagedemo.html'
})
export class ImageDemo {
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
            id: 'templates',
            label: 'Indicator Template',
            component: TemplateDoc
        },
        {
            id: 'preview',
            label: 'Preview',
            component: PreviewDoc
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
            id: 'props',
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
