# Angular ColorPicker Component

ColorPicker is an input component to select a color.

## accessibility-doc

Screen Reader Specification does not cover a color picker yet and using a semantic native color picker is not consistent across browsers so currently component is not compatible with screen readers. In the upcoming versions, text fields will be introduced below the slider section to be able to pick a color using accessible text boxes in hsl, rgba and hex formats.

## basic-doc

ColorPicker is used as a controlled input with ngModel property.

## disabled-doc

When disabled is present, the element cannot be edited and focused.

## format-doc

Default color format to use in value binding is hex and other possible values can be rgb and hsb using the format property.

## inline-doc

ColorPicker is displayed as a popup by default, add inline property to customize this behavior.

## reactiveforms-doc

ColorPicker can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## Color Picker

ColorPicker groups a collection of contents in tabs.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ColorPickerPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| inline | boolean | false | Whether to display as an overlay or not. |
| format | "rgb" \| "hex" \| "hsb" | hex | Format to use in value binding. |
| tabindex | string | - | Index of the element in tabbing order. |
| inputId | string | - | Identifier of the focus input to match a label defined for the dropdown. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| defaultColor | string | ff0000 | Default color to display initially when model value is not present. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| overlayOptions | InputSignal<OverlayOptions> | ... | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: ColorPickerChangeEvent | Callback to invoke on value change. |
| onShow | value: any | Callback to invoke on panel is shown. |
| onHide | value: any | Callback to invoke on panel is hidden. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| preview | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the preview input's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| colorSelector | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color selector's DOM element. |
| colorBackground | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color background's DOM element. |
| colorHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the color handle's DOM element. |
| hue | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hue's DOM element. |
| hueHandle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hue handle's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-colorpicker | Class name of the root element |
| p-colorpicker-preview | Class name of the preview element |
| p-colorpicker-panel | Class name of the panel element |
| p-colorpicker-color-selector | Class name of the color selector element |
| p-colorpicker-color-background | Class name of the color background element |
| p-colorpicker-color-handle | Class name of the color handle element |
| p-colorpicker-hue | Class name of the hue element |
| p-colorpicker-hue-handle | Class name of the hue handle element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| colorpicker.transition.duration | --p-colorpicker-transition-duration | Transition duration of root |
| colorpicker.preview.width | --p-colorpicker-preview-width | Width of preview |
| colorpicker.preview.height | --p-colorpicker-preview-height | Height of preview |
| colorpicker.preview.border.radius | --p-colorpicker-preview-border-radius | Border radius of preview |
| colorpicker.preview.focus.ring.width | --p-colorpicker-preview-focus-ring-width | Focus ring width of preview |
| colorpicker.preview.focus.ring.style | --p-colorpicker-preview-focus-ring-style | Focus ring style of preview |
| colorpicker.preview.focus.ring.color | --p-colorpicker-preview-focus-ring-color | Focus ring color of preview |
| colorpicker.preview.focus.ring.offset | --p-colorpicker-preview-focus-ring-offset | Focus ring offset of preview |
| colorpicker.preview.focus.ring.shadow | --p-colorpicker-preview-focus-ring-shadow | Focus ring shadow of preview |
| colorpicker.panel.shadow | --p-colorpicker-panel-shadow | Shadow of panel |
| colorpicker.panel.border.radius | --p-colorpicker-panel-border-radius | Border radius of panel |
| colorpicker.panel.background | --p-colorpicker-panel-background | Background of panel |
| colorpicker.panel.border.color | --p-colorpicker-panel-border-color | Border color of panel |
| colorpicker.handle.color | --p-colorpicker-handle-color | Color of handle |

