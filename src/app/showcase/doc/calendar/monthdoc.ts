import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-month-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Month only picker is enabled by specifying <i>view</i> as <i>month</i> in addition to a suitable <i>dateFormat</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-month-demo"></app-code>
    </section>`
})
export class MonthDoc {
    @Input() id: string;

    @Input() title: string;

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
