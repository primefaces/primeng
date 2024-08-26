import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-minmax-demo',
    template: `
        <app-docsectiontext>
            <p>Boundaries for the permitted dates that can be entered are defined with <i>minDate</i> and <i>maxDate</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datePicker [(ngModel)]="date" [minDate]="minDate" [maxDate]="maxDate" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="datepicker-minmax-demo"></app-code>
    `
})
export class MinMaxDoc {
    date: Date | undefined;

    minDate: Date | undefined;

    maxDate: Date | undefined;

    ngOnInit() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = month === 0 ? 11 : month - 1;
        let prevYear = prevMonth === 11 ? year - 1 : year;
        let nextMonth = month === 11 ? 0 : month + 1;
        let nextYear = nextMonth === 0 ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    }

    code: Code = {
        basic: `<p-datePicker 
    [(ngModel)]="date" 
    [minDate]="minDate" 
    [maxDate]="maxDate" 
    [readonlyInput]="true" />`,

        html: `<div class="card flex justify-center">
    <p-datePicker 
        [(ngModel)]="date" 
        [minDate]="minDate" 
        [maxDate]="maxDate" 
        [readonlyInput]="true" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-minmax-demo',
    templateUrl: './datepicker-minmax-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerMinmaxDemo implements OnInit {
    date: Date | undefined;

    minDate: Date | undefined;

    maxDate: Date | undefined;

    ngOnInit() {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    }
}`
    };
}
