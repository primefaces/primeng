import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './tablerowexpansiondemo.html'
})
export class TableRowExpansionDemo implements OnInit {

    products: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);
    }
    
}