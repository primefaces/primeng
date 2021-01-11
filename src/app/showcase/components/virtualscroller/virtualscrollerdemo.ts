import { Component,OnInit } from '@angular/core';
import { LazyLoadEvent,SelectItem } from 'primeng/api';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';

@Component({
    templateUrl: './virtualscrollerdemo.html',
    styleUrls: ['./virtualscrollerdemo.scss']
})
export class VirtualScrollerDemo implements OnInit {

    products: Product[];

    virtualProducts: Product[];

    sortKey: string;

    sortOptions: SelectItem[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.products = Array.from({length: 10000}).map(() => this.productService.generatePrduct());
        this.virtualProducts = Array.from({length: 10000});

        this.sortOptions = [
            {label: 'Cheapest First', value: 'price'},
            {label: 'Expensive First', value: '!price'}
        ];
    }

    loadCarsLazy(event: LazyLoadEvent) {       
        // simulate remote connection with a timeout 
        setTimeout(() => {
            //load data of required page
            let loadedProducts = this.products.slice(event.first, (event.first + event.rows));

            //populate page of virtual cars
            Array.prototype.splice.apply(this.virtualProducts, [...[event.first, event.rows], ...loadedProducts]);
            
            //trigger change detection
            this.virtualProducts = [...this.virtualProducts];
        }, 1000);
    }

    onSortChange() {
        if (this.sortKey.indexOf('!') === 0)
            this.sort(-1);
        else
            this.sort(1);
    }

    sort(order: number): void {
        let products = [...this.products];
        products.sort((data1, data2) => {
            let value1 = data1.price;
            let value2 = data2.price;
            let result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (order * result);
        });

        this.products = products;
    }
}