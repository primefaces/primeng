import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'badge-directive-demo',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Content of the badge is specified using the <i>value</i> property.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <i class="pi pi-bell !text-3xl" pBadge value="2"></i>
        </div>
        <app-code selector="badge-directive-demo"></app-code>
    `
})
export class DirectiveDoc {}
