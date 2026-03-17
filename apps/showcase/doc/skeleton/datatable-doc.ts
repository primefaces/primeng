import { Component, OnInit } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'data-table-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, AppDemoWrapper, SkeletonModule, TableModule, CommonModule],
    template: `
        <app-docsectiontext>
            <p>Sample DataTable implementation using different Skeleton components and Tailwind CSS utilities.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
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
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class DataTableDoc implements OnInit {
    products: any[] | undefined;

    ngOnInit() {
        this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
    }
}
