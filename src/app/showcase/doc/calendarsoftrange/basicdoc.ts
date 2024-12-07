import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using the standard <i>ngModel</i> directive referencing to a <i>Dates</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendarSoftRange [(ngModel)]="dates"></p-calendarSoftRange>
        </div>
        <app-code [code]="code" selector="calendar-soft-range-basic-demo"></app-code>
    `
})
export class BasicDoc {

    dates: Date[] = [new Date(), new Date()];

    code: Code = {
        basic: `<p-calendarSoftRange [(ngModel)]="dates"></p-calendarSoftRange>`,

        html: `<div class="card flex justify-content-center">
    <p-calendarSoftRange [(ngModel)]="dates"></p-calendarSoftRange>
</div>`,

        typescript: `import { Component } from '@angular/core';
import {CalendarSoftRangeModule} from 'primeng/calendarsoftrange';

@Component({
    selector: 'calendar-soft-range-basic-demo',
    templateUrl: './calendar-soft-range-basic-demo.html',
    standalone: true,
    imports: [CalendarSoftRangeModule]
})
export class CalendarSoftRangeBasicDemo {

    dates: Date[] = [new Date(), new Date()];

}`
    };
}
