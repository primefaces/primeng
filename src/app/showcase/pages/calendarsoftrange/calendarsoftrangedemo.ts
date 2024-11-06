import { Component } from '@angular/core';
import { BasicDoc } from '@doc/calendarsoftrange/basicdoc';
import { ImportDoc } from '@doc/calendarsoftrange/importdoc';
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
        }
    ];
}
