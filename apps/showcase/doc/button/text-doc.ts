import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'text-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" variant="text" />
            <p-button label="Secondary" variant="text" severity="secondary" />
            <p-button label="Success" variant="text" severity="success" />
            <p-button label="Info" variant="text" severity="info" />
            <p-button label="Warn" variant="text" severity="warn" />
            <p-button label="Help" variant="text" severity="help" />
            <p-button label="Danger" variant="text" severity="danger" />
            <p-button label="Plain" variant="text" />
        </div>
        <app-code></app-code>
    `
})
export class TextDoc {}
