import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';

@Component({
    selector: 'advanced-chips-doc',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, ChipModule, AppDocSectionText, AppCode],
    providers: [ProductService],
    template: ` <app-docsectiontext>
            <p>This example demonstrates an advanced use case with templating, object handling, dropdown, and multiple mode.</p>
        </app-docsectiontext>
        <div class="card">
            <p-autocomplete
                [(ngModel)]="selectedProducts"
                [suggestions]="filteredProducts"
                (completeMethod)="filterProducts($event)"
                inputId="advanced-chips"
                [multiple]="true"
                [fluid]="true"
                [typeahead]="false"
                [dropdown]="true"
                [optionLabel]="getProductLabel"
                [optionValue]="getProductValue"
                placeholder="Add products"
            >
                <ng-template let-product #item>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ product.name }}</span>
                            <span class="text-sm text-surface-500 dark:text-surface-400">{{ product.category }}</span>
                        </div>
                        <span class="font-bold sm:ml-8">\${{ product.price }}</span>
                    </div>
                </ng-template>
                <ng-template let-value #selecteditem>
                    @if (value.price) {
                        <div class="flex align-items-center gap-2">
                            <span class="font-semibold">{{ value.name }}</span>
                            <span class="text-primary text-sm font-bold">\${{ value.price }}</span>
                        </div>
                    } @else {
                        <span class="font-semibold">{{ value }}</span>
                    }
                </ng-template>
            </p-autocomplete>
        </div>
        <app-code></app-code>`
})
export class AdvancedChipsDoc implements OnInit {
    products = signal<Product[]>([]);

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((data) => this.products.set(data));
    }

    selectedProducts = signal<any[]>([]);

    filteredProducts: Product[] = [];

    filterProducts(event: any) {
        let filtered: Product[] = [];
        let query = event.query;

        for (let i = 0; i < this.products().length; i++) {
            let product = this.products()[i];
            if (product.name?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(product);
            }
        }

        this.filteredProducts = filtered;
    }

    getProductLabel(product: any): string {
        if (typeof product === 'string') {
            return product;
        }
        return product?.name || '';
    }

    getProductValue(product: any): any {
        if (typeof product === 'string') {
            return { name: product, custom: true };
        }
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        };
    }
}
