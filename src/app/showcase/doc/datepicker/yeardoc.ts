import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-year-demo',
    template: `
        <app-docsectiontext>
            <p>Specifying <i>view</i> as <i>year</i> in addition to a suitable <i>dateFormat</i> enables the year picker.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date" view="year" dateFormat="yy" />
        </div>
        <app-code [code]="code" selector="datepicker-year-demo"></app-code>
    `
})
export class YearDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    view="year" 
    dateFormat="yy" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        [(ngModel)]="date" 
        view="year" 
        dateFormat="yy" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-year-demo',
    templateUrl: './datepicker-year-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerYearDemo {
    date: Date[] | undefined;
}`
    };
}
