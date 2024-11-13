import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'plugin-doc',
    template: `
        <app-docsectiontext>
            <p>
                The
                <a href="https://www.npmjs.com/package/tailwindcss-primeui" target="_blank" rel="noopener noreferrer">tailwindcss-primeui</a>
                is an official plugin by PrimeTek to provide first class integration between a Prime UI library like PrimeNG and Tailwind CSS. It is designed to work both in styled and unstyled modes. In styled mode, for instance the semantic colors
                such as primary and surfaces are provided as Tailwind utilities e.g. <i>bg-primary</i>, <i>text-surface-500</i>, <i>text-muted-color</i>.
            </p>
            <p>Plugin is available on npm.</p>
            <app-code [code]="code1" selector="code1" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
            <p>After installation, configure the plugin at your tailwind configuration file.</p>
            <app-code [code]="code2" selector="code2" [hideToggleCode]="true" [hideCodeSandbox]="true" [hideStackBlitz]="true"></app-code>
        </app-docsectiontext>
    `
})
export class PluginDoc {
    code1: Code = {
        basic: `npm i tailwindcss-primeui`
    };
    code2: Code = {
        basic: `// tailwind.config.js
module.exports = {
    // ...
    plugins: [require('tailwindcss-primeui')]
};`
    };
}
