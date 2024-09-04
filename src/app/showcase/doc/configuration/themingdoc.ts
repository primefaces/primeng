import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'theming-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG provides pre-skinned components with 3 predefined themes: Aura, Lara and Nora. Default theme is Aura with emerald as
                the primary color. See the
                <a>theming</a> documentation for details.
            </p>
            <p>Configure PrimeNG to use a theme like Aura.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
})
export class ThemingDoc {
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
