import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-ifta-label-demo',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <p-datepicker [(ngModel)]="value" inputId="date" showIcon iconDisplay="input" />
                <label for="date">Date</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="datepicker-ifta-label-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: Date | undefined;

    code: Code = {
        basic: `<p-iftalabel>
    <p-datepicker [(ngModel)]="value" inputId="date" showIcon iconDisplay="input" />
    <label for="date">Date</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <p-datepicker [(ngModel)]="value" inputId="date" showIcon iconDisplay="input" />
        <label for="date">Date</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: 'datepicker-ifta-label-demo',
    templateUrl: './datepicker-ifta-label-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, IftaLabelModule]
})
export class DatepickerIftaLabelDemo {
    value: Date | undefined;
}`
    };
}
