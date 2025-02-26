import { Component } from '@angular/core';

@Component({
    selector: 'override-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Tailwind utilities may not be able to override the default styling of components due to css specificity, there are two possible solutions; Import and CSS Layer.</p>
            <h3>Important</h3>
            <p>Use the <i>!</i> as a prefix to enforce the styling. This is not the recommend approach, and should be used as last resort to avoid adding unnecessary style classes to your bundle.</p>

            <h5>Tailwind v4</h5>
            <app-code [code]="code1" [hideToggleCode]="true" [hideStackBlitz]="true" />

            <h5>Tailwind v3</h5>
            <app-code [code]="code2" [hideToggleCode]="true" [hideStackBlitz]="true" />

            <h3>CSS Layer</h3>
            <p>CSS Layer provides control over the css specificity so that Tailwind utilities can safely override components.</p>

            <h5>Tailwind v4</h5>
            <p>Ensure <i>primeng</i> layer is after <i>theme</i> and <i>base</i>, but before the other Tailwind layers such as <i>utilities</i>.</p>
            <app-code [code]="code3" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" class="block mb-4" />
            <p>No change in the CSS configuration is required.</p>
            <app-code [code]="code4" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" />

            <h5>Tailwind v3</h5>
            <p>The <i>primeng</i> layer should be between base and utilities.</p>
            <app-code [code]="code5" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" class="block mb-4" />
            <p>Tailwind v3 does not use native <i>layer</i> so needs to be defined with CSS.</p>
            <app-code [code]="code6" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" />
        </app-docsectiontext>
    `
})
export class OverrideDoc {
    code1 = {
        basic: `<input pInputText placeholder="Overriden" class="p-8!" />`
    };

    code2 = {
        basic: `<input pInputText placeholder="Overriden" class="!p-8" />`
    };

    code3 = {
        basic: `providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
    }
})`
    };

    code4 = {
        basic: `@import "tailwindcss";
@import "tailwindcss-primeui";`
    };

    code5 = {
        basic: `providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'tailwind-base, primeng, tailwind-utilities'
            }
        }
    }
})`
    };

    code6 = {
        basic: `@layer tailwind-base, primeng, tailwind-utilities;

@layer tailwind-base {
  @tailwind base;
}

@layer tailwind-utilities {
  @tailwind components;
  @tailwind utilities;
}`
    };
}
