# Angular MegaMenu Component

MegaMenu is navigation component that displays submenus together.

## Accessibility

Screen Reader MegaMenu component uses the menubar role along with aria-orientation and the value to describe the component can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. A submenu within a MegaMenu uses the menu role with an aria-labelledby defined as the id of the submenu root menuitem label. In addition, root menuitems that open a submenu have aria-haspopup , aria-expanded and aria-controls to define the relation between the item and the submenu. Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. space If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. escape If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu. down arrow If focus is on a root element, open a submenu and moves focus to the first element in the submenu otherwise moves focus to the next menuitem within the submenu. up arrow If focus is on a root element, opens a submenu and moves focus to the last element in the submenu otherwise moves focus to the previous menuitem within the submenu. right arrow If focus is on a root element, moves focus to the next menuitem. If the focus in inside a submenu, moves focus to the first menuitem of the next menu group. left arrow If focus is on a root element, moves focus to the previous menuitem. If the focus in inside a submenu, moves focus to the first menuitem of the previous menu group. home Moves focus to the first menuitem within the submenu. end Moves focus to the last menuitem within the submenu.

## Basic

MegaMenu requires a collection of menuitems as its model .

```html
<p-megamenu [model]="items" />
```

## Command

The command property of a menuitem defines the callback to run when an item is activated by click or a key event.

## Router

Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.

```html
<p-megamenu [model]="items" />
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Custom content can be placed between p-megamenu tags. Megamenu should be horizontal for custom content.

```html
<p-megamenu [model]="items" [style]="{ 'border-radius': '3rem', display: 'flex' }" class="p-4 bg-surface-0 dark:bg-surface-900">
    <ng-template #start>
        <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path d="..." fill="var(--primary-color)" />
        </svg>
    </ng-template>
    <ng-template #item let-item>
        <a *ngIf="item.root" pRipple class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase" style="border-radius: 2rem">
            <i [ngClass]="item.icon"></i>
            <span class="ml-2">{{ item.label }}</span>
        </a>
        <a *ngIf="!item.root && !item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-2">
            <span class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12">
                <i [ngClass]="item.icon + ' text-lg'"></i>
            </span>
            <span class="inline-flex flex-col gap-1">
                <span class="font-medium text-lg text-surface-900 dark:text-surface-0">{{ item.label }}</span>
                <span class="whitespace-nowrap">{{ item.subtext }}</span>
            </span>
        </a>
        <div *ngIf="item.image" class="flex flex-col items-start gap-4">
            <img [src]="item.image" alt="megamenu-demo" class="w-full" />
            <span>{{ item.subtext }}</span>
            <p-button [label]="item.label" [outlined]="true"></p-button>
        </div>
    </ng-template>
    <ng-template #end>
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
    </ng-template>
