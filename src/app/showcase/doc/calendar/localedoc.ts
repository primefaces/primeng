import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-local-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Locale based settings such as labels, dateFormat and firstDayOfWeek are derived from the global Locale configuration. In case, a certain calendar needs to be customized, locale property can be used to override the global setting.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" dateFormat="dd.mm.yy" locale="es"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-local-demo"></app-code>
    </div>`
})
export class LocaleDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" dateFormat="dd.mm.yy"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" dateFormat="dd.mm.yy" locale="es"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-local-demo',
    templateUrl: './calendar-local-demo.html',
    styleUrls: ['./calendar-local-demo.scss']
})
export class CalendarLocalDemo {
    date: Date;
}`
    };
}
