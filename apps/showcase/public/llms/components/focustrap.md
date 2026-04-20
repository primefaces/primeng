# Angular Focus Trap Component

Focus Trap keeps focus within a certain DOM element while tabbing.

## Basic

FocusTrap is applied to a container element with the pFocusTrap directive.

## Focus Trap

Focus Trap keeps focus within a certain DOM element while tabbing.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<any> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| pFocusTrapDisabled | boolean | false | When set as true, focus wouldn't be managed. |

