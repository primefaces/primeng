import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, InputText, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputMask provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <input pInputText [(ngModel)]="value1" placeholder="Small" pSize="small" pInputMask="99-999999" />
            <input pInputText [(ngModel)]="value2" placeholder="Normal" pInputMask="99-999999" />
            <input pInputText [(ngModel)]="value3" placeholder="Large" pSize="large" pInputMask="99-999999" />
        </div>
        <app-code></app-code>
    `
})
export class SizesDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
