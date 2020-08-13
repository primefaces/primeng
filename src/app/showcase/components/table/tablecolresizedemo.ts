import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { Customer } from '../../domain/customer';
import { ProductService } from '../../service/productservice';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './tablecolresizedemo.html'
})
export class TableColResizeDemo implements OnInit {

    products: Product[];

    customers: Customer[];

    constructor(private productService: ProductService, private customerService: CustomerService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products = data);
        this.customerService.getCustomersLarge().then(customers => this.customers = customers);
    }
}