import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using the standard <i>ngModel</i> directive referencing to a <i>Date</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" />
        </div>
        <app-code [code]="code" selector="datepicker-basic-demo"></app-code>
    `
})
export class BasicDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'datepicker-basic-demo',
    templateUrl: './datepicker-basic-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerBasicDemo {
    date: Date | undefined;
}`
    };
}
