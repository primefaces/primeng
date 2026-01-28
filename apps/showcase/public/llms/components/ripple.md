# Angular Ripple Component

Ripple directive adds ripple effect to the host element.

## Accessibility

Screen Reader Ripple element has the aria-hidden attribute as true so that it gets ignored by the screen readers. Keyboard Support Component does not include any interactive elements.

## Custom

Styling Demo Content.

```typescript
import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@Component({
    template: `
        <div class="card flex flex-col gap-4 items-center">
            <span
                >Ripple option at the
                <span class="mx-1 h-8 w-8 rounded-border inline-flex items-center justify-center bg-primary text-primary-contrast"><i class="pi pi-palette"></i></span>
                configurator needs to be turned on for the demo.</span
            >
            <div class="flex justify-center gap-2">
                <div pRipple class="box" style="border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">Green</div>
                <div pRipple class="box" style="border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">Orange</div>
                <div pRipple class="box" style="border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">Purple</div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [RippleModule]
})
export class RippleCustomDemo {}
```

## Default

Default Demo Content.

```typescript
import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';

@Component({
    template: `
        <div class="card flex flex-col items-center gap-4">
            <span
                >Ripple option at the
                <span class="mx-1 h-8 w-8 rounded-border inline-flex items-center justify-center bg-primary text-primary-contrast"><i class="pi pi-palette"></i></span>
                configurator needs to be turned on for the demo.</span
            >
            <div pRipple class="ripple-box">Default</div>
        </div>
    `,
    standalone: true,
    imports: [RippleModule]
})
export class RippleDefaultDemo {}
```

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

