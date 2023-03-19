import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-multiplemonths-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Displaying multiple months is enabled by setting <i>numberOfMonths</i> property to a value greater than 1.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [numberOfMonths]="3"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-multiplemonths-demo"></app-code>
    </section>`
})
export class MultipleMonthDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[];

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" [numberOfMonths]="3"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" [numberOfMonths]="3"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core'

@Component({
    selector: 'calendar-multiplemonths-demo',
    templateUrl: './calendar-multiplemonths-demo.html'
})
export class CalendarMultiplemonthsDemo {
    date: Date[];
}`
    };
}
