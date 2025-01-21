import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'define-preset-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>The <i>definePreset</i> utility is used to customize an existing preset during the PrimeNG setup. The first parameter is the preset to customize and the second is the design tokens to override.</p>
        </app-docsectiontext>
        <app-code [code]="code1" selector="define-preset-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" selector="define-preset-demo" [hideToggleCode]="true"></app-code>
    `
})
export class DefinePresetDoc {
    code1: Code = {
        typescript: `//mypreset.ts
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
});

export MyPreset;`
    };

    code2: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import MyPreset from './mypreset';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: MyPreset
            }
        })
    ]
};`
    };
}
