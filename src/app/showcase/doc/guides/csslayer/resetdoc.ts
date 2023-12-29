import { Component } from '@angular/core';
import { Code } from 'src/app/showcase/domain/code';

@Component({
    selector: 'reset-doc',

    template: `
        <app-docsectiontext>
            <p>
                Ease of customization may present an issue if you have global styles on HTML elements like inputs and buttons that are also utilized by PrimeNG because global styles with a broader scope e.g. <i>button &#123; &#125;</i> and no layer
                always override the PrimeNG components leading to unexpected results. A common use case for global styles applying to standard HTML elements is CSS reset utilities to remove the default styling of the browsers. In this case, best
                practice is wrapping your CSS in a layer like <i>reset</i> and make sure <i>primeNG</i> comes after your layer since layers defined after has higher precedence. This way, your Reset CSS does not get in the way of PrimeNG components.
            </p>
            <app-code [code]="code" selector="specificity-demo" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
        </app-docsectiontext>
    `
})
export class ResetDoc {
    code: Code = {
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
