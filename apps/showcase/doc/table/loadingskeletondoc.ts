import { DeferredDemo } from '@/components/demo/deferreddemo';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'table-loading-skeleton-doc',
    standalone: true,
    imports: [TableModule, AppDocSectionText, AppCode, DeferredDemo, SkeletonModule],
    template: ` <app-docsectiontext>
            <p>Skeleton component can be used as a placeholder during the loading process.</p>
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
                        <tr>
                            <td><p-skeleton /></td>
                            <td><p-skeleton /></td>
                            <td><p-skeleton /></td>
                            <td><p-skeleton /></td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </p-deferred-demo>
        <app-code selector="table-loading-skeleton-demo"></app-code>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSkeletonDoc {
    products!: Product[];

    constructor(private cd: ChangeDetectorRef) {}

    loadDemoData() {
        this.products = Array.from({ length: 10 }).map((_, i) => ({ id: i.toString() }));
        this.cd.markForCheck();
    }
}