</p-megamenu>
```

## Vertical

Layout of the MegaMenu is changed with the orientation property that accepts horizontal and vertical as options.

```html
<p-megamenu [model]="items" orientation="vertical" />
```

## Mega Menu

MegaMenu is navigation component that displays submenus together.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<MegaMenuPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MegaMenuItem[] | - | An array of menuitems. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| orientation | string | horizontal | Defines the orientation. |
| id | string | - | Current id state as a string. |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary. |
| scrollHeight | string | 20rem | Height of the viewport, a scrollbar is defined if height of list exceeds this value. |
| disabled | boolean | false | When present, it specifies that the component should be disabled. |
| tabindex | number | 0 | Index of the element in tabbing order. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| start | TemplateRef<any> | Defines template option for start. |
| end | TemplateRef<any> | Defines template option for end. |
| menuicon | TemplateRef<any> | Defines template option for menu icon. |
| submenuicon | TemplateRef<any> | Defines template option for submenu icon. |
| item | TemplateRef<any> | Defines template option for submenu icon. |
| button | TemplateRef<any> | Custom menu button template on responsive mode. |
| buttonicon | TemplateRef<any> | Custom menu button icon template on responsive mode. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| start | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the start's DOM element. |
| button | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the button's DOM element. |
| buttonIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the button icon's DOM element. |
| rootList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the root list's DOM element. |
| submenuLabel | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the submenu label's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| submenuIcon | PassThroughOption<HTMLElement, I> | Used to pass attributes to the submenu icon's DOM element. |
| overlay | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the overlay's DOM element. |
| grid | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the grid's DOM element. |
| column | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the column's DOM element. |
| submenu | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the submenu's DOM element. |
| end | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the end's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-megamenu | Class name of the root element |
| p-megamenu-start | Class name of the start element |
| p-megamenu-button | Class name of the button element |
| p-megamenu-root-list | Class name of the root list element |
| p-megamenu-submenu-item | Class name of the submenu item element |
| p-megamenu-item | Class name of the item element |
| p-megamenu-item-content | Class name of the item content element |
| p-megamenu-item-link | Class name of the item link element |
| p-megamenu-item-icon | Class name of the item icon element |
| p-megamenu-item-label | Class name of the item label element |
| p-megamenu-submenu-icon | Class name of the submenu icon element |
| p-megamenu-panel | Class name of the panel element |
| p-megamenu-grid | Class name of the grid element |
| p-megamenu-submenu | Class name of the submenu element |
| p-megamenu-submenu-item-label | Class name of the submenu item label element |
| p-megamenu-separator | Class name of the separator element |
| p-megamenu-end | Class name of the end element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| megamenu.background | --p-megamenu-background | Background of root |
| megamenu.border.color | --p-megamenu-border-color | Border color of root |
| megamenu.border.radius | --p-megamenu-border-radius | Border radius of root |
| megamenu.color | --p-megamenu-color | Color of root |
| megamenu.gap | --p-megamenu-gap | Gap of root |
| megamenu.vertical.orientation.padding | --p-megamenu-vertical-orientation-padding | Vertical orientation padding of root |
| megamenu.vertical.orientation.gap | --p-megamenu-vertical-orientation-gap | Vertical orientation gap of root |
| megamenu.horizontal.orientation.padding | --p-megamenu-horizontal-orientation-padding | Horizontal orientation padding of root |
| megamenu.horizontal.orientation.gap | --p-megamenu-horizontal-orientation-gap | Horizontal orientation gap of root |
| megamenu.transition.duration | --p-megamenu-transition-duration | Transition duration of root |
| megamenu.base.item.border.radius | --p-megamenu-base-item-border-radius | Border radius of base item |
| megamenu.base.item.padding | --p-megamenu-base-item-padding | Padding of base item |
| megamenu.item.focus.background | --p-megamenu-item-focus-background | Focus background of item |
| megamenu.item.active.background | --p-megamenu-item-active-background | Active background of item |
| megamenu.item.color | --p-megamenu-item-color | Color of item |
| megamenu.item.focus.color | --p-megamenu-item-focus-color | Focus color of item |
| megamenu.item.active.color | --p-megamenu-item-active-color | Active color of item |
| megamenu.item.padding | --p-megamenu-item-padding | Padding of item |
| megamenu.item.border.radius | --p-megamenu-item-border-radius | Border radius of item |
| megamenu.item.gap | --p-megamenu-item-gap | Gap of item |
| megamenu.item.icon.color | --p-megamenu-item-icon-color | Icon color of item |
| megamenu.item.icon.focus.color | --p-megamenu-item-icon-focus-color | Icon focus color of item |
| megamenu.item.icon.active.color | --p-megamenu-item-icon-active-color | Icon active color of item |
| megamenu.overlay.padding | --p-megamenu-overlay-padding | Padding of overlay |
| megamenu.overlay.background | --p-megamenu-overlay-background | Background of overlay |
| megamenu.overlay.border.color | --p-megamenu-overlay-border-color | Border color of overlay |
| megamenu.overlay.border.radius | --p-megamenu-overlay-border-radius | Border radius of overlay |
| megamenu.overlay.color | --p-megamenu-overlay-color | Color of overlay |
| megamenu.overlay.shadow | --p-megamenu-overlay-shadow | Shadow of overlay |
| megamenu.overlay.gap | --p-megamenu-overlay-gap | Gap of overlay |
| megamenu.submenu.padding | --p-megamenu-submenu-padding | Padding of submenu |
| megamenu.submenu.gap | --p-megamenu-submenu-gap | Gap of submenu |
| megamenu.submenu.label.padding | --p-megamenu-submenu-label-padding | Padding of submenu label |
| megamenu.submenu.label.font.weight | --p-megamenu-submenu-label-font-weight | Font weight of submenu label |
| megamenu.submenu.label.background | --p-megamenu-submenu-label-background | Background of submenu label |
| megamenu.submenu.label.color | --p-megamenu-submenu-label-color | Color of submenu label |
| megamenu.submenu.icon.size | --p-megamenu-submenu-icon-size | Size of submenu icon |
| megamenu.submenu.icon.color | --p-megamenu-submenu-icon-color | Color of submenu icon |
| megamenu.submenu.icon.focus.color | --p-megamenu-submenu-icon-focus-color | Focus color of submenu icon |
| megamenu.submenu.icon.active.color | --p-megamenu-submenu-icon-active-color | Active color of submenu icon |
| megamenu.separator.border.color | --p-megamenu-separator-border-color | Border color of separator |
| megamenu.mobile.button.border.radius | --p-megamenu-mobile-button-border-radius | Border radius of mobile button |
| megamenu.mobile.button.size | --p-megamenu-mobile-button-size | Size of mobile button |
| megamenu.mobile.button.color | --p-megamenu-mobile-button-color | Color of mobile button |
| megamenu.mobile.button.hover.color | --p-megamenu-mobile-button-hover-color | Hover color of mobile button |
| megamenu.mobile.button.hover.background | --p-megamenu-mobile-button-hover-background | Hover background of mobile button |
| megamenu.mobile.button.focus.ring.width | --p-megamenu-mobile-button-focus-ring-width | Focus ring width of mobile button |
| megamenu.mobile.button.focus.ring.style | --p-megamenu-mobile-button-focus-ring-style | Focus ring style of mobile button |
| megamenu.mobile.button.focus.ring.color | --p-megamenu-mobile-button-focus-ring-color | Focus ring color of mobile button |
| megamenu.mobile.button.focus.ring.offset | --p-megamenu-mobile-button-focus-ring-offset | Focus ring offset of mobile button |
| megamenu.mobile.button.focus.ring.shadow | --p-megamenu-mobile-button-focus-ring-shadow | Focus ring shadow of mobile button |

