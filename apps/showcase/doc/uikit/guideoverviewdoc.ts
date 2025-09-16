import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'guide-overview-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `<app-docsectiontext>
        <p>PrimeOne is the official Figma library of UI components designed to match the implementations in the Prime UI Suites. The current iteration of PrimeOne is structured around the <b>Aura Light</b> and <b>Aura Dark</b> themes.</p>
    </app-docsectiontext>`
})
export class GuideOverviewDoc {}
