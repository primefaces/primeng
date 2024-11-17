import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-time-demo',
    template: `
        <app-docsectiontext>
            <p>A time picker is displayed when <i>showTime</i> is enabled where 12/24 hour format is configured with <i>hourFormat</i> property. In case, only time needs to be selected, add <i>timeOnly</i> to hide the date section.</p>
        </app-docsectiontext>

        <p-fluid class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label for="calendar-12h" class="font-bold block mb-2"> 12h Format </label>
                <p-datepicker inputId="calendar-12h" [(ngModel)]="datetime12h" [showTime]="true" [hourFormat]="12" />
            </div>
            <div class="flex-auto">
                <label for="calendar-24h" class="font-bold block mb-2"> 24h Format </label>
                <p-datepicker inputId="calendar-24h" [(ngModel)]="datetime24h" [showTime]="true" [hourFormat]="24" />
            </div>
            <div class="flex-auto">
                <label for="calendar-timeonly" class="font-bold block mb-2"> Time Only </label>
                <p-datepicker inputId="calendar-timeonly" [(ngModel)]="time" [timeOnly]="true" />
            </div>
        </p-fluid>

        <app-code [code]="code" selector="datepicker-time-demo"></app-code>
    `
})
export class TimeDoc {
    datetime12h: Date[] | undefined;

    datetime24h: Date[] | undefined;

    time: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker inputId="calendar-12h" [(ngModel)]="datetime12h" [showTime]="true" [hourFormat]="12" />

<p-datepicker inputId="calendar-24h" [(ngModel)]="datetime24h" [showTime]="true" [hourFormat]="24" />

<p-datepicker inputId="calendar-timeonly" [(ngModel)]="time" [timeOnly]="true" />`,

        html: `<p-fluid class="card flex flex-wrap gap-4">
    <div class="flex-auto">
        <label for="calendar-12h" class="font-bold block mb-2"> 12h Format </label>
        <p-datepicker inputId="calendar-12h" [(ngModel)]="datetime12h" [showTime]="true" [hourFormat]="12" />
    </div>
    <div class="flex-auto">
        <label for="calendar-24h" class="font-bold block mb-2"> 24h Format </label>
        <p-datepicker inputId="calendar-24h" [(ngModel)]="datetime24h" [showTime]="true" [hourFormat]="24" />
    </div>
    <div class="flex-auto">
        <label for="calendar-timeonly" class="font-bold block mb-2"> Time Only </label>
        <p-datepicker inputId="calendar-timeonly" [(ngModel)]="time" [timeOnly]="true" />
    </div>
</p-fluid>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'datepicker-time-demo',
    templateUrl: './datepicker-time-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker, Fluid]
})
export class DatePickerTimeDemo {

    datetime12h: Date[] | undefined;

    datetime24h: Date[] | undefined;

    time: Date[] | undefined;
}`
    };
}
