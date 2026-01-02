import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { DeferredDemo } from '@/components/demo/deferreddemo';

@Component({
    selector: 'cell-edit-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, InputTextModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>In-cell editing is enabled by adding <i>pEditableColumn</i> directive to an editable cell that has a <i>p-cellEditor</i> helper component to define the input-output templates for the edit and view modes respectively.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" dataKey="id" [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header>
                        <tr>
                            <th style="width:25%">Code</th>
                            <th style="width:25%">Name</th>
                            <th style="width:25%">Quantity</th>
                            <th style="width:25%">Price</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-product let-editing="editing">
                        <tr>
                            <td [pEditableColumn]="product.code" pEditableColumnField="code">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText type="text" [(ngModel)]="product.code" fluid />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.code }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.name" pEditableColumnField="name">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText type="text" [(ngModel)]="product.name" required fluid />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.name }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.quantity" pEditableColumnField="quantity">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText [(ngModel)]="product.quantity" fluid />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.quantity }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                            <td [pEditableColumn]="product.price" pEditableColumnField="price">
                                <p-cellEditor>
                                    <ng-template #input>
                                        <input pInputText type="text" [(ngModel)]="product.price" fluid />
                                    </ng-template>
                                    <ng-template #output>
                                        {{ product.price | currency: 'USD' }}
                                    </ng-template>
                                </p-cellEditor>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code selector="table-cell-edit-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEditDoc {
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
    quantity?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];
}
