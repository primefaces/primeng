import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Code } from '@domain/code';

@Component({
    selector: 'reactive-forms-doc',
    template: `
        <app-docsectiontext>
            <p>CalendarSoftRange can also be used with reactive forms. In this case, the <i>formControlName</i> property is used to bind the component to a form control.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <form [formGroup]="formGroup">
                <p-calendarSoftRange formControlName="dates"></p-calendarSoftRange>
            </form>
        </div>
        <app-code [code]="code" selector="calendar-reactive-forms-demo"></app-code>
    `
})
export class ReactiveFormsDoc implements OnInit {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            dates: new FormControl<Date | null>(null)
        });
    }

    code: Code = {
        basic: `<form [formGroup]="formGroup">
    <p-calendarSoftRange formControlName="dates"></p-calendarSoftRange>
</form>`,

        html: `<div class="card flex justify-content-center">
    <form [formGroup]="formGroup">
        <p-calendarSoftRange formControlName="dates"></p-calendarSoftRange>
    </form>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-soft-range-reactive-forms-demo',
    templateUrl: './calendar-soft-range-reactive-forms-demo.html',
    standalone: true,
    imports: [ReactiveFormsModule, CalendarSoftRangeModule]
})
export class CalendarSoftRangeReactiveFormsDemo {
    formGroup: FormGroup | undefined;

    ngOnInit() {
        this.formGroup = new FormGroup({
            dates: new FormControl<Date | null>(null)
        });
    }
}`
    };
}
