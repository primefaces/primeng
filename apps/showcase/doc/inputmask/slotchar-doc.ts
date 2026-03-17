import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'slot-char-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, InputText, AppCodeModule, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Default placeholder for a mask is underscore that can be customized using <i>slotChar</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <input pInputText [(ngModel)]="value" pInputMask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SlotCharDoc {
    value: string | undefined;
}
