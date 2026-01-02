import { Component } from '@angular/core';
import { AutoFocusModule } from 'primeng/autofocus';
import { InputTextModule } from 'primeng/inputtext';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'auto-focus-basic-demo',
    standalone: true,
    imports: [AutoFocusModule, InputTextModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>AutoFocus is applied to any focusable input element with the <i>pAutoFocus</i> directive.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <input type="text" pInputText [pAutoFocus]="true" placeholder="Automatically focused" />
        </div>
        <app-code selector="auto-focus-basic-demo"></app-code>
    `
})
export class BasicDoc {}
