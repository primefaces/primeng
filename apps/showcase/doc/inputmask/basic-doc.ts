import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [FormsModule, InputMaskModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>InputMask is used as a controlled input with <i>ngModel</i> properties.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-inputmask mask="99-999999" [(ngModel)]="value" placeholder="99-999999" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {
    value: string | undefined;
}
