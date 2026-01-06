import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
    selector: 'loading-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, DataViewModule, SkeletonModule, SelectButtonModule, AppCode, AppDocSectionText],
    providers: [ProductService],
    template: `
        <app-docsectiontext>
            <p>While data is being loaded. <a routerLink="/skeleton">Skeleton</a> component may be used to indicate the busy state.</p>
        </app-docsectiontext>
        <div class="card">
            <p-dataview #dv [value]="products()" [layout]="layout">
                <ng-template #header>
                    <div class="flex justify-end">
                        <p-selectbutton [(ngModel)]="layout" [options]="options" [allowEmpty]="false">
                            <ng-template #item let-option>
                                <i [class]="option === 'list' ? 'pi pi-bars' : 'pi pi-table'"></i>
                            </ng-template>
                        </p-selectbutton>
                    </div>
                </ng-template>
                <ng-template #list let-items>
                    <div class="flex flex-col">
                        <div *ngFor="let i of counterArray(6); let first = first">
                            <div class="flex flex-col xl:flex-row xl:items-start p-6 gap-6" [ngClass]="{ 'border-t border-surface-200 dark:border-surface-700': !first }">
                                <p-skeleton class="!w-9/12 sm:!w-64 xl:!w-40 !h-24 mx-auto" />
                                <div class="flex flex-col sm:flex-row justify-between items-center xl:items-start flex-1 gap-6">
                                    <div class="flex flex-col items-center sm:items-start gap-4">
                                        <p-skeleton width="8rem" height="2rem" />
                                        <p-skeleton width="6rem" height="1rem" />

                                        <div class="flex items-center gap-4">
                                            <p-skeleton width="6rem" height="1rem" />
                                            <p-skeleton width="3rem" height="1rem" />
                                        </div>
                                    </div>
                                    <div class="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                                        <p-skeleton width="4rem" height="2rem" />
                                        <p-skeleton size="3rem" shape="circle" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #grid let-items>
                    <div class="grid grid-cols-12 gap-4">
                        <div *ngFor="let i of counterArray(6); let first = first" class="col-span-12 sm:col-span-6 xl:col-span-4 p-2">
                            <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded">
                                <div class="flex flex-wrap items-center justify-between gap-2">
                                    <p-skeleton width="6rem" height="2rem" />
                                    <p-skeleton width="3rem" height="1rem" />
                                </div>
                                <div class="flex flex-col items-center gap-4 py-8">
                                    <p-skeleton height="10rem" class="w-3/4" class="w-3/4" />
                                    <p-skeleton width="8rem" height="2rem" />
                                    <p-skeleton width="6rem" height="1rem" />
                                </div>
                                <div class="flex items-center justify-between">
                                    <p-skeleton width="4rem" height="2rem" />
                                    <p-skeleton width="6rem" height="1rem" shape="circle" size="3rem" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-dataview>
        </div>
        <app-code [extFiles]="['Product']"></app-code>
    `
})
export class LoadingDoc {
    layout: 'grid' | 'list' = 'grid';

    products = signal<any>([]);

    options: string[] = ['list', 'grid'];

    constructor(private productService: ProductService) {}

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

    counterArray(n: number): any[] {
        return Array(n);
    }

    ngOnInit() {
        this.productService.getProducts().then((data) => this.products.set([...data.slice(0, 12)]));
    }
}
