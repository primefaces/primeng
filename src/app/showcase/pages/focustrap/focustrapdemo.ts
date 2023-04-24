import { Component } from '@angular/core';
import { PropsDoc } from '../../doc/focustrap/propsdoc';
import { BasicDoc } from '../../doc/focustrap/basicdoc';
import { ImportDoc } from '../../doc/focustrap/importdoc';

@Component({
    templateUrl: './focustrapdemo.html'
})
export class FocusTrapDemo {
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
