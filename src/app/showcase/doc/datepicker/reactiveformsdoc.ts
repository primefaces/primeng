import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>DatePicker can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-datePicker formControlName="date" />
            </form>
        </div>
        <app-code [code]="code" selector="datepicker-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            date: new FormControl<Date | null>(null)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-datePicker formControlName="date" />
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-datePicker formControlName="date" />
    </form>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-reactive-forms-demo',
    templateUrl: './datepicker-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, DatePickerModule]
})
export class DatePickerReactiveFormsDemo {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            date: new FormControl<Date | null>(null)
        });
    } 
}`
    };
}
