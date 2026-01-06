import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

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
            <p-picklist [source]="sourceProducts" [target]="targetProducts" [dragdrop]="true" [responsive]="true" breakpoint="1400px">
                <ng-template let-item #item>
                    {{ item.name }}
                </ng-template>
            </p-picklist>
        </div>
        <app-code selector="picklist-basic-demo" [extFiles]="extFiles"></app-code>
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
