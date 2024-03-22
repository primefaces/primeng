import { Component } from '@angular/core';
import { ColorsDoc } from '../../../doc/guides/accessibility/colorsdoc';
import { FormControlsDoc } from '../../../doc/guides/accessibility/formcontrolsdoc';
import { IntroductionDoc } from '../../../doc/guides/accessibility/introductiondoc';
import { SemanticHTMLDoc } from '../../../doc/guides/accessibility/semantichtmldoc';
import { WAIARIADoc } from '../../../doc/guides/accessibility/waiariadoc';
import { WCAGDoc } from '../../../doc/guides/accessibility/wcagdoc';

@Component({
    selector: 'accessibility',
    templateUrl: './accessibilitydemo.component.html'
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
