# Angular Dock Component

Dock is a navigation component consisting of menuitems.

## accessibility-doc

Screen Reader Dock component uses the menu role with the aria-orientation and the value to describe the menu can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter Activates the focused menuitem. space Activates the focused menuitem. down arrow Moves focus to the next menuitem in vertical layout. up arrow Moves focus to the previous menuitem in vertical layout. home Moves focus to the first menuitem in horizontal layout. end Moves focus to the last menuitem in horizontal layout.

## advanced-doc

A mock desktop UI implemented with various components in addition to Dock.

## basic-doc

Dock requires a collection of menuitems as its model . Default location is bottom and other sides are also available when defined with the position property. Content of the dock component is defined by item template.

## Dock

Dock is a navigation component consisting of menuitems.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<DockPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| id | string | - | Current id state as a string. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| model | MenuItem[] | null | MenuModel instance to define the action items. |
| position | "right" \| "left" \| "top" \| "bottom" | bottom | Position of element. |
| ariaLabel | string | - | Defines a string that labels the input for accessibility. |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary. |
| ariaLabelledBy | string | - | Defines a string that labels the dropdown button for accessibility. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onFocus | event: FocusEvent | Callback to execute when button is focused. |
| onBlur | event: FocusEvent | Callback to invoke when the component loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | TemplateRef<DockItemTemplateContext> | Custom item template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| listContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the list container's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-dock | Class name of the root element |
| p-dock-list-container | Class name of the list container element |
| p-dock-list | Class name of the list element |
| p-dock-item | Class name of the item element |
| p-dock-item-content | Class name of the item content element |
| p-dock-item-link | Class name of the item link element |
| p-dock-item-icon | Class name of the item icon element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| dock.background | --p-dock-background | Background of root |
| dock.border.color | --p-dock-border-color | Border color of root |
| dock.padding | --p-dock-padding | Padding of root |
| dock.border.radius | --p-dock-border-radius | Border radius of root |
| dock.item.border.radius | --p-dock-item-border-radius | Border radius of item |
| dock.item.padding | --p-dock-item-padding | Padding of item |
| dock.item.size | --p-dock-item-size | Size of item |
| dock.item.focus.ring.width | --p-dock-item-focus-ring-width | Focus ring width of item |
| dock.item.focus.ring.style | --p-dock-item-focus-ring-style | Focus ring style of item |
| dock.item.focus.ring.color | --p-dock-item-focus-ring-color | Focus ring color of item |
| dock.item.focus.ring.offset | --p-dock-item-focus-ring-offset | Focus ring offset of item |
| dock.item.focus.ring.shadow | --p-dock-item-focus-ring-shadow | Focus ring shadow of item |

