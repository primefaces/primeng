# Angular Textarea Component

Textarea adds styling and autoResize functionality to standard textarea element.

## Accessibility

Screen Reader Textarea component renders a native textarea element that implicitly includes any passed prop. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby , aria-label props.

## AutoResize

When autoResize is enabled, textarea grows instead of displaying a scrollbar.

## Basic

Textarea is applied to an input field with pTextarea directive.

## Disabled

When disabled is present, the element cannot be edited and focused.

## Filled

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

## Float Label

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

## Fluid

The fluid prop makes the component take up the full width of its container when set to true.

## Ifta Label

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

## keyfilterdoc

InputText has built-in key filtering support to block certain keys, refer to keyfilter page for more information.

## reactiveformsdoc

Textarea can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## Sizes

Textarea provides small and large sizes as alternatives to the base.

## Textarea

Textarea adds styling and autoResize functionality to standard textarea element.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TextareaPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| pTextareaPT | InputSignal<TextareaPassThrough> | undefined | Used to pass attributes to DOM elements inside the Textarea component. |
| pTextareaUnstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| autoResize | boolean | false | When present, textarea size changes as being typed. |
| pSize | "small" \| "large" | - | Defines the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onResize | event: {} \| Event | Callback to invoke on textarea resize. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLTextAreaElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLTextAreaElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-textarea | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| textarea.background | --p-textarea-background | Background of root |
| textarea.disabled.background | --p-textarea-disabled-background | Disabled background of root |
| textarea.filled.background | --p-textarea-filled-background | Filled background of root |
| textarea.filled.hover.background | --p-textarea-filled-hover-background | Filled hover background of root |
| textarea.filled.focus.background | --p-textarea-filled-focus-background | Filled focus background of root |
| textarea.border.color | --p-textarea-border-color | Border color of root |
| textarea.hover.border.color | --p-textarea-hover-border-color | Hover border color of root |
| textarea.focus.border.color | --p-textarea-focus-border-color | Focus border color of root |
| textarea.invalid.border.color | --p-textarea-invalid-border-color | Invalid border color of root |
| textarea.color | --p-textarea-color | Color of root |
| textarea.disabled.color | --p-textarea-disabled-color | Disabled color of root |
| textarea.placeholder.color | --p-textarea-placeholder-color | Placeholder color of root |
| textarea.invalid.placeholder.color | --p-textarea-invalid-placeholder-color | Invalid placeholder color of root |
| textarea.shadow | --p-textarea-shadow | Shadow of root |
| textarea.padding.x | --p-textarea-padding-x | Padding x of root |
| textarea.padding.y | --p-textarea-padding-y | Padding y of root |
| textarea.border.radius | --p-textarea-border-radius | Border radius of root |
| textarea.focus.ring.width | --p-textarea-focus-ring-width | Focus ring width of root |
| textarea.focus.ring.style | --p-textarea-focus-ring-style | Focus ring style of root |
| textarea.focus.ring.color | --p-textarea-focus-ring-color | Focus ring color of root |
| textarea.focus.ring.offset | --p-textarea-focus-ring-offset | Focus ring offset of root |
| textarea.focus.ring.shadow | --p-textarea-focus-ring-shadow | Focus ring shadow of root |
| textarea.transition.duration | --p-textarea-transition-duration | Transition duration of root |
| textarea.sm.font.size | --p-textarea-sm-font-size | Sm font size of root |
| textarea.sm.padding.x | --p-textarea-sm-padding-x | Sm padding x of root |
| textarea.sm.padding.y | --p-textarea-sm-padding-y | Sm padding y of root |
| textarea.lg.font.size | --p-textarea-lg-font-size | Lg font size of root |
| textarea.lg.padding.x | --p-textarea-lg-padding-x | Lg padding x of root |
| textarea.lg.padding.y | --p-textarea-lg-padding-y | Lg padding y of root |

