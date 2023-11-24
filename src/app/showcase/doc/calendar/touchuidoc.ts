import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-touchui-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>touchUI</i> is enabled, overlay is displayed as optimized for touch devices.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-touchui-demo"></app-code>
    `
})
export class TouchUIDoc {
    date: Date[] | undefined;

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
    date: Date[] | undefined;
}`
    };
}
