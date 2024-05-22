import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Code } from '@domain/code';
import { ContextMenu } from 'primeng/contextmenu';

@Component({
    selector: 'context-menu-template-demo',
    template: `
        <app-docsectiontext>
            <p>ContextMenu offers item customization with the <i>item</i> template that receives the menuitem instance from the model as a parameter.</p>
        </app-docsectiontext>
        <div class="card flex md:justify-content-center">
            <ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
                <li *ngFor="let product of data" class="p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200" (contextmenu)="onContextMenu($event)">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">
                        <img class="w-4rem flex-shrink-0 border-round" src="https://primefaces.org/cdn/primeng/images/{{ product.image }}" alt="product.name" />
                        <div class="flex-1 flex flex-column gap-1">
                            <span class="font-bold">{{ product.name }}</span>
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag text-sm"></i>
                                <span>{{ product.category }}</span>
                            </div>
                        </div>
                        <span class="font-bold text-900 ml-5">&#36;{{ product.price }}</span>
                    </div>
                </li>
            </ul>

            <p-contextMenu #cm [model]="items" (onHide)="onHide()">
                <ng-template pTemplate="item" let-item>
                    <a pRipple class="flex align-items-center p-menuitem-link">
                        <span class="item.icon"></span>
                        <span class="ml-2">{{ item.label }}</span>
                        <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                        <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                        <i *ngIf="item.items" class="pi pi-angle-right ml-auto"></i>
                    </a>
                </ng-template>
            </p-contextMenu>
        </div>

        <app-code [code]="code" selector="context-menu-template-demo"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    items: MenuItem[] | undefined;

    @ViewChild('cm') cm: ContextMenu;

    selectedId!: string;

    data = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            description: 'Product Description',
            image: 'blue-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            description: 'Product Description',
            image: 'blue-t-shirt.jpg',
            price: 29,
            category: 'Clothing',
            quantity: 25,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            description: 'Product Description',
            image: 'bracelet.jpg',
            price: 15,
            category: 'Accessories',
            quantity: 73,
            inventoryStatus: 'INSTOCK',
            rating: 4
        }
    ];

    ngOnInit() {
        this.items = [
            {
                label: 'Favorite',
                icon: 'pi pi-star',
                shortcut: '⌘+D'
            },
            {
                label: 'Add',
                icon: 'pi pi-shopping-cart',
                shortcut: '⌘+A'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp',
                        badge: '2'
                    },
                    {
                        label: 'Instagram',
                        icon: 'pi pi-instagram',
                        badge: '3'
                    }
                ]
            }
        ];
    }

    onContextMenu(event) {
        this.cm.target = event.currentTarget;
        this.cm.show(event);
    }

    onHide() {
        this.selectedId = undefined;
    }

    code: Code = {
        basic: `<ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
    <li 
        *ngFor="let product of data" 
        class="p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200" 
        (contextmenu)="onContextMenu($event)">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                <img 
                    class="w-4rem flex-shrink-0 border-round" 
                    src="https://primefaces.org/cdn/primeng/images/product/{{ product.image }}" 
                    alt="product.name" />
                <div class="flex-1 flex flex-column gap-1">
                    <span class="font-bold">
                        {{ product.name }}
                    </span>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-tag text-sm"></i>
                        <span>
                            {{ product.category }}
                        </span>
                    </div>
                </div>
                <span class="font-bold text-900 ml-5">
                &#36;{{ product.price }}
                </span>
            </div>
    </li>
</ul>

<p-contextMenu #cm [model]="items" (onHide)="onHide()">
    <ng-template pTemplate="item" let-item>
        <a pRipple class="flex align-items-center p-menuitem-link">
            <span class="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                {{ item.shortcut }}
            </span>
            <i *ngIf="item.items" class="pi pi-angle-right ml-auto"></i>
        </a>
    </ng-template>
</p-contextMenu>`,

        html: `<div class="card flex justify-content-center">
    <ul class="m-0 p-0 list-none border-1 surface-border border-round p-3 flex flex-column gap-2 w-full md:w-30rem">
        <li 
            *ngFor="let product of data" 
            class="p-2 hover:surface-hover border-round border-1 border-transparent transition-all transition-duration-200" 
            (contextmenu)="onContextMenu($event)">
                <div class="flex flex-wrap p-2 align-items-center gap-3">
                    <img 
                        class="w-4rem flex-shrink-0 border-round" 
                        src="https://primefaces.org/cdn/primeng/images/product/{{ product.image }}" 
                        alt="product.name" />
                        <div class="flex-1 flex flex-column gap-1">
                            <span class="font-bold">
                                {{ product.name }}
                            </span>
                            <div class="flex align-items-center gap-2">
                                <i class="pi pi-tag text-sm"></i>
                                <span>
                                    {{ product.category }}
                                </span>
                            </div>
                        </div>
                        <span class="font-bold text-900 ml-5">
                        &#36;{{ product.price }}
                        </span>
                </div>
        </li>
    </ul>

    <p-contextMenu #cm [model]="items" (onHide)="onHide()">
        <ng-template pTemplate="item" let-item>
            <a pRipple class="flex align-items-center p-menuitem-link">
                <span class="item.icon"></span>
                <span class="ml-2">{{ item.label }}</span>
                <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
                <span *ngIf="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    {{ item.shortcut }}
                </span>
                <i *ngIf="item.items" class="pi pi-angle-right ml-auto"></i>
            </a>
        </ng-template>
    </p-contextMenu>
</div>`,

        typescript: `import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';


@Component({
    selector: 'context-menu-template-demo',
    templateUrl: './context-menu-template-demo.html',
    standalone: true,
    imports: [ContextMenuModule, CommonModule, RippleModule]
})
export class ContextMenuTemplateDemo implements OnInit {
    items: MenuItem[] | undefined;

    @ViewChild('cm') cm: ContextMenu;

    selectedId!: string;

    data = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'black-watch.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'INSTOCK',
            rating: 4
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            description: 'Product Description',
            image: 'blue-band.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 3
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            description: 'Product Description',
            image: 'blue-t-shirt.jpg',
            price: 29,
            category: 'Clothing',
            quantity: 25,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            description: 'Product Description',
            image: 'bracelet.jpg',
            price: 15,
            category: 'Accessories',
            quantity: 73,
            inventoryStatus: 'INSTOCK',
            rating: 4
        }
    ];

    ngOnInit() {
        this.items = [
            {
                label: 'Favorite',
                icon: 'pi pi-star',
                shortcut: '⌘+D'
            },
            {
                label: 'Add',
                icon: 'pi pi-shopping-cart',
                shortcut: '⌘+A'
            },
            {
                separator: true
            },
            {
                label: 'Share',
                icon: 'pi pi-share-alt',
                items: [
                    {
                        label: 'Whatsapp',
                        icon: 'pi pi-whatsapp',
                        badge: '2'
                    },
                    {
                        label: 'Instagram',
                        icon: 'pi pi-instagram',
                        badge: '3'
                    }
                ]
            }
        ];
    }

    onContextMenu(event) {
        this.cm.target = event.currentTarget;
        this.cm.show(event);
    }

    onHide() {
        this.selectedId = undefined;
    }
}`
    };
}
