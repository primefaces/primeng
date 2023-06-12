import { Component } from '@angular/core';
import { SizeDoc } from '../../doc/splitter/sizedoc';
import { HorizontalDoc } from '../../doc/splitter/horizontaldoc';
import { ImportDoc } from '../../doc/splitter/importdoc';
import { VerticalDoc } from '../../doc/splitter/verticaldoc';
import { NestedDoc } from '../../doc/splitter/nesteddoc';
import { StyleDoc } from '../../doc/splitter/styledoc';
import { AccessibilityDoc } from '../../doc/splitter/accessibilitydoc';
import { DynamicSplitterDoc } from '../../doc/splitter/dynamicdoc';

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
            component: HorizontalDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
        },
        {
            id: 'nested',
            label: 'Nested',
            component: NestedDoc
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
        },
        {
            id: 'dynamc',
            label: 'Dynamic Panels',
            component: DynamicSplitterDoc
        }
    ];
}
