import { ExtFile, RouteFile } from './code';

// Domain type definitions for StackBlitz/CodeSandbox
export const DOMAIN_TYPE_DEFINITIONS: Record<string, { path: string; content: string }> = {
    Customer: {
        path: 'src/domain/customer.ts',
        content: `export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
    },
    Country: {
        path: 'src/domain/customer.ts',
        content: `export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
    },
    Representative: {
        path: 'src/domain/customer.ts',
        content: `export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: number;
}`
    },
    Product: {
        path: 'src/domain/product.ts',
        content: `export interface Product {
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
    },
    Car: {
        path: 'src/domain/car.ts',
        content: `export interface Car {
    vin?: string;
    year?: number;
    brand?: string;
    color?: string;
}`
    },
    Photo: {
        path: 'src/domain/photo.ts',
        content: `export interface Photo {
    title?: string;
    thumbnailUrl?: string;
}`
    }
};

/**
 * Resolve domain type names to ExtFile array
 * @param types Array of domain type names (e.g., ['Product', 'Customer'])
 * @returns Array of ExtFile objects with path and content
 */
export function resolveDomainTypes(types: string[]): ExtFile[] {
    const extFiles: ExtFile[] = [];
    const addedPaths = new Set<string>();

    for (const type of types) {
        const definition = DOMAIN_TYPE_DEFINITIONS[type];
        if (definition && !addedPaths.has(definition.path)) {
            addedPaths.add(definition.path);
            extFiles.push({
                path: definition.path,
                content: definition.content
            });
        }
    }

    return extFiles;
}

// Extended RouteFile with services dependency
export interface RouteFileDefinition extends RouteFile {
    services?: string[];
}

// Route file definitions for StackBlitz/CodeSandbox (component files used in demos)
export const ROUTE_FILE_DEFINITIONS: Record<string, RouteFileDefinition> = {
    ProductListDemo: {
        path: 'src/app/demo/productlistdemo.ts',
        name: 'ProductListDemo',
        services: ['ProductService'],
        content: `import { Component, OnInit } from '@angular/core';
import { Product } from '@/domain/product';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InfoDemo } from './infodemo';
import { TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button';

@Component({
    providers: [DialogService, MessageService, ProductService],
    standalone: true,
    imports: [TableModule, ButtonModule],
    template: \`<div class="flex justify-end mt-1 mb-4">
            <p-button icon="pi pi-external-link" label="Nested Dialog" [outlined]="true" severity="success" (click)="showInfo()" />
        </div>
        <p-table [value]="products" responsiveLayout="scroll" [rows]="5">
            <ng-template pTemplate="header">
                <tr>
                    <th pSortableColumn="code">Code</th>
                    <th pSortableColumn="name">Name</th>
                    <th pSortableColumn="year">Image</th>
                    <th pSortableColumn="price">Category</th>
                    <th pSortableColumn="inventoryStatus">Quantity</th>
                    <th style="width:4em"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-product>
                <tr>
                    <td>{{ product.code }}</td>
                    <td>{{ product.name }}</td>
                    <td><img src="https://primefaces.org/cdn/primeng/images/demo/product/{{ product.image }}" [alt]="product.image" class="w-16 h-16 shadow" /></td>
                    <td>{{ product.category }}</td>
                    <td>
                        {{ product.quantity }}
                    </td>
                    <td>
                        <p-button type="button" [text]="true" [rounded]="true" icon="pi pi-plus" (click)="selectProduct(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>\`
})
export class ProductListDemo implements OnInit {
    products: Product[];

    constructor(private productService: ProductService, private dialogService: DialogService, private ref: DynamicDialogRef) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products.slice(0, 5)));
    }

    selectProduct(product: Product) {
        this.ref.close(product);
    }

    showInfo() {
        this.dialogService.open(InfoDemo, {
            header: 'Information',
            modal: true,
            dismissableMask: true,
            data: {
                totalProducts: this.products ? this.products.length : 0
            }
        });
    }

    closeDialog(data) {
        this.ref.close(data);
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
}`
    },
    InfoDemo: {
        path: 'src/app/demo/infodemo.ts',
        name: 'InfoDemo',
        content: `import { Component} from '@angular/core';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    providers: [DialogService, MessageService],
    standalone: true,
    imports:[ButtonModule],
    template: \`<div>
    <p>
        There are <strong>{{ totalProducts }}</strong> products in total in this list.
    </p>
    <div class="flex justify-end">
        <p-button type="button" label="Close" (click)="close()" />
    </div>
</div>\`
})
export class InfoDemo {
    totalProducts: number = 0;

    instance: DynamicDialog | undefined;

    constructor(public ref: DynamicDialogRef, private dialogService: DialogService) {
        this.instance = this.dialogService.getInstance(this.ref);
    }

    ngOnInit() {
        if (this.instance && this.instance.data) {
            this.totalProducts = this.instance.data['totalProducts'];
        }
    }

    close() {
        this.ref.close();
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}`
    },
    Footer: {
        path: 'src/app/demo/footer.ts',
        name: 'Footer',
        content: `import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'footer',
    standalone: true,
    imports: [ButtonModule],
    template:  \`
        <div class="flex w-full justify-end mt-4">
            <p-button type="button" label="Cancel" icon="pi pi-times" (click)="closeDialog({ buttonType: 'Cancel', summary: 'No Product Selected' })" />
        </div> \`
})
export class Footer {
    constructor(public ref: DynamicDialogRef) {}

    closeDialog(data) {
        this.ref.close(data);
    }
}`
    }
};

export interface ResolvedRouteFiles {
    routeFiles: RouteFile[];
    services: string[];
}

/**
 * Resolve route file names to RouteFile array and collect required services
 * @param names Array of route file names (e.g., ['ProductListDemo', 'Footer'])
 * @returns Object with routeFiles array and services array
 */
export function resolveRouteFiles(names: string[]): ResolvedRouteFiles {
    const routeFiles: RouteFile[] = [];
    const services: string[] = [];
    const addedPaths = new Set<string>();
    const addedServices = new Set<string>();

    for (const name of names) {
        const definition = ROUTE_FILE_DEFINITIONS[name];
        if (definition && !addedPaths.has(definition.path)) {
            addedPaths.add(definition.path);
            routeFiles.push({
                path: definition.path,
                name: definition.name,
                content: definition.content
            });

            // Collect services required by this route file
            if (definition.services) {
                for (const service of definition.services) {
                    if (!addedServices.has(service)) {
                        addedServices.add(service);
                        services.push(service);
                    }
                }
            }
        }
    }

    return { routeFiles, services };
}
