import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'vertical-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, AppCode, AppDemoWrapper, CarouselModule, ButtonModule, TagModule],
    template: `
        <app-docsectiontext>
            <p>To create a vertical Carousel, <i>orientation</i> needs to be set to <i>vertical</i> along with a <i>verticalViewPortHeight</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-carousel [value]="products()" [numVisible]="1" [numScroll]="1" orientation="vertical" verticalViewPortHeight="330px" contentClass="flex items-center">
                <ng-template let-product #item>
                    <div class="border border-surface-200 dark:border-surface-700 rounded-sm m-2 p-3">
                        <div class="mb-4">
                            <div class="relative mx-auto">
                                <img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" class="w-full rounded-sm" />
                                <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" class="absolute dark:bg-surface-900!" [ngStyle]="{ 'left.px': 5, 'top.px': 5 }" />
                            </div>
                        </div>
                        <div class="mb-4 font-medium text-sm">{{ product.name }}</div>
                        <div class="flex justify-between items-center">
                            <div class="mt-0 font-semibold text-lg">{{ '$' + product.price }}</div>
                            <span>
                                <p-button icon="pi pi-heart" severity="secondary" [outlined]="true" />
                                <p-button icon="pi pi-shopping-cart" styleClass="ml-2" />
                            </span>
                        </div>
                    </div>
                </ng-template>
            </p-carousel>
            <app-code [extFiles]="['Product']"></app-code>
        </app-demo-wrapper>
    `
})
export class VerticalDoc implements OnInit {
    private productService = inject(ProductService);

    products = signal<Product[]>([]);

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => {
            this.products.set(products);
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
