import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'theme-doc',
    template: `
        <app-docsectiontext>
            <p>Configure PrimeVue to use a theme like Aura.</p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class ThemeDoc {
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
}
