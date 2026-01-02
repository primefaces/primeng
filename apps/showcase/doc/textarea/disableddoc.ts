import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'disabled-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>When <i>disabled</i> is present, the element cannot be edited and focused.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [disabled]="true"></textarea>
        </div>
        <app-code selector="input-textarea-disabled-demo"></app-code>
    `
})
export class DisabledDoc {}
