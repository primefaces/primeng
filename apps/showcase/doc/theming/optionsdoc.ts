import { Component } from '@angular/core';

@Component({
    selector: 'options-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>options</i> property defines the how the CSS would be generated from the design tokens of the preset.</p>
            <h4>prefix</h4>
            <p>The prefix of the CSS variables, defaults to <i>p</i>. For instance, the <i>primary.color</i> design token would be <i>var(--p-primary-color)</i>.</p>
            <app-code [code]="code1" selector="options-demo-1" [hideToggleCode]="true"></app-code>
            <h4>darkModeSelector</h4>
            <p>
                The CSS rule to encapsulate the CSS variables of the dark mode, the default is the <i>system</i> to generate <i>media (prefers-color-scheme: dark)</i>. If you need to make the dark mode toggleable based on the user selection define a
                class selector such as <i>.app-dark</i> and toggle this class at the document root. See the dark mode toggle section for an example.
            </p>
            <app-code [code]="code2" selector="options-demo-2" [hideToggleCode]="true"></app-code>
            <h4>cssLayer</h4>
            <p>
                Defines whether the styles should be defined inside a
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer" target="_blank" rel="noopener noreferrer">CSS layer</a>
                named <i>primeui</i> by default or not. A CSS layer would be handy to declare a custom cascade layer for easier customization. The default is <i>false</i>.
            </p>
            <app-code [code]="code3" selector="options-demo-3" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class OptionsDoc {
    code1 = {
        typescript: `options: {
    prefix: 'my'
}`
    };

    code2 = {
        typescript: `options: {
    darkModeSelector: '.my-app-dark'
}`
    };

    code3 = {
        typescript: `options: {
    cssLayer: {
        name: 'primeng',
        order: 'tailwind-base, primeng, tailwind-utilities'
    }
}`
    };
}
