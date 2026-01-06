# Angular Dock Component

Dock is a navigation component consisting of menuitems.

## Accessibility

Screen Reader Dock component uses the menu role with the aria-orientation and the value to describe the menu can either be provided with aria-labelledby or aria-label props. Each list item has a presentation role whereas anchor elements have a menuitem role with aria-label referring to the label of the item and aria-disabled defined if the item is disabled. Keyboard Support Key Function tab Add focus to the first item if focus moves in to the menu. If the focus is already within the menu, focus moves to the next focusable item in the page tab sequence. shift + tab Add focus to the last item if focus moves in to the menu. If the focus is already within the menu, focus moves to the previous focusable item in the page tab sequence. enter Activates the focused menuitem. space Activates the focused menuitem. down arrow Moves focus to the next menuitem in vertical layout. up arrow Moves focus to the previous menuitem in vertical layout. home Moves focus to the first menuitem in horizontal layout. end Moves focus to the last menuitem in horizontal layout.

## Advanced

A mock desktop UI implemented with various components in addition to Dock.

```html
<p-menubar [model]="menubarItems">
    <ng-template #start>
        <i class="pi pi-apple px-2"></i>
    </ng-template>
    <ng-template #end>
        <i class="pi pi-video px-2"></i>
        <i class="pi pi-wifi px-2"></i>
        <i class="pi pi-volume-up px-2"></i>
        <span class="px-2">Fri 13:07</span>
        <i class="pi pi-search px-2"></i>
        <i class="pi pi-bars px-2"></i>
    </ng-template>
</p-menubar>
<div class="dock-window">
    <p-dock [model]="dockItems" position="bottom">
        <ng-template #item let-item>
            <a [pTooltip]="item.label" tooltipPosition="top" class="p-dock-item-link">
                <img [alt]="item.label" [src]="item.icon" style="width: 100%" />
            </a>
        </ng-template>
    </p-dock>
    <p-toast position="top-center" key="tc" />
    <p-dialog [(visible)]="displayFinder" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw', height: '18rem' }" [draggable]="false" [resizable]="false" header="Finder">
        <p-tree [value]="nodes" />
    </p-dialog>
    <p-dialog [maximizable]="true" [(visible)]="displayTerminal" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw' }" [draggable]="false" [resizable]="false" header="Terminal">
        <p-terminal welcomeMessage="Welcome to PrimeNG (cmd: 'date', 'greet {0}', 'random')" prompt="primeng $" />
    </p-dialog>
    <p-galleria
        [(value)]="images"
        [showThumbnails]="false"
        [showThumbnailNavigators]="false"
        [showItemNavigators]="true"
        [(visible)]="displayGalleria"
        [circular]="true"
        [responsiveOptions]="responsiveOptions"
        [circular]="true"
        [fullScreen]="true"
        [containerStyle]="{ width: '400px' }"
    >
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DockModule } from 'primeng/dock';
import { GalleriaModule } from 'primeng/galleria';
import { MenubarModule } from 'primeng/menubar';
import { TerminalModule } from 'primeng/terminal';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { TooltipModule } from 'primeng/tooltip';
import { NodeService } from '@/service/nodeservice';
import { PhotoService } from '@/service/photoservice';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="card dock-demo">
            <p-menubar [model]="menubarItems">
                <ng-template #start>
                    <i class="pi pi-apple px-2"></i>
                </ng-template>
                <ng-template #end>
                    <i class="pi pi-video px-2"></i>
                    <i class="pi pi-wifi px-2"></i>
                    <i class="pi pi-volume-up px-2"></i>
                    <span class="px-2">Fri 13:07</span>
                    <i class="pi pi-search px-2"></i>
                    <i class="pi pi-bars px-2"></i>
                </ng-template>
            </p-menubar>
            <div class="dock-window">
                <p-dock [model]="dockItems" position="bottom">
                    <ng-template #item let-item>
                        <a [pTooltip]="item.label" tooltipPosition="top" class="p-dock-item-link">
                            <img [alt]="item.label" [src]="item.icon" style="width: 100%" />
                        </a>
                    </ng-template>
                </p-dock>
                <p-toast position="top-center" key="tc" />
                <p-dialog [(visible)]="displayFinder" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw', height: '18rem' }" [draggable]="false" [resizable]="false" header="Finder">
                    <p-tree [value]="nodes" />
                </p-dialog>
                <p-dialog [maximizable]="true" [(visible)]="displayTerminal" [breakpoints]="{ '960px': '50vw' }" [style]="{ width: '30vw' }" [draggable]="false" [resizable]="false" header="Terminal">
                    <p-terminal welcomeMessage="Welcome to PrimeNG (cmd: 'date', 'greet {0}', 'random')" prompt="primeng $" />
                </p-dialog>
                <p-galleria
                    [(value)]="images"
                    [showThumbnails]="false"
                    [showThumbnailNavigators]="false"
                    [showItemNavigators]="true"
                    [(visible)]="displayGalleria"
                    [circular]="true"
                    [responsiveOptions]="responsiveOptions"
                    [circular]="true"
                    [fullScreen]="true"
                    [containerStyle]="{ width: '400px' }"
                >
                    <ng-template #item let-item>
                        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                    </ng-template>
                </p-galleria>
            </div>
        </div>
    `,
    standalone: true,
    imports: [DialogModule, DockModule, GalleriaModule, MenubarModule, TerminalModule, ToastModule, TreeModule, TooltipModule],
    providers: [NodeService, PhotoService]
})
export class DockAdvancedDemo implements OnInit {
    displayTerminal: boolean | undefined;
    displayFinder: boolean | undefined;
    displayGalleria: boolean | undefined;
    dockItems: MenuItem[] | undefined;
    menubarItems: any[] | undefined;
    responsiveOptions: any[] | undefined;
    images: any[] | undefined;
    nodes: any[] | undefined;
    subscription: Subscription | undefined;

