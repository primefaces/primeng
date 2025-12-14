import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'theming-doc',
    standalone: true,
    imports: [RouterModule, AppCode, AppDocSectionText],
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
import { providePrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
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
