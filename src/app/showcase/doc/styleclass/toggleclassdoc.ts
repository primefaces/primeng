import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'toggle-class-doc',
    template: `
        <app-docsectiontext>
            <p>
                <i>StyleClass</i> has two modes, <i>toggleClass</i> to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the <i>selector</i> property that accepts any valid CSS selector or
                keywords including <i>&#64;next</i>, <i>prev</i>, <i>parent</i>, <i>grandparent</i>
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <p-button label="Toggle p-disabled" pStyleClass="@next" toggleClass="p-disabled" />
            <input type="text" pInputText class="block mt-4" />
        </div>
        <app-code [code]="code" selector="style-class-toggle-class-demo"></app-code>
    `
})
export class ToggleClassDoc {
    code: Code = {
        basic: `<p-button 
    label="Toggle p-disabled" 
    pStyleClass="@next" 
    toggleClass="p-disabled" />
<input type="text" pInputText class="block mt-4" />`,
        html: `<div class="card flex flex-col items-center">
    <p-button 
        label="Toggle p-disabled"
        pStyleClass="@next" 
        toggleClass="p-disabled" />
    <input type="text" pInputText class="block mt-4">
</div>`,
        typescript: `import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'style-class-toggle-class-demo',
    templateUrl: './style-class-toggle-class-demo.html',
    standalone: true,
    imports: [StyleClassModule, InputTextModule, ButtonModule]
})
export class StyleClassToggleClassDemo {}`
    };
}
