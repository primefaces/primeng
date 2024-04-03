import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-buttonbar-demo',
    template: `
        <app-docsectiontext>
            <p>When <i>showButtonBar</i> is present, today and clear buttons are displayed at the footer.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" [showButtonBar]="true"/>
        </div>
        <app-code [code]="code" selector="calendar-buttonbar-demo"></app-code>
    `
})
export class ButtonBarDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date" 
    [showButtonBar]="true"/>`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="date" 
        [showButtonBar]="true"/>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-buttonbar-demo',
    templateUrl: './calendar-buttonbar-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarButtonbarDemo {
    date: Date[] | undefined;
}`
    };
}
