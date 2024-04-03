import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-filled-demo',
    template: `
        <app-docsectiontext>
            <p>Specify the <i>variant</i> property as <i>filled</i> to display the component with a higher visual emphasis than the default <i>outlined</i> style.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" variant="filled" />
        </div>
        <app-code [code]="code" selector="calendar-filled-demo"></app-code>
    `
})
export class FilledDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="date" 
    variant="filled" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="date" 
        variant="filled" />
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-filled-demo',
    templateUrl: './calendar-filled-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarFilledDemo {
    date: Date[] | undefined;
}`
    };
}
