# Angular Ripple Component

Ripple directive adds ripple effect to the host element.

## accessibility-doc

Screen Reader Ripple element has the aria-hidden attribute as true so that it gets ignored by the screen readers. Keyboard Support Component does not include any interactive elements.

## custom-doc

Styling Demo Content.

## default-doc

Default Demo Content.

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

