import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scaling-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                PrimeNG utilizes rem units to make sure the components blend in with the rest of your UI perfectly. This also enables scaling, for example changing the size of the components is easy as configuring the font size of your document. Code
                below sets the scale of the components based on 16px. If you reqire bigger or smaller components, just change this variable and components will scale accordingly.
            </p>
        </app-docsectiontext>
        <app-code [code]="code1" [hideToggleCode]="true"></app-code>

        <p class="doc-section-description">
            Some commonly used components such as inputs, buttons and datatable also provide per component scaling with special classes. Components with specific scaling options are documented in their own documentation.
        </p>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>
    </section>`
})
export class ScalingDoc {
    @Input() id: string;

    @Input() title: string;

    code1: Code = {
        basic: `
html {
    font-size: 16px;
}`
    };

    code2: Code = {
        basic: `
<input pInputText type="text" class="p-inputtext-sm" />
<button pButton label="Button" class="p-button-lg" />`
    };
}
