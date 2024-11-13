import { Component } from '@angular/core';

@Component({
    selector: 'update-primary-palette-doc',
    template: `
        <app-docsectiontext>
            <p>Updates the primary colors, this is a shorthand to do the same update using <i>updatePreset</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="update-primary-palette-demo" [hideToggleCode]="true"></app-code>
    `
})
export class UpdatePrimaryPaletteDoc {
    code = {
        typescript: `import { updatePrimaryPalette } from 'primeng/themes';
...
const changePrimaryColor() {
    updatePrimaryPalette({
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
    });
}`
    };
}
