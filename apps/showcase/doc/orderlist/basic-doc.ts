import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderListModule } from 'primeng/orderlist';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [OrderListModule, AppCodeModule, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>OrderList is used as a controlled input with <i>value</i> property. Content of a list item needs to be defined with the <i>item</i> template that receives an object in the list as parameter.</p>
        </app-docsectiontext>
        <div class="card sm:flex sm:justify-center">
            <p-orderlist [value]="products()" dataKey="id" [responsive]="true" breakpoint="575px">
                <ng-template #item let-option>
                    {{ option.name }}
                </ng-template>
            </p-orderlist>
        </div>
        <app-code [extFiles]="['Product']"></app-code>
    `,
    styles: [
        `
            @media (min-width: 576px) {
                :host ::ng-deep .p-listbox {
                    width: 14rem;
                }
            }
        `
    ]
})
export class BasicDoc implements OnInit {
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
