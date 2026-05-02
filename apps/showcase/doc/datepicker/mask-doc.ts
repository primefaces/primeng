import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'mask-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, InputMaskModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>DatePicker can be used with the <i>pInputMask</i> directive to enforce a specific input format.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-datepicker [(ngModel)]="date" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" pInputMask="99/99/9999" />
        </div>
        <app-code></app-code>
    `
})
export class MaskDoc {
    date: Date | undefined;
}
