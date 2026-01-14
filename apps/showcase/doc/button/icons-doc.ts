import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'icons-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Icon of a button is specified with <i>icon</i> property and position is configured using <i>iconPos</i> attribute.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center gap-4">
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button icon="pi pi-home" aria-label="Save" />
                <p-button label="Profile" icon="pi pi-user" />
                <p-button label="Save" icon="pi pi-check" iconPos="right" />
            </div>
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button label="Search" icon="pi pi-search" iconPos="top" />
                <p-button label="Update" icon="pi pi-refresh" iconPos="bottom" />
            </div>
        </div>
        <app-code></app-code>
    `
})
export class IconsDoc {}
