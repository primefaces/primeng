import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

interface Product {
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
}

@Component({
    selector: 'table-pt-viewer',
    standalone: true,
    imports: [TableModule, CurrencyPipe, AppDocPtViewer],
    template: `
        <app-docptviewer [docs]="docs">
            <p-table
                [value]="products"
                [tableStyle]="{ 'min-width': '50rem' }"
                [pt]="{
                    root: { class: 'custom-table-root' },
                    table: { class: 'custom-table' },
                    thead: { class: 'custom-thead' },
                    tbody: { class: 'custom-tbody' },
                    header: { class: 'custom-header' },
                    footer: { class: 'custom-footer' }
                }"
            >
                <ng-template #caption>
                    <div class="flex items-center justify-between">
                        <h5 class="m-0">Products</h5>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </ng-template>
                <ng-template #body let-product>
                    <tr>
                        <td>{{ product.code }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>{{ product.price | currency: 'USD' }}</td>
                    </tr>
                </ng-template>
                <ng-template #summary>
                    <div class="flex items-center justify-between">In total there are {{ products ? products.length : 0 }} products.</div>
                </ng-template>
            </p-table>
        </app-docptviewer>
    `
})
export class PTViewer {
    products: Product[] = [
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

    docs = [
        {
            data: getPTOptions('Table'),
            key: 'Table'
        },
        {
            data: getPTOptions('ColumnFilter'),
            key: 'ColumnFilter'
        }
    ];
}
