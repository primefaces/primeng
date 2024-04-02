import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'scaling-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG utilizes rem units to make sure the components blend in with the rest of your UI perfectly. This also enables scaling, for example changing the size of the components is easy as configuring the font size of your document. Code
                below sets the scale of the components based on 16px. If you reqire bigger or smaller components, just change this variable and components will scale accordingly.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ScalingDoc {
    code: Code = {
        basic: `html {
    font-size: 16px;
}`
    };
}
