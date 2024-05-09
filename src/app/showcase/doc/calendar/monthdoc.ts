import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-month-demo',
    template: `
        <app-docsectiontext>
            <p>Month only picker is enabled by specifying <i>view</i> as <i>month</i> in addition to a suitable <i>dateFormat</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="calendar-month-demo"></app-code>
    `
})
export class MonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date" 
    view="month" 
    dateFormat="mm/yy" 
    [readonlyInput]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="date" 
        view="month" 
        dateFormat="mm/yy" 
        [readonlyInput]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-month-demo',
    templateUrl: './calendar-month-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarMonthDemo {
    date: Date[] | undefined;
}`
    };
}
