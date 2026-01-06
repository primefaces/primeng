# Angular Slider Component

Slider is a component to provide input with a drag handle.

## accessibility-doc

Screen Reader Slider element component uses slider role on the handle in addition to the aria-orientation , aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using ariaLabelledBy and ariaLabel props.

## basic-doc

Two-way binding is defined using the standard ngModel directive.

## filter-doc

Image filter implementation using multiple sliders.

## input-doc

Slider is connected to an input field using two-way binding.

## range-doc

When range property is present, slider provides two handles to define two values. In range mode, value should be an array instead of a single value.

## reactiveforms-doc

Slider can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## step-doc

Size of each movement is defined with the step property.

## vertical-doc

Default layout of slider is horizontal , use orientation property for the alternative vertical mode.

## Slider

Slider is a component to provide input with a drag handle.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SliderPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| animate | boolean | false | When enabled, displays an animation on click of the slider bar. |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| orientation | "vertical" \| "horizontal" | horizontal | Orientation of the slider. |
| step | number | - | Step factor to increment/decrement the value. |
| range | boolean | false | When specified, allows two boundary values to be picked. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: SliderChangeEvent | Callback to invoke on value change. |
| onSlideEnd | event: SliderSlideEndEvent | Callback to invoke when slide ended. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| range | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the range's DOM element. |
| handle | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the handle's DOM element. |
| startHandler | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the start handler's DOM element. |
| endHandler | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the end handler's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-slider | Class name of the root element |
| p-slider-range | Class name of the range element |
| p-slider-handle | Class name of the handle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| slider.transition.duration | --p-slider-transition-duration | Transition duration of root |
| slider.track.background | --p-slider-track-background | Background of track |
| slider.track.border.radius | --p-slider-track-border-radius | Border radius of track |
| slider.track.size | --p-slider-track-size | Size of track |
| slider.range.background | --p-slider-range-background | Background of range |
| slider.handle.width | --p-slider-handle-width | Width of handle |
| slider.handle.height | --p-slider-handle-height | Height of handle |
| slider.handle.border.radius | --p-slider-handle-border-radius | Border radius of handle |
| slider.handle.background | --p-slider-handle-background | Background of handle |
| slider.handle.hover.background | --p-slider-handle-hover-background | Hover background of handle |
| slider.handle.content.border.radius | --p-slider-handle-content-border-radius | Content border radius of handle |
| slider.handle.content.background | --p-slider-handle-content-background | Background of handle |
| slider.handle.content.hover.background | --p-slider-handle-content-hover-background | Content hover background of handle |
| slider.handle.content.width | --p-slider-handle-content-width | Content width of handle |
| slider.handle.content.height | --p-slider-handle-content-height | Content height of handle |
| slider.handle.content.shadow | --p-slider-handle-content-shadow | Content shadow of handle |
| slider.handle.focus.ring.width | --p-slider-handle-focus-ring-width | Focus ring width of handle |
| slider.handle.focus.ring.style | --p-slider-handle-focus-ring-style | Focus ring style of handle |
| slider.handle.focus.ring.color | --p-slider-handle-focus-ring-color | Focus ring color of handle |
| slider.handle.focus.ring.offset | --p-slider-handle-focus-ring-offset | Focus ring offset of handle |
| slider.handle.focus.ring.shadow | --p-slider-handle-focus-ring-shadow | Focus ring shadow of handle |

