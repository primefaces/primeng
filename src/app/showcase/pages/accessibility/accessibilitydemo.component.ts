import { Component } from '@angular/core';
import { ColorsDoc } from '../../doc/accessibility/colorsdoc';
import { FormControlsDoc } from '../../doc/accessibility/formcontrolsdoc';
import { IntroductionDoc } from '../../doc/accessibility/introductiondoc';
import { SemanticHTMLDoc } from '../../doc/accessibility/semantichtmldoc';
import { WAIARIADoc } from '../../doc/accessibility/waiariadoc';
import { WCAGDoc } from '../../doc/accessibility/wcagdoc';

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
