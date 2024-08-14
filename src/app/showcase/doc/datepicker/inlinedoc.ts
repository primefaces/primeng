import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-inline-demo',
    template: `
        <app-docsectiontext>
            <p>DatePicker is displayed as a popup by default, add <i>inline</i> property to customize this behavior.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker class="max-w-full" [(ngModel)]="date" [inline]="true" [showWeek]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-inline-demo"></app-code>
    `
})
export class InlineDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    class="max-w-full" 
    [(ngModel)]="date" 
    [inline]="true" 
    [showWeek]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        class="max-w-full" 
        [(ngModel)]="date" 
        [inline]="true" 
        [showWeek]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-inline-demo',
    templateUrl: './datepicker-inline-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerInlineDemo {
    date: Date[] | undefined;
}`
    };
}
