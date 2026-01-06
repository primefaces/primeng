# Angular CascadeSelect Component

CascadeSelect displays a nested structure of options.

## accessibility-doc

Screen Reader Value to describe the component can either be provided with ariaLabelledBy or ariaLabel props. The cascadeselect element has a combobox role in addition to aria-haspopup and aria-expanded attributes. The relation between the combobox and the popup is created with aria-controls that refers to the id of the popup. The popup list has an id that refers to the aria-controls attribute of the combobox element and uses tree as the role. Each list item has a treeitem role along with aria-label , aria-selected and aria-expanded attributes. The container element of a treenode has the group role. The aria-setsize , aria-posinset and aria-level attributes are calculated implicitly and added to each treeitem.

## basic-doc

CascadeSelect requires a value to bind and a collection of arbitrary objects with a nested hierarchy. optionGroupLabel is used for the text of a category and optionGroupChildren is to define the children of the category. Note that order of the optionGroupChildren matters and it should correspond to the data hierarchy.

## clearicon-doc

When showClear is enabled, a clear icon is displayed to clear the value.

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

## loading-doc

Loading state can be used loading property.

## reactiveforms-doc

CascadeSelect can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

## sizes-doc

CascadeSelect provides small and large sizes as alternatives to the base.

## template-doc

