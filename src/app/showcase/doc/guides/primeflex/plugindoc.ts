import { Component } from '@angular/core';

@Component({
    selector: 'plugin-doc',
    template: `
        <app-docsectiontext>
        <p>
            The <a href="https://www.npmjs.com/package/tailwindcss-primeui" target="_blank" rel="noopener noreferrer">tailwindcss-primeui</a> is an official plugin by PrimeTek to provide first class integration between a Prime UI library like
            PrimeNG and Tailwind CSS. It is designed to work both in styled and unstyled modes. For example, in styled mode the semantic colors such as primary and surfaces are provided as Tailwind utilities e.g. <i>bg-primary</i>,
            <i>text-surface-500</i>, <i>text-muted-color</i> by deriving their values from the design tokens. This integration is not compatible with PrimeVue v3 and requires PrimeVue v4.
        </p>
        <p>View the <a [routerLink]="'/tailwind/'">Tailwind</a> section for more details about how to use Tailwind CSS with PrimeVue efficiently.</p>
   
        </app-docsectiontext>
    `,
})
export class PluginDoc {

}
