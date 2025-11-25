# Angular PanelMenu Component

PanelMenu is a hybrid of Accordion and Tree components.

## Accessibility

Screen Reader Accordion header elements have a button role, an aria-label defined using the label property of the menuitem model and aria-controls to define the id of the content section along with aria-expanded for the visibility state. The content of an accordion panel uses region role, defines an id that matches the aria-controls of the header and aria-labelledby referring to the id of the header. The tree elements has a tree as the role and each menu item has a treeitem role along with aria-label , aria-selected and aria-expanded attributes. The container element of a treenode has the group role. The aria-setsize , aria-posinset and aria-level attributes are calculated implicitly and added to each treeitem. Header Keyboard Support Key Function tab Adds focus to the first header when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence. enter Toggles the visibility of the content. space Toggles the visibility of the content. down arrow If panel is collapsed then moves focus to the next header, otherwise first treenode of the panel receives the focus. up arrow If previous panel is collapsed then moves focus to the previous header, otherwise last treenode of the previous panel receives the focus. home Moves focus to the first header. end Moves focus to the last header. Tree Keyboard Support Key Function tab Moves focus to the next focusable element in the page tab order. shift + tab Moves focus to the previous focusable element in the page tab order. enter Activates the focused treenode. space Activates the focused treenode. down arrow Moves focus to the next treenode. up arrow Moves focus to the previous treenode. right arrow If node is closed, opens the node otherwise moves focus to the first child node. left arrow If node is open, closes the node otherwise moves focus to the parent node.

## Basic

PanelMenu requires a collection of menuitems as its model .

```html
<p-panelmenu [model]="items" class="w-full md:w-20rem" />
```

## Command

The command property defines the callback to run when an item is activated by click or a key event.

```html
<p-toast />
<p-panelmenu [model]="items" class="w-full md:w-80" />
```

## Controlled

Menu items can be controlled programmatically.

```html
<p-button label="Toggle All" [text]="true" (onClick)="toggleAll()" />
<p-panelmenu [model]="items" class="w-full md:w-80" />
```

## Multiple

Only one single root menuitem can be active by default, enable multiple property to be able to open more than one items.

```html
<p-panelmenu [model]="items" [style]="{'width':'300px'}" [multiple]="true" />
```

## Router

Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.

```html
<p-panelmenu [model]="items" class="w-full md:w-80" />
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

PanelMenu requires a collection of menuitems as its model .

```html
<p-panelmenu [model]="items" class="w-full md:w-80">
    <ng-template #item let-item>
        <a pRipple class="flex items-center px-4 py-2 cursor-pointer group">
            <i [class]="item.icon + ' text-primary group-hover:text-inherit'"></i>
            <span class="ml-2">
                {{ item.label }}
            </span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded
            bg-emphasis text-muted-color text-xs p-1">
                {{ item.shortcut }}
            </span>
        </a>
    </ng-template>
</p-panelmenu>
```

## Panel Menu

PanelMenu is a hybrid of Accordion and Tree components.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<PanelMenuPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| multiple | boolean | false | Whether multiple tabs can be activated at the same time or not. |
| transitionOptions | string | 400ms cubic-bezier(0.86, 0, 0.07, 1) | Transition options of the animation. |
| enterAnimation | InputSignal<string> | 'p-collapsible-enter' | Enter animation class name. |
| leaveAnimation | InputSignal<string> | 'p-collapsible-leave' | Leave animation class name. |
| id | string | - | Current id state as a string. |
| tabindex | number | 0 | Index of the element in tabbing order. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| submenuicon | TemplateRef<any> | Template option of submenu icon. |
| headericon | TemplateRef<any> | Template option of header icon. |
| item | TemplateRef<any> | Template option of item. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| collapseAll |  | void | Collapses open panels. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| panel | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the panel's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| headerContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header content's DOM element. |
| headerLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the header link's DOM element. |
| submenuIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the submenu icon's DOM element. |
| headerIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the header icon's DOM element. |
| headerLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the header label's DOM element. |
| contentContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toggleable content's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the menu content's DOM element. |
| rootList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the root list's DOM element. |
| submenu | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the submenu's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-panelmenu | Class name of the root element |
| p-panelmenu-panel | Class name of the panel element |
| p-panelmenu-header | Class name of the header element |
| p-panelmenu-header-content | Class name of the header content element |
| p-panelmenu-header-link | Class name of the header link element |
| p-panelmenu-header-icon | Class name of the header icon element |
| p-panelmenu-header-label | Class name of the header label element |
| p-panelmenu-content-container | Class name of the content container element |
| p-panelmenu-content | Class name of the content element |
| p-panelmenu-root-list | Class name of the root list element |
| p-panelmenu-item | Class name of the item element |
| p-panelmenu-item-content | Class name of the item content element |
| p-panelmenu-item-link | Class name of the item link element |
| p-panelmenu-item-icon | Class name of the item icon element |
| p-panelmenu-item-label | Class name of the item label element |
| p-panelmenu-submenu-icon | Class name of the submenu icon element |
| p-panelmenu-submenu | Class name of the submenu element |
| p-menuitem-separator |  |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| panelmenu.gap | --p-panelmenu-gap | Gap of root |
| panelmenu.transition.duration | --p-panelmenu-transition-duration | Transition duration of root |
| panelmenu.panel.background | --p-panelmenu-panel-background | Background of panel |
| panelmenu.panel.border.color | --p-panelmenu-panel-border-color | Border color of panel |
| panelmenu.panel.border.width | --p-panelmenu-panel-border-width | Border width of panel |
| panelmenu.panel.color | --p-panelmenu-panel-color | Color of panel |
| panelmenu.panel.padding | --p-panelmenu-panel-padding | Padding of panel |
| panelmenu.panel.border.radius | --p-panelmenu-panel-border-radius | Border radius of panel |
| panelmenu.panel.first.border.width | --p-panelmenu-panel-first-border-width | First border width of panel |
| panelmenu.panel.first.top.border.radius | --p-panelmenu-panel-first-top-border-radius | First top border radius of panel |
| panelmenu.panel.last.border.width | --p-panelmenu-panel-last-border-width | Last border width of panel |
| panelmenu.panel.last.bottom.border.radius | --p-panelmenu-panel-last-bottom-border-radius | Last bottom border radius of panel |
| panelmenu.item.focus.background | --p-panelmenu-item-focus-background | Focus background of item |
| panelmenu.item.color | --p-panelmenu-item-color | Color of item |
| panelmenu.item.focus.color | --p-panelmenu-item-focus-color | Focus color of item |
| panelmenu.item.gap | --p-panelmenu-item-gap | Gap of item |
| panelmenu.item.padding | --p-panelmenu-item-padding | Padding of item |
| panelmenu.item.border.radius | --p-panelmenu-item-border-radius | Border radius of item |
| panelmenu.item.icon.color | --p-panelmenu-item-icon-color | Icon color of item |
| panelmenu.item.icon.focus.color | --p-panelmenu-item-icon-focus-color | Icon focus color of item |
| panelmenu.submenu.indent | --p-panelmenu-submenu-indent | Indent of submenu |
| panelmenu.submenu.icon.color | --p-panelmenu-submenu-icon-color | Color of submenu icon |
| panelmenu.submenu.icon.focus.color | --p-panelmenu-submenu-icon-focus-color | Focus color of submenu icon |

