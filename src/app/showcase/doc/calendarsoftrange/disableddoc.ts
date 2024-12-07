import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendarSoftRange
                [(ngModel)]="dates"
                [disabled]="true" />
        </div>
        <app-code [code]="code" selector="calendar-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    dates: Date[] = [new Date(), new Date()];

    code: Code = {
        basic: `<p-calendarSoftRange
    [(ngModel)]="dates"
    [disabled]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendarSoftRange
        [(ngModel)]="dates"
        [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-soft-range-disabled-demo',
    templateUrl: './calendar-soft-range-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarSoftRangeModule]
})
export class CalendarDisabledDemo {
    dates: Date[] = [new Date(), new Date()];
}`
    };
}
