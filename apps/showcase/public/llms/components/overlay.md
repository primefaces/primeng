# Overlay API - PrimeNG

This API allows overlay components to be controlled from the PrimeNG. In this way, all overlay components in the application can have the same behavior.

## Accessibility

Screen Reader Overlay component uses dialog role and since any attribute is passed to the root element you may define attributes like aria-label or aria-labelledby to describe the popup contents. In addition aria-modal is added since focus is kept within the popup. It is recommended to use a trigger component that can be accessed with keyboard such as a button, if not adding tabIndex would be necessary. Overlay adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined. Overlay Keyboard Support When the popup gets opened, the first focusable element receives the focus and this can be customized by adding autofocus to an element within the popup. Key Function tab Moves focus to the next the focusable element within the popup. shift + tab Moves focus to the previous the focusable element within the popup. escape Closes the popup and moves focus to the trigger. Close Button Keyboard Support Key Function enter Closes the popup and moves focus to the trigger. space Closes the popup and moves focus to the trigger.

## appendtodoc

Overlay can be mounted into its location, body or DOM element instance using this option.

<details>
<summary>TypeScript Example</summary>

```typescript
import { OverlayOptions } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

this.primeng.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};
```
</details>

## autozindexdoc

The autoZIndex determines whether to automatically manage layering. Its default value is 'false'.

## basezindexdoc

The baseZIndex is base zIndex value to use in layering. Its default value is 0.

## Basic

Overlay is a container to display content in an overlay window. All the options mentioned above can be used as props for this component.

```html
<p-button (click)="toggle()" label="Show Overlay"></p-button>
<p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border">
    Content
</p-overlay>
```

## Events

<details>
<summary>TypeScript Example</summary>

```typescript
import { OverlayOptions, OverlayOnBeforeShowEvent, OverlayOnShowEvent, OverlayOnBeforeHideEvent, OverlayOnHideEvent } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

this.primeng.overlayOptions: OverlayOptions = {
    onBeforeShow: (event?: OverlayOnBeforeShowEvent) => {};    // Callback to invoke before the overlay is shown.
    onShow: (event?: OverlayOnShowEvent) => {};                // Callback to invoke when the overlay is shown.
    onBeforeHide: (event?: OverlayOnBeforeHideEvent) => {};    // Callback to invoke before the overlay is hidden.
    onHide: (event?: OverlayOnHideEvent) => {};                // Callback to invoke when the overlay is hidden.
    onAnimationStart: (event?: AnimationEvent) => {};          // Callback to invoke when the animation is started.
    onAnimationDone: (event?: AnimationEvent) => {};           // Callback to invoke when the animation is done.
};
```
</details>

## hideonescapedoc

The hideOnEscape determines to hide the overlay when escape key pressed. Accepts boolean, default value is false .

## Mode

It has two valid values; overlay and modal . In overlay mode, a container element is opened like overlaypanel or dropdown's panel. In modal mode, the container element behaves like popup. This behaviour is similar to a dialog component.

<details>
<summary>TypeScript Example</summary>

```typescript
import { OverlayOptions } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.overlayOptions: OverlayOptions = {
            mode: 'modal'
        };
    }
}
```
</details>

## Responsive

It is the option used to determine in which mode it should appear according to the given media or breakpoint .

```html
import { OverlayOptions, ResponsiveOverlayDirectionType } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

const responsiveOptions: ResponsiveOverlayOptions = {
    // style?: any;                                     // Style of component in given breakpoint or media query
    // styleClass?: string;                             // Style class of component in given breakpoint or media query
    // contentStyle?: any;                              // Style of content in given breakpoint or media query
    // contentStyleClass?: string;                      // Style class of content in given breakpoint or media query
    // breakpoint?: string;                             // Breakpoint required to show component in modal mode. Exp: '640px', '10rem' etc.
    // media?: string;                                  // Media query required to show component in modal mode. Exp: '@media screen and (max-width: 640px)', '@media screen and (min-width: 640px) and (max-width: 900px)' etc.
    // direction?: ResponsiveOverlayDirectionType;      // Direction in which the component will be displayed in modal mode.
    // hideOnEscape?: boolean;                          // Hides overlay when escape key pressed.
}

this.primeng.overlayOptions: OverlayOptions = {
    responsive: responsiveOptions
};
```

