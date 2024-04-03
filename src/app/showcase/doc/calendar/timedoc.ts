import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-time-demo',
    template: `
        <app-docsectiontext>
            <p>A time picker is displayed when <i>showTime</i> is enabled where 12/24 hour format is configured with <i>hourFormat</i> property. In case, only time needs to be selected, add <i>timeOnly</i> to hide the date section.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 p-fluid">
            <div class="flex-auto">
                <label for="calendar-12h" class="font-bold block mb-2"> 12h Format </label>
                <p-calendar inputId="calendar-12h" [(ngModel)]="datetime12h" [showTime]="true" [hourFormat]="12" />
            </div>
            <div class="flex-auto">
                <label for="calendar-24h" class="font-bold block mb-2"> 24h Format </label>
                <p-calendar inputId="calendar-24h" [(ngModel)]="datetime24h" [showTime]="true" [hourFormat]="24" />
            </div>
            <div class="flex-auto">
                <label for="calendar-timeonly" class="font-bold block mb-2"> Time Only </label>
                <p-calendar inputId="calendar-timeonly" [(ngModel)]="time" [timeOnly]="true" />
            </div>
        </div>
        <app-code [code]="code" selector="calendar-time-demo"></app-code>
    `
})
export class TimeDoc {
    datetime12h: Date[] | undefined;

    datetime24h: Date[] | undefined;

    time: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    inputId="calendar-12h" 
    [(ngModel)]="datetime12h" 
    [showTime]="true" 
    [hourFormat]="12"/>
<p-calendar 
    inputId="calendar-24h" 
    [(ngModel)]="datetime24h" 
    [showTime]="true" 
    [hourFormat]="24"/>
<p-calendar 
    inputId="calendar-timeonly" 
    [(ngModel)]="time" 
    [timeOnly]="true"/>`,

        html: `<div class="card flex flex-wrap gap-3 p-fluid">
    <div class="flex-auto">
        <label for="calendar-12h" class="font-bold block mb-2"> 12h Format </label>
        <p-calendar 
            inputId="calendar-12h" 
            [(ngModel)]="datetime12h" 
            [showTime]="true" 
            [hourFormat]="12"/>
    </div>
    <div class="flex-auto">
        <label for="calendar-24h" class="font-bold block mb-2"> 24h Format </label>
        <p-calendar 
            inputId="calendar-24h" 
            [(ngModel)]="datetime24h" 
            [showTime]="true" 
            [hourFormat]="24"/>
    </div>
    <div class="flex-auto">
        <label for="calendar-timeonly" class="font-bold block mb-2"> Time Only </label>
        <p-calendar 
            inputId="calendar-timeonly" 
            [(ngModel)]="time" 
            [timeOnly]="true" />
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-time-demo',
    templateUrl: './calendar-time-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarTimeDemo {

    datetime12h: Date[] | undefined;

    datetime24h: Date[] | undefined;

    time: Date[] | undefined;
}`
    };
}
