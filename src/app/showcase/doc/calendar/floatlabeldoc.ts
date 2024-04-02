import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-float-label-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <span class="p-float-label">
                <p-calendar [(ngModel)]="date" inputId="birth_date"></p-calendar>
                <label for="birth_date">Birth Date</label>
            </span>
        </div>
        <app-code [code]="code" selector="calendar-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<span class="p-float-label">
    <p-calendar [(ngModel)]="date" inputId="birth_date"></p-calendar>
    <label for="birth_date">Birth Date</label>
</span>`,

        html: `<div class="card flex justify-content-center">
    <span class="p-float-label">
    <p-calendar [(ngModel)]="date" inputId="birth_date"></p-calendar>
    <label for="birth_date">Birth Date</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-float-label-demo',
    templateUrl: './calendar-float-label-demo.html'
})
export class CalendarFloatLabelDemo {
    date: Date | undefined;
}`
    };
}
