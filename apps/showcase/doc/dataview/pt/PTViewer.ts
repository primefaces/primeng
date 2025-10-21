import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
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
    selector: 'dataview-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DataViewModule, TagModule, ButtonModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-dataview [value]="products()">
                <ng-template #list let-items>
                    <div class="flex flex-col">
                        <div *ngFor="let item of items; let i = index">
                            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div class="md:w-40 relative">
                                    <img class="rounded w-36" [src]="'https://primefaces.org/cdn/primevue/images/product/' + item.image" [alt]="item.name" />
                                    <div class="dark:bg-surface-900 absolute rounded-border" style="left: 4px; top: 4px">
                                        <p-tag [value]="item.inventoryStatus" [severity]="getSeverity(item)"></p-tag>
                                    </div>
                                </div>
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ item.category }}</span>
                                            <div class="text-lg font-medium mt-2">{{ item.name }}</div>
                                        </div>
                                        <div class="bg-surface-100 p-1" style="border-radius: 30px">
                                            <div
                                                class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
                                                style="
                                                    border-radius: 30px;
                                                    box-shadow:
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.04),
                                                        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
                                                "
                                            >
                                                <span class="text-surface-900 font-medium text-sm">{{ item.rating }}</span>
                                                <i class="pi pi-star-fill text-yellow-500"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:items-end gap-8">
                                        <span class="text-xl font-semibold">\${{ item.price }}</span>
                                        <div class="flex flex-row-reverse md:flex-row gap-2">
                                            <p-button icon="pi pi-heart" variant="outlined"></p-button>
                                            <p-button icon="pi pi-shopping-cart" label="Buy Now" [disabled]="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial whitespace-nowrap"></p-button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </app-docptviewer>
    `,
    providers: [ProductService]
})
export class PTViewer implements OnInit {
    products = signal<Product[]>([]);

    docs = [
        {
            data: getPTOptions('DataView'),
            key: 'DataView'
        }
    ];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => {
            this.products.set(data.slice(0, 3));
        });
    }

    getSeverity(product: Product): string {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return '';
        }
    }
}
