import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'hide-on-resize-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, StyleClassModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                When <i>hideOnResize</i> is enabled, the leave animation is triggered automatically when resizing occurs. Use the <i>resizeSelector</i> property to specify whether to listen to window resize events or element-specific resize events.
                Set <i>resizeSelector</i> to "window" (default) or "document" for browser resize, or a CSS selector to observe the target element's dimensions.
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-center">
                <div class="flex flex-col items-center gap-4 w-[25rem]">
                    <p-button
                        pStyleClass=".window-responsive-box"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveActiveClass="animate-fadeout"
                        leaveToClass="hidden"
                        [hideOnResize]="true"
                        resizeSelector="window"
                        label="Show Window Responsive Content"
                    />
                    <div class="window-responsive-box hidden animate-duration-300 border border-lg border-surface">
                        <div class="p-4 flex flex-col gap-2">
                            <h3 class="text-xl font-bold">Window Responsive Panel</h3>
                            <p class="text-sm">This panel will hide when you resize the browser window.</p>
                            <p class="text-sm">Try resizing your browser window to see the effect.</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center gap-4 w-[25rem]">
                    <p-button
                        pStyleClass=".resizable-container"
                        enterFromClass="hidden"
                        enterActiveClass="animate-fadein"
                        leaveActiveClass="animate-fadeout"
                        leaveToClass="hidden"
                        [hideOnResize]="true"
                        resizeSelector=".resizable-container"
                        label="Show Resizable Panel"
                    />

                    <div class="resizable-container hidden animate-duration-300 border border-lg border-surface w-[20rem] w-max-[25rem] w-min-[15rem] overflow-auto resize">
                        <div class="p-4 h-full flex flex-col gap-2">
                            <h3 class="text-xl font-bold">Resizable Panel</h3>
                            <p class="text-sm">Drag the resize handle in the bottom-right corner to resize this panel.</p>
                            <p class="text-sm">The panel will hide when you resize it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="hide-on-resize-demo"></app-code>
    `
})
export class HideOnResizeDoc {
    code: Code = {
        basic: `<div class="flex justify-center">
    <div class="flex flex-col items-center gap-4 w-[25rem]">
        <p-button pStyleClass=".window-responsive-box" enterFromClass="hidden" enterActiveClass="animate-fadein" leaveActiveClass="animate-fadeout" leaveToClass="hidden" [hideOnResize]="true" label="Show Window Responsive Content" />
        <div class="window-responsive-box hidden animate-duration-300 border border-lg border-surface">
            <div class="p-4 flex flex-col gap-2">
                <h3 class="text-xl font-bold">Window Responsive Panel</h3>
                <p class="text-sm">This panel will hide when you resize the browser window.</p>
                <p class="text-sm">Try resizing your browser window to see the effect.</p>
            </div>
        </div>
    </div>

    <div class="flex flex-col items-center gap-4 w-[25rem]">
        <p-button
            pStyleClass=".resizable-container"
            enterFromClass="hidden"
            enterActiveClass="animate-fadein"
            leaveActiveClass="animate-fadeout"
            leaveToClass="hidden"
            [hideOnResize]="true"
            resizeSelector=".resizable-container"
            label="Show Resizable Panel"
        />

        <div class="resizable-container hidden animate-duration-300 border border-lg border-surface w-[20rem] w-max-[25rem] w-min-[15rem] overflow-auto resize">
            <div class="p-4 h-full flex flex-col gap-2">
                <h3 class="text-xl font-bold">Resizable Panel</h3>
                <p class="text-sm">Drag the resize handle in the bottom-right corner to resize this panel.</p>
                <p class="text-sm">The panel will hide when you resize it.</p>
            </div>
        </div>
    </div>
</div>`,
        html: `<div class="card">
    <div class="flex justify-center">
        <div class="flex flex-col items-center gap-4 w-[25rem]">
            <p-button pStyleClass=".window-responsive-box" enterFromClass="hidden" enterActiveClass="animate-fadein" leaveActiveClass="animate-fadeout" leaveToClass="hidden" [hideOnResize]="true" resizeSelector="window" label="Show Window Responsive Content" />
            <div class="window-responsive-box hidden animate-duration-300 border border-lg border-surface">
                <div class="p-4 flex flex-col gap-2">
                    <h3 class="text-xl font-bold">Window Responsive Panel</h3>
                    <p class="text-sm">This panel will hide when you resize the browser window.</p>
                    <p class="text-sm">Try resizing your browser window to see the effect.</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center gap-4 w-[25rem]">
            <p-button
                pStyleClass=".resizable-container"
                enterFromClass="hidden"
                enterActiveClass="animate-fadein"
                leaveActiveClass="animate-fadeout"
                leaveToClass="hidden"
                [hideOnResize]="true"
                resizeSelector=".resizable-container"
                label="Show Resizable Panel"
            />

            <div class="resizable-container hidden animate-duration-300 border border-lg border-surface w-[20rem] w-max-[25rem] w-min-[15rem] overflow-auto resize">
                <div class="p-4 h-full flex flex-col gap-2">
                    <h3 class="text-xl font-bold">Resizable Panel</h3>
                    <p class="text-sm">Drag the resize handle in the bottom-right corner to resize this panel.</p>
                    <p class="text-sm">The panel will hide when you resize it.</p>
                </div>
            </div>
        </div>
    </div>
</div>`,
        typescript: `import { Component } from '@angular/core';
import { StyleClass } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'hide-on-resize-demo',
    templateUrl: './hide-on-resize-demo.html',
    standalone: true,
    imports: [StyleClass, ButtonModule]
})
export class HideOnResizeDemo {}`
    };
}
