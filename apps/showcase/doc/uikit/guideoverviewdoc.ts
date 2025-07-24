import { Component } from '@angular/core';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'guide-overview-doc',
    standalone: true,
    imports: [AppDocModule],
    template: `<app-docsectiontext>
        <p>PrimeOne is the official Figma library of UI components designed to match the implementations in the Prime UI Suites. The current iteration of PrimeOne is structured around the <b>Aura Light</b> and <b>Aura Dark</b> themes.</p>
    </app-docsectiontext>`
})
export class GuideOverviewDoc {}
