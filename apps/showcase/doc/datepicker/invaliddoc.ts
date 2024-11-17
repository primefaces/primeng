import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-invalid-demo',
    template: `
        <app-docsectiontext>
            <p>Invalid state style is added using the <i>ng-invalid</i> and <i>ng-dirty</i> class to indicate a failed validation.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" class="ng-invalid ng-dirty" />
        </div>
        <app-code [code]="code" selector="datepicker-invalid-demo"></app-code>
    `
})
export class InvalidDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" class="ng-invalid ng-dirty" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" class="ng-invalid ng-dirty" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-invalid-demo',
    templateUrl: './datepicker-invalid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerInvalidDemo {
    date: Date | undefined;
}`
    };
}
