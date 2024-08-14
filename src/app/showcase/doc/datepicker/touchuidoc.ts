import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-touchui-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>touchUI</i> is enabled, overlay is displayed as optimized for touch devices.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-touchui-demo"></app-code>
    `
})
export class TouchUIDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    [touchUI]="true" 
    [readonlyInput]="true" />`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker 
        [(ngModel)]="date" 
        [touchUI]="true"
        [readonlyInput]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-touchui-demo',
    templateUrl: './datepicker-touchui-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerTouchuiDemo {
    date: Date[] | undefined;
}`
    };
}
