# Angular Menu Component

Menu is a navigation / command component that supports dynamic and static positioning.

## Accessibility

Screen Reader Menu component uses the menu role and the value to describe the menu can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. A submenu within a Menu uses the group role with an aria-labelledby defined as the id of the submenu root menuitem label. In popup mode, the component implicitly manages the aria-expanded , aria-haspopup and aria-controls attributes of the target element to define the relation between the target and the popup. Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target. space Activates the focused menuitem. If menu is in overlay mode, popup gets closes and focus moves to target. escape If menu is in overlay mode, popup gets closes and focus moves to target. down arrow Moves focus to the next menuitem. up arrow Moves focus to the previous menuitem. home Moves focus to the first menuitem. end Moves focus to the last menuitem.

## Basic

Menu requires a collection of menuitems as its model .

```html
<p-menu [model]="items" />
```

## Command

The function to invoke when an item is clicked is defined using the command property.

```html
<p-toast />
<p-menu [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'menu-command-demo',
    templateUrl: './menu-command-demo.html',
    standalone: true,
    imports: [Menu, ToastModule],
    providers: [MessageService]
})
export class MenuCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: 'pi pi-plus',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                command: () => {
                    this.delete();
                }
            }
        ];
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Search Completed', detail: 'No results found', life: 3000 });
    }
}
```
</details>

## Group

Menu supports one level of nesting by defining children with items property.

```html
<p-menu [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'menu-group-demo',
    templateUrl: './menu-group-demo.html',
    standalone: true,
    imports: [Menu, ToastModule]
})
export class MenuGroupDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out'
                    }
                ]
            }
        ];
    }

}
```
</details>

## Popup

Popup mode is enabled by setting popup property to true and calling toggle method with an event of the target.

```html
<p-menu #menu [model]="items" [popup]="true" />
<p-button (click)="menu.toggle($event)" icon="pi pi-ellipsis-v"/>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'menu-popup-demo',
    templateUrl: './menu-popup-demo.html',
    standalone: true,
    imports: [Menu, ButtonModule]
})
export class MenuPopupDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Options',
                items: [
                    {
                        label: 'Refresh',
                        icon: 'pi pi-refresh'
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-upload'
                    }
                ]
            }
        ];
    }
}
```
</details>

## Router

Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.

```html
<p-menu [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'menu-router-demo',
    templateUrl: './menu-router-demo.html',
    standalone: true,
    imports: [Menu]
})
export class MenuRouterDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

       ngOnInit() {
        this.items = [
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Router Link',
                        icon: 'pi pi-palette',
                        routerLink: '/theming'
                    },
                    {
                        label: 'Programmatic',
                        icon: 'pi pi-link',
                        command: () => {
                            this.router.navigate(['/installation']);
                        }
                    },
                    {
                        label: 'External',
                        icon: 'pi pi-home',
                        url: 'https://angular.io//'
                    }
                ]
            }
        ];
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Menu offers item customization with the item template that receives the menuitem instance from the model as a parameter. The submenu header has its own submenuheader template, additional slots named start and end are provided to embed content before or after the menu.

```html
<p-menu [model]="items" class="flex justify-center" styleClass="w-full md:w-60">
    <ng-template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
            <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
                <path d="..." fill="var(--primary-color)" />
            </svg>
            <span class="text-xl font-semibold">
                PRIME<span class="text-primary">APP</span>
            </span>
        </span>
    </ng-template>
    <ng-template #submenuheader let-item>
        <span class="text-primary font-bold">{{ item.label }}</span>
    </ng-template>
    <ng-template #item let-item>
        <a pRipple class="flex items-center px-3 py-2 cursor-pointer" [class]="item.linkClass">
            <span [class]="item.icon"></span>
            <span class="ms-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ms-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ms-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
        </a>
    </ng-template>
    <ng-template #end>
        <button pRipple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" shape="circle" />
            <span class="inline-flex flex-col">
                <span class="font-bold">Amy Elsner</span>
                <span class="text-sm">Admin</span>
            </span>
        </button>
    </ng-template>
