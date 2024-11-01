import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'theming-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG provides 4 predefined themes out of the box; Aura, Material, Lara and Nora. Default theme is Aura with emerald as
                the primary color. See the <a routerLink="/theming">theming</a> documentation for details.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
})
export class ThemingDoc {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';

@Component({...})
export class AppComponent {

    constructor(private primeng: PrimeNG) {
        this.primeng.theme.set({ preset: Aura });
    }
}`,
    };
}
