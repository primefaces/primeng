import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'datatable-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Sample DataTable implementation using different Skeleton components and Tailwind CSS utilities.</p>
        </app-docsectiontext>
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
                    <tr>
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                        <td><p-skeleton /></td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
        <app-code [code]="code" selector="skeleton-data-table-demo"></app-code>
    `
})
export class DataTableDoc implements OnInit {
    products: any[] | undefined;

    ngOnInit() {
        this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }

    code: Code = {
        basic: `<p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }">
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
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
            <td><p-skeleton /></td>
        </tr>
    </ng-template>
</p-table>`,
        html: `<div class="card">
    <p-table [value]="products" responsiveLayout="scroll">
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
                <td><p-skeleton /></td>
                <td><p-skeleton /></td>
                <td><p-skeleton /></td>
                <td><p-skeleton /></td>
            </tr>
        </ng-template>
    </p-table>
</div>`,
        typescript: `import { Component, OnInit } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'skeleton-data-table-demo',
    templateUrl: './skeleton-data-table-demo.html',
    standalone: true,
    imports: [Skeleton, TableModule]
})
export class SkeletonDataTableDemo implements OnInit {
    products: any[] | undefined;

    ngOnInit() {
        this.products = Array.from({ length: 5 }).map((_, i) => \`Item #\${i}\`);
    }
}`
    };
}
