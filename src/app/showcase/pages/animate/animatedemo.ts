import { Component } from '@angular/core';
import { AnimateImportDemo } from '../../doc/animate/importdoc';
import { AnimateBasicDemo } from '../../doc/animate/basicdoc';
import { PropsDoc } from '../../doc/animate/propsdoc';

@Component({
    templateUrl: './animatedemo.html'
})
export class AnimateDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: AnimateImportDemo
        },
        {
            id: 'basic',
            label: 'Basic',
            component: AnimateBasicDemo
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
