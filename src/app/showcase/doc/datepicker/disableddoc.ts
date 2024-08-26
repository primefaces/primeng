import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datePicker [(ngModel)]="date" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datePicker 
        [(ngModel)]="date" 
        [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-disabled-demo',
    templateUrl: './datepicker-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerDisabledDemo {
    date: Date | undefined;
}`
    };
}
