import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'position-doc',
    standalone: true,
    imports: [BadgeModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A Badge can be positioned at the top right corner of an element by adding <i>p-overlay-badge</i> style class to the element and embedding the badge inside.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <i class="pi pi-bell mr-6 p-text-secondary" pBadge style="font-size: 2rem" value="2"></i>
            <i class="pi pi-calendar mr-6 p-text-secondary" pBadge style="font-size: 2rem" [value]="'10+'" severity="danger"></i>
            <i class="pi pi-envelope p-text-secondary" pBadge style="font-size: 2rem" severity="danger"></i>
        </div>
        <app-code></app-code>
    `
})
export class PositionDoc {}
