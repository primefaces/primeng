import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [disabled]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-calendar [(ngModel)]="date" [disabled]="true"></p-calendar>`,

        html: `<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" [disabled]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-disabled-demo',
    templateUrl: './calendar-disabled-demo.html'
})
export class CalendarDisabledDemo {
    date: Date | undefined;
}`
    };
}
