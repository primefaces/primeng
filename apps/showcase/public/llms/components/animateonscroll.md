# Angular Animate On Scroll Directive

AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.

## accessibility-doc

Screen Reader AnimateOnScroll does not require any roles and attributes. Keyboard Support Component does not include any interactive elements.

## basic-doc

Animation classes are defined with the enterClass and leaveClass properties. This example utilizes tailwindcss-primeui plugin animations however any valid CSS animation is supported.

## Animate On Scroll

AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| enterClass | string | - | Selector to define the CSS class for enter animation. |
| leaveClass | string | - | Selector to define the CSS class for leave animation. |
| root | HTMLElement | - | Specifies the root option of the IntersectionObserver API. |
| rootMargin | string | - | Specifies the rootMargin option of the IntersectionObserver API. |
| threshold | number | 0.5 | Specifies the threshold option of the IntersectionObserver API |
| once | boolean | false | Whether the scroll event listener should be removed after initial run. |
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<any> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |

