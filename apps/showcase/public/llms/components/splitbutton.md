# Angular SplitButton Component

SplitButton groups a set of commands in an overlay with a default action item.

## accessibility-doc

Screen Reader SplitButton component renders two native button elements, main button uses the label property to define aria-label by default which can be customized with buttonProps . Dropdown button requires an explicit definition to describe it using menuButtonProps option and also includes aria-haspopup , aria-expanded for states along with aria-controls to define the relation between the popup and the button. The popup overlay uses menu role on the list and each action item has a menuitem role with an aria-label as the menuitem label. The id of the menu refers to the aria-controls of the dropdown button.

## basic-doc

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

## disabled-doc

When the disabled attribute is present, the element is uneditable and unfocused. Additionally, the disabled states of the button and menu button can be handled independently. The button is disabled when buttonDisabled is present, and the menu button is disabled when menuButtonDisabled is present.

## icons-doc

The buttons and menuitems have support to display icons.

## nested-doc

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

## outlined-doc

Outlined buttons display a border without a background initially.

## raised-doc

Raised buttons display a shadow to indicate elevation.

## raisedtext-doc

Text buttons can be displayed as raised as well for elevation.

## reversedkeys-doc

Following keys are reserved in the preset scheme and cannot be used as a token name; primitive , semantic , components , directives , colorscheme , light , dark , common , root , states and extend .

## rounded-doc

Rounded buttons have a circular border radius.

## severity-doc

The severity property defines the type of button.

## sizes-doc

SplitButton provides small and large sizes as alternatives to the standard.

## template-doc

SplitButton has a default action button and a collection of additional options defined by the model property based on MenuModel API.

## text-doc

Text buttons are displayed as textual elements.

## Split Button

SplitButton groups a set of commands in an overlay with a default command.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SplitButtonPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | MenuModel instance to define the overlay items. |
| severity | "success" \| "info" \| "warn" \| "danger" \| "help" \| "primary" \| "secondary" \| "contrast" | - | Defines the style of the button. |
| raised | boolean | false | Add a shadow to indicate elevation. |
| rounded | boolean | false | Add a circular border radius to the button. |
| text | boolean | false | Add a textual class to the button without a background initially. |
| outlined | boolean | false | Add a border class without a background initially. |
| size | "small" \| "large" | null | Defines the size of the button. |
| plain | boolean | false | Add a plain textual class to the button without a background initially. |
| icon | string | - | Name of the icon. |
| iconPos | SplitButtonIconPosition | left | Position of the icon. |
| label | string | - | Text of the button. |
| tooltip | string | - | Tooltip for the main button. |
| tooltipOptions | TooltipOptions | - | Tooltip options for the main button. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| menuStyle | { [klass: string]: any } | - | Inline style of the overlay menu. |
| menuStyleClass | string | - | Style class of the overlay menu. |
| dropdownIcon | string | - | Name of the dropdown icon. |
| appendTo | InputSignal<any> | 'body' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| dir | string | - | Indicates the direction of the element. |
| expandAriaLabel | string | - | Defines a string that labels the expand button for accessibility. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| disabled | boolean | - | When present, it specifies that the element should be disabled. |
| tabindex | number | - | Index of the element in tabbing order. |
| menuButtonDisabled | boolean | false | When present, it specifies that the menu button element should be disabled. |
| buttonDisabled | boolean | false | When present, it specifies that the button element should be disabled. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onClick | event: MouseEvent | Callback to invoke when default command button is clicked. |
| onMenuHide | value: any | Callback to invoke when overlay menu is hidden. |
| onMenuShow | value: any | Callback to invoke when overlay menu is shown. |
| onDropdownClick | event: MouseEvent | Callback to invoke when dropdown button is clicked. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<void> | Custom content template. |
| dropdownicon | TemplateRef<void> | Custom dropdown icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| pcDropdown | ButtonPassThrough | Used to pass attributes to the dropdown Button component. |
| pcMenu | MenuPassThrough | Used to pass attributes to the TieredMenu component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-splitbutton | Class name of the root element |
| p-splitbutton-button | Class name of the button element |
| p-splitbutton-dropdown | Class name of the dropdown element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| splitbutton.border.radius | --p-splitbutton-border-radius | Border radius of root |
| splitbutton.rounded.border.radius | --p-splitbutton-rounded-border-radius | Rounded border radius of root |
| splitbutton.raised.shadow | --p-splitbutton-raised-shadow | Raised shadow of root |

