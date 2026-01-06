# Angular MultiSelect Component

MultiSelect is used to select multiple items from a collection.

## accessibility-doc

Screen Reader Value to describe the component can either be provided with ariaLabelledBy or ariaLabel props. The multiselect component has a combobox role in addition to aria-haspopup and aria-expanded attributes. The relation between the combobox and the popup is created with aria-controls attribute that refers to the id of the popup listbox. The popup listbox uses listbox as the role with aria-multiselectable enabled. Each list item has an option role along with aria-label , aria-selected and aria-disabled attributes. Checkbox component at the header uses a hidden native checkbox element internally that is only visible to screen readers. Value to read is defined with the selectAll and unselectAll keys of the aria property from the locale API. If filtering is enabled, filterInputProps can be defined to give aria-* props to the input element. Close button uses close key of the aria property from the locale API as the aria-label by default, this can be overriden with the closeButtonProps .

## basic-doc

MultiSelect is used as a controlled component with ngModel property along with an options collection. Label and value of an option are defined with the optionLabel and optionValue properties respectively. Default property name for the optionLabel is label and value for the optionValue . If optionValue is omitted and the object has no value property, the object itself becomes the value of an option. Note that, when options are simple primitive values such as a string array, no optionLabel and optionValue would be necessary.

## chips-doc

Selected values are displayed as a comma separated list by default, setting display as chip displays them as chips.

## clearicon-doc

When showClear is enabled, a clear icon is displayed to clear the value.

## disabled-doc

When disabled is present, the element cannot be edited and focused.

## filled-doc

Specify the variant property as filled to display the component with a higher visual emphasis than the default outlined style.

## filter-doc

MultiSelect provides built-in filtering that is enabled by adding the filter property.

## floatlabel-doc

A floating label appears on top of the input field when focused. Visit FloatLabel documentation for more information.

## fluid-doc

The fluid prop makes the component take up the full width of its container when set to true.

## group-doc

Options can be grouped when a nested data structures is provided.

## iftalabel-doc

IftaLabel is used to create infield top aligned labels. Visit IftaLabel documentation for more information.

## invalid-doc

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

## loadingstate-doc

Loading state can be used loading property.

## reactiveforms-doc

MultiSelect can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## sizes-doc

MultiSelect provides small and large sizes as alternatives to the base.

## template-doc

Available options and the selected options support customization with item and selecteditems templates respectively. In addition, header, footer and filter sections can be templated as well.

## virtualscroll-doc

VirtualScrolling is an efficient way of rendering the options by displaying a small subset of data in the viewport at any time. When dealing with huge number of options, it is suggested to enable VirtualScrolling to avoid performance issues. Usage is simple as setting virtualScroll property to true and defining virtualScrollItemSize to specify the height of an item.

## Multi Select

