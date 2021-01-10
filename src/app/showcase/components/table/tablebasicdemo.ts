import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './tablebasicdemo.html'
})
export class TableBasicDemo implements OnInit {

    products: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
    }
}