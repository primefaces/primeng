import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'gridlines-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>Enabling <i>showGridlines</i> displays borders between cells.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-table [value]="products" showGridlines [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </p-deferred-demo>
            <app-code [extFiles]="['Product']"></app-code>
        </app-demo-wrapper>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridlinesDoc {
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }
}
