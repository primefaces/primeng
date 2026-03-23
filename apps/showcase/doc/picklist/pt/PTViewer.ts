import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PickListModule } from 'primeng/picklist';

interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    quantity?: number;
    inventoryStatus?: string;
    rating?: number;
}

@Component({
    selector: 'picklist-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, PickListModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-picklist [source]="products[0]" [target]="products[1]" dataKey="id" [breakpoint]="'1400px'" [sourceStyle]="{ width: '200px' }" [targetStyle]="{ width: '200px' }">
                <ng-template #item let-item>
                    {{ item.name }}
                </ng-template>
            </p-picklist>
        </app-docptviewer>
    `
})
export class PTViewer {
    products: Product[][] = [[], []];

    docs = [
        {
            data: getPTOptions('PickList'),
            key: 'PickList'
        }
    ];

    constructor() {
        this.products = [
            [
                { id: '1000', code: 'f230fh0g3', name: 'Bamboo Watch', description: 'Product Description', image: 'bamboo-watch.jpg', price: 65, category: 'Accessories', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
                { id: '1001', code: 'nvklal433', name: 'Black Watch', description: 'Product Description', image: 'black-watch.jpg', price: 72, category: 'Accessories', quantity: 61, inventoryStatus: 'INSTOCK', rating: 4 },
                { id: '1002', code: 'zz21cz3c1', name: 'Blue Band', description: 'Product Description', image: 'blue-band.jpg', price: 79, category: 'Fitness', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 3 },
                { id: '1003', code: '244wgerg2', name: 'Blue T-Shirt', description: 'Product Description', image: 'blue-t-shirt.jpg', price: 29, category: 'Clothing', quantity: 25, inventoryStatus: 'INSTOCK', rating: 5 },
                { id: '1004', code: 'h456wer53', name: 'Bracelet', description: 'Product Description', image: 'bracelet.jpg', price: 15, category: 'Accessories', quantity: 73, inventoryStatus: 'INSTOCK', rating: 4 }
            ],
            []
        ];
    }
}
