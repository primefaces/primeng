import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'checkboxselection-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>Multiple selection can also be handled using checkboxes by enabling the <i>selectionMode</i> property of column as <i>multiple</i>.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-deferred-demo (load)="loadDemoData()">
                <p-table [value]="products" [(selection)]="selectedProducts" dataKey="code" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th style="width: 4rem">
                                <p-table-header-checkbox />
                            </th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr>
                            <td>
                                <p-table-checkbox [value]="product" />
                            </td>
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
export class CheckboxSelectionDoc {
    products!: Product[];

    selectedProducts!: Product;

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
