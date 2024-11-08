import { Component } from '@angular/core';

@Component({
    selector: 'palette-doc',
    template: `
        <app-docsectiontext>
            <p>Returns shades and tints of a given color from 50 to 950 as an array.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="palette-demo" [hideToggleCode]="true"></app-code>
    `
})
export class PaletteDoc {
    code = {
        typescript: `import { palette } from 'primeng/themes';

// custom color
const values1 = palette('#10b981');

// copy an existing token set
const primaryColor = palette('{blue}');`
    };
}
