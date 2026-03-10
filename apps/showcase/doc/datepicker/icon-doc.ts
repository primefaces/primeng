import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, FluidModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>An additional icon is displayed next to the input field when <i>showIcon</i> is present.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-fluid class="flex flex-wrap gap-4">
                <div class="flex-auto">
                    <label for="buttondisplay" class="text-sm font-bold block mb-2"> Button </label>
                    <p-datepicker [(ngModel)]="date1" [showIcon]="true" inputId="buttondisplay" [showOnFocus]="false" />
                </div>

                <div class="flex-auto">
                    <label for="icondisplay" class="text-sm font-bold block mb-2"> Default Icon </label>
                    <p-datepicker [(ngModel)]="date2" [iconDisplay]="'input'" [showIcon]="true" inputId="icondisplay" />
                </div>

                <div class="flex-auto">
                    <label for="templatedisplay" class="text-sm font-bold block mb-2"> Custom Icon </label>
                    <p-datepicker [(ngModel)]="date3" [iconDisplay]="'input'" [showIcon]="true" [timeOnly]="true" inputId="templatedisplay">
                        <ng-template #inputicon let-clickCallBack="clickCallBack">
                            <i class="pi pi-clock" (click)="clickCallBack($event)"></i>
                        </ng-template>
                    </p-datepicker>
                </div>
            </p-fluid>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IconDoc {
    date1: Date | undefined;

    date2: Date | undefined;

    date3: Date | undefined;
}
