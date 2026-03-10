import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'raised-doc',
    standalone: true,
    imports: [AppCode, AppDemoWrapper, AppDocSectionText, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>Raised buttons display a shadow to indicate elevation.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex flex-wrap gap-4 justify-center">
                <p-button label="Primary" [raised]="true" />
                <p-button label="Secondary" [raised]="true" severity="secondary" />
                <p-button label="Success" [raised]="true" severity="success" />
                <p-button label="Info" [raised]="true" severity="info" />
                <p-button label="Warn" [raised]="true" severity="warn" />
                <p-button label="Help" [raised]="true" severity="help" />
                <p-button label="Danger" [raised]="true" severity="danger" />
                <p-button label="Contrast" [raised]="true" severity="contrast" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class RaisedDoc {}
