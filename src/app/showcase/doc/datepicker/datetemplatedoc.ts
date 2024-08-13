import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'datepicker-datetemplate-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside date cells with the <i>ng-template</i> property that takes a Date as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-datePicker [(ngModel)]="date">
                <ng-template pTemplate="date" let-date>
                    <span [ngStyle]="{ textDecoration: date.day < 21 && date.day > 10 ? 'line-through' : 'inherit' }">{{ date.day }}</span>
                </ng-template>
            </p-datePicker>
        </div>
        <app-code [code]="code" selector="datepicker-datetemplate-demo"></app-code>
    `
})
export class DateTemplateDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datePicker [(ngModel)]="date">
    <ng-template pTemplate="date" let-date>
        <span [ngStyle]="{textDecoration: (date.day < 21 && date.day > 10) ? 'line-through' : 'inherit'}">
            {{date.day}}
        </span>
    </ng-template>
</p-datePicker>`,

        html: `<div class="card flex justify-content-center">
    <p-datePicker [(ngModel)]="date">
        <ng-template pTemplate="date" let-date>
            <span [ngStyle]="{ textDecoration: date.day < 21 && date.day > 10 ? 'line-through' : 'inherit' }">
                {{ date.day }}
            </span>
        </ng-template>
    </p-datePicker>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datepicker-datetemplate-demo',
    templateUrl: './datepicker-datetemplate-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule]
})
export class DatePickerDatetemplateDemo {
    date: Date[] | undefined;
}`
    };
}
