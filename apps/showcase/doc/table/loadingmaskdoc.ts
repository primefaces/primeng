import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { timer } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'table-loading-mask-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo],
    template: ` <app-docsectiontext>
            <p>The <i>loading</i> property displays a mask layer to indicate busy state. Use the paginator to display the mask.</p>
        </app-docsectiontext>
        <p-deferred-demo (load)="loadDemoData()">
            <div class="card">
                <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" [rows]="10" [loading]="loading()" (onPage)="handlePage()">
                    <ng-template #header>
                        <tr>
                            <th style="width:25%">Code</th>
                            <th style="width:25%">Name</th>
                            <th style="width:25%">Category</th>
                            <th style="width:25%">Quantity</th>
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
            </div>
        </p-deferred-demo>
        <app-code [code]="code" selector="table-loading-mask-demo" [extFiles]="extFiles"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingMaskDoc {
    products!: Product[];

    loading = signal(false);

    constructor(
        private productService: ProductService,
        private cd: ChangeDetectorRef
    ) {}

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products = data;
            this.cd.markForCheck();
        });
    }

    handlePage() {
        this.loading.set(true);
        timer(500)
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe();
    }

    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" 
        [rows]="10" [loading]="loading()" (onPage)="handlePage()">
    <ng-template #header>
        <tr>
            <th style="width:25%">Code</th>
            <th style="width:25%">Name</th>
            <th style="width:25%">Category</th>
            <th style="width:25%">Quantity</th>
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
</p-table>`,

        html: `<div class="card">
    <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" [paginator]="true" 
        [rows]="10" [loading]="loading()" (onPage)="handlePage()">
        <ng-template #header>
            <tr>
                <th style="width:25%">Code</th>
                <th style="width:25%">Name</th>
                <th style="width:25%">Category</th>
                <th style="width:25%">Quantity</th>
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
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'table-loading-mask-demo',
    templateUrl: 'table-loading-mask.html',
    standalone: true,
    imports: [TableModule, CommonModule],
    providers: [ProductService]
})
export class LoadingMaskDemo implements OnInit {
    
    products!: Product[];

    loading = signal(false);

    constructor(
        private productService: ProductService,
    ) {}

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = data;
        });
    }

    handlePage() {
        this.loading.set(true);
        timer(500).pipe(
            finalize(() => this.loading.set(false))
        ).subscribe();
    }
}`,
        data: `{
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
