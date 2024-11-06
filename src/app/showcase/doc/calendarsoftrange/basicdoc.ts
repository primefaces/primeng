import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>// TODO Basic api</p>
        </app-docsectiontext>
        <div class="card">
            {{date[0].toLocaleDateString()}} - {{date[1].toLocaleDateString()}}
            <p-calendarSoftRange [(ngModel)]="date"></p-calendarSoftRange>
        </div>
        <app-code [code]="code" selector="calendar-soft-range-basic-demo"></app-code>
    `
})
export class BasicDoc {

    date: Date[] = [new Date(2024, 0, 1), new Date(2024, 0, 1)];

    code: Code = {
        basic: `<p-calendarSoftRange></p-calendarSoftRange>`,

        html: `<div class="card">
    <p-calendarSoftRange></p-calendarSoftRange>
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

}`
    };
}
