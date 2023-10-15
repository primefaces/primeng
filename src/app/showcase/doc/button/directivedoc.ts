import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-directive-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Button can also be used as directive using <i>pButton</i>. In contrary of p-button component, pButton directive does not utilize ripple effect, use <i>pRipple</i> directive to enable ripple.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <button pButton pRipple label="Submit" class="p-button-success"></button>
        </div>
        <app-code [code]="code" selector="button-directive-demo"></app-code>
    </section>`
})
export class DirectiveDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton pRipple label="Submit" class="p-button-success"></button>`,

        html: `
<div class="card flex justify-content-center">
    <button pButton pRipple label="Submit" class="p-button-success"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-directive-demo',
    templateUrl: './button-directive-demo.html'
})
export class ButtonDirectiveDemo { }`
    };
}
