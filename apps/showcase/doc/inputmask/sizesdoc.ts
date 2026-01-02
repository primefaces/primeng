import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'sizes-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputMask provides <i>small</i> and <i>large</i> sizes as alternatives to the base.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <p-inputmask [(ngModel)]="value1" placeholder="Small" size="small" mask="99-999999" />
            <p-inputmask [(ngModel)]="value2" placeholder="Normal" mask="99-999999" />
            <p-inputmask [(ngModel)]="value3" placeholder="Large" size="large" mask="99-999999" />
        </div>
        <app-code selector="input-mask-sizes-demo"></app-code>
    `
})
export class SizesDoc {
    value1: string | undefined;

    value2: string | undefined;

    value3: string | undefined;
}
