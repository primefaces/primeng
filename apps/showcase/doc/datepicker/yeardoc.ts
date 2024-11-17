import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-year-demo',
    template: `
        <app-docsectiontext>
            <p>Specifying <i>view</i> as <i>year</i> in addition to a suitable <i>dateFormat</i> enables the year picker.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" view="year" dateFormat="yy" />
        </div>
        <app-code [code]="code" selector="datepicker-year-demo"></app-code>
    `
})
export class YearDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" view="year" dateFormat="yy" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" view="year" dateFormat="yy" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-year-demo',
    templateUrl: './datepicker-year-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerYearDemo {
    date: Date[] | undefined;
}`
    };
}
