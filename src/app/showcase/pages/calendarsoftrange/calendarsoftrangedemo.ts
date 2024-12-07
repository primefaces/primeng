import { Component } from '@angular/core';
import { BasicDoc } from '@doc/calendarsoftrange/basicdoc';
import { ImportDoc } from '@doc/calendarsoftrange/importdoc';
import { ReactiveFormsDoc } from '@doc/calendarsoftrange/reactiveformsdoc';
import { FilledDoc } from '@doc/calendarsoftrange/filleddoc';
import { DisabledDoc } from '@doc/calendarsoftrange/disableddoc';

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
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        }
    ];
}
