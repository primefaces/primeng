import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { Component, inject, OnInit, signal } from '@angular/core';
import { PickListModule } from 'primeng/picklist';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [PickListModule, AppCode, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>
                PickList is used as a controlled input with <i>source</i> and <i>target</i> properties. Content of a list item needs to be defined with the <i>item</i> template that receives an object in the list as parameter. Drag & drop
                functionality depends on <i>&#64;angular/cdk</i> package.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-picklist [source]="sourceProducts()" [target]="targetProducts()" [dragdrop]="true" [responsive]="true" breakpoint="1400px">
                <ng-template let-item #item>
                    {{ item.name }}
                </ng-template>
            </p-picklist>
        </div>
        <app-code [extFiles]="['Product']"></app-code>
    `
})
export class BasicDoc implements OnInit {
    private carService = inject(ProductService);

    sourceProducts = signal<Product[]>([]);

    targetProducts = signal<Product[]>([]);

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts.set(products);
        });
    }
}
