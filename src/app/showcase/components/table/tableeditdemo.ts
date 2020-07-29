import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './tableeditdemo.html',
    providers: [MessageService],
    styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class TableEditDemo implements OnInit {

    products1: Product[];

    products2: Product[];

    statuses: SelectItem[];

    clonedProducts: { [s: string]: Product; } = {};

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products1 = data);
        this.productService.getProductsSmall().then(data => this.products2 = data);

        this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]
    }

    onRowEditInit(product: Product) {
        this.clonedProducts[product.id] = {...product};
    }

    onRowEditSave(product: Product) {
        if (product.price > 0) {
            delete this.clonedProducts[product.id];
            this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
        }  
        else {
            this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
        }
    }

    onRowEditCancel(product: Product, index: number) {
        this.products2[index] = this.clonedProducts[product.id];
        delete this.products2[product.id];
    }

}