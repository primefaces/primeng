import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'toggle-class-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                <i>StyleClass</i> has two modes, <i>toggleClass</i> to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the <i>selector</i> property that accepts any valid CSS selector or
                keywords including <i>@next</i>, <i>prev</i>, <i>parent</i>, <i>grandparent</i>
            </p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center">
            <button pButton label="Toggle p-disabled" pStyleClass="@next" toggleClass="p-disabled"></button>
            <input type="text" pInputText class="block mt-3" />
        </div>
        <app-code [code]="code" selector="style-class-toggle-class-demo"></app-code>
    </section>`
})
export class ToggleClassDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton label="Toggle p-disabled" pStyleClass="@next" toggleClass="p-disabled"></button>
<input type="text" pInputText class="block mt-3" />`,
        html: `
<div class="card flex flex-column align-items-center">
    <button pButton label="Toggle p-disabled" pStyleClass="@next" toggleClass="p-disabled"></button>
    <input type="text" pInputText class="block mt-3">
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'style-class-toggle-class-demo',
    templateUrl: './style-class-toggle-class-demo.html'
})
export class StyleClassToggleClassDemo {}`
    };
}
