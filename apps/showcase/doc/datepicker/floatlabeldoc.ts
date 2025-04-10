import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-float-label-demo',
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
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
        </div>
        <app-code [code]="code" selector="datepicker-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;

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
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: 'datepicker-float-label-demo',
    templateUrl: './datepicker-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker, FloatLabel]
})
export class DatePickerFloatLabelDemo {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;
}`
    };
}
