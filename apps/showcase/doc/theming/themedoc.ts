import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'theme-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The <i>theme</i> property is used to customize the initial theme.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="theme-demo" [hideToggleCode]="true"></app-code>
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
