import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-clear-icon-demo',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showClear</i> is enabled, a clear icon is displayed to clear the value.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" [showClear]="true" inputStyleClass="w-56" />
        </div>
        <app-code [code]="code" selector="datepicker-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [showClear]="true" inputStyleClass="w-56" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" [showClear]="true" inputStyleClass="w-56" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'datepicker-clear-icon-demo',
    templateUrl: './datepicker-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerClearIconDemo {
    date: Date | undefined;
}`
    };
}
