import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'severity-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Severity defines the type of button.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" />
            <p-button label="Secondary" severity="secondary" />
            <p-button label="Success" severity="success" />
            <p-button label="Info" severity="info" />
            <p-button label="Warn" severity="warn" />
            <p-button label="Help" severity="help" />
            <p-button label="Danger" severity="danger" />
            <p-button label="Contrast" severity="contrast" />
        </div>
        <app-code></app-code>
    `
})
export class SeverityDoc {}