Label of an option is used as the display text of an item by default, for custom content support define an option template that gets the option instance as a parameter. In addition value , dropdownicon , loadingicon , and optiongroupicon slots are provided for further customization.

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| hiddenInputWrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the hidden input wrapper's DOM element. |
| hiddenInput | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the hidden input's DOM element. |
| label | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the label's DOM element. |
| dropdown | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the dropdown's DOM element. |
| loadingIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the loading icon's DOM element. |
| dropdownIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the dropdown icon's DOM element. |
| clearIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the clear icon's DOM element. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| optionList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the option list's DOM element. |
| option | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the option's DOM element. |
| optionContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the option content's DOM element. |
| optionText | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the option text's DOM element. |
| groupIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the group icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-cascadeselect | Class name of the root element |
| p-cascadeselect-label | Class name of the label element |
| p-cascadeselect-dropdown | Class name of the dropdown element |
| p-cascadeselect-loading-icon | Class name of the loading icon element |
| p-cascadeselect-clear-icon | Class name of the dropdown icon element |
| p-cascadeselect-dropdown-icon | Class name of the dropdown icon element |
| p-cascadeselect-overlay | Class name of the overlay element |
| p-cascadeselect-list-container | Class name of the list container element |
| p-cascadeselect-list | Class name of the list element |
| p-cascadeselect-item | Class name of the item element |
| p-cascadeselect-item-content | Class name of the item content element |
| p-cascadeselect-item-text | Class name of the item text element |
| p-cascadeselect-group-icon | Class name of the group icon element |
| p-cascadeselect-item-list | Class name of the item list element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| cascadeselect.background | --p-cascadeselect-background | Background of root |
| cascadeselect.disabled.background | --p-cascadeselect-disabled-background | Disabled background of root |
| cascadeselect.filled.background | --p-cascadeselect-filled-background | Filled background of root |
| cascadeselect.filled.hover.background | --p-cascadeselect-filled-hover-background | Filled hover background of root |
| cascadeselect.filled.focus.background | --p-cascadeselect-filled-focus-background | Filled focus background of root |
| cascadeselect.border.color | --p-cascadeselect-border-color | Border color of root |
| cascadeselect.hover.border.color | --p-cascadeselect-hover-border-color | Hover border color of root |
| cascadeselect.focus.border.color | --p-cascadeselect-focus-border-color | Focus border color of root |
| cascadeselect.invalid.border.color | --p-cascadeselect-invalid-border-color | Invalid border color of root |
| cascadeselect.color | --p-cascadeselect-color | Color of root |
| cascadeselect.disabled.color | --p-cascadeselect-disabled-color | Disabled color of root |
| cascadeselect.placeholder.color | --p-cascadeselect-placeholder-color | Placeholder color of root |
| cascadeselect.invalid.placeholder.color | --p-cascadeselect-invalid-placeholder-color | Invalid placeholder color of root |
| cascadeselect.shadow | --p-cascadeselect-shadow | Shadow of root |
| cascadeselect.padding.x | --p-cascadeselect-padding-x | Padding x of root |
| cascadeselect.padding.y | --p-cascadeselect-padding-y | Padding y of root |
| cascadeselect.border.radius | --p-cascadeselect-border-radius | Border radius of root |
| cascadeselect.focus.ring.width | --p-cascadeselect-focus-ring-width | Focus ring width of root |
| cascadeselect.focus.ring.style | --p-cascadeselect-focus-ring-style | Focus ring style of root |
| cascadeselect.focus.ring.color | --p-cascadeselect-focus-ring-color | Focus ring color of root |
| cascadeselect.focus.ring.offset | --p-cascadeselect-focus-ring-offset | Focus ring offset of root |
| cascadeselect.focus.ring.shadow | --p-cascadeselect-focus-ring-shadow | Focus ring shadow of root |
| cascadeselect.transition.duration | --p-cascadeselect-transition-duration | Transition duration of root |
| cascadeselect.sm.font.size | --p-cascadeselect-sm-font-size | Sm font size of root |
| cascadeselect.sm.padding.x | --p-cascadeselect-sm-padding-x | Sm padding x of root |
| cascadeselect.sm.padding.y | --p-cascadeselect-sm-padding-y | Sm padding y of root |
| cascadeselect.lg.font.size | --p-cascadeselect-lg-font-size | Lg font size of root |
| cascadeselect.lg.padding.x | --p-cascadeselect-lg-padding-x | Lg padding x of root |
| cascadeselect.lg.padding.y | --p-cascadeselect-lg-padding-y | Lg padding y of root |
| cascadeselect.dropdown.width | --p-cascadeselect-dropdown-width | Width of dropdown |
| cascadeselect.dropdown.color | --p-cascadeselect-dropdown-color | Color of dropdown |
| cascadeselect.overlay.background | --p-cascadeselect-overlay-background | Background of overlay |
| cascadeselect.overlay.border.color | --p-cascadeselect-overlay-border-color | Border color of overlay |
| cascadeselect.overlay.border.radius | --p-cascadeselect-overlay-border-radius | Border radius of overlay |
| cascadeselect.overlay.color | --p-cascadeselect-overlay-color | Color of overlay |
| cascadeselect.overlay.shadow | --p-cascadeselect-overlay-shadow | Shadow of overlay |
| cascadeselect.list.padding | --p-cascadeselect-list-padding | Padding of list |
| cascadeselect.list.gap | --p-cascadeselect-list-gap | Gap of list |
| cascadeselect.list.mobile.indent | --p-cascadeselect-list-mobile-indent | Mobile indent of list |
| cascadeselect.option.focus.background | --p-cascadeselect-option-focus-background | Focus background of option |
| cascadeselect.option.selected.background | --p-cascadeselect-option-selected-background | Selected background of option |
| cascadeselect.option.selected.focus.background | --p-cascadeselect-option-selected-focus-background | Selected focus background of option |
| cascadeselect.option.color | --p-cascadeselect-option-color | Color of option |
| cascadeselect.option.focus.color | --p-cascadeselect-option-focus-color | Focus color of option |
| cascadeselect.option.selected.color | --p-cascadeselect-option-selected-color | Selected color of option |
| cascadeselect.option.selected.focus.color | --p-cascadeselect-option-selected-focus-color | Selected focus color of option |
| cascadeselect.option.padding | --p-cascadeselect-option-padding | Padding of option |
| cascadeselect.option.border.radius | --p-cascadeselect-option-border-radius | Border radius of option |
| cascadeselect.option.icon.color | --p-cascadeselect-option-icon-color | Icon color of option |
| cascadeselect.option.icon.focus.color | --p-cascadeselect-option-icon-focus-color | Icon focus color of option |
| cascadeselect.option.icon.size | --p-cascadeselect-option-icon-size | Icon size of option |
| cascadeselect.clear.icon.color | --p-cascadeselect-clear-icon-color | Color of clear icon |

