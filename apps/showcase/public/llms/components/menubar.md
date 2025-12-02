# Angular Menubar Component

Menubar is a horizontal menu component.

## Accessibility

Screen Reader Menubar component uses the menubar role and the value to describe the menu can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. A submenu within a MenuBar uses the menu role with an aria-labelledby defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have aria-haspopup , aria-expanded and aria-controls to define the relation between the item and the submenu. In mobile viewports, a menu icon appears with a button role along with aria-haspopup , aria-expanded and aria-controls to manage the relation between the overlay menubar and the button. The value to describe the button can be defined aria-label or aria-labelledby specified using buttonProps , by default navigation key of the aria property from the locale API as the aria-label . Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. space If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. escape If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu. down arrow If focus is on a root element, open a submenu and moves focus to the first element in the submenu otherwise moves focus to the next menuitem within the submenu. up arrow If focus is on a root element, opens a submenu and moves focus to the last element in the submenu otherwise moves focus to the previous menuitem within the submenu. right arrow If focus is on a root element, moves focus to the next menuitem otherwise opens a submenu if there is one available and moves focus to the first item. left arrow If focus is on a root element, moves focus to the previous menuitem otherwise closes a submenu and moves focus to the root item of the closed submenu. home Moves focus to the first menuitem within the submenu. end Moves focus to the last menuitem within the submenu.

## Basic

Menubar requires nested menuitems as its model.

```html
<p-menubar [model]="items" />
```

## Command

The command property defines the callback to run when an item is activated by click or a key event.

```html
<p-toast />
<p-menubar [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'menubar-command-demo',
    templateUrl: './menubar-command-demo.html',
    standalone: true,
    imports: [Menubar, ToastModule],
    providers: [MessageService]
})
export class MenubarCommandDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        command: () => {
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
                        }
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        command: () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No printer connected', life: 3000 });
                        }
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                command: () => {
                    this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
                }
            },
            {
                separator: true
            },
            {
                label: 'Sync',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Import',
                        icon: 'pi pi-cloud-download',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Downloads', detail: 'Downloaded from cloud', life: 3000 });
                        }
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-cloud-upload',
                        command: () => {
                            this.messageService.add({ severity: 'info', summary: 'Shared', detail: 'Exported to cloud', life: 3000 });
                        }
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
<p-menubar [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'menubar-router-demo',
    templateUrl: './menubar-router-demo.html',
    standalone: true,
    imports: [Menubar, CommonModule]
})
export class MenubarRouterDemo implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        routerLink: '/installation'
                    },
                    {
                        label: 'Configuration',
                        routerLink: '/configuration'
                    }
                ]
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
                items: [
                    {
                        label: 'Angular',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        url: 'https://vitejs.dev/'
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

Custom content can be placed inside the menubar using the start and end templates.

```html
<p-menubar [model]="items">
    <ng-template #start>
        <svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="..." fill="var(--primary-color)" />
        </svg>
    </ng-template>
    <ng-template #item let-item let-root="root">
        <a pRipple class="flex items-center px-4 py-3 cursor-pointer gap-2">
            <span>{{ item.label }}</span>
            <p-badge *ngIf="item.badge" [ngClass]="{ 'ms-auto': !root }" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ms-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i *ngIf="item.items" [ngClass]="['ms-auto pi', root ? 'pi-angle-down' : 'pi-angle-right']"></i>
        </a>
    </ng-template>
    <ng-template #end>
        <div class="flex items-center gap-2">
            <input type="text" pInputText placeholder="Search" class="w-36" />
            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
        </div>
    </ng-template>
