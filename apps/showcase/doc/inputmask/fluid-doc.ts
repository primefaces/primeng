import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'fluid-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, InputText, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The fluid prop makes the component take up the full width of its container when set to true.</p>
        </app-docsectiontext>
        <div class="card">
            <input pInputText pInputMask="99-999999" [(ngModel)]="value" placeholder="99-999999" fluid />
        </div>
        <app-code></app-code>
    `
})
export class FluidDoc {
    value: string | undefined;
}
