import { Component } from '@angular/core';

@Component({
    selector: 'specificity-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                The <i>&#64;layer</i> is a standard CSS feature to define cascade layers for a customizable order of precedence. If you need to become more familiar with layers, visit the documentation at
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" class="doc-link">MDN</a> to begin with.
            </p>
            <p>
                The <i>cssLayer</i> is disabled by default, when it is enabled at theme configuration, PrimeNG wraps the built-in style classes under the <i>primeng</i> cascade layer to make the library styles easy to override. CSS in your app
                without a layer has the highest CSS specificity, so you'll be able to override styles regardless of the location or how strong a class is written.
            </p>
        </app-docsectiontext>
    `
})
export class SpecificityDoc {}
