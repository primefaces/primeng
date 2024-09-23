import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'styles-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG provides pre-skinned components, default theme is Aura with emerald as the primary color. See the
                <a href="/theming">theming</a>
                documentation for details.
            </p>
            <p>Configure PrimeNG to use a theme.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `,
})
export class StylesDoc {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

@Component({...})
export class AppComponent {

    constructor(private config: PrimeNGConfig) {
        this.config.theme.set({ preset: Aura });
    }
}`,
    };
}
