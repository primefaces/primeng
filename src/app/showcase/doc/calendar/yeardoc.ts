import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-year-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Similar to the month picker, year picker can be used to select years only. Set <i>view</i> to <i>year</i> to display the year picker.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" view="year" dateFormat="yy" inputId="yearpicker"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-year-demo"></app-code>
    </section>`
})
export class YearDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" view="year" dateFormat="yy" inputId="yearpicker"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" view="year" dateFormat="yy" inputId="yearpicker"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core'

@Component({
    selector: 'calendar-year-demo',
    templateUrl: './calendar-year-demo.html'
})
export class CalendarYearDemo {
    date: Date[] | undefined;
}`
    };
}
