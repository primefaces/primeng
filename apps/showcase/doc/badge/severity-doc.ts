import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'severity-doc',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Severity defines the color of the badge, possible values are <i>success</i>, <i>info</i>, <i>warn</i> and <i>danger</i></p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center gap-2">
                <p-badge value="2" />
                <p-badge value="6" severity="secondary" />
                <p-badge value="8" severity="success" />
                <p-badge value="4" severity="info" />
                <p-badge value="9" severity="warn" />
                <p-badge value="3" severity="danger" />
                <p-badge value="5" severity="contrast" />
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class SeverityDoc {}
