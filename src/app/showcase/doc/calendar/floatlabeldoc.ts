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
                <p-calendar [(ngModel)]="date" inputId="birth_date"/>
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
    <p-calendar 
        [(ngModel)]="date" 
        inputId="birth_date"/>
    <label for="birth_date">Birth Date</label>
</span>`,

        html: `<div class="card flex justify-content-center">
    <span class="p-float-label">
        <p-calendar 
            [(ngModel)]="date" 
            inputId="birth_date"/>
        <label for="birth_date">Birth Date</label>
    </span>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-float-label-demo',
    templateUrl: './calendar-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarFloatLabelDemo {
    date: Date | undefined;
}`
    };
}
