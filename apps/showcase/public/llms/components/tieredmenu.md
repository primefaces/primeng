# Angular TieredMenu Component

TieredMenu displays submenus in nested overlays.

## Accessibility

Screen Reader TieredMenu component uses the menubar role with aria-orientation set to "vertical" and the value to describe the menu can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. A submenu within a TieredMenu uses the menu role with an aria-labelledby defined as the id of the submenu root menuitem label. In addition, menuitems that open a submenu have aria-haspopup , aria-expanded and aria-controls to define the relation between the item and the submenu. In popup mode, the component implicitly manages the aria-expanded , aria-haspopup and aria-controls attributes of the target element to define the relation between the target and the popup. Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. space If menuitem has a submenu, toggles the visibility of the submenu otherwise activates the menuitem and closes all open overlays. escape If focus is inside a popup submenu, closes the submenu and moves focus to the root item of the closed submenu. down arrow Moves focus to the next menuitem within the submenu. up arrow Moves focus to the previous menuitem within the submenu. right arrow Opens a submenu if there is one available and moves focus to the first item. left arrow Closes a submenu and moves focus to the root item of the closed submenu. home Moves focus to the first menuitem within the submenu. end Moves focus to the last menuitem within the submenu.

## Basic

TieredMenu requires a collection of menuitems as its model .

```html
<p-tieredmenu [model]="items" />
```

## Command

The command property defines the callback to run when an item is activated by click or a key event.

```html
<p-toast/>
<p-tieredmenu [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'tiered-menu-command-demo',
    templateUrl: './tiered-menu-command-demo.html',
    standalone: true,
    imports: [TieredMenu, ToastModule],
    providers: [MessageService]
})
export class TieredMenuCommandDemo implements OnInit {

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

## Popup

Popup mode is enabled by adding popup property and calling toggle method with an event of the target.

```html
<p-button label="Toggle" (click)="menu.toggle($event)" />
<p-tieredmenu #menu [model]="items" [popup]="true" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'tiered-menu-popup-demo',
    templateUrl: './tiered-menu-popup-demo.html',
    standalone: true,
    imports: [TieredMenu, ButtonModule]
})
export class TieredMenuPopupDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Document',
                                icon: 'pi pi-file'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp'
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
<p-tieredmenu [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TieredMenu } from 'primeng/tieredmenu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tiered-menu-router-demo',
    templateUrl: './tiered-menu-router-demo.html',
    standalone: true,
    imports: [TieredMenu, CommonModule]
})
export class TieredMenuRouterDemo implements OnInit {

