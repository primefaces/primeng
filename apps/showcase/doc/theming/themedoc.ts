import { Component } from '@angular/core';

@Component({
    selector: 'theme-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>theme</i> property is used to customize the initial theme.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="theme-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ThemeDoc {
    code = {
        typescript: `import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import Aura from '@primeng/themes/aura';

@Component({...})
export class AppComponent {

    constructor(private config: PrimeNGConfig) {
        // Default theme configuration
        this.config.theme.set({
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        });
    }
}`
    };
}
