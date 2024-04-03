import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-multiple-demo',
    template: `
        <app-docsectiontext>
            <p>In order to choose multiple dates, set <i>selectionMode</i> as <i>multiple</i>. In this mode, the value binding should be an array.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true" />
        </div>
        <app-code [code]="code" selector="calendar-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    dates: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar 
    [(ngModel)]="dates" 
    selectionMode="multiple" 
    [readonlyInput]="true"/>`,

        html: `<div class="card flex justify-content-center">
    <p-calendar 
        [(ngModel)]="dates" 
        selectionMode="multiple" 
        [readonlyInput]="true"/>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-multiple-demo',
    templateUrl: './calendar-multiple-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarMultipleDemo {
    dates: Date[] | undefined;
}`
    };
}
