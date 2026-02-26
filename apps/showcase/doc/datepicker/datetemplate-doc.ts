import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'datetemplate-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Custom content can be placed inside date cells with the <i>ng-template</i> property that takes a Date as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
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
    `
})
export class DateTemplateDoc {
    date: Date[] | undefined;
}
