import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'invalid-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, InputText, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>The invalid state is applied using the <i>⁠invalid</i> property to indicate failed validation, which can be integrated with Angular Forms.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center gap-4">
            <input pInputText [(ngModel)]="value1" pInputMask="99-999999" placeholder="Serial Key" [invalid]="!value1" />
            <input pInputText [(ngModel)]="value2" pInputMask="99-999999" placeholder="Serial Key" [invalid]="!value2" variant="filled" />
        </div>

        <app-code></app-code>
    `
})
export class InvalidDoc {
    value1: string | undefined;

    value2: string | undefined;
}
