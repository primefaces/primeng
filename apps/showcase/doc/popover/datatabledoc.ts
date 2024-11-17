import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';

@Component({
    selector: 'data-table-doc',
    template: `
        <app-docsectiontext>
            <p>Place the Popover outside of the data iteration components to avoid rendering it multiple times.</p>
        </app-docsectiontext>
        <div class="card">
            <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="5">
                <ng-template pTemplate="header">
                    <tr>
                        <th class="w-1/6">Id</th>
                        <th class="w-1/6">Code</th>
                        <th class="w-1/6">Name</th>
                        <th class="w-1/6" pSortableColumn="price">Price <p-sortIcon field="price" /></th>
                        <th class="w-1/6">Image</th>
                        <th class="w-1/6">Details</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-product>
                    <tr>
                        <td>{{ product.id }}</td>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>$ {{ product.price }}</td>
                        <td>
                            <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image" [alt]="product.image" class="w-16 shadow-sm" />
                        </td>
                        <td>
                            <p-button (onClick)="displayProduct($event, product)" icon="pi pi-search" severity="secondary" rounded />
                        </td>
                    </tr>
                </ng-template>
            </p-table>
            <p-popover #op (onHide)="selectedProduct = null">
                <ng-template pTemplate="content">
                    <div *ngIf="selectedProduct" class="rounded flex flex-col">
                        <div class="flex justify-center rounded">
                            <div class="relative mx-auto">
                                <img class="rounded w-44 sm:w-64" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image" [alt]="selectedProduct.name" />
                                <p-tag [value]="selectedProduct.inventoryStatus" [severity]="getSeverity(selectedProduct)" class="absolute" styleClass="dark:!bg-surface-900" [style.left.px]="4" [style.top.px]="4" />
                            </div>
                        </div>
                        <div class="pt-4">
                            <div class="flex flex-row justify-between items-start gap-2 mb-4">
                                <div>
                                    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ selectedProduct.category }}</span>
                                    <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
                                </div>
                                <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                    <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                        <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                                        <i class="pi pi-star-fill text-yellow-500"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <p-button
                                    icon="pi pi-shopping-cart"
                                    [label]="'Buy Now | $' + selectedProduct.price"
                                    [disabled]="selectedProduct.inventoryStatus === 'OUTOFSTOCK'"
                                    class="flex-auto"
                                    styleClass="w-full whitespace-nowrap"
                                    (onClick)="hidePopover()"
                                />
                                <p-button icon="pi pi-heart" outlined (onClick)="hidePopover()" />
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-popover>
        </div>
        <app-code [code]="code" selector="popover-data-table-demo" [extFiles]="extFiles"></app-code>
    `,
    providers: [MessageService]
})
export class DataTableDoc implements OnInit {
    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    @ViewChild('op') op!: Popover;

    products: Product[] | undefined;

    selectedProduct: Product | undefined;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.cdr.markForCheck();
        });
    }
    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="5">
    <ng-template pTemplate="header">
        <tr>
            <th class="w-1/6">Id</th>
            <th class="w-1/6">Code</th>
            <th class="w-1/6">Name</th>
            <th class="w-1/6" pSortableColumn="price">Price <p-sortIcon field="price" /></th>
            <th class="w-1/6">Image</th>
            <th class="w-1/6">Details</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-product>
        <tr>
            <td>{{ product.id }}</td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>$ {{ product.price }}</td>
            <td>
                <img
                    [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image"
                    [alt]="product.image"
                    class="w-16 shadow-sm"
                />
            </td>
            <td>
                <p-button (onClick)="displayProduct($event, product)" icon="pi pi-search" severity="secondary" rounded />
            </td>
        </tr>
    </ng-template>
</p-table>
<p-popover #op (onHide)="selectedProduct = null">
    <ng-template pTemplate="content">
        <div *ngIf="selectedProduct" class="rounded flex flex-col">
            <div class="flex justify-center rounded">
                <div class="relative mx-auto">
                    <img
                        class="rounded w-44 sm:w-64"
                        [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image"
                        [alt]="selectedProduct.name"
                    />
                    <p-tag
                        [value]="selectedProduct.inventoryStatus"
                        [severity]="getSeverity(selectedProduct)"
                        class="absolute"
                        styleClass="dark:!bg-surface-900"
                        [style.left.px]="4"
                        [style.top.px]="4"
                    />
                </div>
            </div>
            <div class="pt-4">
                <div class="flex flex-row justify-between items-start gap-2 mb-4">
                    <div>
                        <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                            selectedProduct.category
                        }}</span>
                        <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
                    </div>
                    <div class="bg-surface-100 p-1" style="border-radius: 30px">
                        <div
                            class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                            style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                        >
                            <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                            <i class="pi pi-star-fill text-yellow-500"></i>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    <p-button
                        icon="pi pi-shopping-cart"
                        [label]="'Buy Now | $' + selectedProduct.price"
                        [disabled]="selectedProduct.inventoryStatus === 'OUTOFSTOCK'"
                        class="flex-auto"
                        styleClass="w-full whitespace-nowrap"
                        (onClick)="hidePopover()"
                    />
                    <p-button icon="pi pi-heart" outlined (onClick)="hidePopover()" />
                </div>
            </div>
        </div>
    </ng-template>
