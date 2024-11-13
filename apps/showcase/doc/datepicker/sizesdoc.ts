import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-sizes-demo',
    template: `
        <app-docsectiontext>
            <p>DatePicker provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-datepicker [(ngModel)]="value1" size="small" placeholder="Small" showIcon iconDisplay="input" />
            <p-datepicker [(ngModel)]="value2" placeholder="Normal" showIcon iconDisplay="input" />
            <p-datepicker [(ngModel)]="value3" size="large" placeholder="Large" showIcon iconDisplay="input" />
        </div>
        <app-code [code]="code" selector="datepicker-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="value1" size="small" placeholder="Small" showIcon iconDisplay="input" />
<p-datepicker [(ngModel)]="value2" placeholder="Normal" showIcon iconDisplay="input" />
<p-datepicker [(ngModel)]="value3" size="large" placeholder="Large" showIcon iconDisplay="input" />`,

        html: `<div class="card flex flex-col items-center gap-4">
    <p-datepicker [(ngModel)]="value1" size="small" placeholder="Small" showIcon iconDisplay="input" />
    <p-datepicker [(ngModel)]="value2" placeholder="Normal" showIcon iconDisplay="input" />
    <p-datepicker [(ngModel)]="value3" size="large" placeholder="Large" showIcon iconDisplay="input" />
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
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;
}`
    };
}
