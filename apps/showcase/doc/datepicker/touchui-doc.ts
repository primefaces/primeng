import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'touchui-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>When <i>touchUI</i> is enabled, overlay is displayed as optimized for touch devices.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-datepicker [(ngModel)]="date" [touchUI]="true" [readonlyInput]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TouchUIDoc {
    date: Date[] | undefined;
}
