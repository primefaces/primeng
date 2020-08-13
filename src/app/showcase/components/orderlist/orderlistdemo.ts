import { Component } from '@angular/core';
import { ProductService } from '../../service/productservice';
import { Product } from '../../domain/product';

@Component({
    templateUrl: './orderlistdemo.html',
    styleUrls: ['./orderlistdemo.scss']
})
export class OrderListDemo {

    products: Product[];
    
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(cars => this.products = cars);
    }
}