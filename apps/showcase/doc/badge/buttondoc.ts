import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'badge-button-demo',
    standalone: true,
    imports: [ButtonModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Buttons have built-in support for badges to display a badge inline.</p>
        </app-docsectiontext>

        <div class="card flex justify-center flex-wrap gap-4">
            <p-button label="Emails" icon="pi pi-bell" label="Notifications" badge="2" />
            <p-button label="Inbox" icon="pi pi-inbox" badge="2" badgeSeverity="contrast" outlined />
        </div>

        <app-code selector="badge-button-demo"></app-code>
    `
})
export class ButtonDoc {}
