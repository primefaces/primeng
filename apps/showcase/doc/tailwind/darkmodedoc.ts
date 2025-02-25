import { Component } from '@angular/core';

@Component({
    selector: 'darkmode-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                In styled mode, PrimeNG uses the <i>system</i> as the default <i>darkModeSelector</i> in theme configuration. If you have a dark mode switch in your application, ensure that <i>darkModeSelector</i> is aligned with the Tailwind dark
                variant for seamless integration. Note that, this particular configuration isn't required if you're utilizing the default system color scheme.
            </p>
            <p>Suppose that, the darkModeSelector is set as <i>my-app-dark</i> in PrimeNG.</p>
            <app-code [code]="code1" [hideToggleCode]="true" [hideStackBlitz]="true" />
            <h3>Tailwind v4</h3>
            <p>Add a custom variant for dark with a custom selector.</p>
            <app-code [code]="code2" [hideToggleCode]="true" [hideStackBlitz]="true" />
            <h3>Tailwind v3</h3>
            <p>Use the plugins option in your Tailwind config file to configure the plugin.</p>
            <app-code [code]="code3" [hideToggleCode]="true" [hideStackBlitz]="true" />
        </app-docsectiontext>
    `
})
export class DarkModeDoc {
    code1 = {
        basic: `import PrimeNG from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@Component({...})
export class AppComponent() {
    constructor(private primeng: PrimeNG) {
        this.primeng.theme.set({
            preset: Aura,
              options: {
                darkModeSelector: '.my-app-dark',
                }
            })
        }
    }
}`
    };

    code2 = {
        basic: `@import "tailwindcss";
@import "tailwindcss-primeui";
@custom-variant dark (&:where(.my-app-dark, .my-app-dark *));     //dark mode configuration
`
    };

    code3 = {
        basic: `// tailwind.config.js
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class~="my-app-dark"]'],           //dark mode configuration
    plugins: [PrimeUI]
};
`
    };
}
