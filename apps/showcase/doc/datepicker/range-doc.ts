import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'range-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A range of dates can be selected by defining <i>selectionMode</i> as <i>range</i>, in this case the bound value would be an array with two values where first date is the start of the range and second date is the end.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-datepicker [(ngModel)]="rangeDates" selectionMode="range" [readonlyInput]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class RangeDoc {
    rangeDates: Date[] | undefined;
}
