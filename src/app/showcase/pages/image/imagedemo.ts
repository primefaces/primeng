import { Component } from '@angular/core';
import { EventsDoc } from '../../doc/Image/eventsdoc';
import { ImportDoc } from '../../doc/Image/importdoc';
import { PropsDoc } from '../../doc/Image/propsdoc';
import { StyleDoc } from '../../doc/Image/styledoc';
import { TemplatesDoc } from '../../doc/Image/templatesdoc';
import { ImageBasicDemo } from '../../doc/Image/basicdoc';
import { ImageIndicatorTemplateDemo } from '../../doc/Image/indicatortemplatedoc';

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
            component: ImageBasicDemo
        },
        {
            id: 'templates',
            label: 'Indicator Template',
            component: ImageIndicatorTemplateDemo
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
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
