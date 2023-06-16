import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'calendar-template-demo',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Calendar UI accepts custom content using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-calendar [(ngModel)]="date">
                <ng-template pTemplate="header">Header</ng-template>
                <ng-template pTemplate="footer">Footer</ng-template>
            </p-calendar>
        </div>
        <app-code [code]="code" selector="calendar-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    date: Date[] | undefined;

    code: Code = {
        basic: `
<p-calendar [(ngModel)]="date">
    <ng-template pTemplate="header">Header</ng-template>
    <ng-template pTemplate="footer">Footer</ng-template>
</p-calendar>`,

        html: `
<div class="card flex justify-content-center">
    <p-calendar [(ngModel)]="date">
        <ng-template pTemplate="header">Header</ng-template>
        <ng-template pTemplate="footer">Footer</ng-template>
    </p-calendar>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'calendar-template-demo',
    templateUrl: './calendar-template-demo.html'
})
export class CalendarTemplateDemo {
    date: Date[] | undefined;
}`
    };
}
