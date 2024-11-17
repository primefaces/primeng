import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'animation-doc',
    template: `
        <app-docsectiontext>
            <p>
                Classes to apply during enter and leave animations are specified using the <i>enterFromClass</i>, <i>enterActiveClass</i>, <i>enterToClass</i>, <i>leaveFromClass</i>, <i>leaveActiveClass</i>,<i>leaveToClass</i>properties. In addition
                in case the target is an overlay, <i>hideOnOutsideClick</i> would be handy to hide the target if outside of the popup is clicked, or enable <i>hideOnEscape</i> to close the popup by listening <i>escape</i> key.
            </p>
        </app-docsectiontext>
        <div class="card flex items-center justify-center gap-8">
            <div class="flex flex-col items-center">
                <div>
                    <p-button pStyleClass=".box1" enterFromClass="my-hidden" enterActiveClass="my-fadein" label="FadeIn" class="mr-2" />
                    <p-button pStyleClass=".box1" leaveActiveClass="my-fadeout" leaveToClass="my-hidden" label="FadeOut" severity="secondary" />
                </div>
                <div class="h-32">
                    <div class="my-hidden animate-duration-500 box1">
                        <div class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32">Custom</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center">
                <div>
                    <p-button pStyleClass=".box2" enterFromClass="hidden" enterActiveClass="animate-slidedown" label="SlideDown" class="mr-2" />
                    <p-button pStyleClass=".box2" leaveActiveClass="animate-slideup" leaveToClass="hidden" label="SlideUp" severity="secondary" />
                </div>
                <div class="h-32">
                    <div class="hidden animate-duration-500 box2 overflow-hidden">
                        <div class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32">Content</div>
                    </div>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="style-class-animation-demo"></app-code>
    `,
    styles: [
        `
            :host ::ng-deep {
                @keyframes my-fadein {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes my-fadeout {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                .my-hidden {
                    display: none;
                }

                .my-fadein {
                    animation: my-fadein 150ms linear;
                }

                .my-fadeout {
                    animation: my-fadeout 150ms linear;
                }
            }
        `
    ]
})
export class AnimationDoc {
    code: Code = {
        basic: `<div class="flex flex-col items-center">
    <div>
        <p-button pStyleClass=".box1" enterFromClass="my-hidden" enterActiveClass="my-fadein" label="FadeIn" class="mr-2" />
        <p-button
            pStyleClass=".box1"
            leaveActiveClass="my-fadeout"
            leaveToClass="my-hidden"
            label="FadeOut"
            severity="secondary"
        />
    </div>
    <div class="h-32">
        <div class="my-hidden animate-duration-500 box1">
            <div
                class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32"
            >
                Custom
            </div>
        </div>
    </div>
</div>
<div class="flex flex-col items-center">
    <div>
        <p-button
            pStyleClass=".box2"
            enterFromClass="hidden"
            enterActiveClass="animate-slidedown"
            label="SlideDown"
            class="mr-2"
        />
        <p-button
            pStyleClass=".box2"
            leaveActiveClass="animate-slideup"
            leaveToClass="hidden"
            label="SlideUp"
            severity="secondary"
        />
    </div>
    <div class="h-32">
        <div class="hidden animate-duration-500 box2 overflow-hidden">
            <div
                class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32"
            >
                Content
            </div>
        </div>
    </div>
</div>`,
        html: `<div class="card flex items-center justify-center gap-8">
    <div class="flex flex-col items-center">
        <div>
            <p-button pStyleClass=".box1" enterFromClass="my-hidden" enterActiveClass="my-fadein" label="FadeIn" class="mr-2" />
            <p-button
                pStyleClass=".box1"
                leaveActiveClass="my-fadeout"
                leaveToClass="my-hidden"
                label="FadeOut"
                severity="secondary"
            />
        </div>
        <div class="h-32">
            <div class="my-hidden animate-duration-500 box1">
                <div
                    class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32"
                >
                    Custom
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center">
        <div>
            <p-button
                pStyleClass=".box2"
                enterFromClass="hidden"
                enterActiveClass="animate-slidedown"
                label="SlideDown"
                class="mr-2"
            />
            <p-button
                pStyleClass=".box2"
                leaveActiveClass="animate-slideup"
                leaveToClass="hidden"
                label="SlideUp"
                severity="secondary"
            />
        </div>
        <div class="h-32">
            <div class="hidden animate-duration-500 box2 overflow-hidden">
                <div
                    class="flex bg-primary text-primary-contrast items-center justify-center py-4 rounded-md mt-4 font-bold w-32 h-32"
                >
                    Content
                </div>
            </div>
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
    imports: [StyleClassModule, ButtonModule],
    styles: [
        \`:host ::ng-deep {
                @keyframes my-fadein {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                @keyframes my-fadeout {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }

                .my-hidden {
                    display: none;
                }

                .my-fadein {
                    animation: my-fadein 150ms linear;
                }

                .my-fadeout {
                    animation: my-fadeout 150ms linear;
                }
            } \`
    ],
})
export class StyleClassAnimationDemo {}`
    };
}
