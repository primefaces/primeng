import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-time-demo',
    template: `
        <app-docsectiontext>
            <p>TimePicker is enabled with <i>showTime</i> property and 24 (default) or 12 hour mode is configured using <i>hourFormat</i> option.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [minDate]="minDate" [showTime]="true" [hourFormat]="12" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-time-demo"></app-code>
    `
})
export class TimeDoc {
    date: Date[] | undefined;

    
  minDate: Date | undefined;

  maxDate: Date | undefined;
    
  ngOnInit() {
    this.minDate = new Date();
    this.minDate.setHours(17);
    this.minDate.setDate(this.minDate.getDate() - 1);
  }

    code: Code = {
        basic: `<p-calendar [(ngModel)]="date" [showTime]="true" [showSeconds]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" [showTime]="true" [showSeconds]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core'

@Component({
    selector: 'calendar-time-demo',
    templateUrl: './calendar-time-demo.html'
})
export class CalendarTimeDemo {
    date: Date[] | undefined;
}`
    };
}
