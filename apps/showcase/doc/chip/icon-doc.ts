import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'icon-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ChipModule],
    template: `
        <app-docsectiontext>
            <p>A font icon next to the label can be displayed with the <i>icon</i> property.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex items-center gap-2 flex-wrap">
                <p-chip label="Apple" icon="pi pi-apple" />
                <p-chip label="Facebook" icon="pi pi-facebook" />
                <p-chip label="Google" icon="pi pi-google" />
                <p-chip label="Microsoft" icon="pi pi-microsoft" [removable]="true" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class IconDoc {}
