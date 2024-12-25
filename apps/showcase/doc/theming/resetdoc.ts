import { Component } from '@angular/core';

@Component({
    selector: 'reset-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                In case PrimeNG components have visual issues in your application, a Reset CSS may be the culprit. CSS layers would be an efficient solution that involves enabling the PrimeNG layer, wrapping the Reset CSS in another layer and
                defining the layer order. This way, your Reset CSS does not get in the way of PrimeNG components.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" selector="reset-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ResetDoc {
    code = {
        basic: `/* Order */
@layer reset, primeng;

/* Reset CSS */
@layer reset {
    button,
    input {
        /* CSS to Reset */
    }
}`
    };
}
