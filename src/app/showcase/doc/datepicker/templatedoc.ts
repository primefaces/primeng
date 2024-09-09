import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-template-demo',
    template: `
        <app-docsectiontext>
            <p>Calendar UI accepts custom content using <i>header</i> and <i>footer</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-date-picker [(ngModel)]="date">
                <ng-template pTemplate="header">Header</ng-template>
                <ng-template pTemplate="footer">Footer</ng-template>
            </p-date-picker>
        </div>
        <app-code [code]="code" selector="datepicker-template-demo"></app-code>
    `,
})
export class TemplateDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-date-picker [(ngModel)]="date">
    <ng-template pTemplate="header">Header</ng-template>
    <ng-template pTemplate="footer">Footer</ng-template>
</p-date-picker>`,

        html: `<div class="card flex justify-center">
    <p-date-picker [(ngModel)]="date">
        <ng-template pTemplate="header">Header</ng-template>
        <ng-template pTemplate="footer">Footer</ng-template>
    </p-date-picker>
</div>`,

        typescript: `import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-template-demo',
    templateUrl: './datepicker-template-demo.html'
})
export class DatePickerTemplateDemo {
    date: Date[] | undefined;
}`,
    };
}
