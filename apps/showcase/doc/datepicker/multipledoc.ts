import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-multiple-demo',
    template: `
        <app-docsectiontext>
            <p>In order to choose multiple dates, set <i>selectionMode</i> as <i>multiple</i>. In this mode, the value binding should be an array.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    dates: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-multiple-demo',
    templateUrl: './datepicker-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerMultipleDemo {
    dates: Date[] | undefined;
}`
    };
}
