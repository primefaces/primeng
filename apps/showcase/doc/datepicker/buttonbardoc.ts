import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'datepicker-buttonbar-demo',
    standalone: true,
    imports: [FormsModule, DatePickerModule, ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>showButtonBar</i> is present, today and clear buttons are displayed at the footer. The content can be fully customized with the <i>buttonbar</i> template as well.</p>
        </app-docsectiontext>
        <div class="card flex justify-center gap-4 flex-wrap">
            <p-datepicker [(ngModel)]="date" [showButtonBar]="true" placeholder="Basic" />
            <p-datepicker [(ngModel)]="dates" [showButtonBar]="true" placeholder="Customized" selectionMode="range" [readonlyInput]="true">
                <ng-template #buttonbar let-todayCallback="todayCallback" let-clearCallback="clearCallback">
                    <div class="flex justify-between w-full">
                        <div class="flex gap-2">
                            <p-button size="small" label="Exact" severity="secondary" />
                            <p-button size="small" label="Flexible" severity="secondary" />
                        </div>
                        <div class="flex gap-2">
                            <p-button size="small" label="Today" (click)="todayCallback()" variant="outlined" />
                            <p-button size="small" icon="pi pi-times" severity="danger" variant="text" (click)="clearCallback()" />
                        </div>
                    </div>
                </ng-template>
            </p-datepicker>
        </div>
        <app-code [code]="code" selector="datepicker-buttonbar-demo"></app-code>
    `
})
export class ButtonBarDoc {
    date: Date | undefined;

    dates: Date[] | undefined;

    code: Code = {
        basic: `<p-datepicker [(ngModel)]="date" [showButtonBar]="true" placeholder="Basic" />
<p-datepicker [(ngModel)]="dates" [showButtonBar]="true" placeholder="Customized" selectionMode="range" [readonlyInput]="true">
    <ng-template #buttonbar let-todayCallback="todayCallback" let-clearCallback="clearCallback">
        <div class="flex justify-between w-full">
            <div class="flex gap-2">
                <p-button size="small" label="Exact" severity="secondary" />
                <p-button size="small" label="Flexible" severity="secondary" />
            </div>
            <div class="flex gap-2">
                <p-button size="small" label="Today" (click)="todayCallback()" variant="outlined" />
                <p-button size="small" icon="pi pi-times" severity="danger" variant="text" (click)="clearCallback()" />
            </div>
        </div>
    </ng-template>
</p-datepicker>`,

        html: `<div class="card flex justify-center gap-4 flex-wrap">
    <p-datepicker [(ngModel)]="date" [showButtonBar]="true" placeholder="Basic" />
    <p-datepicker [(ngModel)]="dates" [showButtonBar]="true" placeholder="Customized" selectionMode="range" [readonlyInput]="true">
        <ng-template #buttonbar let-todayCallback="todayCallback" let-clearCallback="clearCallback">
            <div class="flex justify-between w-full">
                <div class="flex gap-2">
                    <p-button size="small" label="Exact" severity="secondary" />
                    <p-button size="small" label="Flexible" severity="secondary" />
                </div>
                <div class="flex gap-2">
                    <p-button size="small" label="Today" (click)="todayCallback()" variant="outlined" />
                    <p-button size="small" icon="pi pi-times" severity="danger" variant="text" (click)="clearCallback()" />
                </div>
            </div>
        </ng-template>
    </p-datepicker>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'datepicker-buttonbar-demo',
    templateUrl: './datepicker-buttonbar-demo.html',
    standalone: true,
    imports: [FormsModule, DatePickerModule, ButtonModule]
})
export class DatePickerButtonbarDemo {
    date: Date | undefined;

    dates: Date[] | undefined;
}`
    };
}
