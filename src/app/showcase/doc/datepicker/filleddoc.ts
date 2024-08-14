import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date" variant="filled" />
        </div>
        <app-code [code]="code" selector="datepicker-filled-demo"></app-code>
    `
})
export class FilledDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    variant="filled" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        [(ngModel)]="date" 
        variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-filled-demo',
    templateUrl: './datepicker-filled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerFilledDemo {
    date: Date[] | undefined;
}`
    };
}
