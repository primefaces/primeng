import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'datepicker-datetemplate-demo',
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside date cells with the <i>ng-template</i> property that takes a Date as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date">
                <ng-template pTemplate="date" let-date>
                    <strong *ngIf="date.day > 10 && date.day < 15; else elseBlock" style="text-decoration: line-through">{{ date.day }}</strong>
                    <ng-template #elseBlock>{{ date.day }}</ng-template>
                </ng-template>
            </p-datepicker>
        </div>
        <app-code [code]="code" selector="datepicker-datetemplate-demo"></app-code>
    `
})
export class DateTemplateDoc {
    date: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date">
    <ng-template pTemplate="date" let-date>
        <strong *ngIf="date.day > 10 && date.day < 15; else elseBlock" style="text-decoration: line-through">{{ date.day }}</strong>
        <ng-template #elseBlock>{{ date.day }}</ng-template>
    </ng-template>
</p-datepicker>`,

        html: `<div class="card flex justify-center">
   <p-datepicker [(ngModel)]="date">
        <ng-template pTemplate="date" let-date>
            <strong *ngIf="date.day > 10 && date.day < 15; else elseBlock" style="text-decoration: line-through">{{ date.day }}</strong>
            <ng-template #elseBlock>{{ date.day }}</ng-template>
        </ng-template>
    </p-datepicker>
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
