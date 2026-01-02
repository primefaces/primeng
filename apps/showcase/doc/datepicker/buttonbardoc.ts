import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'date-picker-buttonbar-demo',
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
                            <p-button size="small" label="Today" (click)="todayCallback($event)" variant="outlined" />
                            <p-button size="small" icon="pi pi-times" severity="danger" variant="text" (click)="clearCallback($event)" />
                        </div>
                    </div>
                </ng-template>
            </p-datepicker>
        </div>
        <app-code selector="date-picker-buttonbar-demo"></app-code>
    `
})
export class ButtonBarDoc {
    date: Date | undefined;

    dates: Date[] | undefined;
}
