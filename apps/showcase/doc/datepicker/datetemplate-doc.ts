import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'date-template-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside date cells with the <i>ng-template</i> property that takes a Date as a parameter.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-datepicker [(ngModel)]="date">
                    <ng-template #date let-date>
                        @if (date.day > 10 && date.day < 15) {
                            <strong style="text-decoration: line-through">{{ date.day }}</strong>
                        } @else {
                            {{ date.day }}
                        }
                    </ng-template>
                </p-datepicker>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DateTemplateDoc {
    date: Date[] | undefined;
}
