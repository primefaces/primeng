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

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'panel-menu-command-demo',
    templateUrl: './panel-menu-command-demo.html',
    standalone: true,
    imports: [PanelMenu, ToastModule],
    providers: [MessageService]
})
export class PanelMenuCommandDemo implements OnInit {
    items: MenuItem[];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
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
                        label: 'Search',
                        icon: 'pi pi-search',
                        command: () => {
                            this.messageService.add({ severity: 'warn', summary: 'Search Results', detail: 'No results found', life: 3000 });
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
            },
            {
                label: 'Sign Out',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Signed out', detail: 'User logged out', life: 3000 });
                }
            }
        ];
    }
}
```
</details>

## Controlled

Menu items can be controlled programmatically.

```html
<p-button label="Toggle All" [text]="true" (onClick)="toggleAll()" />
<p-panelmenu [model]="items" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'panel-menu-controlled-demo',
    templateUrl: './panel-menu-controlled-demo.html',
    standalone: true,
    imports: [PanelMenu, ButtonModule]
})
export class PanelMenuControlledDemo implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                key: '0',
                label: 'Users',
                icon: 'pi pi-users',
                items: [
                    {
                        key: '0_1',
                        label: 'New',
                        items: [
                            {
                                key: '0_1_0',
                                label: 'Member'
                            },
                            {
                                key: '0_1_1',
                                label: 'Group'
                            }
                        ]
                    },
                    {
                        key: '0_2',
                        label: 'Search'
                    }
                ]
            },
            {
                key: '1',
                label: 'Tasks',
                icon: 'pi pi-server',
                items: [
                    {
                        key: '1_0',
                        label: 'Add New'
                    },
                    {
                        key: '1_1',
                        label: 'Pending'
                    },
                    {
                        key: '1_2',
                        label: 'Overdue'
                    }
                ]
            },
            {
                key: '2',
                label: 'Calendar',
                icon: 'pi pi-calendar',
                items: [
                    {
                        key: '2_0',
                        label: 'New Event'
                    },
                    {
                        key: '2_1',
                        label: 'Today'
                    },
                    {
                        key: '2_2',
                        label: 'This Week'
                    }
                ]
            }
        ];
    }

    toggleAll() {
        const expanded = !this.areAllItemsExpanded();
        this.items = this.toggleAllRecursive(this.items, expanded);
    }

    private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
        return items.map((menuItem) => {
            menuItem.expanded = expanded;
            if (menuItem.items) {
                menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
            }
            return menuItem;
        });
    }

    private areAllItemsExpanded(): boolean {
        return this.items.every((menuItem) => menuItem.expanded);
    }
}
```
</details>

## Multiple

Only one single root menuitem can be active by default, enable multiple property to be able to open more than one items.

```html
<p-panelmenu [model]="items" [style]="{'width':'300px'}" [multiple]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
    selector: 'panel-menu-multiple-demo',
    templateUrl: './panel-menu-multiple-demo.html',
    standalone: true,
    imports: [PanelMenu]
})
export class PanelMenuMultipleDemo implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Files',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Documents',
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Invoices',
                                icon: 'pi pi-file-pdf',
                                items: [
                                    {
                                        label: 'Pending',
                                        icon: 'pi pi-stop'
                                    },
                                    {
                                        label: 'Paid',
                                        icon: 'pi pi-check-circle'
                                    }
                                ]
                            },
                            {
                                label: 'Clients',
                                icon: 'pi pi-users'
                            }
                        ]
                    },
                    {
                        label: 'Images',
                        icon: 'pi pi-image',
                        items: [
                            {
                                label: 'Logos',
                                icon: 'pi pi-image'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Cloud',
                icon: 'pi pi-cloud',
                items: [
                    {
                        label: 'Upload',
                        icon: 'pi pi-cloud-upload'
                    },
                    {
                        label: 'Download',
                        icon: 'pi pi-cloud-download'
                    },
                    {
                        label: 'Sync',
                        icon: 'pi pi-refresh'
                    }
                ]
            },
            {
                label: 'Devices',
                icon: 'pi pi-desktop',
                items: [
                    {
                        label: 'Phone',
                        icon: 'pi pi-mobile'
                    },
                    {
                        label: 'Desktop',
                        icon: 'pi pi-desktop'
                    },
                    {
                        label: 'Tablet',
                        icon: 'pi pi-tablet'
                    }
                ]
            }
        ]
    }
}
```
</details>

## Router

Menu items support navigation via routerLink, programmatic routing using commands, or external URLs.

```html
<p-panelmenu [model]="items" class="w-full md:w-80" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { Router } from '@angular/router';

