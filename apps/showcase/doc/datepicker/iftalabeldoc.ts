import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-ifta-label-demo',
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
        basic: `<p-floatlabel>
    <p-datepicker [(ngModel)]="value1" inputId="over_label" showIcon iconDisplay="input" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-datepicker [(ngModel)]="value2" inputId="in_label" showIcon iconDisplay="input" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-datepicker [(ngModel)]="value3" inputId="on_label" showIcon iconDisplay="input" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel>
        <p-datepicker [(ngModel)]="value1" inputId="over_label" showIcon iconDisplay="input" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <p-datepicker [(ngModel)]="value2" inputId="in_label" showIcon iconDisplay="input" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <p-datepicker [(ngModel)]="value3" inputId="on_label" showIcon iconDisplay="input" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
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
export class DatePickerIftaLabelDemo {
    value: Date | undefined;
}`
    };
}
