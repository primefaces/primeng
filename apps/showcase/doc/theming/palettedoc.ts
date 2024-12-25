import { Component } from '@angular/core';

@Component({
    selector: 'palette-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Returns shades and tints of a given color from 50 to 950 as an array.</p>
        </app-docsectiontext>
        <app-code [code]="code1" selector="palette-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" selector="palette-demo" [hideToggleCode]="true"></app-code>
    `
})
export class PaletteDoc {
    code1 = {
        typescript: `import { palette } from '@primeng/themes';`
    };

    code2 = {
        typescript: `// custom color
const values1 = palette('#10b981');

// copy an existing token set
const primaryColor = palette('{blue}');`
    };
}
