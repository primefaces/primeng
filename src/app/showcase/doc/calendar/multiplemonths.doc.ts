import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-multiplemonths-demo',
    template: `
        <app-docsectiontext>
            <p>Number of months to display is configured with the <i>numberOfMonths</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [numberOfMonths]="2"/>
        </div>
        <app-code [code]="code" selector="calendar-multiplemonths-demo"></app-code>
    `
})
export class MultipleMonthDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date" 
    [numberOfMonths]="2" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="date" 
        [numberOfMonths]="2" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-multiplemonths-demo',
    templateUrl: './calendar-multiplemonths-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarMultiplemonthsDemo {
    date: Date[] | undefined;
}`
    };
}
