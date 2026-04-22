import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'slotchar-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Default placeholder for a mask is underscore that can be customized using <i>slotChar</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask [(ngModel)]="value" mask="99/99/9999" placeholder="99/99/9999" slotChar="mm/dd/yyyy" />
        </div>
        <app-code></app-code>
    `
})
export class SlotCharDoc {
    value: string | undefined;
}
