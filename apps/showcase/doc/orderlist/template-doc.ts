import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';

@Component({
    selector: 'template-doc',
    standalone: true,
    imports: [CommonModule, OrderListModule, AppCodeModule, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>For custom content support define an <i>item</i> template that gets the item instance as a parameter. In addition <i>header</i> template is provided for further customization.</p>
        </app-docsectiontext>
        <div class="card sm:flex sm:justify-center">
            <p-orderlist [value]="products()" dataKey="id" [responsive]="true" breakpoint="575px" scrollHeight="20rem">
                <ng-template let-option let-selected="selected" #item>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}" [alt]="option.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ option.name }}</span>
                            <span
                                [ngClass]="{
                                    'text-sm': true,
                                    'text-surface-500': !selected,
                                    'dark:text-surface-400': !selected,
                                    'text-inherit': selected
                                }"
                                >{{ option.category }}</span
                            >
                        </div>
                        <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
                    </div>
                </ng-template>
            </p-orderlist>
        </div>
        <app-code [extFiles]="['Product']"></app-code>
    `
})
export class TemplateDoc implements OnInit {
    private productService = inject(ProductService);

    products = signal<Product[]>([]);

    ngOnInit() {
        this.productService.getProductsSmall().then((cars) => {
            this.products.set(cars);
        });
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}
