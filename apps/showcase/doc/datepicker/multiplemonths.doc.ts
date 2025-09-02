import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'date-picker-multiplemonths-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Number of months to display is configured with the <i>numberOfMonths</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" [numberOfMonths]="2" />
        </div>
        <app-code [code]="code" selector="date-picker-multiplemonths-demo"></app-code>
    `
})
export class MultipleMonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [numberOfMonths]="2" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" [numberOfMonths]="2" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-multiplemonths-demo',
    templateUrl: './date-picker-multiplemonths-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMultiplemonthsDemo {
    date: Date[] | undefined;
}`
    };
}
