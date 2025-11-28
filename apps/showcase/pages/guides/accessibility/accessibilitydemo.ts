import { ColorsDoc } from '@/doc/guides/accessibility/colorsdoc';
import { FormControlsDoc } from '@/doc/guides/accessibility/formcontrolsdoc';
import { IntroductionDoc } from '@/doc/guides/accessibility/introductiondoc';
import { SemanticHTMLDoc } from '@/doc/guides/accessibility/semantichtmldoc';
import { WAIARIADoc } from '@/doc/guides/accessibility/waiariadoc';
import { WCAGDoc } from '@/doc/guides/accessibility/wcagdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    selector: 'accessibility',
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Accessibility - PrimeNG"
        header="Accessibility"
        description="PrimeNG has WCAG 2.1 AA level compliance, refer to the accessibility documentation of each component for detailed information."
        [docs]="docs"
        docType="page"
    ></app-doc>`
})
export class AccessibilityDemoComponent {
    docs = [
        {
            id: 'introduction',
            label: 'Introduction',
            component: IntroductionDoc
        },
        {
            id: 'wcag',
            label: 'WCAG',
            component: WCAGDoc
        },
        {
            id: 'form-controls',
            label: 'Form Controls',
            component: FormControlsDoc
        },
        {
            id: 'semantic-html',
            label: 'Semantic HTML',
            component: SemanticHTMLDoc
        },
        {
            id: 'wai-aria',
            label: 'WAI-ARIA',
            component: WAIARIADoc
        },
        {
            id: 'colors',
            label: 'Colors',
            component: ColorsDoc
        }
    ];
}
