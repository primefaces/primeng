import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-range-demo',
    template: `
        <app-docsectiontext>
            <p>A range of dates can be selected by defining <i>selectionMode</i> as <i>range</i>, in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datePicker [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-range-demo"></app-code>
    `
})
export class RangeDoc {
    rangeDates: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="rangeDates" 
    selectionMode="range" 
    [readonlyInput]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datePicker 
        [(ngModel)]="rangeDates" 
        selectionMode="range" 
        [readonlyInput]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-range-demo',
    templateUrl: './datepicker-range-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerRangeDemo {
    rangeDates: Date[] | undefined;
}`
    };
}
