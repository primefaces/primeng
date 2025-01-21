import { Component } from '@angular/core';

@Component({
    selector: 'update-surface-palette-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Updates the surface colors, this is a shorthand to do the same update using <i>updatePreset</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code1" selector="update-surface-palette-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" selector="update-surface-palette-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code3" selector="update-surface-palette-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code4" selector="update-surface-palette-demo" [hideToggleCode]="true"></app-code>
    `
})
export class UpdateSurfacePaletteDoc {
    code1 = {
        typescript: `import { updateSurfacePalette } from '@primeng/themes';`
    };

    code2 = {
        typescript: `changeSurfaces() {
    //changes surfaces both in light and dark mode
    updateSurfacePalette({
        50: '{zinc.50}',
        // ...
        950: '{zinc.950}'
    });
}`
    };

    code3 = {
        typescript: `const changeLightSurfaces() {
    //changes surfaces only in light
    updateSurfacePalette({
        light: {
            50: '{zinc.50}',
            // ...
            950: '{zinc.950}'
        }
    });
}`
    };

    code4 = {
        typescript: `function changeDarkSurfaces() {
    //changes surfaces only in dark mode
    updateSurfacePalette({
        dark: {
            50: '{zinc.50}',
            // ...
            950: '{zinc.950}'
        }
    });
}`
    };
}
