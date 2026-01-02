import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'date-picker-float-label-demo',
    standalone: true,
    imports: [FormsModule, RouterModule, DatePickerModule, FloatLabelModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-datepicker [(ngModel)]="value1" inputId="over_label" showIcon iconDisplay="input" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-datepicker [(ngModel)]="value2" inputId="in_label" showIcon iconDisplay="input" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <p-datepicker [(ngModel)]="value3" inputId="on_label" showIcon iconDisplay="input" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code selector="date-picker-float-label-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value1: Date | undefined;

    value2: Date | undefined;

    value3: Date | undefined;
}
