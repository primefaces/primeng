import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'theming-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>PrimeNG provides 4 predefined themes out of the box; Aura, Material, Lara and Nora. See the <a routerLink="/theming">theming</a> documentation for details.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ThemeDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }
        })
    ]
};`
    };
}
