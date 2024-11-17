import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>
                PickList is used as a controlled input with <i>source</i> and <i>target</i> properties. Content of a list item needs to be defined with the <i>pTemplate</i> property that receives an object in the list as parameter. Drag & drop
                functionality depends on <i>&#64;angular/cdk</i> package.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-picklist [source]="sourceProducts" [target]="targetProducts" [dragdrop]="true" [responsive]="true" [sourceStyle]="{ height: '30rem' }" [targetStyle]="{ height: '30rem' }" breakpoint="1400px">
                <ng-template let-item pTemplate="item">
                    {{ item.name }}
                </ng-template>
            </p-picklist>
        </div>
        <app-code [code]="code" selector="picklist-basic-demo" [extFiles]="extFiles"></app-code>
    `
})
export class BasicDoc {
    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(
        private carService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }

    code: Code = {
        basic: `<p-picklist [source]="sourceProducts" [target]="targetProducts" [dragdrop]="true" [responsive]="true" [sourceStyle]="{ height: '30rem' }" [targetStyle]="{ height: '30rem' }" breakpoint="1400px">
    <ng-template let-item pTemplate="item">
        {{ item.name }}
    </ng-template>
</p-picklist>`,

        html: `<div class="card">
    <p-picklist [source]="sourceProducts" [target]="targetProducts" [dragdrop]="true" [responsive]="true" [sourceStyle]="{ height: '30rem' }" [targetStyle]="{ height: '30rem' }" breakpoint="1400px">
        <ng-template let-item pTemplate="item">
            {{ item.name }}
        </ng-template>
    </p-picklist>
</div>`,

        typescript: `import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { PickListModule } from 'primeng/picklist';

@Component({
    selector: 'picklist-basic-demo',
    templateUrl: './picklist-basic-demo.html',
    standalone: true,
    imports: [PickListModule],
    providers: [ProductService]
})
export class PicklistBasicDemo {
    sourceProducts!: Product[];

    targetProducts!: Product[];

    constructor(
      private carService: ProductService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then(products => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }
}`,

        data: `
/* ProductService */
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
...`,

        service: ['ProductService']
    };

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
