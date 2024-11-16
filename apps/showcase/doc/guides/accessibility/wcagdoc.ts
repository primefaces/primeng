import { Component } from '@angular/core';

@Component({
    selector: 'wcag-doc',
    template: `
        <app-docsectiontext>
            <p>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" alt="WCAG Website">WCAG</a> refers to <strong>Web Content Accessibility Guideline</strong>, a standard managed by the WAI (Web Accessibility Initiative) of W3C (World Wide
                Web Consortium). WCAG consists of recommendations for making the web content more accessible. PrimeNG components aim high level of WCAG compliancy in the near future.
            </p>
            <p>
                Various countries around the globe have governmental policies regarding web accessibility as well. Most well known of these are <a href="https://www.section508.gov/manage/laws-and-policies/">Section 508</a> in the US and
                <a href="https://digital-strategy.ec.europa.eu/en/policies/web-accessibility">Web Accessibility Directive</a> of the European Union.
            </p>
        </app-docsectiontext>
    `
})
export class WCAGDoc {}
