import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Text to display on a button is defined with the <i>label</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button label="Submit" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {}
