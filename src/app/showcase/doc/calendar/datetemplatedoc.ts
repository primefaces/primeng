import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'calendar-datetemplate-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside date cells with the <i>ng-template</i> property that takes a Date as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date">
                <ng-template pTemplate="date" let-date>
                    <span [ngStyle]="{ textDecoration: date.day < 21 && date.day > 10 ? 'line-through' : 'inherit' }">{{ date.day }}</span>
                </ng-template>
            </p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-datetemplate-demo"></app-code>
    `
})
export class DateTemplateDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-calendar [(ngModel)]="date">
    <ng-template pTemplate="date" let-date>
        <span [ngStyle]="{textDecoration: (date.day < 21 && date.day > 10) ? 'line-through' : 'inherit'}">{{date.day}}</span>
    </ng-template>
</p-calendar>`,

        html: `<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date">
        <ng-template pTemplate="date" let-date>
            <span [ngStyle]="{ textDecoration: date.day < 21 && date.day > 10 ? 'line-through' : 'inherit' }">{{ date.day }}</span>
        </ng-template>
    </p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'calendar-datetemplate-demo',
    templateUrl: './calendar-datetemplate-demo.html',
    standalone: true,
    imports: [FormsModule, CalendarModule]
})
export class CalendarDatetemplateDemo {
    date: Date[] | undefined;
}`
    };
}
