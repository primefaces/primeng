import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'outlined-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button label="Primary" variant="outlined" />
                <p-button label="Secondary" variant="outlined" severity="secondary" />
                <p-button label="Success" variant="outlined" severity="success" />
                <p-button label="Info" variant="outlined" severity="info" />
                <p-button label="Warn" variant="outlined" severity="warn" />
                <p-button label="Help" variant="outlined" severity="help" />
                <p-button label="Danger" variant="outlined" severity="danger" />
                <p-button label="Contrast" variant="outlined" severity="contrast" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class OutlinedDoc {}
