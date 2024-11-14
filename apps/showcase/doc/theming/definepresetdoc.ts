import { Component } from '@angular/core';

@Component({
    selector: 'define-preset-doc',
    template: `
        <app-docsectiontext>
            <p>The <i>definePreset</i> utility is used to customize an existing preset during the PrimeNG setup. The first parameter is the preset to customize and the second is the design tokens to override.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="define-preset-demo" [hideToggleCode]="true"></app-code>
    `
})
export class DefinePresetDoc {
    code = {
        typescript: `import { Component, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { definePreset } from 'primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
});

@Component({...})
export class AppComponent {
    public config: PrimeNGConfig = inject(PrimeNGConfig);

    constructor() {
        this.config.theme.set(MyPreset);
    }
}`
    };
}
