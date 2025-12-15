# Angular StyleClass Component

StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.

## Animation

Classes to apply during enter and leave animations are specified using the enterFromClass , enterActiveClass , enterToClass , leaveFromClass , leaveActiveClass , leaveToClass properties. In addition in case the target is an overlay, hideOnOutsideClick would be handy to hide the target if outside of the popup is clicked, or enable hideOnEscape to close the popup by listening escape key.

```html
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
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
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
export class StyleClassAnimationDemo {}
```
</details>

## Hide On Resize

When hideOnResize is enabled, the leave animation is triggered automatically when resizing occurs. Use the resizeSelector property to specify whether to listen to window resize events or element-specific resize events. Set resizeSelector to "window" (default) or "document" for browser resize, or a CSS selector to observe the target element's dimensions.

```html
<div class="flex flex-wrap justify-center gap-4">
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
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { StyleClass } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'hide-on-resize-demo',
    templateUrl: './hide-on-resize-demo.html',
    standalone: true,
    imports: [StyleClass, ButtonModule]
})
export class HideOnResizeDemo {}
```
</details>

## Toggle Class

StyleClass has two modes, toggleClass to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the selector property that accepts any valid CSS selector or keywords including &#64;next , prev , parent , grandparent

```html
<p-button label="Toggle Display" pStyleClass="@next" toggleClass="hidden" />
<input type="text" pInputText class="hidden mt-4" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { StyleClass } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'style-class-toggle-class-demo',
    templateUrl: './style-class-toggle-class-demo.html',
    standalone: true,
    imports: [StyleClass, InputTextModule, ButtonModule]
})
export class StyleClassToggleClassDemo {}
```
</details>

