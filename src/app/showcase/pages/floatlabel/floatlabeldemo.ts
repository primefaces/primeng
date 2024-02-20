import { Component } from '@angular/core';
import { BasicDoc } from '../../doc/floatlabel/basicdoc';
import { ImportDoc } from '../../doc/floatlabel/importdoc';

@Component({
    templateUrl: './floatlabeldemo.html'
})
export class FloatLabelDemo {
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
