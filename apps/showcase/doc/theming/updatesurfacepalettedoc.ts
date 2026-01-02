import { Component } from '@angular/core';

@Component({
    selector: 'update-surface-palette-doc',
    template: `
        <app-docsectiontext>
            <p>Updates the surface colors, this is a shorthand to do the same update using <i>updatePreset</i>.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="update-surface-palette-demo" [hideToggleCode]="true"></app-code>
    `
})
export class UpdateSurfacePaletteDoc {
    code = {
        typescript: `import { updateSurfacePalette } from 'primeng/themes';

const changeSurfaces() {
    //changes surfaces both in light and dark mode
    updateSurfacePalette({
        50: '{zinc.50}',
        // ...
        950: '{zinc.950}'
    });
}

const changeLightSurfaces() {
    //changes surfaces only in light
    updateSurfacePalette({
        light: {
            50: '{zinc.50}',
            // ...
            950: '{zinc.950}'
        }
    });
}

const changeDarkSurfaces() {
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
