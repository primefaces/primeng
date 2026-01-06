# Angular Knob Component

Knob is a form component to define number inputs with a dial.

## accessibility-doc

Screen Reader Knob element component uses slider role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using ariaLabelledBy and ariaLabel props.

## basic-doc

Knob is an input component and used with the standard ngModel directive.

## color-doc

Colors are customized with the textColor , rangeColor and valueColor properties.

## disabled-doc

When disabled is present, a visual hint is applied to indicate that the Knob cannot be interacted with.

## minmax-doc

Boundaries are configured with the min and max properties whose defaults are 0 and 100 respectively.

## reactive-doc

Knob can be controlled with custom controls as well.

## reactiveforms-doc

Knob can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## readonly-doc

When readonly present, value cannot be edited.

## size-doc

Diameter of the knob is defined in pixels using the size property.

## step-doc

Size of each movement is defined with the step property.

## stroke-doc

The border size is specified with the strokeWidth property as a number in pixels.

## template-doc

Label is a string template that can be customized with the valueTemplate property having 60 as the placeholder .

## Knob

Knob is a form component to define number inputs with a dial.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<KnobPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| valueColor | string | ... | Background of the value. |
| rangeColor | string | ... | Background color of the range. |
| textColor | string | ... | Color of the value text. |
| valueTemplate | string | {value} | Template string of the value. |
| size | number | 100 | Size of the component in pixels. |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| step | number | 1 | Step factor to increment/decrement the value. |
| strokeWidth | number | 14 | Width of the knob stroke. |
| showValue | boolean | true | Whether the show the value inside the knob. |
| readonly | boolean | false | When present, it specifies that the component value cannot be edited. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | value: number | Callback to invoke on value change. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| svg | PassThroughOption<SVGElement, I> | Used to pass attributes to the SVG's DOM element. |
| range | PassThroughOption<SVGPathElement, I> | Used to pass attributes to the range's DOM element. |
| value | PassThroughOption<SVGPathElement, I> | Used to pass attributes to the value's DOM element. |
| text | PassThroughOption<SVGTextElement, I> | Used to pass attributes to the text's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-knob | Class name of the root element |
| p-knob-range | Class name of the range element |
| p-knob-value | Class name of the value element |
| p-knob-text | Class name of the text element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| knob.transition.duration | --p-knob-transition-duration | Transition duration of root |
| knob.focus.ring.width | --p-knob-focus-ring-width | Focus ring width of root |
| knob.focus.ring.style | --p-knob-focus-ring-style | Focus ring style of root |
| knob.focus.ring.color | --p-knob-focus-ring-color | Focus ring color of root |
| knob.focus.ring.offset | --p-knob-focus-ring-offset | Focus ring offset of root |
| knob.focus.ring.shadow | --p-knob-focus-ring-shadow | Focus ring shadow of root |
| knob.value.background | --p-knob-value-background | Background of value |
| knob.range.background | --p-knob-range-background | Background of range |
| knob.text.color | --p-knob-text-color | Color of text |

