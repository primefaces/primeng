import { Component } from '@angular/core';
import { SplitterSizeDemo } from '../../doc/splitter/sizedoc';
import { SplitterHorizontalDemo } from '../../doc/splitter/horizontaldoc';
import { ImportDoc } from '../../doc/splitter/importdoc';
import { SplitterVerticalDemo } from '../../doc/splitter/verticaldoc';
import { SplitterNestedDemo } from '../../doc/splitter/nesteddoc';
import { StyleDoc } from '../../doc/splitter/styledoc';
import { PropsDoc } from '../../doc/splitter/propsdoc';
import { EventsDoc } from '../../doc/splitter/eventsdoc';
import { TemplatesDoc } from '../../doc/splitter/templatesdoc';

@Component({
    templateUrl: './splitterdemo.html'
})
export class SplitterDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'horizontal',
            label: 'Horizontal',
            component: SplitterHorizontalDemo
        },
        {
            id: 'size',
            label: 'Size',
            component: SplitterSizeDemo
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: SplitterVerticalDemo
        },
        {
            id: 'nested',
            label: 'Nested',
            component: SplitterNestedDemo
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
