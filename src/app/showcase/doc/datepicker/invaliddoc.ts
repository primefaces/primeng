import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-invalid-demo',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="datepicker-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        [(ngModel)]="date" 
        class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-invalid-demo',
    templateUrl: './datepicker-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerInvalidDemo {
    date: Date | undefined;
}`
    };
}