</p-popover>`,

        html: `<div class="card">
    <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="5">
        <ng-template pTemplate="header">
            <tr>
                <th class="w-1/6">Id</th>
                <th class="w-1/6">Code</th>
                <th class="w-1/6">Name</th>
                <th class="w-1/6" pSortableColumn="price">Price <p-sortIcon field="price" /></th>
                <th class="w-1/6">Image</th>
                <th class="w-1/6">Details</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
            <tr>
                <td>{{ product.id }}</td>
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>$ {{ product.price }}</td>
                <td>
                    <img
                        [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + product.image"
                        [alt]="product.image"
                        class="w-16 shadow-sm"
                    />
                </td>
                <td>
                    <p-button (onClick)="displayProduct($event, product)" icon="pi pi-search" severity="secondary" rounded />
                </td>
            </tr>
        </ng-template>
    </p-table>
    <p-popover #op (onHide)="selectedProduct = null">
        <ng-template pTemplate="content">
            <div *ngIf="selectedProduct" class="rounded flex flex-col">
                <div class="flex justify-center rounded">
                    <div class="relative mx-auto">
                        <img
                            class="rounded w-44 sm:w-64"
                            [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + selectedProduct.image"
                            [alt]="selectedProduct.name"
                        />
                        <p-tag
                            [value]="selectedProduct.inventoryStatus"
                            [severity]="getSeverity(selectedProduct)"
                            class="absolute"
                            styleClass="dark:!bg-surface-900"
                            [style.left.px]="4"
                            [style.top.px]="4"
                        />
                    </div>
                </div>
                <div class="pt-4">
                    <div class="flex flex-row justify-between items-start gap-2 mb-4">
                        <div>
                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{
                                selectedProduct.category
                            }}</span>
                            <div class="text-lg font-medium mt-1">{{ selectedProduct.name }}</div>
                        </div>
                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                            <div
                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                            >
                                <span class="text-surface-900 font-medium text-sm">{{ selectedProduct.rating }}</span>
                                <i class="pi pi-star-fill text-yellow-500"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <p-button
                            icon="pi pi-shopping-cart"
                            [label]="'Buy Now | $' + selectedProduct.price"
                            [disabled]="selectedProduct.inventoryStatus === 'OUTOFSTOCK'"
                            class="flex-auto"
                            styleClass="w-full whitespace-nowrap"
                            (onClick)="hidePopover()"
                        />
                        <p-button icon="pi pi-heart" outlined (onClick)="hidePopover()" />
                    </div>
                </div>
            </div>
        </ng-template>
    </p-popover>
</div>`,

        typescript: `import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'popover-data-table-demo',
    templateUrl: './popover-data-table-demo.html',
    standalone: true,
    imports: [PopoverModule, TableModule, ButtonModule, TagModule],
    providers: [MessageService, ProductService]
})
export class PopoverDataTableDemo implements OnInit {

    constructor(
        private productService: ProductService,
        private cdr: ChangeDetectorRef,
    ) {}

    @ViewChild('op') op!: Popover;

    products: Product[] | undefined;

    selectedProduct: Product | undefined;

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products = products;
            this.cdr.markForCheck();
        });
    }

    displayProduct(event, product) {
        if (this.selectedProduct?.id === product.id) {
            this.op.hide();
            this.selectedProduct = null;
        } else {
            this.selectedProduct = product;
            this.op.show(event);

            if (this.op.container) {
                this.op.align();
            }
        }
    }

    hidePopover() {
        this.op.hide();
    }

    getSeverity(product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }
}`,
        service: ['ProductService']
    };

    displayProduct(event, product) {
        if (this.selectedProduct?.id === product.id) {
            this.op.hide();
            this.selectedProduct = null;
        } else {
            this.selectedProduct = product;
            this.op.show(event);

            if (this.op.container) {
                this.op.align();
            }
        }
    }

    hidePopover() {
        this.op.hide();
    }

    getSeverity(product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    extFiles = [
        {
            path: 'src/domain/product.ts',
            content: `
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];
}
