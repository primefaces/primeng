import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/scrolltop/importdoc';
import { BasicDoc } from '../../doc/scrolltop/basicdoc';
import { StyleDoc } from '../../doc/scrolltop/styledoc';
import { ElementDoc } from '../../doc/scrolltop/elementdoc';
import { AccessibilityDoc } from '../../doc/scrolltop/accessibilitydoc';

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
            component: BasicDoc
        },
        {
            id: 'element',
            label: 'Target Element',
            component: ElementDoc
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
}
