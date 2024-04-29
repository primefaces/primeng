import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>PanelMenu requires a collection of menuitems as its <i>model</i>.</p>
        </app-docsectiontext>
        <div class="card flex flex-column align-items-center">
            <p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
                <ng-template pTemplate="headercontent" let-item>
                    <div class="flex justify-content-between align-items-center py-1 px-3">
                        <i [class]="item.icon + ' text-primary'"></i>
                        <span [ngClass]="{ 'ml-2 font-semibold': item.items }">{{ item.label }}</span>
                        <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                        <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    </div>
                </ng-template>
                <ng-template pTemplate="item" let-item>
                    <a pRipple class="flex align-items-center px-3 py-2 cursor-pointer">
                        <i [class]="item.icon + ' text-primary'"></i>
                        <span class="ml-2">{{ item.label }}</span>
                        <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                        <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    </a>
                </ng-template>
            </p-panelMenu>
        </div>
        <app-code [code]="code" selector="panel-menu-template-demo"></app-code>
    `,

    styles: [
        `
            :host ::ng-deep {
                .p-panelmenu-content {
                    padding: 0;
                }
            }
        `
    ]
})
export class TemplateDoc implements OnInit {
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

    code: Code = {
        basic: `<p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
    <ng-template pTemplate="headercontent" let-item>
        <div class="flex justify-content-between align-items-center py-1 px-3">
            <i [class]="item.icon + ' text-primary'"></i>
            <span [ngClass]="{ 'ml-2 font-semibold': item.items }">
                {{ item.label }}
            </span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                {{ item.shortcut }}
            </span>
        </div>
    </ng-template>
    <ng-template pTemplate="item" let-item>
        <a pRipple class="flex align-items-center px-3 py-2 cursor-pointer">
            <i [class]="item.icon + ' text-primary'"></i>
            <span class="ml-2">
                {{ item.label }}
            </span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                {{ item.shortcut }}
            </span>
        </a>
    </ng-template>
</p-panelMenu>`,

        html: `<div class="card flex flex-column align-items-center">
    <p-panelMenu [model]="items" styleClass="w-full md:w-20rem">
        <ng-template pTemplate="headercontent" let-item>
            <div class="flex justify-content-between align-items-center py-1 px-3">
                <i [class]="item.icon + ' text-primary'"></i>
                <span [ngClass]="{ 'ml-2 font-semibold': item.items }">
                    {{ item.label }}
                </span>
                <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    {{ item.shortcut }}
                </span>
            </div>
        </ng-template>
        <ng-template pTemplate="item" let-item>
            <a pRipple class="flex align-items-center px-3 py-2 cursor-pointer">
                <i [class]="item.icon + ' text-primary'"></i>
                <span class="ml-2">
                    {{ item.label }}
                </span>
                <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    {{ item.shortcut }}
                </span>
            </a>
        </ng-template>
    </p-panelMenu>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'panel-menu-template-demo',
    templateUrl: './panel-menu-template-demo.html',
    standalone: true,
    imports: [PanelMenuModule, BadgeModule, RippleModule]
})
export class PanelMenuTemplateDemo implements OnInit {
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
}`
    };
}
