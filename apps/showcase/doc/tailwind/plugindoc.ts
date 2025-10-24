import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'plugin-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                The <a href="https://www.npmjs.com/package/tailwindcss-primeui" target="_blank" rel="noopener noreferrer">tailwindcss-primeui</a> is an official plugin by PrimeTek to provide first class integration between a Prime UI library like
                PrimeNG and Tailwind CSS. It is designed to work both in styled and unstyled modes. In styled mode, for instance the semantic colors such as primary and surfaces are provided as Tailwind utilities e.g. <i>bg-primary</i>,
                <i>text-surface-500</i>, <i>text-muted-color</i>.
            </p>
            <p>
                If you haven't already done so, start by integrating Tailwind into your project. Detailed steps for this process can be found in the Tailwind
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">documentation</a>. After successfully installing Tailwind, proceed with the installation of the PrimeUI plugin. This single npm package comes with two
                libraries: the CSS version is compatible with Tailwind v4, while the JS version is designed for Tailwind v3.
            </p>
            <app-code [code]="code1" [hideToggleCode]="true" [hideStackBlitz]="true" />
            <h3>Tailwind v4</h3>
            <p>In the CSS file that contains the tailwindcss import, add the <i>tailwindcss-primeui</i> import as well.</p>
            <app-code [code]="code2" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" />
            <p class="mt-4">
                For a comprehensive starter guide, review the <a href="https://github.com/primefaces/primeng-examples/tree/main/primeng-quickstart-tailwind" target="_blank" rel="noopener noreferrer">primeng-quickstart-tailwind</a> repository which
                demonstrates the integration.
            </p>
            <h3>Tailwind v3</h3>
            <p>Use the plugins option in your Tailwind config file to configure the plugin.</p>
            <app-code [code]="code3" [importCode]="true" [hideToggleCode]="true" [hideStackBlitz]="true" />
        </app-docsectiontext>
    `
})
export class PluginDoc {
    code1 = {
        basic: `npm i tailwindcss-primeui`
    };

    code2 = {
        basic: `@import "tailwindcss";
@import "tailwindcss-primeui";`
    };

    code3 = {
        basic: `// tailwind.config.js
import PrimeUI from 'tailwindcss-primeui';

export default {
    // ...
    plugins: [PrimeUI]
};`
    };
}
