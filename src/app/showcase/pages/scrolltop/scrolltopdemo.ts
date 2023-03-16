import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/scrolltop/importdoc';
import { ScrollTopBasicDemo } from '../../doc/scrolltop/basicdoc';
import { PropsDoc } from '../../doc/scrolltop/propsdoc';
import { StyleDoc } from '../../doc/scrolltop/styledoc';
import { ScrollTopElementDemo } from '../../doc/scrolltop/elementdoc';

@Component({
    templateUrl: './scrolltopdemo.html',
    styleUrls: ['./scrolltopdemo.scss']
})
export class ScrollTopDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: ScrollTopBasicDemo
        },
        {
            id: 'element',
            label: 'Target Element',
            component: ScrollTopElementDemo
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
        }
    ];
}
