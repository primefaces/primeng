# Angular Ripple Component

Ripple directive adds ripple effect to the host element.

## Accessibility

Screen Reader Ripple element has the aria-hidden attribute as true so that it gets ignored by the screen readers. Keyboard Support Component does not include any interactive elements.

## Custom

Styling Demo Content.

```html
<div pRipple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">
    Green
</div>
<div pRipple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">
    Orange
</div>
<div pRipple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">
    Purple
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'ripple-custom-demo',
    templateUrl: './ripple-custom-demo.html',
    standalone: true,
    imports: [Ripple],
    styles: [
        \` :host {
                .box {
                    padding: 2rem;
                    border-radius: 10px;
                    width: 110px;
                    text-align: center;
                }
            }\`
    ],
})
export class RippleCustomDemo {
}
```
</details>

## Default

Default Demo Content.

```html
<div pRipple class="ripple-box">Default</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'ripple-default-demo',
    templateUrl: './ripple-default-demo.html',
    styles: [
        \` :host {
                .ripple-box {
                    display: flex;
                    user-select: none;
                    justify-content: center;
                    align-items: center;
                    padding: 3rem;
                    font-weight: bold;
                    background: var(--p-content-background);
                    border: 1px solid var(--p-content-border-color);
                    border-radius: var(--p-content-border-radius);
                }
            }\`
    ],
    standalone: true,
    imports: [Ripple]
})
export class RippleDefaultDemo {
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Ripple

Ripple directive adds ripple effect to the host element.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<any> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-ink | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| ripple.background | --p-ripple-background | Background of root |

