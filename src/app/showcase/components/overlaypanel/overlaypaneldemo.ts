import {Component} from '@angular/core';
import { ProductService } from '../../service/productservice';
import { Product } from '../../domain/product';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './overlaypaneldemo.html',
    styleUrls: ['./overlaypanel.scss'],
    providers: [MessageService]
})
export class OverlayPanelDemo {

    products: Product[];
    
    selectedProduct: Product;

    constructor(private productService: ProductService, private messageService: MessageService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(products => this.products = products);
    }

    onRowSelect(event) {
        this.messageService.add({severity: 'info', summary: 'Product Selected', detail: event.data.name});
    }
}