MultiSelect is used to select multiple items from a collection.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<MultiSelectPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| required | InputSignalWithTransform<boolean, unknown> | false | There must be a value (if set). |
| invalid | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have invalid state style. |
| disabled | InputSignalWithTransform<boolean, unknown> | false | When present, it specifies that the component should have disabled state style. |
| name | InputSignal<string> | undefined | When present, it specifies that the name of the input. |
| id | string | - | Unique identifier of the component |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| panelStyle | any | - | Inline style of the overlay panel. |
| panelStyleClass | string | - | Style class of the overlay panel element. |
| inputId | string | - | Identifier of the focus input to match a label defined for the component. |
| readonly | boolean | false | When present, it specifies that the component cannot be edited. |
| group | boolean | false | Whether to display options as grouped when nested options are provided. |
| filter | boolean | true | When specified, displays an input field to filter the items on keyup. |
| filterPlaceHolder | string | - | Defines placeholder of the filter input. |
| filterLocale | string | - | Locale to use in filtering. The default locale is the host environment's current locale. |
| overlayVisible | boolean | false | Specifies the visibility of the options panel. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| dataKey | string | - | A property to uniquely identify a value in options. |
| ariaLabelledBy | string | - | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| displaySelectedLabel | boolean | - | Whether to show labels of selected item labels or use default label. |
| maxSelectedLabels | number | - | Decides how many selected item labels to show at most. |
| selectionLimit | number | - | Maximum number of selectable items. |
| selectedItemsLabel | string | - | Label to display after exceeding max selected labels e.g. ({0} items selected), defaults "ellipsis" keyword to indicate a text-overflow. |
| showToggleAll | boolean | true | Whether to show the checkbox at header to toggle all items at once. |
| emptyFilterMessage | string | - | Text to display when filtering does not return any results. |
| emptyMessage | string | - | Text to display when there is no data. Defaults to global value in i18n translation configuration. |
| resetFilterOnHide | boolean | false | Clears the filter value when hiding the dropdown. |
| dropdownIcon | string | - | Icon class of the dropdown icon. |
| chipIcon | string | - | Icon class of the chip icon. |
| optionLabel | string | - | Name of the label field of an option. |
| optionValue | string | - | Name of the value field of an option. |
| optionDisabled | string | - | Name of the disabled field of an option. |
| optionGroupLabel | string | label | Name of the label field of an option group. |
| optionGroupChildren | string | items | Name of the options field of an option group. |
| showHeader | boolean | true | Whether to show the header. |
| filterBy | string | - | When filtering is enabled, filterBy decides which field or fields (comma separated) to search against. |
| scrollHeight | string | 200px | Height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value. |
| lazy | boolean | false | Defines if data is loaded and interacted with in lazy manner. |
| virtualScroll | boolean | false | Whether the data should be loaded on demand during scroll. |
| loading | boolean | false | Whether the multiselect is in loading state. |
| virtualScrollItemSize | number | - | Height of an item in the list for VirtualScrolling. |
| loadingIcon | string | - | Icon to display in loading state. |
| virtualScrollOptions | ScrollerOptions | - | Whether to use the scroller feature. The properties of scroller component can be used like an object in it. |
| overlayOptions | OverlayOptions | - | Whether to use overlay API feature. The properties of overlay API can be used like an object in it. |
| ariaFilterLabel | string | - | Defines a string that labels the filter input. |
| filterMatchMode | "startsWith" \| "contains" \| "endsWith" \| "equals" \| "notEquals" \| "in" \| "lt" \| "lte" \| "gt" \| "gte" | contains | Defines how the items are filtered. |
| tooltip | string | - | Advisory information to display in a tooltip on hover. |
| tooltipPosition | "right" \| "left" \| "top" \| "bottom" | right | Position of the tooltip. |
| tooltipPositionStyle | string | absolute | Type of CSS position. |
| tooltipStyleClass | string | - | Style class of the tooltip. |
| autofocusFilter | boolean | false | Applies focus to the filter element when the overlay is shown. |
| display | string | comma | Defines how the selected items are displayed. |
| autocomplete | string | off | Defines the autocomplete is active. |
| showClear | boolean | false | When enabled, a clear icon is displayed to clear the value. |
| autofocus | boolean | false | When present, it specifies that the component should automatically get focus on load. |
| placeholder | Signal<string> | - | Label to display when there are no selections. |
| options | any[] | - | An array of objects to display as the available options. |
| filterValue | string | - | When specified, filter displays with this value. |
| selectAll | boolean | - | Whether all data is selected. |
| focusOnHover | boolean | true | Indicates whether to focus on options when hovering over them, defaults to optionLabel. |
| filterFields | any[] | - | Fields used when filtering the options, defaults to optionLabel. |
| selectOnFocus | boolean | false | Determines if the option will be selected on focus. |
| autoOptionFocus | boolean | false | Whether to focus on the first visible or selected element when the overlay panel is shown. |
| highlightOnSelect | boolean | true | Whether the selected option will be add highlight class. |
| size | InputSignal<"small" \| "large"> | undefined | Specifies the size of the component. |
| variant | InputSignal<"outlined" \| "filled"> | undefined | Specifies the input variant of the component. |
| fluid | InputSignalWithTransform<boolean, unknown> | undefined | Spans 100% width of the container when enabled. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onChange | event: MultiSelectChangeEvent | Callback to invoke when value changes. |
| onFilter | event: MultiSelectFilterEvent | Callback to invoke when data is filtered. |
| onFocus | event: MultiSelectFocusEvent | Callback to invoke when multiselect receives focus. |
| onBlur | event: MultiSelectBlurEvent | Callback to invoke when multiselect loses focus. |
| onClick | event: Event | Callback to invoke when component is clicked. |
| onClear | value: void | Callback to invoke when input field is cleared. |
| onPanelShow | event: AnimationEvent | Callback to invoke when overlay panel becomes visible. |
| onPanelHide | event: AnimationEvent | Callback to invoke when overlay panel becomes hidden. |
| onLazyLoad | event: MultiSelectLazyLoadEvent | Callback to invoke in lazy mode to load new data. |
| onRemove | event: MultiSelectRemoveEvent | Callback to invoke in lazy mode to load new data. |
| onSelectAllChange | event: MultiSelectSelectAllChangeEvent | Callback to invoke when all data is selected. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<MultiSelectItemTemplateContext<any>> | Custom item template. |
| group | TemplateRef<MultiSelectGroupTemplateContext<any>> | Custom group template. |
| loader | TemplateRef<MultiSelectLoaderTemplateContext> | Custom loader template. |
| header | TemplateRef<void> | Custom header template. |
| filter | TemplateRef<MultiSelectFilterTemplateContext> | Custom filter template. |
| footer | TemplateRef<void> | Custom footer template. |
| emptyfilter | TemplateRef<void> | Custom empty filter template. |
| empty | TemplateRef<void> | Custom empty template. |
| selecteditems | TemplateRef<MultiSelectSelectedItemsTemplateContext<any>> | Custom selected items template. |
| loadingicon | TemplateRef<void> | Custom loading icon template. |
| filtericon | TemplateRef<void> | Custom filter icon template. |
| removetokenicon | TemplateRef<MultiSelectChipIconTemplateContext> | Custom remove token icon template. |
| chipicon | TemplateRef<MultiSelectChipIconTemplateContext> | Custom chip icon template. |
| clearicon | TemplateRef<void> | Custom clear icon template. |
| dropdownicon | TemplateRef<MultiSelectDropdownIconTemplateContext> | Custom dropdown icon template. |
| itemcheckboxicon | TemplateRef<MultiSelectItemCheckboxIconTemplateContext> | Custom item checkbox icon template. |
| headercheckboxicon | TemplateRef<MultiSelectHeaderCheckboxIconTemplateContext> | Custom header checkbox icon template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| updateModel | value: any, event: any | void | Updates the model value. |
| show | isFocus: any | void | Displays the panel. |
| hide | isFocus: any | void | Hides the panel. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| labelContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label container's DOM element. |
| label | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label's DOM element. |
| clearIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the clear icon's DOM element. |
| chipItem | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the chip item's DOM element. |
| pcChip | ChipPassThrough | Used to pass attributes to the Chip component. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| dropdownIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcHeaderCheckbox | CheckboxPassThrough | Used to pass attributes to the header checkbox component. |
| pcFilterContainer | IconFieldPassThrough | Used to pass attributes to the IconField component. |
| pcFilter | InputTextPassThrough | Used to pass attributes to the InputText component. |
| pcFilterIconContainer | InputIconPassThrough | Used to pass attributes to the InputIcon component. |
| filterIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the filter icon's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionGroup | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option group's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| pcOptionCheckbox | CheckboxPassThrough | Used to pass attributes to the option checkbox component. |
| emptyMessage | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the empty message's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-multiselect | Class name of the root element |
| p-multiselect-label-container | Class name of the label container element |
| p-multiselect-label | Class name of the label element |
| p-multiselect-chip-item | Class name of the chip item element |
| p-multiselect-chip | Class name of the chip element |
| p-multiselect-chip-icon | Class name of the chip icon element |
| p-multiselect-dropdown | Class name of the dropdown element |
| p-multiselect-loading-icon | Class name of the loading icon element |
| p-multiselect-dropdown-icon | Class name of the dropdown icon element |
| p-multiselect-overlay | Class name of the overlay element |
| p-multiselect-header | Class name of the header element |
| p-multiselect-filter-container | Class name of the filter container element |
| p-multiselect-filter | Class name of the filter element |
| p-multiselect-list-container | Class name of the list container element |
| p-multiselect-list | Class name of the list element |
| p-multiselect-option-group | Class name of the option group element |
| p-multiselect-option | Class name of the option element |
| p-multiselect-empty-message | Class name of the empty message element |
| p-autocomplete-clear-icon | Class name of the clear icon |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| multiselect.background | --p-multiselect-background | Background of root |
| multiselect.disabled.background | --p-multiselect-disabled-background | Disabled background of root |
| multiselect.filled.background | --p-multiselect-filled-background | Filled background of root |
| multiselect.filled.hover.background | --p-multiselect-filled-hover-background | Filled hover background of root |
| multiselect.filled.focus.background | --p-multiselect-filled-focus-background | Filled focus background of root |
| multiselect.border.color | --p-multiselect-border-color | Border color of root |
| multiselect.hover.border.color | --p-multiselect-hover-border-color | Hover border color of root |
| multiselect.focus.border.color | --p-multiselect-focus-border-color | Focus border color of root |
| multiselect.invalid.border.color | --p-multiselect-invalid-border-color | Invalid border color of root |
| multiselect.color | --p-multiselect-color | Color of root |
| multiselect.disabled.color | --p-multiselect-disabled-color | Disabled color of root |
| multiselect.placeholder.color | --p-multiselect-placeholder-color | Placeholder color of root |
| multiselect.invalid.placeholder.color | --p-multiselect-invalid-placeholder-color | Invalid placeholder color of root |
| multiselect.shadow | --p-multiselect-shadow | Shadow of root |
| multiselect.padding.x | --p-multiselect-padding-x | Padding x of root |
| multiselect.padding.y | --p-multiselect-padding-y | Padding y of root |
| multiselect.border.radius | --p-multiselect-border-radius | Border radius of root |
| multiselect.focus.ring.width | --p-multiselect-focus-ring-width | Focus ring width of root |
| multiselect.focus.ring.style | --p-multiselect-focus-ring-style | Focus ring style of root |
| multiselect.focus.ring.color | --p-multiselect-focus-ring-color | Focus ring color of root |
| multiselect.focus.ring.offset | --p-multiselect-focus-ring-offset | Focus ring offset of root |
| multiselect.focus.ring.shadow | --p-multiselect-focus-ring-shadow | Focus ring shadow of root |
| multiselect.transition.duration | --p-multiselect-transition-duration | Transition duration of root |
| multiselect.sm.font.size | --p-multiselect-sm-font-size | Sm font size of root |
| multiselect.sm.padding.x | --p-multiselect-sm-padding-x | Sm padding x of root |
| multiselect.sm.padding.y | --p-multiselect-sm-padding-y | Sm padding y of root |
| multiselect.lg.font.size | --p-multiselect-lg-font-size | Lg font size of root |
| multiselect.lg.padding.x | --p-multiselect-lg-padding-x | Lg padding x of root |
| multiselect.lg.padding.y | --p-multiselect-lg-padding-y | Lg padding y of root |
| multiselect.dropdown.width | --p-multiselect-dropdown-width | Width of dropdown |
| multiselect.dropdown.color | --p-multiselect-dropdown-color | Color of dropdown |
| multiselect.overlay.background | --p-multiselect-overlay-background | Background of overlay |
| multiselect.overlay.border.color | --p-multiselect-overlay-border-color | Border color of overlay |
| multiselect.overlay.border.radius | --p-multiselect-overlay-border-radius | Border radius of overlay |
| multiselect.overlay.color | --p-multiselect-overlay-color | Color of overlay |
| multiselect.overlay.shadow | --p-multiselect-overlay-shadow | Shadow of overlay |
| multiselect.list.padding | --p-multiselect-list-padding | Padding of list |
| multiselect.list.gap | --p-multiselect-list-gap | Gap of list |
| multiselect.list.header.padding | --p-multiselect-list-header-padding | Header padding of list |
| multiselect.option.focus.background | --p-multiselect-option-focus-background | Focus background of option |
| multiselect.option.selected.background | --p-multiselect-option-selected-background | Selected background of option |
| multiselect.option.selected.focus.background | --p-multiselect-option-selected-focus-background | Selected focus background of option |
| multiselect.option.color | --p-multiselect-option-color | Color of option |
| multiselect.option.focus.color | --p-multiselect-option-focus-color | Focus color of option |
| multiselect.option.selected.color | --p-multiselect-option-selected-color | Selected color of option |
| multiselect.option.selected.focus.color | --p-multiselect-option-selected-focus-color | Selected focus color of option |
| multiselect.option.padding | --p-multiselect-option-padding | Padding of option |
| multiselect.option.border.radius | --p-multiselect-option-border-radius | Border radius of option |
| multiselect.option.gap | --p-multiselect-option-gap | Gap of option |
| multiselect.option.group.background | --p-multiselect-option-group-background | Background of option group |
| multiselect.option.group.color | --p-multiselect-option-group-color | Color of option group |
| multiselect.option.group.font.weight | --p-multiselect-option-group-font-weight | Font weight of option group |
| multiselect.option.group.padding | --p-multiselect-option-group-padding | Padding of option group |
| multiselect.clear.icon.color | --p-multiselect-clear-icon-color | Color of clear icon |
| multiselect.chip.border.radius | --p-multiselect-chip-border-radius | Border radius of chip |
| multiselect.empty.message.padding | --p-multiselect-empty-message-padding | Padding of empty message |