</p-menubar>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'menubar-template-demo',
    templateUrl: './menubar-template-demo.html',
    standalone: true,
    imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, Ripple, CommonModule]
})
export class MenubarTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                badge: '3',
                items: [
                    {
                        label: 'Core',
                        icon: 'pi pi-bolt',
                        shortcut: '⌘+S',
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        shortcut: '⌘+B',
                    },
                    {
                        separator: true,
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        shortcut: '⌘+U',
                    },
                ],
            },
        ];
    }
}
```
</details>

## Menubar

Menubar is a horizontal menu component.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<MenubarPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| styleClass | string | - | Class of the element. **(Deprecated)** |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoDisplay | boolean | true | Whether to show a root submenu on mouse over. |
| autoHide | boolean | false | Whether to hide a root submenu when mouse leaves. |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary. |
| autoHideDelay | number | 100 | Delay to hide the root submenu in milliseconds when mouse leaves. |
| id | string | - | Current id state as a string. |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onFocus | event: FocusEvent | Callback to execute when button is focused. |
| onBlur | event: FocusEvent | Callback to execute when button loses focus. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| start | TemplateRef<void> | Defines template option for start. |
| end | TemplateRef<void> | Defines template option for end. |
| item | TemplateRef<MenubarItemTemplateContext> | Custom item template. |
| menuicon | TemplateRef<void> | Defines template option for menu icon. |
| submenuicon | TemplateRef<void> | Defines template option for submenu icon. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| rootList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the root list's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| submenuIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the submenu icon's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| button | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the mobile menu button's DOM element. |
| buttonIcon | PassThroughOption<SVGElement, I> | Used to pass attributes to the mobile menu button icon's DOM element. |
| submenu | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the submenu's DOM element. |
| start | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the start of the component. |
| end | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the end of the component. |
| pcBadge | BadgePassThrough | Used to pass attributes to Badge component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-menubar | Class name of the root element |
| p-menubar-start | Class name of the start element |
| p-menubar-button | Class name of the button element |
| p-menubar-root-list | Class name of the root list element |
| p-menubar-item | Class name of the item element |
| p-menubar-item-content | Class name of the item content element |
| p-menubar-item-link | Class name of the item link element |
| p-menubar-item-icon | Class name of the item icon element |
| p-menubar-item-label | Class name of the item label element |
| p-menubar-submenu-icon | Class name of the submenu icon element |
| p-menubar-submenu | Class name of the submenu element |
| p-menubar-separator | Class name of the separator element |
| p-menubar-end | Class name of the end element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| menubar.background | --p-menubar-background | Background of root |
| menubar.border.color | --p-menubar-border-color | Border color of root |
| menubar.border.radius | --p-menubar-border-radius | Border radius of root |
| menubar.color | --p-menubar-color | Color of root |
| menubar.gap | --p-menubar-gap | Gap of root |
| menubar.padding | --p-menubar-padding | Padding of root |
| menubar.transition.duration | --p-menubar-transition-duration | Transition duration of root |
| menubar.base.item.border.radius | --p-menubar-base-item-border-radius | Border radius of base item |
| menubar.base.item.padding | --p-menubar-base-item-padding | Padding of base item |
| menubar.item.focus.background | --p-menubar-item-focus-background | Focus background of item |
| menubar.item.active.background | --p-menubar-item-active-background | Active background of item |
| menubar.item.color | --p-menubar-item-color | Color of item |
| menubar.item.focus.color | --p-menubar-item-focus-color | Focus color of item |
| menubar.item.active.color | --p-menubar-item-active-color | Active color of item |
| menubar.item.padding | --p-menubar-item-padding | Padding of item |
| menubar.item.border.radius | --p-menubar-item-border-radius | Border radius of item |
| menubar.item.gap | --p-menubar-item-gap | Gap of item |
| menubar.item.icon.color | --p-menubar-item-icon-color | Icon color of item |
| menubar.item.icon.focus.color | --p-menubar-item-icon-focus-color | Icon focus color of item |
| menubar.item.icon.active.color | --p-menubar-item-icon-active-color | Icon active color of item |
| menubar.submenu.padding | --p-menubar-submenu-padding | Padding of submenu |
| menubar.submenu.gap | --p-menubar-submenu-gap | Gap of submenu |
| menubar.submenu.background | --p-menubar-submenu-background | Background of submenu |
| menubar.submenu.border.color | --p-menubar-submenu-border-color | Border color of submenu |
| menubar.submenu.border.radius | --p-menubar-submenu-border-radius | Border radius of submenu |
| menubar.submenu.shadow | --p-menubar-submenu-shadow | Shadow of submenu |
| menubar.submenu.mobile.indent | --p-menubar-submenu-mobile-indent | Mobile indent of submenu |
| menubar.submenu.icon.size | --p-menubar-submenu-icon-size | Icon size of submenu |
| menubar.submenu.icon.color | --p-menubar-submenu-icon-color | Icon color of submenu |
| menubar.submenu.icon.focus.color | --p-menubar-submenu-icon-focus-color | Icon focus color of submenu |
| menubar.submenu.icon.active.color | --p-menubar-submenu-icon-active-color | Icon active color of submenu |
| menubar.separator.border.color | --p-menubar-separator-border-color | Border color of separator |
| menubar.mobile.button.border.radius | --p-menubar-mobile-button-border-radius | Border radius of mobile button |
| menubar.mobile.button.size | --p-menubar-mobile-button-size | Size of mobile button |
| menubar.mobile.button.color | --p-menubar-mobile-button-color | Color of mobile button |
| menubar.mobile.button.hover.color | --p-menubar-mobile-button-hover-color | Hover color of mobile button |
| menubar.mobile.button.hover.background | --p-menubar-mobile-button-hover-background | Hover background of mobile button |
| menubar.mobile.button.focus.ring.width | --p-menubar-mobile-button-focus-ring-width | Focus ring width of mobile button |
| menubar.mobile.button.focus.ring.style | --p-menubar-mobile-button-focus-ring-style | Focus ring style of mobile button |
| menubar.mobile.button.focus.ring.color | --p-menubar-mobile-button-focus-ring-color | Focus ring color of mobile button |
| menubar.mobile.button.focus.ring.offset | --p-menubar-mobile-button-focus-ring-offset | Focus ring offset of mobile button |
| menubar.mobile.button.focus.ring.shadow | --p-menubar-mobile-button-focus-ring-shadow | Focus ring shadow of mobile button |

