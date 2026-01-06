# Angular SelectButton Component

SelectButton is used to choose single or multiple items from a list using buttons.

## accessibility-doc

Screen Reader The container element that wraps the buttons has a group role whereas each button element uses button role and aria-pressed is updated depending on selection state. Value to describe an option is automatically set using the ariaLabel property that refers to the label of an option so it is still suggested to define a label even the option display consists of presentational content like icons only.

## basic-doc

SelectButton requires a value to bind and a collection of options.

## disabled-doc

When disabled is present, the element cannot be edited and focused entirely. Certain options can also be disabled using the optionDisabled property.

## fluid-doc

The fluid prop makes the component take up the full width of its container when set to true.

## invalid-doc

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

## multiple-doc

SelectButton allows selecting only one item by default and setting multiple option enables choosing more than one item. In multiple case, model property should be an array.

## reactiveforms-doc

SelectButton can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## sizes-doc

SelectButton provides small and large sizes as alternatives to the base.

## template-doc

For custom content support define a template named item where the default local template variable refers to an option.

## Select Button

SelectButton is used to choose single or multiple items from a list using buttons.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SelectButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| options | any[] | - | An array of selectitems to display as the available options. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionDisabled | string | - | Name of the disabled field of an option. |
| unselectable | boolean | - | Whether selection can be cleared. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| multiple | boolean | false | When specified, allows selecting multiple values. |
| allowEmpty | boolean | true | Whether selection can not be cleared. |
| styleClass | string | - | Style class of the component. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onOptionClick | event: SelectButtonOptionClickEvent | Callback to invoke on input click. |
| onChange | event: SelectButtonChangeEvent | Callback to invoke on selection change. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<SelectButtonItemTemplateContext> | Custom item template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcToggleButton | ToggleButtonPassThrough | Used to pass attributes to the ToggleButton component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-selectbutton | Class name of the root element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| selectbutton.border.radius | --p-selectbutton-border-radius | Border radius of root |
| selectbutton.invalid.border.color | --p-selectbutton-invalid-border-color | Invalid border color of root |

