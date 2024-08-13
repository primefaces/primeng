import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-multiplemonths-demo',
    template: `
        <app-docsectiontext>
            <p>Number of months to display is configured with the <i>numberOfMonths</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date" [numberOfMonths]="2" />
        </div>
        <app-code [code]="code" selector="datepicker-multiplemonths-demo"></app-code>
    `
})
export class MultipleMonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    [numberOfMonths]="2" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        [(ngModel)]="date" 
        [numberOfMonths]="2" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-multiplemonths-demo',
    templateUrl: './datepicker-multiplemonths-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerMultiplemonthsDemo {
    date: Date[] | undefined;
}`
    };
}
