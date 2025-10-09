import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
    selector: 'carousel-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, CarouselModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-carousel [value]="products" [numVisible]="3" [numScroll]="1">
                <ng-template #item let-product>
                    <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                        <div class="mb-4">
                            <span class="font-medium">{{ product.name }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-2xl font-semibold">{{ '$' + product.price }}</span>
                        </div>
                    </div>
                </ng-template>
            </p-carousel>
        </app-docptviewer>
    `
})
export class PTViewer {
    products = [
        { id: '1', name: 'Product 1', price: 100 },
        { id: '2', name: 'Product 2', price: 200 },
        { id: '3', name: 'Product 3', price: 300 },
        { id: '4', name: 'Product 4', price: 400 },
        { id: '5', name: 'Product 5', price: 500 }
    ];

    docs = [
        {
            data: getPTOptions('Carousel'),
            key: 'Carousel'
        }
    ];
}