    items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Router',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Theming',
                        routerLink: '/theming'
                    },
                    {
                        label: 'UI Kit',
                        routerLink: '/uikit'
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
                        url: 'https://angular.dev/'
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

TieredMenu offers item customization with the item template that receives the menuitem instance from the model as a parameter.

```html
<p-tieredmenu [model]="items">
    <ng-template #item let-item let-hasSubmenu="hasSubmenu">
        <a pRipple class="flex items-center px-4 py-3 cursor-pointer">
            <span [class]="item.icon"></span>
            <span class="ms-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
            <i *ngIf="hasSubmenu" class="pi pi-angle-right ms-auto rotate-90 lg:rotate-0"></i>
        </a>
    </ng-template>
</p-tieredmenu>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'tiered-menu-template-demo',
    templateUrl: './tiered-menu-template-demo.html',
    standalone: true,
    imports: [TieredMenu, BadgeModule, Ripple, CommonModule]
})
export class TieredMenuTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-plus',
                        items: [
                            {
                                label: 'Docs',
                                icon: 'pi pi-file',
                                shortcut: '⌘+N'
                            },
                            {
                                label: 'Image',
                                icon: 'pi pi-image',
                                shortcut: '⌘+I'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-video',
                                shortcut: '⌘+L'
                            }
                        ]
                    },
                    {
                        label: 'Open',
                        icon: 'pi pi-folder-open',
                        shortcut: '⌘+O'
                    },
                    {
                        label: 'Print',
                        icon: 'pi pi-print',
                        shortcut: '⌘+P'
                    }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-file-edit',
                items: [
                    {
                        label: 'Copy',
                        icon: 'pi pi-copy',
                        shortcut: '⌘+C'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times',
                        shortcut: '⌘+D'
                    }
                ]
            },
            {
                label: 'Search',
                icon: 'pi pi-search',
                shortcut: '⌘+S'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Slack',
                        icon: 'pi pi-slack',
                        badge: '2'
                    },
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp',
                        badge: '3'
                    }
                ]
            }
        ]
    }
}
```
</details>

## Tiered Menu

TieredMenu displays submenus in nested overlays.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TieredMenuPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| model | MenuItem[] | - | An array of menuitems. |
| popup | boolean | false | Defines if menu would displayed as a popup. |
| style | { [klass: string]: any } | - | Inline style of the component. |
| styleClass | string | - | Style class of the component. |
| breakpoint | string | 960px | The breakpoint to define the maximum width boundary. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoDisplay | boolean | true | Whether to show a root submenu on mouse over. |
| showTransitionOptions | string | .12s cubic-bezier(0, 0, 0.2, 1) | Transition options of the show animation. **(Deprecated)** |
| hideTransitionOptions | string | .1s linear | Transition options of the hide animation. **(Deprecated)** |
| id | string | - | Current id state as a string. |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |
| disabled | boolean | false | When present, it specifies that the component should be disabled. |
| tabindex | number | 0 | Index of the element in tabbing order. |
| appendTo | InputSignal<any> | 'self' | Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name). |
| motionOptions | InputSignal<MotionOptions> | ... | The motion options. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onShow | value: any | Callback to invoke when overlay menu is shown. |
| onHide | value: any | Callback to invoke when overlay menu is hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| submenuicon | TemplateRef<void> | Custom submenu icon template. |
| item | TemplateRef<TieredMenuItemTemplateContext> | Custom item template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| hide | event: any, isFocus: boolean | void | Hides the popup menu. |
| toggle | event: any | void | Toggles the visibility of the popup menu. |
| show | event: any, isFocus: any | void | Displays the popup menu. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| rootList | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the root list's DOM element. |
| submenu | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the submenu's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| itemContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the item content's DOM element. |
| itemLink | PassThroughOption<HTMLAnchorElement, I> | Used to pass attributes to the item link's DOM element. |
| itemIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item icon's DOM element. |
| itemLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the item label's DOM element. |
| submenuIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the submenu icon's DOM element. |
| separator | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the separator's DOM element. |
| motion | MotionOptions | Used to pass options to the motion component/directive. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-tieredmenu | Class name of the root element |
| p-tieredmenu-start | Class name of the start element |
| p-tieredmenu-root-list | Class name of the root list element |
| p-tieredmenu-item | Class name of the item element |
| p-tieredmenu-item-content | Class name of the item content element |
| p-tieredmenu-item-link | Class name of the item link element |
| p-tieredmenu-item-icon | Class name of the item icon element |
| p-tieredmenu-item-label | Class name of the item label element |
| p-tieredmenu-submenu-icon | Class name of the submenu icon element |
| p-tieredmenu-submenu | Class name of the submenu element |
| p-tieredmenu-separator | Class name of the separator element |
| p-tieredmenu-end | Class name of the end element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| tieredmenu.background | --p-tieredmenu-background | Background of root |
| tieredmenu.border.color | --p-tieredmenu-border-color | Border color of root |
| tieredmenu.color | --p-tieredmenu-color | Color of root |
| tieredmenu.border.radius | --p-tieredmenu-border-radius | Border radius of root |
| tieredmenu.shadow | --p-tieredmenu-shadow | Shadow of root |
| tieredmenu.transition.duration | --p-tieredmenu-transition-duration | Transition duration of root |
| tieredmenu.list.padding | --p-tieredmenu-list-padding | Padding of list |
| tieredmenu.list.gap | --p-tieredmenu-list-gap | Gap of list |
| tieredmenu.item.focus.background | --p-tieredmenu-item-focus-background | Focus background of item |
| tieredmenu.item.active.background | --p-tieredmenu-item-active-background | Active background of item |
| tieredmenu.item.color | --p-tieredmenu-item-color | Color of item |
| tieredmenu.item.focus.color | --p-tieredmenu-item-focus-color | Focus color of item |
| tieredmenu.item.active.color | --p-tieredmenu-item-active-color | Active color of item |
| tieredmenu.item.padding | --p-tieredmenu-item-padding | Padding of item |
| tieredmenu.item.border.radius | --p-tieredmenu-item-border-radius | Border radius of item |
| tieredmenu.item.gap | --p-tieredmenu-item-gap | Gap of item |
| tieredmenu.item.icon.color | --p-tieredmenu-item-icon-color | Icon color of item |
| tieredmenu.item.icon.focus.color | --p-tieredmenu-item-icon-focus-color | Icon focus color of item |
| tieredmenu.item.icon.active.color | --p-tieredmenu-item-icon-active-color | Icon active color of item |
| tieredmenu.submenu.mobile.indent | --p-tieredmenu-submenu-mobile-indent | Mobile indent of submenu |
| tieredmenu.submenu.icon.size | --p-tieredmenu-submenu-icon-size | Size of submenu icon |
| tieredmenu.submenu.icon.color | --p-tieredmenu-submenu-icon-color | Color of submenu icon |
| tieredmenu.submenu.icon.focus.color | --p-tieredmenu-submenu-icon-focus-color | Focus color of submenu icon |
| tieredmenu.submenu.icon.active.color | --p-tieredmenu-submenu-icon-active-color | Active color of submenu icon |
| tieredmenu.separator.border.color | --p-tieredmenu-separator-border-color | Border color of separator |

