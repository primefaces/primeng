import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { SortEvent } from 'primeng/api';

@Component({
    templateUrl: './tablesortdemo.html'
})
export class TableSortDemo implements OnInit {

    products1: Product[];

    products2: Product[];

    products3: Product[];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProductsSmall().then(data => this.products1 = data);
        this.productService.getProductsSmall().then(data => this.products2 = data);
        this.productService.getProductsSmall().then(data => this.products3 = data);
    }

    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }
}