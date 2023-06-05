import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-touchui-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>When <i>touchUI</i> is enabled, overlay is displayed as optimized for touch devices.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-touchui-demo"></app-code>
    </section>`
})
export class TouchUIDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[];

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core'

@Component({
    selector: 'calendar-touchui-demo',
    templateUrl: './calendar-touchui-demo.html'
})
export class CalendarTouchuiDemo {
    date: Date[];
}`
    };
}
