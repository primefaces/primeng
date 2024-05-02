import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-year-demo',
    template: `
        <app-docsectiontext>
            <p>Specifying <i>view</i> as <i>year</i> in addition to a suitable <i>dateFormat</i> enables the year picker.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" view="year" dateFormat="yy" />
        </div>
        <app-code [code]="code" selector="calendar-year-demo"></app-code>
    `
})
export class YearDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date" 
    view="year" 
    dateFormat="yy" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="date" 
        view="year" 
        dateFormat="yy" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-year-demo',
    templateUrl: './calendar-year-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarYearDemo {
    date: Date[] | undefined;
}`
    };
}
