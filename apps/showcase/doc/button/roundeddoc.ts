import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-rounded-demo',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-4 justify-center">
            <p-button label="Primary" [rounded]="true" />
            <p-button label="Secondary" [rounded]="true" severity="secondary" />
            <p-button label="Success" [rounded]="true" severity="success" />
            <p-button label="Info" [rounded]="true" severity="info" />
            <p-button label="Warn" [rounded]="true" severity="warn" />
            <p-button label="Help" [rounded]="true" severity="help" />
            <p-button label="Danger" [rounded]="true" severity="danger" />
            <p-button label="Contrast" [rounded]="true" severity="contrast" />
        </div>
        <app-code selector="button-rounded-demo"></app-code>
    `
})
export class RoundedDoc {}
