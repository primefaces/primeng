import { Component } from '@angular/core';

@Component({
    selector: 'download-doc',
    template: `
        <app-docsectiontext>
            <p>Welcome to the Prime UI Ecosystem! Once you have PrimeVue up and running, we recommend exploring the following resources to gain a deeper understanding of the library.</p>
            <ul class="leading-relaxed">
                <li><a [routerLink]="'/configuration'" class="doc-link">Global configuration</a></li>
                <li><a [routerLink]="'/theming'" class="doc-link">Customization of styles</a></li>
                <li><a [routerLink]="'/support'" class="doc-link">Getting support</a></li>
            </ul>
        </app-docsectiontext>
    `
})
export class NextStepsDoc {}
