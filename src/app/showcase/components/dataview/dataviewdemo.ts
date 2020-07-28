import {Component,OnInit} from '@angular/core';
import {ProductService} from '../../service/productservice';
import {SelectItem} from 'primeng/api';
import {Product} from '../../domain/product';

@Component({
    templateUrl: './dataviewdemo.html',
    styleUrls: ['./dataviewdemo.scss']
})
export class DataViewDemo implements OnInit {

    products: Product[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sortOptions = [
            {label: 'Price High to Low', value: '!price'},
            {label: 'Price Low to High', value: 'price'}
        ];
    }
    
    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}