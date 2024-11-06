import { Component } from '@angular/core';
import { BasicDoc } from '@doc/calendarsoftrange/basicdoc';
import { ImportDoc } from '@doc/calendarsoftrange/importdoc';
import { ReactiveFormsDoc } from '@doc/calendarsoftrange/reactiveformsdoc';
@Component({
    templateUrl: './calendarsoftrangedemo.html'
})
export class CalendarSoftRangeDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
        }
    ];
}
