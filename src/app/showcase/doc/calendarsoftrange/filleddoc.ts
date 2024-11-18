import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-soft-range-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendarSoftRange
                [(ngModel)]="dates"
                variant="filled"></p-calendarSoftRange>
        </div>
        <app-code [code]="code" selector="calendar-soft-range-filled-demo"></app-code>
    `
})
export class FilledDoc {
    dates: Date[] = [new Date(), new Date()];

    code: Code = {
        basic: `<p-calendarSoftRange
    [(ngModel)]="dates"
    variant="filled"></p-calendarSoftRange>`,

        html: `<div class="card flex justify-content-center">
    <p-calendarSoftRange
        [(ngModel)]="dates"
        variant="filled"></p-calendarSoftRange>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-soft-range-filled-demo',
    templateUrl: './calendar-soft-range-filled-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarSoftRangeModule]
})
export class CalendarSoftRangeFilledDemo {
    dates: Date[] = [new Date(), new Date()];
}`
    };
}
