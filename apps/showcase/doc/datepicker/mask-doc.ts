import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'mask-doc',
    standalone: true,
    imports: [FormsModule, DatePickerModule, InputMaskModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>DatePicker can be used with the <i>pInputMask</i> directive to enforce a specific input format.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-datepicker [(ngModel)]="date" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" pInputMask="99/99/9999" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class MaskDoc {
    date: Date | undefined;
}
