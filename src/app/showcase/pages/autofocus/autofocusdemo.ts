import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/autofocus/importdoc';
import { BasicDoc } from '../../doc/autofocus/basicdoc';
import { PropsDoc } from '../../doc/autofocus/propsdoc';

@Component({
    selector: 'autofocusdemo',
    templateUrl: './autofocusdemo.html'
})
export class AutoFocusDemo {
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

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
