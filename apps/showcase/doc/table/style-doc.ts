import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'style-doc',
    standalone: true,
    imports: [CommonModule, TableModule, AppDocSectionText, AppCode, DeferredDemo, BadgeModule],
    template: ` <app-docsectiontext>
            <p>Certain rows or cells can easily be styled based on conditions.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr [ngClass]="rowClass(product)" [ngStyle]="rowStyle(product)">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>
                                <p-badge [value]="product.quantity" [severity]="stockSeverity(product)" />
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [code]="code" [extFiles]="['Product']"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StyleDoc {
    products!: Product[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsSmall().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    rowClass(product: Product) {
        return { '!bg-primary !text-primary-contrast': product.category === 'Fitness' };
    }

    rowStyle(product: Product) {
        if (product.quantity === 0) {
            return { fontWeight: 'bold', fontStyle: 'italic' };
        }
    }

    stockSeverity(product: Product) {
        if (product.quantity === 0) return 'danger';
        else if (product.quantity > 0 && product.quantity < 10) return 'warn';
        else return 'success';
    }
}
