import { Component, ViewEncapsulation } from '@angular/core';
import { Code } from 'src/app/showcase/domain/code';

@Component({
    selector: 'specificity-doc',
    template: `
        <app-docsectiontext>
            <p>
                The <i>&#64;layer</i> is a standard CSS feature to define cascade layers for a customizable order of precedence. If you need to become more familiar with layers, visit the documentation at
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer">MDN</a> to begin with. PrimeNG wraps the built-in style classes under the <i>primeng</i> cascade layer to make the library styles easy to override. CSS in your app
                without a layer has the highest CSS specificity, so you'll be able to override styles regardless of the location or how strong a class is written.
            </p>
            <p>
                For example, let's assume you need to remove the rounded borders of the InputSwitch component defined by the theme in use. In order to achieve this, <i>.p-inputswitch .p-inputswitch-slider</i> selector needs to be overriden. Without
                the layers, we'd have to write a stronger css or use <i>!important</i> however, with layers, this does not present an issue as your CSS can always override PrimeNG with a more straightforward class name such as <i>my-inputswitch</i>.
                Another advantage of this approach is that it does not force you to figure out the built-in class names of the components.
            </p>
            <div class="card flex justify-content-center">
                <p-inputSwitch [(ngModel)]="checked" styleClass="my-inputswitch" />
            </div>

            <app-code [code]="code" selector="specificity-demo" [hideStackBlitz]="true" [hideCodeSandbox]="true"></app-code>
        </app-docsectiontext>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: `
        .my-inputswitch .p-inputswitch-slider {
            border-radius: 0;
        }
        .my-inputswitch .p-inputswitch-slider:before  {
            border-radius: 0;
        }`
})
export class SpecificityDoc {
    checked: boolean = false;
    code: Code = {
        basic: `<p-inputSwitch [(ngModel)]="checked" styleClass="my-inputswitch" />`,
        scss: `.my-inputswitch .p-inputswitch-slider {
    border-radius: 0;
}

.my-inputswitch .p-inputswitch-slider:before  {
    border-radius: 0;
}`,
        typescript: `import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    template: \`
        <div class="card flex justify-content-center">
            <p-inputSwitch [(ngModel)]="checked" styleClass="my-inputswitch" />
        </div>\`,
    encapsulation: ViewEncapsulation.None,
    styles: \`
        .my-inputswitch .p-inputswitch-slider {
            border-radius: 0;
        }
        .my-inputswitch .p-inputswitch-slider:before  {
            border-radius: 0;
        }
    \`
})
export class ExampleComponent {
    checked: boolean = false;
}`
    };
}
