import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'theming-doc',
    template: `
        <app-docsectiontext>
            <p>PrimeNG provides 4 predefined themes out of the box; Aura, Material, Lara and Nora. Default theme is Aura with emerald as the primary color. See the <a routerLink="/theming">theming</a> documentation for details.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
        <app-docsectiontext>
            <p>Other option is the provide PrimeNG config in the <i>ApplicationConfig</i> as an environment provider.</p>
        </app-docsectiontext>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>
    `
})
export class ThemingDoc {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { PrimeNG } from 'primeng/api';
import Aura from '@primeng/themes/aura';

@Component({...})
export class AppComponent {

    constructor(private primeng: PrimeNG) {
        this.primeng.theme.set({ preset: Aura });
    }
}`
    };

    code2: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { providePrimeNgConfig } from 'primeng/api';
import { bootstrapApplication } from '@angular/platform-browser';
import Noir from '../themes/app-theme';

const appConfig: ApplicationConfig = {
    providers: [
        // other environment providers...
        providePrimeNgConfig({ theme: Noir, ripple: true, inputStyle: 'outlined' }),
    ]
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
`
    };
}
