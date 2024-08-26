import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-month-demo',
    template: `
        <app-docsectiontext>
            <p>Month only picker is enabled by specifying <i>view</i> as <i>month</i> in addition to a suitable <i>dateFormat</i>.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datePicker [(ngModel)]="date" view="month" dateFormat="mm/yy" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-month-demo"></app-code>
    `
})
export class MonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    view="month" 
    dateFormat="mm/yy" 
    [readonlyInput]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datePicker 
        [(ngModel)]="date" 
        view="month" 
        dateFormat="mm/yy" 
        [readonlyInput]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-month-demo',
    templateUrl: './datepicker-month-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerMonthDemo {
    date: Date[] | undefined;
}`
    };
}
