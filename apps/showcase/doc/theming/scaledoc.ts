import { Component } from '@angular/core';

@Component({
    selector: 'scale-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG UI component use <i>rem</i> units, 1rem equals to the font size of the <i>html</i> element which is <i>16px</i> by default. Use the root font-size to adjust the size of the components globally. This website uses <i>14px</i> as
                the base so it may differ from your application if your base font size is different.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" selector="scale-demo" [hideToggleCode]="true"></app-code>
    `
})
export class ScaleDoc {
    code = {
        basic: `html {
    font-size: 14px;
}`
    };
}
