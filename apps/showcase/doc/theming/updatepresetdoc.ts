import { Component } from '@angular/core';

@Component({
    selector: 'update-preset-doc',
    template: `
        <app-docsectiontext>
            <p>Merges the provided tokens to the current preset, an example would be changing the primary color palette dynamically.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="update-preset-demo" [hideToggleCode]="true"></app-code>
    `
})
export class UpdatePresetDoc {
    code = {
        typescript: `import { updatePreset } from 'primeng/themes';
...
const changePrimaryColor() {
    updatePreset({
        semantic: {
            primary: {
                50: '{indigo.50}',
                100: '{indigo.100}',
                200: '{indigo.200}',
                300: '{indigo.300}',
                400: '{indigo.400}',
                500: '{indigo.500}',
                600: '{indigo.600}',
                700: '{indigo.700}',
                800: '{indigo.800}',
                900: '{indigo.900}',
                950: '{indigo.950}'
            }
        }
    })
}`
    };
}
