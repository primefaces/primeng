import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-basic-demo',
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using the standard <i>ngModel</i> directive referencing to a <i>Date</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date" />
        </div>
        <app-code [code]="code" selector="calendar-basic-demo"></app-code>
    `
})
export class BasicDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-calendar [(ngModel)]="date" />`,

        html: `<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date" />
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'calendar-basic-demo',
    templateUrl: './calendar-basic-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarBasicDemo {
    date: Date | undefined;
}`
    };
}