@Component({
    selector: 'panel-menu-router-demo',
    templateUrl: './panel-menu-router-demo.html',
    standalone: true,
    imports: [PanelMenu],
    providers: [MessageService]
})
export class PanelMenuRouterDemo implements OnInit {
    items: MenuItem[];

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Installation',
                        icon: 'pi pi-eraser',
                        routerLink: '/installation'
                    },
                    {
                        label: 'Configuration',
                        icon: 'pi pi-heart',
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
                        icon: 'pi pi-star',
                        url: 'https://angular.io/'
                    },
                    {
                        label: 'Vite.js',
                        icon: 'pi pi-bookmark',
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

PanelMenu requires a collection of menuitems as its model .

```html
<p-panelmenu [model]="items" class="w-full md:w-80">
    <ng-template #item let-item>
         <a pRipple class="flex items-center px-4 py-2 cursor-pointer group">
            <i [class]="item.icon + ' text-primary group-hover:text-inherit'"></i>
            <span class="ms-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ms-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ms-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
        </a>
    </ng-template>
</p-panelmenu>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'panel-menu-template-demo',
    templateUrl: './panel-menu-template-demo.html',
    standalone: true,
    imports: [PanelMenu, BadgeModule, Ripple, CommonModule]
})
export class PanelMenuTemplateDemo implements OnInit {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'Mail',
                icon: 'pi pi-envelope',
                badge: '5',
                items: [
                    {
                        label: 'Compose',
                        icon: 'pi pi-file-edit',
                        shortcut: '⌘+N'
                    },
                    {
                        label: 'Inbox',
                        icon: 'pi pi-inbox',
                        badge: '5'
                    },
                    {
                        label: 'Sent',
                        icon: 'pi pi-send',
                        shortcut: '⌘+S'
                    },
                    {
                        label: 'Trash',
                        icon: 'pi pi-trash',
                        shortcut: '⌘+T'
                    }
                ]
            },
            {
                label: 'Reports',
                icon: 'pi pi-chart-bar',
                shortcut: '⌘+R',
                items: [
                    {
                        label: 'Sales',
                        icon: 'pi pi-chart-line',
                        badge: '3'
                    },
                    {
                        label: 'Products',
                        icon: 'pi pi-list',
                        badge: '6'
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                shortcut: '⌘+W',
                items: [
                    {
                        label: 'Settings',
                        icon: 'pi pi-cog',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Privacy',
                        icon: 'pi pi-shield',
                        shortcut: '⌘+P'
                    }
                ]
            }
        ];
    }

    toggleAll() {
        const expanded = !this.areAllItemsExpanded();
        this.items = this.toggleAllRecursive(this.items, expanded);
    }

    private toggleAllRecursive(items: MenuItem[], expanded: boolean): MenuItem[] {
        return items.map((menuItem) => {
            menuItem.expanded = expanded;
            if (menuItem.items) {
                menuItem.items = this.toggleAllRecursive(menuItem.items, expanded);
            }
            return menuItem;
        });
    }

    private areAllItemsExpanded(): boolean {
        return this.items.every((menuItem) => menuItem.expanded);
    }

}
```
</details>

## Panel Menu

PanelMenu is a hybrid of Accordion and Tree components.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<PanelMenuPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| multiple | boolean | false | Whether multiple tabs can be activated at the same time or not. |
| transitionOptions | string | 400ms cubic-bezier(0.86, 0, 0.07, 1) | Transition options of the animation. **(Deprecated)** |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |
| id | string | - | Current id state as a string. |
| tabindex | number | 0 | Index of the element in tabbing order. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| submenuicon | TemplateRef<void> | Template option of submenu icon. |
| headericon | TemplateRef<void> | Template option of header icon. |
| item | TemplateRef<PanelMenuItemTemplateContext> | Template option of item. |

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
| contentWrapper | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the toggleable content's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the menu content's DOM element. |
| rootList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the root list's DOM element. |
| submenu | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the submenu's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

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