## Style

The style and styleClass are used to define styles that will be added to all overlay components. In addition, it can be used in contentStyle and contentStyleClass classes.

## Target

The target is used to detect the element that will be used to position the overlay. Valid values would be;

```html
import { OverlayOptions } from 'primeng/api';
import { PrimeNG } from 'primeng/config';

this.primeng.overlayOptions: OverlayOptions = {
    appendTo: 'body'
};
```

## Template

Content can be customized with the content template.

```html
<p-button (click)="toggle()" label="Show Overlay"></p-button>
<p-overlay [(visible)]="overlayVisible" [responsive]="{ breakpoint: '640px', direction: 'bottom', contentStyleClass: 'h-20rem' }" contentStyleClass="p-6 bg-surface-0 dark:bg-surface-900 shadow rounded-border">
    <ng-template #content let-option>
        Content - {{option.mode}}
    </ng-template>
</p-overlay>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'overlay-template-demo',
    templateUrl: './overlay-template-demo.html'
})
export class OverlayTemplateDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }
}
```
</details>

## transitionoptionsdoc

Transition options of the show or hide animation. The default value of showTransitionOptions is '.12s cubic-bezier(0, 0, 0.2, 1)' and the default value of hideTransitionOptions is '.1s linear'.

## Overlay

This API allows overlay components to be controlled from the PrimeNG. In this way, all overlay components in the application can have the same behavior.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<any> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| enterAnimation | string | p-overlay-enter | Enter animation class name. |
| leaveAnimation | string | p-overlay-leave | Leave animation class name. |
| visible | boolean | - | The visible property is an input that determines the visibility of the component. |
| mode | string | - | The mode property is an input that determines the overlay mode type or string. |
| style | { [klass: string]: any } | - | The style property is an input that determines the style object for the component. |
| styleClass | string | - | The styleClass property is an input that determines the CSS class(es) for the component. |
| contentStyle | { [klass: string]: any } | - | The contentStyle property is an input that determines the style object for the content of the component. |
| contentStyleClass | string | - | The contentStyleClass property is an input that determines the CSS class(es) for the content of the component. |
| target | string | - | The target property is an input that specifies the target element or selector for the component. |
| autoZIndex | boolean | - | The autoZIndex determines whether to automatically manage layering. Its default value is 'false'. |
| baseZIndex | number | - | The baseZIndex is base zIndex value to use in layering. |
| showTransitionOptions | string | - | Transition options of the show or hide animation. |
| hideTransitionOptions | string | - | The hideTransitionOptions property is an input that determines the CSS transition options for hiding the component. |
| listener | any | - | The listener property is an input that specifies the listener object for the component. |
| responsive | ResponsiveOverlayOptions | - | It is the option used to determine in which mode it should appear according to the given media or breakpoint. |
| options | OverlayOptions | - | The options property is an input that specifies the overlay options for the component. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| visibleChange | value: boolean | This EventEmitter is used to notify changes in the visibility state of a component. |
| onBeforeShow | event: OverlayOnBeforeShowEvent | Callback to invoke before the overlay is shown. |
| onShow | event: OverlayOnShowEvent | Callback to invoke when the overlay is shown. |
| onBeforeHide | event: OverlayOnBeforeHideEvent | Callback to invoke before the overlay is hidden. |
| onHide | event: OverlayOnHideEvent | Callback to invoke when the overlay is hidden |
| onAnimationStart | value: any | Callback to invoke when the animation is started. |
| onAnimationDone | value: any | Callback to invoke when the animation is done. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<any> | Content template of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |

