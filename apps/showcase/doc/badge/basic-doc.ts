import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Content of the badge is specified using the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-badge value="2" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {}
