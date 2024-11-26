import { Component } from '@angular/core';

@Component({
    selector: 'specificity-doc',
    template: `
        <app-docsectiontext>
            <p>
                The <i>&#64;layer</i> is a standard CSS feature to define cascade layers for a customizable order of precedence. If you need to become more familiar with layers, visit the documentation at
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" class="doc-link">MDN</a> to begin with. In styled mode, when the <i>cssLayer</i> option is enabled at theme configuration, PrimeNG wraps the built-in style classes
                under the <i>primeng</i> cascade layer to make the library styles easy to override. CSS in your app without a layer has the highest CSS specificity, so you'll be able to override styles regardless of the location or how strong a class
                is written. The <i>cssLayer</i> is disabled by default to avoid compatibility issues with 3rd party CSS libraries which requires a layer configuration for compatibility that is discussed in the next reset section.
            </p>
            <p>
                For example, let's assume you need to remove the rounded borders of the ToggleSwitch component defined by the theme in use. In order to achieve this, <i>.p-toggleswitch .p-toggleswitch-slider</i> selector needs to be overriden.
                Without the layers, we'd have to write a stronger css or use <i>!important</i> however, with layers, this does not present an issue as your CSS can always override PrimeNG with a more straightforward class name such as
                <i>my-switch-slider</i>. Another advantage of this approach is that it does not force you to figure out the built-in class names of the components.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toggleswitch [(ngModel)]="checked" styleClass="my-switch-slider" />
        </div>
        <app-code [code]="code" selector="specificity-demo" [hideToggleCode]="true"></app-code>
    `,
    styles: `
        .my-switch-slider .p-toggleswitch-slider {
            border-radius: 0;
        }

        .my-switch-slider .p-toggleswitch-slider:before {
            border-radius: 0;
        }
    `
})
export class SpecificityDoc {
    checked: boolean = true;

    code = {
        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
    template: \` 
        <p-toggleswitch [(ngModel)]="checked" styleClass="my-switch-slider"/>
    \`,
    styles: \` 
        .my-switch-slider .p-toggleswitch-slider {
            border-radius: 0;
        }

        .my-switch-slider .p-toggleswitch-slider:before {
            border-radius: 0;
        }
    \`,
    standalone: true,
    imports: [ToggleSwitch, FormsModule]
})
export class AppComponent {
    checked1: boolean = true;
}`
    };
}
