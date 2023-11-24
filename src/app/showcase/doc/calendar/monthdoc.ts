import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-month-demo',
    template: `
        <app-docsectiontext>
            <p>Month only picker is enabled by specifying <i>view</i> as <i>month</i> in addition to a suitable <i>dateFormat</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-month-demo"></app-code>
    `
})
export class MonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-month-demo',
    templateUrl: './calendar-month-demo.html'
})
export class CalendarMonthDemo {
    date: Date[] | undefined;
}`
    };
}
