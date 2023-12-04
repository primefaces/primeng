import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
        <p>TieredMenu offers item customization with the <i>item</i> template that receives the menuitem instance from the model as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <p-tieredMenu [model]="items">
            <ng-template pTemplate="item" let-item let-hasSubMenu="hasSubMenu">
            <a pRipple class="flex align-items-center p-menuitem-link">
            <span [class]="item.icon" class="p-menuitem-icon"></span>
                    <span class="ml-2">{{ item.label }}</span>
                    <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge"></p-badge>
                    <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    <i *ngIf="hasSubMenu" class="pi pi-angle-right ml-auto text-primary"></i>
                </a>
            </ng-template>
            </p-tieredMenu>
        </div>
        <app-code [code]="code" selector="tiered-menu-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
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

    code: Code = {
        basic: `<p-tieredMenu [model]="items">
        <ng-template pTemplate="item" let-item let-hasSubMenu="hasSubMenu">
        <a pRipple class="flex align-items-center p-menuitem-link">
        <span [class]="item.icon" class="p-menuitem-icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <Badge *ngIf="item.badge" styleClass="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                <i *ngIf="hasSubMenu" class="pi pi-angle-right ml-auto text-primary"></i>
            </a>
        </ng-template>
</p-tieredMenu>`,

        html: `<div class="card flex justify-content-center">
    <p-tieredMenu [model]="items">
    <ng-template pTemplate="item" let-item let-hasSubMenu="hasSubMenu">
    <a pRipple class="flex align-items-center p-menuitem-link">
    <span [class]="item.icon" class="p-menuitem-icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <Badge *ngIf="item.badge" styleClass="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
            <i *ngIf="hasSubMenu" class="pi pi-angle-right ml-auto text-primary"></i>
        </a>
    </ng-template>
    </p-tieredMenu>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'tiered-menu-template-demo',
    templateUrl: './tiered-menu-template-demo.html'
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
                                label: 'Document',
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
}`
    };
}
