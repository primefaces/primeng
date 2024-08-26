import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>Animation classes are defined with the <i>enterClass</i> and <i>leaveClass</i> properties. This example utilizes PrimeFlex animations however any valid CSS animation is supported.</p>
        </app-docsectiontext>
        <div class="card flex flex-col items-center overflow-hidden">
            <div class="flex flex-col items-center gap-2">
                <span class="text-xl font-medium">Scroll Down</span>
                <span class="slidedown-icon h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
                    <i class="pi pi-arrow-down"></i>
                </span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-fadein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
                <span class="text-3xl font-bold">fade-in</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-fadeinleft" leaveClass="animate-fadeoutleft" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
                <span class="text-3xl font-bold">fade-left</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-fadeinright" leaveClass="animate-fadeoutright" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
                <span class="text-3xl font-bold">fade-right</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-zoomin" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
                <span class="text-3xl font-bold">zoom</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-flipleft" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
                <span class="text-3xl font-bold">flip-left</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-flipup" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
                <span class="text-3xl font-bold">flip-y</span>
            </div>
            <div class="h-[30rem]"></div>
            <div pAnimateOnScroll enterClass="animate-scalein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
                <span class="text-3xl font-bold">scalein</span>
            </div>
        </div>
        <app-code [code]="code" selector="animate-on-scroll-basic-demo"></app-code>
    `,
    styles: [
        `
            :host {
                @keyframes slidedown-icon {
                    0% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(20px);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }

                .slidedown-icon {
                    animation: slidedown-icon;
                    animation-duration: 3s;
                    animation-iteration-count: infinite;
                }

                .box {
                    background-image: radial-gradient(var(--primary-300), var(--primary-600));
                    border-radius: 50% !important;
                    color: var(--primary-color-text);
                }
            }
        `
    ]
})
export class BasicDoc {
    code: Code = {
        basic: `<div class="flex flex-col items-center gap-2">
    <span class="text-xl font-medium">Scroll Down</span>
    <span class="slidedown-icon h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
        <i class="pi pi-arrow-down"></i>
    </span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-fadein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
    <span class="text-3xl font-bold">fade-in</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-fadeinleft" leaveClass="animate-fadeoutleft" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
    <span class="text-3xl font-bold">fade-left</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-fadeinright" leaveClass="animate-fadeoutright" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
    <span class="text-3xl font-bold">fade-right</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-zoomin" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
    <span class="text-3xl font-bold">zoom</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-flipleft" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
    <span class="text-3xl font-bold">flip-left</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-flipup" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
    <span class="text-3xl font-bold">flip-y</span>
</div>
<div class="h-[30rem]"></div>
<div pAnimateOnScroll enterClass="animate-scalein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
    <span class="text-3xl font-bold">scalein</span>
</div>`,
        html: `<div class="card flex flex-col items-center overflow-hidden">
    <div class="flex flex-col items-center gap-2">
        <span class="text-xl font-medium">Scroll Down</span>
        <span class="slidedown-icon h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
            <i class="pi pi-arrow-down"></i>
        </span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-fadein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
        <span class="text-3xl font-bold">fade-in</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-fadeinleft" leaveClass="animate-fadeoutleft" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
        <span class="text-3xl font-bold">fade-left</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-fadeinright" leaveClass="animate-fadeoutright" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
        <span class="text-3xl font-bold">fade-right</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-zoomin" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000">
        <span class="text-3xl font-bold">zoom</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-flipleft" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
        <span class="text-3xl font-bold">flip-left</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-flipup" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
        <span class="text-3xl font-bold">flip-y</span>
    </div>
    <div class="h-[30rem]"></div>
    <div pAnimateOnScroll enterClass="animate-scalein" leaveClass="animate-fadeout" class="flex box shadow-lg justify-center items-center h-40 w-40 sm:h-60 sm:w-60 rounded-border animate-duration-1000 animate-ease-in-out">
        <span class="text-3xl font-bold">scalein</span>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
    selector: 'animate-on-scroll-basic-demo',
    templateUrl: './animate-on-scroll-basic-demo.html',
    standalone: true,
    imports: [AnimateOnScrollModule],
    styles: [
        \`
            :host {
                @keyframes slidedown-icon {
                    0% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(20px);
                    }

                    100% {
                        transform: translateY(0);
                    }
                }

                .slidedown-icon {
                    animation: slidedown-icon;
                    animation-duration: 3s;
                    animation-iteration-count: infinite;
                }

                .box {
                    background-image: radial-gradient(var(--primary-300), var(--primary-600));
                    border-radius: 50% !important;
                    color: var(--primary-color-text);
                }
            }
        \`
    ]
})
export class AnimateOnScrollBasicDemo {}`
    };
}
