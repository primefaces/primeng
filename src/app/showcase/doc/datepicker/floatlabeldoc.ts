import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-float-label-demo',
    template: `
        <app-docsectiontext>
            <p>A floating label appears on top of the input field when focused. Visit <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-floatLabel>
                <p-datePicker [(ngModel)]="date" inputId="birth_date" />
                <label for="birth_date">Birth Date</label>
            </p-floatLabel>
        </div>
        <app-code [code]="code" selector="datepicker-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-floatLabel>
    <p-datePicker 
        [(ngModel)]="date" 
        inputId="birth_date" />
    <label for="birth_date">Birth Date</label>
</p-floatLabel>`,

        html: `<div class="card flex justify-center">
    <p-floatLabel>
        <p-datePicker 
            [(ngModel)]="date" 
            inputId="birth_date" />
        <label for="birth_date">Birth Date</label>
    </p-floatLabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'datepicker-float-label-demo',
    templateUrl: './datepicker-float-label-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, FloatLabelModule]
})
export class DatePickerFloatLabelDemo {
    date: Date | undefined;
}`
    };
}
