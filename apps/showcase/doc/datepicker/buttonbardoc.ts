import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-buttonbar-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showButtonBar</i> is present, today and clear buttons are displayed at the footer.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" [showButtonBar]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-buttonbar-demo"></app-code>
    `
})
export class ButtonBarDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [showButtonBar]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" [showButtonBar]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-buttonbar-demo',
    templateUrl: './datepicker-buttonbar-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerButtonbarDemo {
    date: Date[] | undefined;
}`
    };
}
