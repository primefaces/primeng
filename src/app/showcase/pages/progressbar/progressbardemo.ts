import { Component } from '@angular/core';
import { ProgressBarBasicDemo } from '../../doc/progressbar/basicdoc';
import { StyleDoc } from '../../doc/progressbar/styledoc';
import { ImportDoc } from '../../doc/progressbar/importdoc';
import { ProgressBarIndeterminateDemo } from '../../doc/progressbar/indeterminatedoc';
import { ProgressBarDynamicDemo } from '../../doc/progressbar/dynamicdoc';
import { PropsDoc } from '../../doc/progressbar/propsdoc';

@Component({
    templateUrl: './progressbardemo.html'
})
export class ProgressBarDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: ProgressBarBasicDemo
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: ProgressBarDynamicDemo
        },
        {
            id: 'indeterminate',
            label: 'Indeterminate',
            component: ProgressBarIndeterminateDemo
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
