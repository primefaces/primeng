# Angular Fluid Component

Fluid is a layout component to make descendant components span full width of their container.

## Accessibility

Screen Reader Fluid does not require any roles and attributes. Keyboard Support Component does not include any interactive elements.

## Basic

Components with the fluid option like InputText have the ability to span the full width of their component. Enabling the fluid for each component individually may be cumbersome so wrap the content with Fluid to instead for an easier alternative. Any component that has the fluid property can be nested inside the Fluid component. The fluid property of a child component has higher precedence than the fluid container as shown in the last sample.

## Fluid

Fluid is a layout component to make descendant components span full width of their container.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<FluidPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-fluid | Class name of the root element |

