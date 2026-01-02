# Angular Scroll Top Component

ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.

## Accessibility

Screen Reader ScrollTop uses a button element with an aria-label that refers to the aria.scrollTop property of the locale API by default, you may use your own aria roles and attributes as any valid attribute is passed to the button element implicitly.

## Basic

ScrollTop listens window scroll by default.

```html
<p>Scroll down the page to display the ScrollTo component.</p>
<i class="pi pi-angle-down animate-fadeout animate-duration-1000 animate-infinite" style="fontsize: 2rem; margin-bottom: 30rem"></i>
<p-scrolltop />
```

## Target Element

Setting the target property to parent binds ScrollTop to its parent element that has scrolling content.

```html
<div style="width: 250px; height: 200px; overflow: auto">
    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
    adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue
    mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus.
    Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan
    in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
</p>
<p-scrolltop target="parent" [threshold]="100" icon="pi pi-arrow-up" [buttonProps]="{ severity: 'contrast', raised: true, rounded: true }" />
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
    template: `
        <div class="card flex justify-center">
            <div style="width: 250px; height: 200px; overflow: auto">
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam. Ultricies mi quis hendrerit dolor magna eget est lorem. Amet consectetur
                adipiscing elit ut. Nam libero justo laoreet sit amet. Pharetra massa massa ultricies mi quis hendrerit dolor magna. Est ultricies integer quis auctor elit sed vulputate. Consequat ac felis donec et. Tellus orci ac auctor augue
                mauris. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Tincidunt arcu non sodales neque sodales. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices. Sodales ut etiam sit amet nisl purus.
                Cursus sit amet dictum sit amet. Tristique senectus et netus et malesuada fames ac turpis egestas. Et tortor consequat id porta nibh venenatis cras sed. Diam maecenas ultricies mi eget mauris. Eget egestas purus viverra accumsan
                in nisl nisi. Suscipit adipiscing bibendum est ultricies integer. Mattis aliquam faucibus purus in massa tempor nec.
            </p>
            <p-scrolltop target="parent" [threshold]="100" icon="pi pi-arrow-up" [buttonProps]="{ severity: 'contrast', raised: true, rounded: true }" />
        </div>
        </div>
    `,
    standalone: true,
    imports: [ScrollTopModule]
})
export class ScrollTopElementDemo {}
```
</details>

## Scroll Top

ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ScrollTopPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| styleClass | string | - | Class of the element. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| target | "window" \| "parent" | window | Target of the ScrollTop. |
| threshold | number | 400 | Defines the threshold value of the vertical scroll position of the target to toggle the visibility. |
| icon | string | - | Name of the icon or JSX.Element for icon. |
| behavior | "auto" \| "smooth" | smooth | Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump. |
| showTransitionOptions | string | .15s | A string value used to determine the display transition options. **(Deprecated)** |
| hideTransitionOptions | string | .15s | A string value used to determine the hiding transition options. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| buttonAriaLabel | string | - | Establishes a string value that labels the scroll-top button. |
| buttonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the Button component. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| icon | TemplateRef<ScrollTopIconTemplateContext> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-scrolltop | Class name of the root element |
| p-scrolltop-icon | Class name of the icon element |

