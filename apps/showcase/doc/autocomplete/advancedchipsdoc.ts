import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
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
            <p>
                Advanced chips mode combines <i>optionLabel</i>, <i>optionValue</i> functions with custom templates for a rich user experience. This example demonstrates product selection with images, custom chip templates, and flexible data
                handling.
            </p>
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
                <ng-template let-value #chip>
                    <div class="flex align-items-center gap-2">
                        <span class="font-semibold">{{ value.name }}</span>
                        <span class="text-primary text-sm">\${{ value.price }}</span>
                    </div>
                </ng-template>
            </p-autocomplete>
        </div>
        <app-code [code]="code" selector="autocomplete-advanced-chips-demo"></app-code>`
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

    code: Code = {
        basic: `<p-autocomplete
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
    <ng-template let-value #chip>
        <div class="flex align-items-center gap-2">
            <span class="font-semibold">{{ value.name }}</span>
            <span class="text-primary text-sm">\${{ value.price }}</span>
        </div>
    </ng-template>
</p-autocomplete>`,

        html: `<div class="card">
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
        <ng-template let-value #chip>
            <div class="flex align-items-center gap-2">
                <span class="font-semibold">{{ value.name }}</span>
                <span class="text-primary text-sm">\${{ value.price }}</span>
            </div>
        </ng-template>
    </p-autocomplete>
</div>`,

        typescript: `import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ChipModule } from 'primeng/chip';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';

@Component({
    selector: 'autocomplete-advanced-chips-demo',
    templateUrl: './autocomplete-advanced-chips-demo.html',
    standalone: true,
    imports: [CommonModule, FormsModule, AutoCompleteModule, ChipModule],
    providers: [ProductService]
})
export class AutocompleteAdvancedChipsDemo implements OnInit {
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
}`
    };
}
