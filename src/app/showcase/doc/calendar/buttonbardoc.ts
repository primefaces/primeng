import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-buttonbar-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>showButtonBar</i> is present, today and clear buttons are displayed at the footer.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [showButtonBar]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-buttonbar-demo"></app-code>
    </section>`
})
export class ButtonBarDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" [showButtonBar]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" [showButtonBar]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-buttonbar-demo',
    templateUrl: './calendar-buttonbar-demo.html'
})
export class CalendarButtonbarDemo {
    date: Date[] | undefined;
}`
    };
}
