import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-range-demo',
    template: `
        <app-docsectiontext>
            <p>A range of dates can be selected by defining <i>selectionMode</i> as <i>range</i>, in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-range-demo"></app-code>
    `
})

export class RangeDoc {
    rangeDates: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core'

@Component({
    selector: 'calendar-range-demo',
    templateUrl: './calendar-range-demo.html',
})
export class CalendarRangeDemo {
    rangeDates: Date[] | undefined;
}`
    };
}
