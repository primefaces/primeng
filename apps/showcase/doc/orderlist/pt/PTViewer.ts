import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';
import { ProductService } from '@/service/productservice';

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
    selector: 'orderlist-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, OrderListModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-orderlist [value]="products()" dataKey="id">
                <ng-template #item let-option>
                    {{ option.name }}
                </ng-template>
            </p-orderlist>
        </app-docptviewer>
    `,
    providers: [ProductService]
})
export class PTViewer implements OnInit {
    products = signal<Product[]>([]);

    docs = [
        {
            data: getPTOptions('OrderList'),
            key: 'OrderList'
        }
    ];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => {
            this.products.set(data.slice(0, 5));
        });
    }
}
