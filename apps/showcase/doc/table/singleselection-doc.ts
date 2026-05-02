import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
    selector: 'singleselection-doc',
    standalone: true,
    imports: [FormsModule, TableModule, ToggleSwitchModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>
                Single row selection is enabled by defining <i>selectionMode</i> as <i>single</i> along with a value binding using <i>selection</i> property. When available, it is suggested to provide a unique identifier of a row with
                <i>dataKey</i> to optimize performance.
            </p>
            <p>
                By default, metaKey press (e.g. <i>⌘</i>) is necessary to unselect a row however this can be configured with disabling the <i>metaKeySelection</i> property. In touch enabled devices this option has no effect and behavior is same as
                setting it to false.
            </p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <div class="flex justify-center items-center mb-6 gap-2">
                    <p-toggleswitch [(ngModel)]="metaKey" inputId="input-metakey" />
                    <label for="input-metakey">MetaKey</label>
                </div>
                <p-table [value]="products" selectionMode="single" [(selection)]="selectedProduct" [metaKeySelection]="metaKey" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product>
                        <tr [pSelectableRow]="product">
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.quantity }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code [extFiles]="['Product']"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSelectionDoc {
    products!: Product[];

    selectedProduct!: Product;

    metaKey: boolean = true;

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
