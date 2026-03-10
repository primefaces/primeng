import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'columntoggle-doc',
    standalone: true,
    imports: [FormsModule, TableModule, MultiSelectModule, AppDocSectionText, AppCode, DeferredDemo, AppDemoWrapper],
    template: ` <app-docsectiontext>
            <p>This demo uses a multiselect component to implement toggleable columns.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <app-demo-wrapper>
                <p-table [columns]="selectedColumns" [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #caption>
                        <p-multiselect display="chip" [options]="cols" [(ngModel)]="selectedColumns" optionLabel="header" selectedItemsLabel="{0} columns selected" [style]="{ 'min-width': '200px' }" placeholder="Choose Columns" />
                    </ng-template>
                    <ng-template #header let-columns>
                        <tr>
                            <th>Code</th>
                            @for (col of columns; track col) {
                                <th>
                                    {{ col.header }}
                                </th>
                            }
                        </tr>
                    </ng-template>
                    <ng-template #body let-product let-columns="columns">
                        <tr>
                            <td>{{ product.code }}</td>
                            @for (col of columns; track col) {
                                <td>
                                    {{ product[col.field] }}
                                </td>
                            }
                        </tr>
                    </ng-template>
                </p-table>
                <app-code [extFiles]="['Product']"></app-code>
            </app-demo-wrapper>
        </p-deferred-demo>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnToggleDoc {
    products!: Product[];

    cols!: Column[];

    selectedColumns!: Column[];

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProductsMini().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];

        this.selectedColumns = this.cols;
    }
}
