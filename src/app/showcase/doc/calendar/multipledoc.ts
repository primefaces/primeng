import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-multiple-demo',
    template: `
        <app-docsectiontext>
            <p>In order to choose multiple dates, set <i>selectionMode</i> as <i>multiple</i>. In this mode, the value binding should be an array.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true"></p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-multiple-demo"></app-code>
    `
})
export class MultipleDoc {
    dates: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true"></p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="dates" selectionMode="multiple" [readonlyInput]="true"></p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-multiple-demo',
    templateUrl: './calendar-multiple-demo.html'
})
export class CalendarMultipleDemo {
    dates: Date[] | undefined;
}`
    };
}
