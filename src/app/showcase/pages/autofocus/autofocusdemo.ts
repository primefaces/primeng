import { Component } from '@angular/core';
import { ImportDoc } from '@doc/autofocus/importdoc';
import { BasicDoc } from '@doc/autofocus/basicdoc';

@Component({
    selector: 'autofocusdemo',
    templateUrl: './autofocusdemo.html',
    standalone: false
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
}
