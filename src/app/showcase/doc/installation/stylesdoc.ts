import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'styles-doc',
    template: `
        <app-docsectiontext>
            <p>
                Theme and Core styles are the necessary css files of the components, visit the <a href="/theming#themes" class="">Themes</a> section for the complete list of available themes to choose from. Styles can either be imported at
                <i>angular.json</i> or <i>src/styles.css</i> file.
            </p>
            <h3>With angular.json</h3>
            <app-code [code]="code1" [hideToggleCode]="true"></app-code>

            <h3>With styles.css</h3>
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>

            <h3>CSS layer</h3>
            <p>
                The style classes of PrimeNG are defined under the <i>primeng</i> CSS layer to be easier to customize by having low specificity. If you are using a CSS library that styles default HTML elements such as Tailwind Preflight, Bootstrap,
                Normalize, or similar, a custom CSS layer configuration would be necessary for compatibility. View the <a [routerLink]="['/guides/csslayer']">CSS Layer</a> guide for more information.
            </p>
            <app-code [code]="code3" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class StylesDoc {
    code1: Code = {
        typescript: `...
"styles": [
    "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "node_modules/primeng/resources/primeng.min.css",
    ...
]`
    };

    code2: Code = {
        scss: `@import "primeng/resources/themes/lara-light-blue/theme.css";
@import "primeng/resources/primeng.css";`
    };

    code3: Code = {
        scss: `/* Order */
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
