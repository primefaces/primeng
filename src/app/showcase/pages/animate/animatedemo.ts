import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/animate/importdoc';
import { BasicDoc } from '../../doc/animate/basicdoc';

@Component({
    templateUrl: './animatedemo.html'
})
export class AnimateDemo {
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
        }
    ];
}
