import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'columnresizeexpandmode-doc',
    standalone: true,
    imports: [CommonModule, TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>Setting <i>columnResizeMode</i> as <i>expand</i> changes the table width as well.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-table [value]="products" showGridlines [resizableColumns]="true" columnResizeMode="expand" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th pResizableColumn>Code</th>
                            <th pResizableColumn>Name</th>
                            <th pResizableColumn>Category</th>
                            <th pResizableColumn>Quantity</th>
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
export class ColumnResizeExpandModeDoc {
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
