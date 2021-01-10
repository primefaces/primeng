import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './tableselectiondemo.html',
    providers: [MessageService]
})
export class TableSelectionDemo implements OnInit {

    products: Product[];

    selectedProduct1: Product;

    selectedProduct2: Product;

    selectedProduct3: Product;

    selectedProducts1: Product[];

    selectedProducts2: Product[];

    selectedProducts3: Product[];

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
    }

    selectProduct(product: Product) {
        this.messageService.add({severity:'info', summary:'Product Selected', detail: product.name});
    }

    onRowSelect(event) {
        this.messageService.add({severity:'info', summary:'Product Selected', detail: event.data.name});
    }

    onRowUnselect(event) {
        this.messageService.add({severity:'info', summary:'Product Unselected',  detail: event.data.name});
    }

}