</p-menu>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'menu-template-demo',
    templateUrl: './menu-template-demo.html',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule, AvatarModule]
})
export class MenuTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Documents',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        shortcut: '⌘+N'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-search',
                        shortcut: '⌘+S'
                    }
                ]
            },
            {
                label: 'Profile',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Messages',
                        icon: 'pi pi-inbox',
                        badge: '2'
                    },
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        shortcut: '⌘+Q',
                        linkClass: '!text-red-500 dark:!text-red-400'
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }
}
```
</details>

## Menu

Menu is a navigation / command component that supports dynamic and static positioning.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<MenuPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| popup | boolean | false | Defines if menu would displayed as a popup. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |
| id | string | - | Current id state as a string. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onShow | value: any | Callback to invoke when overlay menu is shown. |
| onHide | value: any | Callback to invoke when overlay menu is hidden. |
| onBlur | event: Event | Callback to invoke when the list loses focus. |
| onFocus | event: Event | Callback to invoke when the list receives focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| start | TemplateRef<void> | Defines template option for start. |
| end | TemplateRef<void> | Defines template option for end. |
| header | TemplateRef<void> | Defines template option for header. |
| item | TemplateRef<MenuItemTemplateContext> | Custom item template. |
| submenuheader | TemplateRef<MenuSubmenuHeaderTemplateContext> | Custom submenu header template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| toggle | event: Event | void | Toggles the visibility of the popup menu. |
| show | event: any | void | Displays the popup menu. |
| hide |  | void | Hides the popup menu. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| start | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the start's DOM element. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| submenuLabel | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the submenu label's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| end | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the end's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-menu | Class name of the root element |
| p-menu-start | Class name of the start element |
| p-menu-list | Class name of the list element |
| p-menu-submenu-item | Class name of the submenu item element |
| p-menu-separator | Class name of the separator element |
| p-menu-end | Class name of the end element |
| p-menu-item | Class name of the item element |
| p-menu-item-content | Class name of the item content element |
| p-menu-item-link | Class name of the item link element |
| p-menu-item-icon | Class name of the item icon element |
| p-menu-item-label | Class name of the item label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| menu.background | --p-menu-background | Background of root |
| menu.border.color | --p-menu-border-color | Border color of root |
| menu.color | --p-menu-color | Color of root |
| menu.border.radius | --p-menu-border-radius | Border radius of root |
| menu.shadow | --p-menu-shadow | Shadow of root |
| menu.transition.duration | --p-menu-transition-duration | Transition duration of root |
| menu.list.padding | --p-menu-list-padding | Padding of list |
| menu.list.gap | --p-menu-list-gap | Gap of list |
| menu.item.focus.background | --p-menu-item-focus-background | Focus background of item |
| menu.item.color | --p-menu-item-color | Color of item |
| menu.item.focus.color | --p-menu-item-focus-color | Focus color of item |
| menu.item.padding | --p-menu-item-padding | Padding of item |
| menu.item.border.radius | --p-menu-item-border-radius | Border radius of item |
| menu.item.gap | --p-menu-item-gap | Gap of item |
| menu.item.icon.color | --p-menu-item-icon-color | Icon color of item |
| menu.item.icon.focus.color | --p-menu-item-icon-focus-color | Icon focus color of item |
| menu.submenu.label.padding | --p-menu-submenu-label-padding | Padding of submenu label |
| menu.submenu.label.font.weight | --p-menu-submenu-label-font-weight | Font weight of submenu label |
| menu.submenu.label.background | --p-menu-submenu-label-background | Background of submenu label |
| menu.submenu.label.color | --p-menu-submenu-label-color | Color of submenu label |
| menu.separator.border.color | --p-menu-separator-border-color | Border color of separator |

