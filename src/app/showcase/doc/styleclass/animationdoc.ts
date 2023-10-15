import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'animation-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>
                Classes to apply during enter and leave animations are specified using the <i>enterClass</i>, <i>enterActiveClass</i>, <i>enterToClass</i>, <i>leaveClass</i>, <i>leaveActiveClass</i>,<i>leaveToClass</i>properties. In addition in case
                the target is an overlay, <i>hideOnOutsideClick</i> would be handy to hide the target if outside of the popup is clicked, or enable <i>hideOnEscape</i> to close the popup by listening <i>escape</i> key.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center">
            <div>
                <button pButton label="Show" class="mr-2" pStyleClass=".box" enterClass="hidden" enterActiveClass="fadein"></button>
                <button pButton label="Hide" pStyleClass=".box" leaveActiveClass="fadeout" leaveToClass="hidden"></button>
            </div>

            <div class="hidden animation-duration-500 box">
                <div class="flex bg-green-500 text-white align-items-center justify-content-center py-3 border-round-md mt-3 font-bold shadow-2 w-8rem h-8rem">Content</div>
            </div>
        </div>
        <app-code [code]="code" selector="style-class-animation-demo"></app-code>
    </section>`
})
export class AnimationDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<div>
    <button pButton label="Show" class="mr-2" pStyleClass=".box" enterClass="hidden" enterActiveClass="fadein"></button>
    <button pButton label="Hide" pStyleClass=".box" leaveActiveClass="fadeout" leaveToClass="hidden"></button>
</div>

<div class="hidden animation-duration-500 box">
    <div class="flex bg-green-500 text-white align-items-center justify-content-center py-3 border-round-md mt-3 font-bold shadow-2 w-8rem h-8rem">Content</div>
</div>`,
        html: `
<div class="card flex flex-column align-items-center">
    <div>
        <button pButton label="Show" class="mr-2" pStyleClass=".box" enterClass="hidden" enterActiveClass="fadein"></button>
        <button pButton label="Hide" pStyleClass=".box" leaveActiveClass="fadeout" leaveToClass="hidden"></button>
    </div>

    <div class="hidden animation-duration-500 box">
        <div class="flex bg-green-500 text-white align-items-center justify-content-center py-3 border-round-md mt-3 font-bold shadow-2 w-8rem h-8rem">Content</div>
    </div>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: './style-class-animation-demo',
    templateUrl: './style-class-animation-demo.html'
})
export class StyleClassAnimationDemo {}`
    };
}
