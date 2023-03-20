import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/progressbar/basicdoc';
import { StyleDoc } from '../../doc/progressbar/styledoc';
import { ImportDoc } from '../../doc/progressbar/importdoc';
import { IndeterminateDoc } from '../../doc/progressbar/indeterminatedoc';
import { DynamicDoc } from '../../doc/progressbar/dynamicdoc';
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
            component: BasicDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'indeterminate',
            label: 'Indeterminate',
            component: IndeterminateDoc
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
