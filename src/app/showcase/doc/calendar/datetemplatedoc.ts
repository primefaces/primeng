import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-datetemplate-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
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
    </section>`
})
export class DateTemplateDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date">
    <ng-template pTemplate="date" let-date>
        <span [ngStyle]="{textDecoration: (date.day < 21 && date.day > 10) ? 'line-through' : 'inherit'}">{{date.day}}</span>
    </ng-template>
</p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date">
        <ng-template pTemplate="date" let-date>
            <span [ngStyle]="{ textDecoration: date.day < 21 && date.day > 10 ? 'line-through' : 'inherit' }">{{ date.day }}</span>
        </ng-template>
    </p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-datetemplate-demo',
    templateUrl: './calendar-datetemplate-demo.html'
})
export class CalendarDatetemplateDemo {
    date: Date[] | undefined;
}`
    };
}
