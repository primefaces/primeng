import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'datepicker-filled-demo',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" variant="filled" />
        </div>
        <app-code [code]="code" selector="datepicker-filled-demo"></app-code>
    `
})
export class FilledDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" variant="filled" />`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" variant="filled" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-filled-demo',
    templateUrl: './datepicker-filled-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerFilledDemo {
    date: Date[] | undefined;
}`
    };
}
