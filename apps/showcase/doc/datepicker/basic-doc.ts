import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Two-way value binding is defined using the standard <i>ngModel</i> directive referencing to a <i>Date</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {
    date: Date | undefined;
}
