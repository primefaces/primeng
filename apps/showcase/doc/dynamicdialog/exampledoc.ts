import { Code } from '@/domain/code';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Footer } from './footer';
import { ProductListDemo } from './productlistdemo';

@Component({
    selector: 'dynamic-dialog-example-demo',
    template: `
        <app-docsectiontext>
            <p>
                Dynamic dialogs require an instance of a <i>DialogService</i> that is responsible for displaying a dialog with a component as its content. Calling <i>open</i> method of <i>DialogService</i> will display dynamic dialog. First parameter
                of <i>open</i> method is the type of component to load and the second parameter is the configuration of the Dialog such as <i>header</i>, <i>width</i> and more.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-toast />
            <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
        </div>
        <app-code [code]="code" selector="dynamic-dialog-example-demo" [extFiles]="extFiles" [routeFiles]="routeFiles"></app-code>
    `,
    providers: [DialogService, MessageService]
})
export class ExampleDoc implements OnDestroy {
    constructor(
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}

    ref: DynamicDialogRef | undefined;

    code: Code = {
        basic: `<p-toast />
<p-button (click)="show()" icon="pi pi-search" label="Select a Product" />`,

        html: `<div class="card flex justify-center">
    <p-toast />
    <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
</div>`,

        typescript: `import { Component, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './demo/productlistdemo';
import { Footer } from './demo/footer';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dynamic-dialog-example-demo',
    templateUrl: './dynamic-dialog-example-demo.html',
    imports: [DynamicDialog, ToastModule, ButtonModule],
    providers: [DialogService, MessageService],
    standalone: true,
})
export class DynamicDialogExampleDemo implements OnDestroy {

    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ref: DynamicDialogRef | undefined;

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Product List',
            width: '50vw',
            modal: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            templates: {
                footer: Footer
            }
        });

        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: \`Pressed '\${buttonType}' button\` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({ severity: 'info', summary: 'Maximized', detail: \`maximized: \${value.maximized}\` });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}`,

        service: ['ProductService']
    };

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Product List',
            modal: true,
            width: '50vw',
            closable: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            templates: {
                footer: Footer
            }
        });

        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`
            });
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
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}`
        }
    ];

    routeFiles = [
        {
            path: 'src/app/demo/productlistdemo.ts',
            name: 'ProductListDemo',
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
    standalone:true,
    imports:[TableModule, ButtonModule],
    template: \`<div class="flex justify-end mt-1 mb-4">
            <p-button icon="pi pi-external-link" label="Nested Dialog" [outlined]="true" severity="success" (click)="showInfo()" />
        </div>
        <p-table [value]="products" responsiveLayout="scroll" [rows]="5" [responsive]="true">
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
        {
            path: 'src/app/demo/infodemo.ts',
            name: 'InfoDemo',
            content: `import { Component} from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';
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

    instance: DynamicDialogComponent | undefined;

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
        {
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
    ];
}
