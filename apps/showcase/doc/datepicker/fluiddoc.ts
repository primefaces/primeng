import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'datepicker-fluid-demo',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <p-datepicker [(ngModel)]="date" fluid />
        </div>
        <app-code [code]="code" selector="datepicker-fluid-demo"></app-code>
    `
})
export class FluidDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" fluid />`,

        html: `<div class="card">
    <p-datepicker [(ngModel)]="date" fluid />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'datepicker-fluid-demo',
    templateUrl: './datepicker-fluid-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerFluidDemo {
    date: Date | undefined;
}`
    };
}
