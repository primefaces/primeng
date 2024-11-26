import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'theme-doc',
    template: `
        <app-docsectiontext>
            <p>Configure PrimeNG to use a theme like Aura.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
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
                preset: Aura
            }
        })
    ]
};`
    };
}
