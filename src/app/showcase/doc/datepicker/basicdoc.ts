import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using the standard <i>ngModel</i> directive referencing to a <i>Date</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datePicker [(ngModel)]="date" />
        </div>
        <app-code [code]="code" selector="datepicker-basic-demo"></app-code>
    `
})
export class BasicDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datePicker [(ngModel)]="date" />`,

        html: `<div class="card flex justify-center">
    <p-datePicker [(ngModel)]="date" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'datepicker-basic-demo',
    templateUrl: './datepicker-basic-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerBasicDemo {
    date: Date | undefined;
}`
    };
}
