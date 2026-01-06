# Angular InputNumber Component

InputNumber is an input component to provide numerical input.

## accessibility-doc

Screen Reader Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel , ariaDescribedBy props. The input element uses spinbutton role in addition to the aria-valuemin , aria-valuemax and aria-valuenow attributes.

## buttons-doc

Spinner buttons are enabled using the showButtons options and layout is defined with the buttonLayout . Default value is "stacked" whereas "horizontal" and "stacked" are alternatives. Note that even there are no buttons, up and down arrow keys can be used to spin the values with keyboard.

## clearicon-doc

When showClear is enabled, a clear icon is displayed to clear the value.

## currency-doc

Currency formatting is specified by setting the mode option to currency and currency property. In addition currencyDisplay option allows how the currency is displayed, valid values are "symbol" (default) or "code".

## disabled-doc

When disabled is present, the element cannot be edited and focused.

## filled-doc

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

## floatlabel-doc

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

## fluid-doc

The fluid prop makes the component take up the full width of its container when set to true.

## iftalabel-doc

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

## invalid-doc

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

## locale-doc

Localization information such as grouping and decimal symbols are defined with the locale property which defaults to the user locale.

## numerals-doc

InputNumber is used as a controlled input with ngModel property.

## prefixsuffix-doc

Custom texts e.g. units can be placed before or after the input section with the prefix and suffix properties.

## reactiveforms-doc

InputNumber can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## sizes-doc

InputNumber provides small and large sizes as alternatives to the base.

## vertical-doc

Buttons can also placed vertically by setting buttonLayout as vertical .

## Input Number

InputNumber is an input component to provide numerical input.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<InputNumberPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| fluid | InputSignalWithTransform<boolean, unknown> | false | Spans 100% width of the container when enabled. |
| variant | InputSignal<"outlined" \| "filled"> | 'outlined' | Specifies the input variant of the component. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| inputSize | InputSignal<number> | undefined | Specifies the visible width of the input element in characters. |
| pattern | InputSignal<string> | undefined | Specifies the value must match the pattern. |
| min | InputSignal<number> | undefined | The value must be greater than or equal to the value. |
| max | InputSignal<number> | undefined | The value must be less than or equal to the value. |
| step | InputSignal<number> | undefined | Unless the step is set to the any literal, the value must be min + an integral multiple of the step. |
| minlength | InputSignal<number> | undefined | The number of characters (code points) must not be less than the value of the attribute, if non-empty. |
| maxlength | InputSignal<number> | undefined | The number of characters (code points) must not exceed the value of the attribute. |
| showButtons | boolean | false | Displays spinner buttons. |
| format | boolean | true | Whether to format the value. |
| buttonLayout | string | stacked | Layout of the buttons, valid values are "stacked" (default), "horizontal" and "vertical". |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| placeholder | string | - | Advisory information to display on input. |
| tabindex | number | - | Specifies tab order of the element. |
| title | string | - | Title text of the input text. |
| ariaLabelledBy | string | - | Specifies one or more IDs in the DOM that labels the input field. |
| ariaDescribedBy | string | - | Specifies one or more IDs in the DOM that describes the input field. |
| ariaLabel | string | - | Used to define a string that labels the input element. |
| ariaRequired | boolean | false | Used to indicate that user input is required on an element before a form can be submitted. |
| autocomplete | string | - | Used to define a string that autocomplete attribute the current element. |
| incrementButtonClass | string | - | Style class of the increment button. |
| decrementButtonClass | string | - | Style class of the decrement button. |
| incrementButtonIcon | string | - | Style class of the increment button. |
| decrementButtonIcon | string | - | Style class of the decrement button. |
| readonly | boolean | false | When present, it specifies that an input field is read-only. |
| allowEmpty | boolean | true | Determines whether the input field is empty. |
| locale | string | - | Locale to be used in formatting. |
| localeMatcher | any | - | The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". See Locale Negotiation for details. |
| mode | any | decimal | Defines the behavior of the component, valid values are "decimal" and "currency". |
| currency | string | - | The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB. There is no default value; if the style is "currency", the currency property must be provided. |
| currencyDisplay | any | - | How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, ü"code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol". |
| useGrouping | boolean | true | Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. |
| minFractionDigits | number | - | The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information). |
| maxFractionDigits | number | - | The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information). |
| prefix | string | - | Text to display before the value. |
| suffix | string | - | Text to display after the value. |
| inputStyle | any | - | Inline style of the input field. |
| inputStyleClass | string | - | Style class of the input field. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onInput | event: InputNumberInputEvent | Callback to invoke on input. |
| onFocus | event: Event | Callback to invoke when the component receives focus. |
| onBlur | event: Event | Callback to invoke when the component loses focus. |
| onKeyDown | event: KeyboardEvent | Callback to invoke on input key press. |
| onClear | value: void | Callback to invoke when clear token is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| clearicon | TemplateRef<void> | Custom clear icon template. |
| incrementbuttonicon | TemplateRef<void> | Custom increment button icon template. |
| decrementbuttonicon | TemplateRef<void> | Custom decrement button icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| pcInputText | InputTextPassThrough | Used to pass attributes to the InputText component. |
| clearIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the clear icon's DOM element. |
| buttonGroup | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the button group's DOM element. |
| incrementButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the increment button's DOM element. |
| decrementButton | PassThroughOption<HTMLButtonElement, I> | Used to pass attributes to the decrement button's DOM element. |
| incrementButtonIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the increment button icon's DOM element. |
| decrementButtonIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the decrement button icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputnumber | Class name of the root element |
| p-inputnumber-input | Class name of the input element |
| p-inputnumber-button-group | Class name of the button group element |
| p-inputnumber-increment-button | Class name of the increment button element |
| p-inputnumber-decrement-button | Class name of the decrement button element |
| p-autocomplete-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| inputnumber.transition.duration | --p-inputnumber-transition-duration | Transition duration of root |
| inputnumber.button.width | --p-inputnumber-button-width | Width of button |
| inputnumber.button.border.radius | --p-inputnumber-button-border-radius | Border radius of button |
| inputnumber.button.vertical.padding | --p-inputnumber-button-vertical-padding | Vertical padding of button |
| inputnumber.button.background | --p-inputnumber-button-background | Background of button |
| inputnumber.button.hover.background | --p-inputnumber-button-hover-background | Hover background of button |
| inputnumber.button.active.background | --p-inputnumber-button-active-background | Active background of button |
| inputnumber.button.border.color | --p-inputnumber-button-border-color | Border color of button |
| inputnumber.button.hover.border.color | --p-inputnumber-button-hover-border-color | Hover border color of button |
| inputnumber.button.active.border.color | --p-inputnumber-button-active-border-color | Active border color of button |
| inputnumber.button.color | --p-inputnumber-button-color | Color of button |
| inputnumber.button.hover.color | --p-inputnumber-button-hover-color | Hover color of button |
| inputnumber.button.active.color | --p-inputnumber-button-active-color | Active color of button |

