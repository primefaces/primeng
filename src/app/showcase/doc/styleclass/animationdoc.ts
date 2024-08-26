import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'animation-doc',
    template: `
        <app-docsectiontext>
            <p>
                Classes to apply during enter and leave animations are specified using the <i>enterFromClass</i>, <i>enterActiveClass</i>, <i>enterToClass</i>, <i>leaveFromClass</i>, <i>leaveActiveClass</i>,<i>leaveToClass</i>properties. In addition
                in case the target is an overlay, <i>hideOnOutsideClick</i> would be handy to hide the target if outside of the popup is clicked, or enable <i>hideOnEscape</i> to close the popup by listening <i>escape</i> key.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center">
            <div>
                <p-button label="Show" class="mr-2" pStyleClass=".box" enterFromClass="hidden" enterActiveClass="animate-fadein" />
                <p-button label="Hide" pStyleClass=".box" leaveActiveClass="animate-fadeout" leaveToClass="hidden" />
            </div>

            <div class="hidden animate-duration-500 box">
                <div class="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">Content</div>
            </div>
        </div>
        <app-code [code]="code" selector="style-class-animation-demo"></app-code>
    `
})
export class AnimationDoc {
    code: Code = {
        basic: `<div>
    <p-button 
        label="Show" 
        class="mr-2" 
        pStyleClass=".box" 
        enterFromClass="hidden" 
        enterActiveClass="animate-fadein" />
    <p-button 
        label="Hide" 
        pStyleClass=".box" 
        leaveActiveClass="animate-fadeout" 
        leaveToClass="hidden" />
</div>

<div class="hidden animate-duration-500 box">
    <div class="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">
        Content
    </div>
</div>`,
        html: `<div class="card flex flex-col items-center">
    <div>
        <p-button 
            label="Show"
            class="mr-2"
            pStyleClass=".box"
            enterFromClass="hidden" 
            enterActiveClass="animate-fadein" />
        <p-button 
            label="Hide" 
            pStyleClass=".box" 
            leaveActiveClass="animate-fadeout" 
            leaveToClass="hidden" />
    </div>

    <div class="hidden animate-duration-500 box">
        <div class="flex bg-green-500 text-white items-center justify-center py-4 rounded-md mt-4 font-bold shadow w-32 h-32">
            Content
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: './style-class-animation-demo',
    templateUrl: './style-class-animation-demo.html',
    standalone: true,
    imports: [StyleClassModule, ButtonModule]
})
export class StyleClassAnimationDemo {}`
    };
}