    constructor(private galleriaService: PhotoService, private nodeService: NodeService, private messageService: MessageService, private terminalService: TerminalService) {}

    ngOnInit() {
        this.dockItems = [
            {
                label: 'Finder',
                tooltipOptions: {
                    tooltipLabel: 'Finder',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
                command: () => {
                    this.displayFinder = true;
                }
            },
            {
                label: 'Terminal',
                tooltipOptions: {
                    tooltipLabel: 'Terminal',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
                command: () => {
                    this.displayTerminal = true;
                }
            },
            {
                label: 'App Store',
                tooltipOptions: {
                    tooltipLabel: 'App Store',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/appstore.svg',
                url: 'https://www.apple.com/app-store/'
            },
            {
                label: 'Safari',
                tooltipOptions: {
                    tooltipLabel: 'Safari',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/safari.svg'
            },
            {
                label: 'Photos',
                tooltipOptions: {
                    tooltipLabel: 'Photos',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg',
                command: () => {
                    this.displayGalleria = true;
                }
            },
            {
                label: 'GitHub',
                tooltipOptions: {
                    tooltipLabel: 'GitHub',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/github.svg',
                url: 'https://github.com/primefaces/primeng'
            },
            {
                label: 'Trash',
                tooltipOptions: {
                    tooltipLabel: 'Trash',
                    tooltipPosition: 'top',
                    positionTop: -15,
                    positionLeft: 15,
                    showDelay: 1000
                },
                icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
                command: () => {
                    this.messageService.add({ severity: 'info', summary: 'Trash is empty', key: 'tc' });
                }
            }
        ];
        this.menubarItems = [
            {
                label: 'Finder',
                styleClass: 'menubar-root'
            },
            {
                label: 'File',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-plus',
                        items: [
                            {
                                label: 'Bookmark',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Video',
                                icon: 'pi pi-fw pi-video'
                            }
                        ]
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-trash'
                    },
                    {
                        separator: true
                    },
                    {
                        label: 'Export',
                        icon: 'pi pi-fw pi-external-link'
                    }
                ]
            },
            {
                label: 'Edit',
                items: [
                    {
                        label: 'Left',
                        icon: 'pi pi-fw pi-align-left'
                    },
                    {
                        label: 'Right',
                        icon: 'pi pi-fw pi-align-right'
                    },
                    {
                        label: 'Center',
                        icon: 'pi pi-fw pi-align-center'
                    },
                    {
                        label: 'Justify',
                        icon: 'pi pi-fw pi-align-justify'
                    }
                ]
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-fw pi-user-minus'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-fw pi-users',
                        items: [
                            {
                                label: 'Filter',
                                icon: 'pi pi-fw pi-filter',
                                items: [
                                    {
                                        label: 'Print',
                                        icon: 'pi pi-fw pi-print'
                                    }
                                ]
                            },
                            {
                                icon: 'pi pi-fw pi-bars',
                                label: 'List'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Events',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Quit'
            }
        ];
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
        this.subscription = this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));
        this.galleriaService.getImages().then((data) => (this.images = data));
        this.nodeService.getFiles().then((data) => (this.nodes = data));
    }

    commandHandler(text: any) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
        
        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;
        
            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;
        
            case 'random':
                response = Math.floor(Math.random() * 100);
                break;
        
            default:
                response = 'Unknown command: ' + command;
                break;
        }
        
        if (response) {
            this.terminalService.sendResponse(response as string);
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
```
</details>

## Basic

Dock requires a collection of menuitems as its model . Default location is bottom and other sides are also available when defined with the position property. Content of the dock component is defined by item template.

```html
<div class="flex flex-wrap gap-4 mb-8">
    <div *ngFor="let pos of positionOptions" class="flex items-center">
        <p-radiobutton name="dock" [value]="pos.value" [label]="pos.label" [(ngModel)]="position" [inputId]="pos.label" />
        <label [for]="pos.label" class="ml-2"> {{ pos.label }} </label>
    </div>
</div>
<div class="dock-window">
    <p-dock [model]="items" [position]="position">
        <ng-template #item let-item>
            <img [pTooltip]="item.label" tooltipPosition="top" [src]="item.icon" [alt]="item.label" width="100%" />
        </ng-template>
    </p-dock>
</div>
```

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

