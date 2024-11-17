import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-disabled-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" [disabled]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-disabled-demo"></app-code>
    `
})
export class DisabledDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [disabled]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" [disabled]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-disabled-demo',
    templateUrl: './datepicker-disabled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerDisabledDemo {
    date: Date | undefined;
}`
    };
}
