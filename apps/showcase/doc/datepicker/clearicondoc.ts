import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'datepicker-clear-icon-demo',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The <i>clearIcon</i> template allows you to customize the icon used to clear the input field.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" [showClear]="true">
                <ng-template #clearicon>
                    <i class="pi pi-times"></i>
                </ng-template>
            </p-datepicker>
        </div>
        <app-code [code]="code" selector="datepicker-clear-icon-demo"></app-code>
    `
})
export class ClearIconDoc {
    date: Date | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [showClear]="true">
    <ng-template #clearicon>
        <i class="pi pi-times"></i>
    </ng-template>
</p-datepicker>`,

        html: `<div class="card flex justify-center">
    <p-datepicker [(ngModel)]="date" [showClear]="true">
        <ng-template #clearicon>
            <i class="pi pi-times"></i>
        </ng-template>
    </p-datepicker>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'datepicker-clear-icon-demo',
    templateUrl: './datepicker-clear-icon-demo.html',
    standalone: true,
    imports: [FormsModule, DatePicker]
})
export class DatePickerClearIconDemo {
    date: Date | undefined;
}`
    };
}
