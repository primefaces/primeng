import { Component } from '@angular/core';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'position-doc',
    standalone: true,
    imports: [OverlayBadgeModule, AppCode, AppDemoWrapper, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A Badge can be positioned at the top right corner of an element by adding <i>p-overlay-badge</i> style class to the element and embedding the badge inside.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-overlaybadge value="2" class="mr-6">
                    <i class="pi pi-bell p-text-secondary" style="font-size: 2rem"></i>
                </p-overlaybadge>
                <p-overlaybadge value="10+" severity="danger" class="mr-6">
                    <i class="pi pi-calendar p-text-secondary" style="font-size: 2rem"></i>
                </p-overlaybadge>
                <p-overlaybadge severity="danger">
                    <i class="pi pi-envelope p-text-secondary" style="font-size: 2rem"></i>
                </p-overlaybadge>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PositionDoc {}
